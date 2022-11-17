from django.contrib import admin
from django.urls import path, include
from inventario.views import (
    EmpresasViewSet,
    InventarioViewSet,
    ProjetosViewSet,
    ContasServicosViewSet,
    IntegracoesViewSet,
    ServidoresViewSet,
    InventarioListaViewSet
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register('empresas', EmpresasViewSet, basename='Empresas')
router.register('projetos', ProjetosViewSet, basename='Projetos')
router.register('contas', ContasServicosViewSet, basename='Contas')
router.register('integracoes', IntegracoesViewSet, basename='Integracoes')
router.register('servidores', ServidoresViewSet, basename='Servidores')
router.register('inventarios', InventarioViewSet, basename='inventarios')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('inventario/all/', InventarioListaViewSet.as_view()),
]
