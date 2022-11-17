from django.db import models

class Empresa(models.Model):
  nome = models.CharField(max_length=30, unique=True,  verbose_name='Nome')
  descricao = models.CharField(max_length=150, verbose_name='Descrição')
  observacao = models.CharField(max_length=255, verbose_name='Observação', null=True)

  def __str__(self):
      return self.nome

  class Meta:
      db_table = "inventario_empresas"
      verbose_name = "Empresa"
      verbose_name_plural = "Empresas"
      
class Projeto(models.Model):
  TIPO = (
    ('A', 'Ambiente'),
    ('B', 'Aplicacao'),
    ('C', 'Automacao'),
    ('D', 'RPA Uipath'),
  )

  nome = models.CharField(max_length=30, unique=True, verbose_name='Nome')
  descricao = models.CharField(max_length=255, verbose_name='Descrição')
  area_negocio = models.CharField(max_length=30, verbose_name='Área de Negócio')
  observacao = models.CharField(max_length=255, verbose_name='Observação', null=True)
  tipo = models.CharField(max_length=1, choices=TIPO, blank=False, null=False, default='A', verbose_name='Tipo')

  def __str__(self):
      return self.nome
  class Meta:
      db_table = "inventario_projetos"
      verbose_name = "Projeto"
      verbose_name_plural = "Projetos"

class ContaServico(models.Model):
  nome = models.CharField(max_length=30, unique=True, verbose_name='Nome')
  descricao = models.CharField(max_length=150, verbose_name='Descrição')
  empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, verbose_name='Empresa')
  observacao = models.CharField(max_length=255, verbose_name='Observação', null=True)

  def __str__(self):
      return self.nome
  class Meta:
    db_table = "inventario_contas_servicos"
    verbose_name = "Conta de Serviço"
    verbose_name_plural = "Contas de Serviços"

class Integracao(models.Model):
  nome = models.CharField(max_length=30, unique=True, verbose_name='Nome')
  descricao = models.CharField(max_length=150, verbose_name='Descrição')
  observacao = models.CharField(max_length=255, verbose_name='Observação', null=True)

  def __str__(self):
      return self.nome

  class Meta:
    db_table = "inventario_integracoes"
    verbose_name = "Integração"
    verbose_name_plural = "Integrações"

class Servidor(models.Model):
  AMBIENTE = (
    ('PRD', 'Produção'),
    ('DEV', 'Desenvolvimento'),
    ('HML', 'Homologação'),
    ('TST', 'Teste'),
  )
  TIPO = (
    ('A', 'Servidor Aplicacional'),
    ('B', 'Banco de Dados'),
  )

  nome = models.CharField(max_length=30, unique=True, verbose_name='Nome')
  descricao = models.CharField(max_length=150, verbose_name='Descrição')
  tipo = models.CharField(max_length=1, choices=TIPO, blank=False, null=False, default='A',  verbose_name='Tipo')
  empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE,  verbose_name='Empresa')
  ambiente = models.CharField(max_length=3, choices=AMBIENTE, blank=False, null=False, default='PRD',  verbose_name='Ambiente')
  observacao = models.CharField(max_length=255,  verbose_name='Observação', null=True)

  def __str__(self):
      return self.nome

  class Meta:
    db_table = "inventario_servidores"
    verbose_name = "Servidor"
    verbose_name_plural = "Servidores"

class Inventario(models.Model):
  projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='projetos', verbose_name='Projeto')
  conta_servico = models.ForeignKey(ContaServico, on_delete=models.CASCADE, verbose_name='Conta de Serviço')
  integracao = models.ForeignKey(Integracao, on_delete=models.CASCADE, verbose_name='Integração')
  servidor = models.ForeignKey(Servidor, on_delete=models.CASCADE, verbose_name='Servidor')

  class Meta:
    db_table = "inventario_inventarios"
    verbose_name = "Inventário"
    verbose_name_plural = "Inventários"
    unique_together = ('projeto', 'conta_servico', 'integracao', 'servidor')
    