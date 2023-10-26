/* eslint-disable react/prop-types */
import "./StoreModal.css";
import deleteIcon from "../../assets/Icons/modalDelete.svg";
import crossIcon from "../../assets/Icons/crossIcon.svg";

const StoreModal = (props) => {
  const { closeModal } = props;
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={closeModal}>
          <img src={crossIcon} alt="X" />
        </button>
        <div className="modal-body">
          <div className="trash-icon">
            <img src={deleteIcon} alt="delete" />
          </div>
          <div className="modal-title">
            <p>
              Are you sure you <br /> want to delete “<span>Noon</span>” Store ?
            </p>
          </div>
          <div className="modal-btns">
            <button onClick={closeModal}>Cancel</button>
            <button>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreModal;
