from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
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

    conta_obj = ContaServico.objects.get(id=pk)
    conta_obj.nome = data["nome"]
    conta_obj.descricao = data["descricao"]
    conta_obj.observacao = data["observacao"]
    conta_obj.empresa_id = data["empresa"]
    conta_obj.save()

    serializer = ContaServicoSerializer(conta_obj)
    return Response(serializer.data)
    
class IntegracoesViewSet(viewsets.ModelViewSet):
  queryset = Integracao.objects.all()
  serializer_class = IntegracaoSerializer

class ServidoresViewSet(viewsets.ModelViewSet):
  queryset = Servidor.objects.all()
  serializer_class = ServidorSerializer

class InventarioViewSet(viewsets.ModelViewSet):
  serializer_class = InventarioSerializer
  queryset = Inventario.objects.all()

  def create(self, request, *args, **kwargs):
    data = request.data

    novo_inventario = Inventario.objects.create(
      projeto_id=data["projeto"])

    novo_inventario.save()
    
    if data["conta_servico"]:
      for conta in data["conta_servico"]:
        conta_obj = ContaServico.objects.get(id=conta["id"])
        novo_inventario.conta_servico.add(conta_obj)

    if data["integracao"]:
      for integracao in data["integracao"]:
        integracao_obj = Integracao.objects.get(id=integracao["id"])
        novo_inventario.integracao.add(integracao_obj)
    
    if data["servidor"]:
      for servidor in data["servidor"]:
        servidor_obj = Servidor.objects.get(id=servidor["id"])
        novo_inventario.servidor.add(servidor_obj)

    serializer = InventarioSerializer(novo_inventario)
    return Response(serializer.data)
  
  def update(self, request, pk):
    data = request.data

    inventario_obj = Inventario.objects.get(id=pk)
    inventario_obj.projeto_id = data["projeto"]
    inventario_obj.save

    conta_servico_lista = []

    for conta in data["conta_servico"]:
      conta_obj = ContaServico.objects.get(id=conta["id"])
      conta_servico_lista.append(conta_obj)

    inventario_obj.conta_servico.set(conta_servico_lista)

    integracao_lista = []

    for integracao in data["integracao"]:
      integracao_obj = Integracao.objects.get(id=integracao["id"])
      integracao_lista.append(integracao_obj)
      
    inventario_obj.integracao.set(integracao_lista)

    servidor_lista = []

    for servidor in data["servidor"]:
      servidor_obj = Servidor.objects.get(id=servidor["id"])
      servidor_lista.append(servidor_obj)
      
    inventario_obj.servidor.set(servidor_lista)

    serializer = InventarioSerializer(inventario_obj)
    return Response(serializer.data)

class InventarioListaViewSet(generics.ListAPIView):
  def get_queryset(self):
    queryset = Inventario.objects.all()
    return queryset

  serializer_class = InventarioListaSerializer