import React, { useState } from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { x } from "../LoginComponent/LoginForm_Bootstrap.js";
import { Card, Container, Stack, ListGroup, Modal } from 'react-bootstrap'
import Getcontent from "./Getcontent.js";
class Mydisplay extends React.Component {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const[mylist,setList] = useState([]);
    // const email = x[0];
    constructor(props) {
        super(props);
        this.state = {
            mylist: [],
            email: JSON.parse(window.localStorage.getItem('login')).email,
            showModal: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    openModal = (id) => this.setState({ showModal: true });
    closeModal = () => this.setState({ showModal: false });
    componentDidMount(e) {
        console.log(JSON.parse(window.localStorage.getItem('login')).email)
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({ "user_id": this.state.email })
        };
        fetch('http://localhost:8000/get_owned_list', request)
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({ mylist: response.rec })
                // setList(response.rec)
                console.log(response.rec + "info");
                console.log(this.state.mylist)
            })
    }

    render() {
        const mylist1 = this.state.mylist;
        return (
            <div>
                <Card style={{ width: '75%' }}>
                    <ListGroup>
                        {mylist1.map(myl => (
                            <>
                            {/* <Modal show={this.state.showModal} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{myl.list_name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Getcontent/>
                            </Modal.Body>
                            <Modal.Footer></Modal.Footer>
                        </Modal>  */}
                        <ListGroup.Item id={myl.listid} style={{ height: '4em' }} action onClick={() => {this.openModal(myl.listid)}}>{myl.list_name}</ListGroup.Item>
                        
                        </>
                        )
                        )
                        }

                        {/* <ListGroup.Item style={{ height: '4em' }} action onClick={this.openModal}>Cras justo odio</ListGroup.Item> */}

                        {/* <ListGroup.Item style={{ height: '4em' }} action >Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item style={{ height: '4em' }} action>Vestibulum at eros</ListGroup.Item> */}
                    </ListGroup>

                </Card>
            </div>
        )
    }
}
export default Mydisplay;
