import React, { useState } from 'react';

import { Form, Row, Col, Button,Modal } from 'react-bootstrap'
import { x } from "../LoginComponent/LoginForm_Bootstrap.js";
function Createlist() {
  // const [lid] = useState(x);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listname, setName] = useState("");
  const [description, setDesc] = useState("");
  const creator = x[0];
  const createlist = () => {
    const request = {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { 'Content-type': 'text/plain' },
      body: JSON.stringify({ 'user': creator, 'list_name':listname, 'description':description})
    }
    fetch('http://localhost:8000/create_list', request)
  }
  return (
    <form onSubmit={createlist}>
      <Form.Group as={Row} className="mb-3" controlId="listname">
        <Form.Label column sm={3}>
          ListName
        </Form.Label>
        <Col sm={9}>
          <Form.Control required type="text" placeholder="Listname" value={listname} onChange={e=>setName(e.target.value)} required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="desc">
        <Form.Label column sm={3}>
          Description
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="Description" value={description} onChange={e=>setDesc(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="createbutton">
        <Col sm={9}>
          <Button type="submit">Create</Button>
        </Col>
      </Form.Group>
      </form>
      );
}
export default Createlist;