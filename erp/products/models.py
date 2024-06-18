from django.db import models

# Create your models here.
from django.db import models


# class Tax(models.Model):
    


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    category = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name
