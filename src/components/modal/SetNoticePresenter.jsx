import React from "react";
import { Modal, Button } from "react-bootstrap";

export default ({ isShow, onClose }) => (
  <Modal show={isShow} onHide={onClose} animation={true}>
    <Modal.Header closeButton>
      <Modal.Title>공지사항 등록</Modal.Title>
    </Modal.Header>
    <Modal.Body></Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        닫기
      </Button>
      <Button variant="primary" onClick={onClose}>
        등록
      </Button>
    </Modal.Footer>
  </Modal>
);
