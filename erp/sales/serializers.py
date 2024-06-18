# sales/serializers.py

from rest_framework import serializers
from .models import SaleOrder, SaleOrderLine
from customers.models import Customer
from products.models import Product

class SaleOrderLineSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    price = serializers.DecimalField(max_digits=10, decimal_places=2, source='product.price', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = SaleOrderLine
        fields = ['product', 'quantity', 'price', 'taxes', 'subtotal']

    def create(self, validated_data):
        product = validated_data['product']
        quantity = validated_data['quantity']
        validated_data['subtotal'] = product.price * quantity
        return super().create(validated_data)


class SaleOrderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    order_lines = SaleOrderLineSerializer(many=True)

    class Meta:
        model = SaleOrder
        fields = ['customer', 'order_date', 'total_amount', 'order_lines', 'untaxed_amount', 'total', 'total_discount']
        read_only_fields = ['order_date', 'total_amount', 'untaxed_amount', 'total']

    def create(self, validated_data):
        order_lines_data = validated_data.pop('order_lines')
        sale_order = SaleOrder.objects.create(**validated_data)
        total_amount = 0
        for order_line_data in order_lines_data:
            order_line = SaleOrderLine.objects.create(sale_order=sale_order, **order_line_data)
            total_amount += order_line.line_total
        sale_order.total_amount = total_amount
        sale_order.untaxed_amount = total_amount
        sale_order.total = total_amount - validated_data.get('total_discount', 0)
        sale_order.save()
        return sale_order
