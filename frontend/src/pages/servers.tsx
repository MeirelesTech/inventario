import { Table } from "../components/Table/index";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ServerModal } from "../components/Modals/ServerModal";
import Head from "next/head";
import { ProjectsContext, ProjectsProvider } from "../ProjectsContext";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";


export default function Servers() {
  const apiUrl = "/servidores";
  const tableName = 'Servidores'
  const { handleEditButton } = useContext(ProjectsContext)
  const { isNewAccountModalOpen } = useContext(ProjectsContext)
  const { handleCloseNewProjectModal } = useContext(ProjectsContext)
  const { isAddMode } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)
  const { handleOpenNewProjectModal } = useContext(ProjectsContext)



  // Definindo colunas
  const columns: GridColDef[] = [
    { field: "nome", headerName: "Servidor", width: 100 },
    { field: "descricao", headerName: "Descrição", width: 200 },
    { field: "observacao", headerName: "Observação", width: 200 },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 200,
      valueGetter: (params) => {
        if (params.row.tipo == "A") {
          return "Servidor Aplicacional";
        } else {
          return "Banco de Dados";
        }
      },
    },
    {
      field: "ambiente",
      headerName: "Ambiente",
      width: 200,
      valueGetter: (params) => {
        if (params.row.ambiente == "PRD") {
          return "Produção";
        }
        if (params.row.ambiente == "DEV") {
          return "Desenvolvimento";
        }
        if (params.row.ambiente == "HML") {
          return "Homologação";
        }
        if (params.row.ambiente == "TST") {
          return "Teste";
        }
      },
    },
    {
      field: "empresa",
      headerName: "Empresa",
      width: 200,
      valueGetter: (params) => {
        // TODO: fazer isso ser dinâmico, pegando as empresas via api
        if (params.row.empresa == 1) {
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
          <title>Servidores</title>
        </Head>
        <Sidebar
          tableName={tableName}
          handleOpenNewProjectModal={handleOpenNewProjectModal}
          TableIcon={DnsRoundedIcon}
        />
        <div className="home-container">
          <Table
            columns={columns}
            handleEditButton={handleEditButton}
          />

          <ServerModal
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
