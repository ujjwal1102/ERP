# Generated by Django 4.2.13 on 2024-06-18 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0002_alter_saleorderline_product_delete_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='saleorder',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='saleorder',
            name='total_discount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='saleorder',
            name='untaxed_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='saleorderline',
            name='subtotal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='saleorderline',
            name='taxes',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
