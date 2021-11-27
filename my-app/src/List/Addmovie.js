import React from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Card, Container, Stack, ListGroup } from 'react-bootstrap'

import { x } from "../LoginComponent/LoginForm.js";
class Addmovie extends React.PureComponent {
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
            <Card style={{ width: '75%',height: '10rem'}}>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}
export default Favdisplay;