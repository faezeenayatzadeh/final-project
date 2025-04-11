import { createPortal } from "react-dom";
import styles from './Modal.module.css';

const Modal = ({onClose}) => {
    return (
        createPortal(
            <div className={styles.root}>
                <div className={styles.modal}>
                    <div >title</div>
                    <section>description</section>
                    <button onClick={() => {}}>submit</button>
                    <button onClick={onClose}>close</button>
                </div>
            </div>,
        document.body)
    )
}

export default Modal;