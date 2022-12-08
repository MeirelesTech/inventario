import { useContext, useEffect } from "react";
import {DataGrid,GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter} from "@mui/x-data-grid";
import styles from "./styles.module.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { ProjectsContext } from "../../ProjectsContext";
import { DeleteModal } from "../Modals/DeleteModal";
import { ViewModal } from "../Modals/ViewModal";
import { Tooltip } from "@mui/material";


interface TableProps{
  columns: GridColDef[];
  handleEditButton(event: any, params:any): any;
}


export function Table({ columns, handleEditButton }: TableProps) {
  const { projects } = useContext(ProjectsContext)
  const { handleOpenDeleteModal } = useContext(ProjectsContext)
  const { handleOpenViewModal } = useContext(ProjectsContext)
  const { handleCloseDeleteModal } = useContext(ProjectsContext)
  const { isDeleteModalOpen } = useContext(ProjectsContext)
  const { getApiResponse } = useContext(ProjectsContext)


  useEffect(() =>{
    getApiResponse()
  }, [])

  // Coluna de edição e de ações
  const actionColumn = [
    {
      field: "action",
      headerName: "Ações",
      description:'Coluna para realizar ações',
      sortable: false,
      width: 140,
      disableExport: true,
      renderCell: (params: { row: { id: number } }) => {
        return (
          <div className={styles.cellAction}>

            <Tooltip title="Visualizar">
              <button onClick={(event) => handleOpenViewModal(event, params.row)}>
                <div className={styles.viewButton}><FiEye/></div>
              </button>
            </Tooltip>
            
            <Tooltip title="Editar" >
              <button onClick={(event) => handleEditButton(event, params.row)}>
                <div className={styles.editButton}><FiEdit/></div>
              </button>
            </Tooltip>

            <Tooltip title="Deletar">
              <button onClick={(event) => handleOpenDeleteModal(event, params.row)}>
                <div className={styles.deleteButton}><FiTrash2/></div>
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{display: 'flex', justifyContent:'space-between'}}>
        <div>
          <GridToolbarColumnsButton color="inherit"/>
          <GridToolbarDensitySelector color="inherit"/>
          <GridToolbarExport color="inherit"
            csvOptions={{
              delimiter: ';',
              utf8WithBom: true,
            }}
          />
        </div>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }


  return (
      <div className={styles.datatable}>
        
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleCloseDeleteModal}
        />

        <ViewModal/>
        
        <DataGrid
          className={styles.datagrid}
          getRowId={(row) => row.id}
          rows={projects}
          columns={columns.concat(actionColumn)}
          pageSize={15}
          rowsPerPageOptions={[15]}
          components={{ Toolbar: CustomToolbar }}
          localeText={{
            toolbarColumns: 'Colunas',
            toolbarColumnsLabel: 'Selecionar Colunas',
            columnsPanelTextFieldLabel: 'Achar coluna',
            columnsPanelTextFieldPlaceholder: 'Título da coluna',
            columnsPanelDragIconLabel: 'Reorganizar coluna',
            columnsPanelShowAllButton: 'Mostrar todos',
            columnsPanelHideAllButton: 'Esconder todos',
            
            toolbarFilters: 'Filtros',
            toolbarFiltersLabel: 'Mostrar filtros',
            toolbarFiltersTooltipHide: 'Esconder filtros',
            toolbarFiltersTooltipShow: 'Mostrar filtros',
            toolbarQuickFilterPlaceholder: 'Procurar…',
            toolbarQuickFilterLabel: 'Procurar',
            toolbarQuickFilterDeleteIconLabel: 'Limpar',
            filterPanelAddFilter: 'Adicionar filtro',
            filterPanelDeleteIconLabel: 'Deletar',
            filterPanelLinkOperator: 'Operador Lógico',
            filterPanelOperators: 'Operador',
            filterPanelOperatorAnd: 'E',
            filterPanelOperatorOr: 'Ou',
            filterPanelColumns: 'Colunas',
            filterPanelInputLabel: 'Valor',
            filterPanelInputPlaceholder: 'Filtrar valor',
            filterOperatorContains: 'contém',
            filterOperatorEquals: 'igual',
            filterOperatorStartsWith: 'começa com',
            filterOperatorEndsWith: 'termina com',
            filterOperatorIs: 'é',
            filterOperatorNot: 'não é',
            filterOperatorAfter: 'é depois',
            filterOperatorOnOrAfter: 'contém antes e depois',
            filterOperatorBefore: 'contém depois',
            filterOperatorOnOrBefore: 'está antes ou depois',
            filterOperatorIsEmpty: 'está vazio',
            filterOperatorIsNotEmpty: 'não está vazio',
            filterOperatorIsAnyOf: 'é qualquer um de',

            toolbarDensity: 'Tamanho',
            toolbarDensityLabel: 'Tamanho',
            toolbarDensityCompact: 'Compacto',
            toolbarDensityStandard: 'Padrão',
            toolbarDensityComfortable: 'Grande',

            toolbarExport: 'Baixar',
            toolbarExportLabel: 'Baixar',
            toolbarExportCSV: 'Baixar como CSV',
            toolbarExportPrint: 'Imprimir',
            toolbarExportExcel: 'Baixar como Excel',
          }}
        />

        <footer>
          Developed by AIOPS
        </footer>

        <ToastContainer />

      </div>
  );
}
