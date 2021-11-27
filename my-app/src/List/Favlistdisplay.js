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
import { x } from "../LoginComponent/LoginForm_Bootstrap.js";

class Favdisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favlist: [],
            email: x[0] // example
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
        fetch('http://localhost:8000/get_fav_list', request)
            .then(response => response.json())
            .then(response => {
                this.setState({ favlist: response.rec })
                console.log(response.rec + "info");
                console.log(this.state.favlist)
            })


    }

    render() {
        const favlist = this.state.favlist;
        return (
            <Card style={{ width: '50%' }}>
                <ListGroup variant="flush">

                    {favlist.map(favl=>(
                            <ListGroup.Item id={favlist.listid} onClick>{favl.list_name}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Card>
        )
    }
}
export default Favdisplay;