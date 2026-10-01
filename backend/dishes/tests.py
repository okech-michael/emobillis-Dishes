from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Dish


class DishAPITest(APITestCase):
    def setUp(self):
        Dish.objects.all().delete()
        self.dish = Dish.objects.create(
            name='Chicken Pilau',
            description='A tasty rice dish with grilled chicken.',
            category='Main Course',
            price='450.00',
            image_url='https://example.com/chicken.jpg',
            is_available=True,
        )

    def test_create_dish(self):
        payload = {
            'name': 'Beef Stew',
            'description': 'Slow-cooked stew with vegetables.',
            'category': 'Main Course',
            'price': '550.00',
            'image_url': 'https://example.com/beef.jpg',
            'is_available': True,
        }
        # Use the public API route so this covers serializer validation and saving together.
        response = self.client.post(reverse('dish-list'), payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Dish.objects.count(), 2)
        self.assertEqual(response.data['name'], 'Beef Stew')

    def test_get_dishes(self):
        response = self.client.get(reverse('dish-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_single_dish(self):
        response = self.client.get(reverse('dish-detail', args=[self.dish.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Chicken Pilau')

    def test_filter_dishes(self):
        Dish.objects.create(
            name='Vegetable Samosa',
            description='Crispy pastry filled with vegetables.',
            category='Starter',
            price='150.00',
            is_available=False,
        )

        # Query parameters should be applied by the API, not filtered only in the browser.
        response = self.client.get(reverse('dish-list'), {'available': 'true', 'search': 'chicken'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Chicken Pilau')

    def test_update_dish(self):
        payload = {
            'name': 'Updated Chicken Pilau',
            'description': 'Updated description.',
            'category': 'Main Course',
            'price': '480.00',
            'image_url': 'https://example.com/updated.jpg',
            'is_available': False,
        }
        # PUT should return the saved representation and update the existing record.
        response = self.client.put(reverse('dish-detail', args=[self.dish.pk]), payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.dish.refresh_from_db()
        self.assertEqual(self.dish.name, 'Updated Chicken Pilau')
        self.assertFalse(self.dish.is_available)

    def test_delete_dish(self):
        # A successful delete should return 204 and remove the record from the database.
        response = self.client.delete(reverse('dish-detail', args=[self.dish.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Dish.objects.count(), 0)

    def test_invalid_dish_data(self):
        payload = {
            'name': '',
            'description': 'Some description',
            'category': 'Starter',
            'price': '0',
            'is_available': True,
        }
        response = self.client.post(reverse('dish-list'), payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertIn('price', response.data)
