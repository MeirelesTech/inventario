import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isAddMode: boolean;
  clickedTableRow: any;
}

interface clickedTableProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
  tipo: string;
  ambiente: string;
}

export function CompanyModal({
  isOpen,
  onRequestClose,
  isAddMode,
  clickedTableRow,
}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext);
  const { sucessToastMessage } = useContext(ProjectsContext);
  const { errorToastMessage } = useContext(ProjectsContext);
  const apiUrl = "/empresas/";

  const setVariablesToZero = () => {
    setNome("");
    setDescricao("");
    setObservacao("");
  };

  useEffect(() => {
    setAddMode(isAddMode);

    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };

    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewCompany(data) : updateCompany(data);
  }

  async function createNewCompany(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
    };

    await api
      .post(apiUrl, data)
      .then(() => sucessToastMessage("Empresa criada com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateCompany(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
    };

    await api
      .put(apiUrl + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage("Empresa modificada com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button type="button" className="react-modal-close">
        <CgClose onClick={onRequestClose} />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="react-modal-header">
          <ApartmentRoundedIcon className="icon" />
          <h2>{addMode ? "Criar Empresa" : "Editar Empresa"}</h2>
        </div>

        <div className="react-modal-div">
          <h3>Nome da empresa</h3>
          <input
            placeholder="Nome da Empresa"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Descrição da Empresa</h3>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Observação sobre a empresa</h3>
          <textarea
            placeholder="Observação"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <button type="submit">{addMode ? "Cadastrar" : "Editar"}</button>
      </form>
    </Modal>
  );
}
