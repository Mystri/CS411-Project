import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState } from 'react'

export default ({setSuccessLogin}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);

    const onClick = () => {
        const login_request = {
            method : "POST",
            mode: "cors",
            credentials: "omit",
            headers: {'Content-type':'text/plain'},
            body: JSON.stringify({'email' : email,'password' : password})
        }
        fetch('http://localhost:8000/login', login_request)
            .then(response => {
                return response.json()})
            .then(response => {
                setLoginStatus(response.rec);
                console.log(loginStatus);
                if (loginStatus === 0 || loginStatus === false) {
                    alert('No corresponding Email and Password found. Please enter again or create new user.')
                } else {
                    setSuccessLogin();
                }
            })
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" placeholder="Email" value={email} onChange = { e => setEmail(e.target.value)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" placeholder="Password" value={password} onChange = { e => setPassword(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={onClick}>Sign in</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}