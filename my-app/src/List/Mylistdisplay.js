import React from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { x } from "../LoginComponent/LoginForm_Bootstrap.js";
import { Card, Container, Stack, ListGroup } from 'react-bootstrap'
class Mydisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mylist: [],
            email: "demo@gmail.com"
        }
        this.getmylist = this.getmylist.bind(this);

    }
    getmylist(e) {
        
        e.preventDefault();
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({"user_id": this.state.email })
        };
        fetch('http://localhost:8000/get_owned_list', request)
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({ mylist: response.rec })
                console.log(response.rec + "info");
                console.log("abc")
                console.log(this.state.mylist)
            })

    }
    render() {
        console.log(this.state.mylist)
        const mylist1 = this.state.mylist;
        alert(mylist1)
        return (
            <div>
            <Card style={{ width: '50%' }}>
                <ListGroup variant="flush">
                    {mylist1.map(myl => (
                        <ListGroup.Item id={myl.listid}>{myl.list_name}</ListGroup.Item>
                    ))
                    }
                </ListGroup>
            </Card>
            </div>
        )
    }
}
export default Mydisplay;
