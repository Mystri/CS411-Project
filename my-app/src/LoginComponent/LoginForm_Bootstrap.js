import { Form, Row, Col, Button,Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import RegisterForm from "./RegisterForm.js"
var x = 0;
export default ({ setSuccessLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);

    const onClick = () => {
        const login_request = {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({ 'email': email, 'password': password })
        }
        
        fetch('http://localhost:8000/login', login_request)
            .then(response => {
                return response.json()
            })
            .then(response => {
                setLoginStatus(response.rec);
                console.log(loginStatus);
                if (loginStatus === 0 || loginStatus === false) {
                    alert('No corresponding Email and Password found. Please enter again or create new user.')
                    
                }else{
                    x = Object.values(loginStatus);
                    alert('Welcome! Log in successfully!')
                }
            })

            
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <form onSubmit={onClick}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Password
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>

                    <Button type="submit" onSubmit={onClick}>Sign in</Button>{' '}
                    <>
                    <Button type="submit" onClick={handleShow}>Create account</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Your Account</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <RegisterForm/>
                        </Modal.Body>


                    </Modal>
                </>
            </Col>
        </Form.Group>
        </form >
    )
}
export {x};