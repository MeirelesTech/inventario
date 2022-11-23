from pyexpat import model
from rest_framework import serializers
from inventario.models import (
  Empresa,
  Inventario,
  Projeto,
  ContaServico,
  Integracao,
  Servidor
  )

class EmpresaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Empresa
    fields = '__all__'

class ProjetoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Projeto
    fields = '__all__'

class ContaServicoSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContaServico
    fields = '__all__'
    depth = 1

class IntegracaoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Integracao
    fields = '__all__'

class ServidorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Servidor
    fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Inventario
    fields = '__all__'
    depth = 1

class InventarioListaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Inventario
    fields = '__all__'
    depth = 1