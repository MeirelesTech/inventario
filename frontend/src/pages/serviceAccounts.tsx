import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { AccountModal } from "../components/Modals/AccountModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";


export default function ServiceAccounts() {
  const apiUrl = "/contas";
  const tableName = 'Contas de serviço'
  const { handleEditButton } = useContext(ProjectsContext)
  const { isNewAccountModalOpen } = useContext(ProjectsContext)
  const { handleCloseNewProjectModal } = useContext(ProjectsContext)
  const { isAddMode } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)
  const { handleOpenNewProjectModal } = useContext(ProjectsContext)



  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Conta", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "observacao", headerName: "Observação", width: 300 },
    {
      field: "empresa",
      headerName: "Empresa",
      width: 200,
      valueGetter: (params) => {
        // TODO: fazer isso ser dinâmico, pegando as empresas via api
        if (params.row.empresa.id == 1) {
          return "V.tal";
        } else {
          return "Oi";
        }
      },
    },
  ];

  return (
    <ProjectsProvider apiUrl={apiUrl}>
      <div className="home">
        <Head>
          <title>Contas de serviço</title>
        </Head>
        <Sidebar 
          tableName={tableName}
          handleOpenNewProjectModal={handleOpenNewProjectModal}
          TableIcon={SupervisorAccountRoundedIcon}
        />
        <div className="home-container">
          <Table
            columns={columns}
            handleEditButton={handleEditButton}
          />

          <AccountModal
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
