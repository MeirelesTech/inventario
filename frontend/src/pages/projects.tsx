import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ProjectModal } from "../components/Modals/ProjectModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";


export default function Projects() {
  const apiUrl = "/projetos";
  const tableName = 'Projetos'
  const { handleEditButton } = useContext(ProjectsContext);
  const { isNewAccountModalOpen } = useContext(ProjectsContext);
  const { handleCloseNewProjectModal } = useContext(ProjectsContext);
  const { isAddMode } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);
  const { handleOpenNewProjectModal } = useContext(ProjectsContext);

  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Projeto", width: 150 },
    { field: "descricao", headerName: "Descrição", width: 150 },
    { field: "observacao", headerName: "Observação", width: 200 },
    { field: "area_negocio", headerName: "Área de negócio", width: 200 },
    {
      field: "tipo",
      headerName: "Tipo de Projeto",
      width: 200,
      valueGetter: (params) => {
        if (params.row.tipo == 'A') {
          return "Ambiente";
        } 
        if (params.row.tipo == 'B') {
          return "Aplicação";
        } 
        if (params.row.tipo == 'C') {
          return "Automação";
        } 
        if (params.row.tipo == 'D') {
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
          <title>Projetos</title>
        </Head>
        <Sidebar 
          tableName={tableName}
          handleOpenNewProjectModal={handleOpenNewProjectModal}
          TableIcon={TerminalRoundedIcon}
        />
        <div className="home-container">
          <Table
            columns={columns}
            handleEditButton={handleEditButton}
          />

          <ProjectModal
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
