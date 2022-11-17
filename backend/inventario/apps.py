from django.apps import AppConfig

class InventarioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'inventario'

class ContaServicoConfig(AppConfig):
    name = "ContaServico"
    verbose_name = "ContasServicos "

class IntegracaoConfig(AppConfig):
    name = "integracao"
    verbose_name = "integracoes "
    
class InventarioConfig(AppConfig):
    name = "inventario"
    verbose_name = "inventarios "

class servidorConfig(AppConfig):
    name = "servidor"
    verbose_name = "servidores "
