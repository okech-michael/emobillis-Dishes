from django.db import migrations


def seed_dishes(apps, schema_editor):
    Dish = apps.get_model('dishes', 'Dish')
    Dish.objects.bulk_create([
        Dish(
            name='Chicken Pilau',
            description='A fragrant rice dish with seasoned chicken, carrots, and warming spices.',
            category='Main Course',
            price='450.00',
            image_url='http://127.0.0.1:8000/static/dishes/images/chicken_pilau.jpg',
            is_available=True,
        ),
        Dish(
            name='Beef Nyama Choma',
            description='Grilled beef strips served with a fresh tomato and onion salad.',
            category='Main Course',
            price='620.00',
            image_url='http://127.0.0.1:8000/static/dishes/images/beef_nyama_choma.jpg',
            is_available=True,
        ),
        Dish(
            name='Vegetable Samosa',
            description='Crispy pastry filled with potatoes, peas, and a light spice blend.',
            category='Starter',
            price='180.00',
            image_url='http://127.0.0.1:8000/static/dishes/images/vegetable_samosa.jpg',
            is_available=True,
        ),
        Dish(
            name='Fruit Smoothie Bowl',
            description='A refreshing mix of banana, berries, yoghurt, and granola.',
            category='Dessert',
            price='260.00',
            image_url='http://127.0.0.1:8000/static/dishes/images/fruit_smoothie_bowl.jpg',
            is_available=False,
        ),
        Dish(
            name='Fish Stew',
            description='A rich stew with fish chunks, tomatoes, and aromatic herbs.',
            category='Seafood',
            price='520.00',
            image_url='http://127.0.0.1:8000/static/dishes/images/fish_stew.jpg',
            is_available=True,
        ),
    ])


def reverse_seed_dishes(apps, schema_editor):
    Dish = apps.get_model('dishes', 'Dish')
    Dish.objects.filter(name__in={
        'Chicken Pilau',
        'Beef Nyama Choma',
        'Vegetable Samosa',
        'Fruit Smoothie Bowl',
        'Fish Stew',
    }).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('dishes', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_dishes, reverse_seed_dishes),
    ]
