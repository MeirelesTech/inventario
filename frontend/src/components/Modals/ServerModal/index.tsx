import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { ProjectsContext } from "../../../ProjectsContext";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";

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
  tipo: string;
  ambiente: string;
}

// TODO: deixar isso dinâmico pra buscar os dados dentro da table

export function ServerModal({
  isOpen,
  onRequestClose,
  isAddMode,
  clickedTableRow,
}: NewAccountModalProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [observacao, setObservacao] = useState("");
  const [empresaObjects, setEmpresaObjects] = useState<EmpresaProps[]>([]);
  const [empresa, setEmpresa] = useState(1);
  const [addMode, setAddMode] = useState(isAddMode);
  const [clickedTableRowId, setClickedTableRowId] = useState(1);
  const { getApiResponse } = useContext(ProjectsContext);
  const { sucessToastMessage } = useContext(ProjectsContext);
  const { errorToastMessage } = useContext(ProjectsContext);
  const apiUrl = "/servidores/";

  const setVariablesToZero = () => {
    setNome("");
    setDescricao("");
    setObservacao("");
    setAmbiente("PRD");
    setTipo("A");
    setEmpresa(1);
  };

  useEffect(() => {
    setAddMode(isAddMode);

    const defineMode = (row: clickedTableProps) => {
      if (!isAddMode) {
        setNome(row.nome);
        setDescricao(row.descricao);
        setObservacao(row.observacao);
        setEmpresa(row.empresa);
        setTipo(row.tipo);
        setAmbiente(row.ambiente);
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
    return addMode ? createNewServer(data) : updateServer(data);
  }

  async function createNewServer(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      tipo,
      ambiente,
      observacao,
      empresa,
    };

    await api
      .post(apiUrl, data)
      .then(() => sucessToastMessage("Servidor criado com sucesso!"))
      .catch((error) => errorToastMessage(error));

    setVariablesToZero();

    getApiResponse(); // apenas para atualizar o grid

    onRequestClose();
  }

  async function updateServer(event: FormEvent) {
    event.preventDefault();

    const data = {
      nome,
      descricao,
      tipo,
      ambiente,
      observacao,
      empresa,
    };

    await api
      .put(apiUrl + clickedTableRowId + "/", data)
      .then(() => sucessToastMessage("Servidor modificado com sucesso!"))
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

  const handleSelectType = (event: any) => {
    setTipo(event.target.value);
  };

  const handleSelectAmbient = (event: any) => {
    setAmbiente(event.target.value);
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
          <DnsRoundedIcon className="icon" />
          <h2>{addMode ? "Criar servidor" : "Editar servidor"}</h2>
        </div>

        <div className="react-modal-div">
          <h3>Nome do servidor</h3>
          <input
            placeholder="Nome do servidor"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Descrição do servidor</h3>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Tipo de servidor</h3>
          <select
            className="react-modal-options"
            onChange={(event) => handleSelectType(event)}
            value={tipo}
          >
            <option value="A">Servidor Aplicacional</option>
            <option value="B">Banco de Dados</option>
          </select>
        </div>

        <div className="react-modal-div">
          <h3>Área do servidor</h3>
          <select
            className="react-modal-options"
            onChange={(event) => handleSelectAmbient(event)}
            value={ambiente}
          >
            <option value="PRD">Produção</option>
            <option value="DEV">Desenvolvimento</option>
            <option value="HML">Homologação</option>
            <option value="TST">Teste</option>
          </select>
        </div>

        <div className="react-modal-div">
          <h3>Observação do servidor</h3>
          <textarea
            placeholder="Observação"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            className="react-modal-options"
          />
        </div>

        <div className="react-modal-div">
          <h3>Empresa</h3>
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
