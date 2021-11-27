import React, { useState } from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Card, Container, Stack, ListGroup, Modal, Button } from 'react-bootstrap'

import { x } from "../LoginComponent/LoginForm.js";
const Listdetail = () => {
            const [show, setShow] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            return (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Login
                    </Button>
    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log In</Modal.Title>
                        </Modal.Header>
    
                        {/* <Modal.Body>
                            <LoginForm_Bootstrap setSuccessLogin={onLogin} />
                        </Modal.Body> */}
                    </Modal>
                </>
            )
        }

class Favdisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            favlist: "",
            email: x[4] // example
        }
        this.getmyfav = this.getmyfav.bind(this);

    }
    getmyfav(e) {
        e.preventDefault();
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({ 'email': this.state.email })
        };
        fetch('http://localhost:8000/favlist', { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                this.setState({ favlist: response.rec })
                console.log(response.rec + "info");
                console.log(this.state.favlist)
            })


    }

    render() {
        
        return (
            <Card style={{ width: '50%' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item action onClick={Listdetail}>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}
export default Favdisplay;