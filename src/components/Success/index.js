import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './success.css';

const Success = (props) => {
  const { showModal, setShowModal, width } = props;
  const navigate = useNavigate();

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <div id="success">
          <img src="/img/success.png" alt="success" id="successImg" />
          <h4 id="successTxt">
            <strong>ჩანაწერი დამატებულია!</strong>
          </h4>
          <button className="toListBtn" onClick={() => navigate('/records')}>
            სიაში გადაყვანა
          </button>
          <button className="toMainBtn" onClick={() => navigate('/')}>
            მთავარი
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Success;
