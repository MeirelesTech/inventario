from rest_framework import viewsets, generics
from inventario.models import (
  Empresa,
  Inventario,
  Projeto,
  ContaServico,
  Integracao,
  Servidor
  )
from inventario.serializer import (
  EmpresaSerializer,
  InventarioListaSerializer,
  InventarioSerializer,
  ProjetoSerializer,
  ContaServicoSerializer,
  IntegracaoSerializer,
  ServidorSerializer
)

class EmpresasViewSet(viewsets.ModelViewSet):
  queryset = Empresa.objects.all()
  serializer_class = EmpresaSerializer

class ProjetosViewSet(viewsets.ModelViewSet):
  queryset = Projeto.objects.all()
  serializer_class = ProjetoSerializer

class ContasServicosViewSet(viewsets.ModelViewSet):
  queryset = ContaServico.objects.all()
  serializer_class = ContaServicoSerializer

class IntegracoesViewSet(viewsets.ModelViewSet):
  queryset = Integracao.objects.all()
  serializer_class = IntegracaoSerializer

class ServidoresViewSet(viewsets.ModelViewSet):
  queryset = Servidor.objects.all()
  serializer_class = ServidorSerializer

class InventarioViewSet(viewsets.ModelViewSet):
  queryset = Inventario.objects.all()
  serializer_class = InventarioSerializer

class InventarioListaViewSet(generics.ListAPIView):
  def get_queryset(self):
    queryset = Inventario.objects.all()
    return queryset

  serializer_class = InventarioListaSerializer