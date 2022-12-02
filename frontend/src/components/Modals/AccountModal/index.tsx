import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";

interface NewAccountModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isAddMode: boolean;
  clickedTableRow: any;
}

interface EmpresaProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
}
interface clickedTableProps {
  id: number;
  nome: string;
  descricao: string;
  observacao: string;
  empresa: number;
}

export function AccountModal({
  isOpen,
  onRequestClose,
  isAddMode,
  clickedTableRow,
}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([]);
  const [empresa, setEmpresa] = useState(1);
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext);
  const { sucessToastMessage } = useContext(ProjectsContext);
  const { errorToastMessage } = useContext(ProjectsContext);
  const apiUrl = "/contas/";

  const setVariablesToZero = () => {
    setNome("");
    setDescricao("");
    setObservacao("");
    setEmpresa(1);
  };

  useEffect(() => {
    setAddMode(isAddMode);

    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setEmpresa(row.empresa.id); // erro ignorável
        setClickedTableRowId(row.id);
      } else {
        setVariablesToZero();
      }
    };

    defineMode(clickedTableRow);
  }, [clickedTableRow, isAddMode]);

  useEffect(() => {
    const getCompanies = async () => {
      const { data } = await api.get("/empresas/");
      setEmpresaObjects(data);
    };

    getCompanies();
  }, []);

  function handleSubmit(data: FormEvent) {
    return addMode ? createNewAccount(data) : updateAccount(data);
  }

  async function createNewAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
      empresa,
    };

    await api
      .post(apiUrl, data)
      .then(() => sucessToastMessage("Conta criada com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateAccount(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      observacao,
      empresa,
    };

    await api
      .put(apiUrl + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage("Conta modificada com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  const handleSelectCompany = (event: any) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setEmpresa(Number(optionElementId));
  };

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
          <SupervisorAccountRoundedIcon className="icon" />
          <h2>{addMode ? "Criar conta" : "Editar usuário"}</h2>
        </div>

        <div className="react-modal-div">
          <h3>Nome da Conta</h3>
          <input
            placeholder="Nome da Conta"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Descrição da conta</h3>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Observações da conta</h3>
          <textarea
            placeholder="Observação"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Conta da empresa</h3>
          <select
            className="react-modal-options"
            onChange={(event) => handleSelectCompany(event)}
            value={empresa}
          >
            {empresaObjects.map((item) => {
              return (
                <option id={item.id.toString()} value={item.id} key={item.id}>
                  {item.nome}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">{addMode ? "Cadastrar" : "Salvar"}</button>
      </form>
    </Modal>
  );
}
