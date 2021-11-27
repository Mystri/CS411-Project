import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap'

var x = "Abc";

export default () => {
  const [title] = useState(x);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getMovies = () => {
      const l_name = {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { 'Content-type': 'text/plain' },
        body: JSON.stringify({'title': title})
      }
      fetch('http://localhost:8000/', l_name)
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
            <title/>
        <Modal.Body>
        </Modal.Body>


      </Modal>
    </>
  );
}