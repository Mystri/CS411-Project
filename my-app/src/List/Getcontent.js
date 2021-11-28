import React, { useState } from 'react';
import { Form, Row, Col, Button,Modal } from 'react-bootstrap'

var x = "Abc";

export default (lid) => {
  // const [lid] = useState(x);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getMovies = () => {
    const l_id = {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { 'Content-type': 'text/plain' },
      body: JSON.stringify({ 'list_id': lid })
    }
    fetch('http://localhost:8000/get_list_movie', l_id)
  }
  return (
    <form>
      <Form.Group as={Row} className="mb-3" controlId="listname">
        <Form.Label column sm={3}>
        </Form.Label>
        <Col sm={9}>
          {/* <Form.Control required type="text" placeholder="Listname" value={listname} onChange={e => setName(e.target.value)} required /> */}
        </Col>
      </Form.Group>
      {/* <Form.Group as={Row} className="mb-3" controlId="desc">
        <Form.Label column sm={3}>
          Description
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDesc(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="createbutton">
        <Col sm={9}>
          <Button type="submit">Create</Button>
        </Col>
      </Form.Group> */}
    </form>
  );
}