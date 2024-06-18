# sales/models.py

from django.db import models
from customers.models import Customer
from products.models import Product

class SaleOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    untaxed_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Order {self.id} - {self.customer.name}"

class SaleOrderLine(models.Model):
    sale_order = models.ForeignKey(SaleOrder, related_name='order_lines', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    taxes = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    line_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        self.line_total = self.product.price * self.quantity
        self.subtotal = self.line_total + self.taxes
        super().save(*args, **kwargs)
        self.sale_order.total_amount = sum(line.line_total for line in self.sale_order.order_lines.all())
        self.sale_order.untaxed_amount = sum(line.line_total for line in self.sale_order.order_lines.all())
        self.sale_order.total = self.sale_order.total_amount - self.sale_order.total_discount
        self.sale_order.save()
