import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { useContext } from "react";
import { ProjectsContext } from "../../../ProjectsContext";
import styles from "./styles.module.scss";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";

export function ViewModal() {
  const { isViewModalOpen } = useContext(ProjectsContext);
  const { handleCloseViewModal } = useContext(ProjectsContext);
  const { clickedTableRow } = useContext(ProjectsContext);

  const ObjectKeys = Object.keys(clickedTableRow);

  const getAllTitles = (
    <div>
      {ObjectKeys.map((test, index) => {
        switch (test) {
          case "id":
            return;

          case "nome":
            return (
              <div key={index} className='react-modal-div'>
                <h3>Nome</h3>
                <p>{clickedTableRow.nome}</p>
              </div>
            );

          case "descricao":
            return (
              <div key={index} className='react-modal-div'>
                <h3>Descrição</h3>
                <p>{clickedTableRow.descricao}</p>
              </div>
            );

          case "tipo":
            if (clickedTableRow.ambiente) {
              if (clickedTableRow.tipo == "A") {
                return (
                  <div key={index} className='react-modal-div'>
                    <h3>Tipo</h3>
                    <p>Servidor aplicacional</p>
                  </div>
                );
              }

              return (
                <div key={index} className='react-modal-div'>
                  <h3>Tipo</h3>
                  <p>Banco de Dados</p>
                </div>
              );
            } else {
              if (clickedTableRow.tipo == "A") {
                return (
                  <div key={index} className='react-modal-div'>
                    <h3>Tipo de projeto</h3>
                    <p>Ambiente</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "B") {
                return (
                  <div key={index} className='react-modal-div'>
                    <h3>Tipo de projeto</h3>
                    <p>Aplicação</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "C") {
                return (
                  <div key={index} className='react-modal-div'>
                    <h3>Tipo de projeto</h3>
                    <p>Automação</p>
                  </div>
                );
              }
              if (clickedTableRow.tipo == "D") {
                return (
                  <div key={index} className='react-modal-div'>
                    <h3>Tipo de projeto</h3>
                    <p>RPA Uipath</p>
                  </div>
                );
              }
            }

          case "ambiente":
            if (clickedTableRow.ambiente == "PRD") {
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Ambiente</h3>
                  <p>Produção</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "DEV") {
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Ambiente</h3>
                  <p>Desenvolvimento</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "HML") {
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Ambiente</h3>
                  <p>Homologação</p>
                </div>
              );
            }
            if (clickedTableRow.ambiente == "TST") {
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Ambiente</h3>
                  <p>Teste</p>
                </div>
              );
            }
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Ambiente</h3>
                  <p>Não foi possível identificar</p>
                </div>
              );
            

          case "observacao":
            return (
              <div key={index} className='react-modal-div'>
                <h3>Observação</h3>
                <p>{clickedTableRow.observacao}</p>
              </div>
            );

          case "empresa":
            if (clickedTableRow.empresa == 1) {
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Empresa</h3>
                  <p>V.tal</p>
                </div>
              );
            }
              return (
                <div key={index} className='react-modal-div'>
                  <h3>Empresa</h3>
                  <p>Oi</p>
                </div>
              );
            

          case "area_negocio":
            return (
              <div key={index} className='react-modal-div'>
                <h3>Área de negócio</h3>
                <p>{clickedTableRow.area_negocio}</p>
              </div>
            );

          // Rota inventário
          case "projeto":
            return (
              <div key={index} className='react-modal-div'>
                <div className="react-modal-header">
                  <TerminalRoundedIcon />
                  <h3>Projeto</h3>
                </div>
                <p className={styles.subtitle}>
                  {clickedTableRow.projeto.nome}
                </p>
              </div>
            );

          case "integracao":
            const rowIntegration = clickedTableRow.integracao;
            return (
              <div key={index} className='react-modal-div'>
                <div className="react-modal-header">
                  <AccountTreeRoundedIcon />
                  <h3>Integrações</h3>
                </div>
                <div className={styles.divFlex}>
                  {rowIntegration.map((row: any, index: number) => (
                    <p key={index}>{row.nome}</p>
                  ))}
                </div>
              </div>
            );
            
            case "conta_servico":
              const rowAccount = clickedTableRow.conta_servico;
            return (
              <div key={index} className='react-modal-div'>
                <div className="react-modal-header">
                  <SupervisorAccountRoundedIcon />
                  <h3>Conta de serviço</h3>
                </div>
                <div className={styles.divFlex}>
                  {rowAccount.map((row: any, index: number) => (
                    <p key={index}>{row.nome}</p>
                    ))}
                </div>
              </div>
            );
            
            case "servidor":
              const rowServer = clickedTableRow.servidor;
              return (
                <div key={index} className='react-modal-div'>
                  <div className="react-modal-header">
                    <DnsRoundedIcon />
                    <h3>Servidores</h3>
                  </div>
                  <div className={styles.divFlex}>
                    {rowServer.map((row: any, index: number) => (
                      <p key={index}>{row.nome}</p>
                    ))}
                  </div>
                  <div className="react-modal-div">
                    <h3>Descrição do projeto</h3>
                    <p>{clickedTableRow.projeto.descricao}</p>
                  </div>
                </div>
              );

          default:
            return
        }
      })}
    </div>
  );

  return (
    <Modal
      isOpen={isViewModalOpen}
      onRequestClose={handleCloseViewModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button type="button" className="react-modal-close">
        <CgClose onClick={handleCloseViewModal} />
      </button>

      {getAllTitles}
    </Modal>
  );
}
