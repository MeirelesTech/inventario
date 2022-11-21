from django.contrib import admin

from inventario.models import (
  Empresa,
  Inventario,
  Projeto,
  ContaServico,
  Integracao,
  Servidor
  )

class EmpresasAdmin(admin.ModelAdmin):
  list_display = ('id', 'nome', 'descricao', 'observacao')
  list_display_links = ('id', 'nome')
  search_fields = ('nome',)
  list_per_page = 20

admin.site.register(Empresa, EmpresasAdmin)

class ProjetosAdmin(admin.ModelAdmin):
  list_display = ('id', 'nome', 'descricao', 'area_negocio', 'observacao',  'tipo')
  list_display_links = ('id', 'nome')
  search_fields = ('nome',)
  list_per_page = 20

admin.site.register(Projeto, ProjetosAdmin)

class ContasServicosAdmin(admin.ModelAdmin):
  list_display = ('id', 'nome', 'descricao', 'observacao',  'empresa')
  list_display_links = ('id', 'nome')
  search_fields = ('nome',)
  list_per_page = 20

admin.site.register(ContaServico, ContasServicosAdmin)

class IntegracoesAdmin(admin.ModelAdmin):
  list_display = ('id', 'nome', 'descricao', 'observacao')
  list_display_links = ('id', 'nome')
  search_fields = ('nome',)
  list_per_page = 20

admin.site.register(Integracao, IntegracoesAdmin)

class ServidoresAdmin(admin.ModelAdmin):
  list_display = ('id', 'nome', 'tipo', 'empresa', 'ambiente', 'observacao')
  list_display_links = ('id', 'nome')
  search_fields = ('nome',)
  list_per_page = 20

admin.site.register(Servidor, ServidoresAdmin)

class IventarioAdmin(admin.ModelAdmin):
  list_display = ('id', 'projeto', 'projeto_descricao')
  list_select_related = True
  list_display_links = ('id', 'projeto')
  search_fields = ('projeto',)
  list_per_page = 20

  def projeto_descricao(self, obj):
    return obj.projeto.descricao
  

admin.site.register(Inventario, IventarioAdmin)