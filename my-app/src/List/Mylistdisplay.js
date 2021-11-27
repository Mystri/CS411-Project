import React from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { x } from "../LoginComponent/LoginForm.js";
import { Card, Container, Stack, ListGroup } from 'react-bootstrap'

class mydisplay extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            mylist: "",
            email: x[4] // example
        }
        this.getmylist = this.componentDidMount.bind(this);

    }
    getmylist(e) {
        e.preventDefault();
        const request ={
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {'Content-type':'text/plain'},
            body:JSON.stringify({'email':this.state.email})
        };
        fetch('http://localhost:8000/mylist', { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                this.setState({ mylist: response.rec })
                console.log(response.rec + "info");
                console.log(this.state.mylist)
            })

}
render() {
    return (
        <Card style={{ width: '75%' }}>
            <ListGroup variant="flush">
                <ListGroup.Item action onClick={alertClicked}>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}
}
export default mydisplay;
