from django.db import models
from sales.models import SaleOrder

class Invoice(models.Model):
    sale_order = models.OneToOneField(SaleOrder, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.total_amount = self.sale_order.total_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Invoice {self.id} - {self.sale_order.customer.name}"
