from rest_framework import viewsets
from .models import SaleOrder, SaleOrderLine
from .serializers import SaleOrderSerializer, SaleOrderLineSerializer
from rest_framework.response import Response
from rest_framework import status
from products.models import Product
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class SaleOrderViewSet(viewsets.ModelViewSet):
    queryset = SaleOrder.objects.all()
    serializer_class = SaleOrderSerializer

class SaleOrderLineViewSet(viewsets.ModelViewSet):
    queryset = SaleOrderLine.objects.all()
    serializer_class = SaleOrderLineSerializer
    

@csrf_exempt
def calculation(request):
    if request.method == 'POST':
        try:
            order_lines = json.loads(request.body)
            total = 0.0
            if order_lines:
                for order_line in order_lines:
                    # Set default values for empty or null fields
                    order_line['product'] = order_line.get('product', '') or ''
                    order_line['quantity'] = order_line.get('quantity', 1) or ''
                    order_line['price'] = Product.objects.get(id=int(order_line['product'])).price #order_line.get('price', 0) or 0
                    order_line['taxes'] = order_line.get('taxes', 0) or 0
                    order_line['subtotal'] = int(order_line['quantity']) * float(order_line.get('price', 0))#order_line.get('subtotal', 0) or 0
                    total += float(order_line['subtotal'])
            data = {"order_lines": order_lines,'total':total}
            print(data, type(order_lines))

            return JsonResponse(data=data, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)