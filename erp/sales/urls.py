from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SaleOrderViewSet,SaleOrderLineViewSet,calculation

router = DefaultRouter()
router.register(r'sale/orders', SaleOrderViewSet)
router.register(r'sale/orders/line', SaleOrderLineViewSet)

urlpatterns = [
    path('api/sales/', include(router.urls)),
    path('api/sales/calculation/',calculation),
 
]
