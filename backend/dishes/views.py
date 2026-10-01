from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Dish
from .serializers import DishSerializer


class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

    def get_queryset(self):
        # Keep search and filtering in the API so every client gets the same results.
        queryset = self.queryset.all()
        search = self.request.query_params.get('search', '').strip()
        category = self.request.query_params.get('category', '').strip()
        available = self.request.query_params.get('available')

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(description__icontains=search)
                | Q(category__icontains=search)
            )

        if category:
            queryset = queryset.filter(category__iexact=category)

        if available:
            available_value = available.lower()
            if available_value in {'true', '1', 'yes'}:
                queryset = queryset.filter(is_available=True)
            elif available_value in {'false', '0', 'no'}:
                queryset = queryset.filter(is_available=False)

        return queryset

    def create(self, request, *args, **kwargs):
        # Validate the incoming JSON before saving a new database record.
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        # Returning a 204 response is a clean delete pattern for REST APIs and keeps the frontend
        # logic simple when it removes a dish from the list.
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
