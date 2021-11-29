import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Card, Container, Stack, ListGroup, Modal, Button } from 'react-bootstrap'
import { x } from "../LoginComponent/LoginForm_Bootstrap.js";

export default () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         favlist: [],
    //         email: JSON.parse(window.localStorage.getItem('login')).email,
    //         showModal: false
    //     }
    //     this.componentDidMount = this.componentDidMount.bind(this);


    // }
    // openModal = () => this.setState({ showModal: true });
    // closeModal = () => this.setState({ showModal: false });
    
    const [favlist,setList] = useState([])
    const email = JSON.parse(window.localStorage.getItem('login')).email;
   
    
    // render() {
        // console.log(this.state.favlist);
        // this.getfavlist();
        // const favlist1 = this.state.favlist;
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        // console.log(email)
        useEffect(() => {
            // Update the document title using the browser API
            const request = {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                headers: { 'Content-type': 'text/plain' },
                body: JSON.stringify({ "user_id": email})
            };
            fetch('http://localhost:8000/get_fav_list', request)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    // this.setState({ favlist: response.rec })
                    setList(response.rec)
                    console.log(response.rec + "info");
                    console.log(favlist)
                })
          },[]);
        
        
        // .catch((error) => {
        //     console.log(error)
        //   });
        return (
            <div>

                <Card style={{ width: '75%' }}>
                    <ListGroup>
                        {favlist.map(fav => (
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
                                <ListGroup.Item id={fav.listid} style={{ height: '4em' }} action >{fav.list_name}</ListGroup.Item>
                                {/* onClick={() => { this.openModal() }} */}
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
    // export function Getfavlist (){
        


    // }

// }
// export default Favdisplay;