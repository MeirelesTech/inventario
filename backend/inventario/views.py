from rest_framework import viewsets, generics
from rest_framework.response import Response
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
  serializer_class = ContaServicoSerializer
  queryset = ContaServico.objects.all()

  def create(self, request, *args, **kwargs):
    data = request.data

    nova_conta = ContaServico.objects.create(
      nome=data["nome"], descricao=data["descricao"], observacao=data["observacao"], empresa_id=data["empresa"])

    nova_conta.save()

    serializer = ContaServicoSerializer(nova_conta)
    return Response(serializer.data)
  
  def update(self, request, pk):
    data = request.data

    conta = ContaServico.objects.get(id=pk)
    conta.nome = data["nome"]
    conta.descricao = data["descricao"]
    conta.observacao = data["observacao"]
    conta.empresa_id = data["empresa"]
    conta.save()

    serializer = ContaServicoSerializer(conta)
    return Response(serializer.data)
    
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