import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import { useContext } from "react";
import { ProjectsContext } from "../../../ProjectsContext";
import styles from "./styles.module.scss";


interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}



export function DeleteModal({ isOpen,onRequestClose }: DeleteModalProps) {
  const { handleDeleteButton } = useContext(ProjectsContext)
  const { clickedTableRow } = useContext(ProjectsContext)
  

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
      <div className={styles.deleteModal}>
          <h2>Deletar item?</h2>
          <p>Tem certeza que deseja deletar este item?</p>
      <div>
        <button onClick={onRequestClose}>Cancelar</button>
        <button onClick={(event) => handleDeleteButton(event, clickedTableRow)} className={styles.deleteButton}>Deletar</button>
      </div>
      </div>
    </Modal>
  );
}
