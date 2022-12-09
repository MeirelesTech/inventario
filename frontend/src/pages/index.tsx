import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { InventoryModal } from "../components/Modals/InventoryModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";


export default function Home() {
  const apiUrl = "/inventarios";
  const tableName = "Inventário";
  const { handleEditButton } = useContext(ProjectsContext);
  const { isNewAccountModalOpen } = useContext(ProjectsContext);
  const { handleCloseNewProjectModal } = useContext(ProjectsContext);
  const { isAddMode } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);
  const { handleOpenNewProjectModal } = useContext(ProjectsContext);


  // Definindo colunas
  const columns: GridColDef[] = [
    {
      field: "projeto",
      headerName: "Projeto",
      width: 200,
      valueGetter: (params) => params.row.projeto.nome,
    },
    {
      field: "integracao",
      headerName: "Integração",
      width: 200,
      valueGetter: (params) => {
        const row = params.row.integracao;
        return row.map((array: any) => array.nome);
      },
    },
    {
      field: "servidor",
      headerName: "Servidor",
      width: 200,
      valueGetter(params) {
        const row = params.row.servidor;
        return row.map((array: any) => array.nome);
      },
    },
    {
      field: "conta_servico",
      headerName: "Conta",
      width: 200,
      valueGetter(params) {
        const row = params.row.conta_servico;
        return row.map((array: any) => array.nome);
      },
    },

    {
      field: "descricao",
      headerName: "Descrição Projeto",
      width: 250,
      valueGetter: (params) => params.row.projeto.descricao,
    },

    {
      field: "tipo",
      headerName: "Tipo de Projeto",
      width: 200,
      valueGetter: (params) => {
        if (params.row.projeto.tipo == 'A') {
          return "Ambiente";
        } 
        if (params.row.projeto.tipo == 'B') {
          return "Aplicação";
        } 
        if (params.row.projeto.tipo == 'C') {
          return "Automação";
        } 
        if (params.row.projeto.tipo == 'D') {
          return "RPA Uipath";
        } 
        else {
          return "Não foi possível indentificar";
        }
      },
    },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Inventário</title>
        </Head>
        <Sidebar
          tableName={tableName}
          handleOpenNewProjectModal={handleOpenNewProjectModal}
          TableIcon={ListAltRoundedIcon}
        />
        <div className="home-container">
          <Table columns={columns} handleEditButton={handleEditButton} />

          <InventoryModal
            isOpen={isNewAccountModalOpen}
            onRequestClose={handleCloseNewProjectModal}
            isAddMode={isAddMode}
            clickedTableRow={clickedTableRow}
          />
        </div>
      </div>
    </ProjectsProvider>
  );
}
