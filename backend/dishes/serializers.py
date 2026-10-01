from decimal import Decimal

from rest_framework import serializers

from .models import Dish


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            'id',
            'name',
            'description',
            'category',
            'price',
            'image_url',
            'is_available',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        # Trim user input so names are stored consistently and empty values do not slip through.
        if not value or not value.strip():
            raise serializers.ValidationError('Dish name cannot be empty.')
        return value.strip()

    def validate_price(self, value):
        # The business rule here is simple: a menu item should always have a positive price.
        if value is None:
            raise serializers.ValidationError('Price is required.')
        if value <= Decimal('0'):
            raise serializers.ValidationError('Price must be greater than zero.')
        return value

    def validate_image_url(self, value):
        # Empty strings are allowed in the model, but whitespace-only values should be normalised.
        if value and not value.strip():
            return ''
        return value
