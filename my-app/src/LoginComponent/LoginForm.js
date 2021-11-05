import React from "react";
import { withRouter } from 'react-router-dom'  
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // handle initialization activities
        this.state = {
            email : "",
            password : "",
            login_status : 0
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
        event.preventDefault();
    }
    
    handlePasswordChange(event){
        this.setState({
            password: event.target.password
        })
        event.preventDefault();
    }

    handleSubmit(event) {
        event.preventDefault();


        const login_request = {
            method : "POST",
            mode: "cors",
            credentials: "omit",
            headers: {'Content-type':'text/plain'},
            body: JSON.stringify({'username':this.state.username, 'email':this.state.email, 'password':this.state.password })
        }

        fetch('http://localhost:8000/login', login_request)
            .then(response => {
                return response.json()})
            .then(response => {
                this.setState({
                    login_status: response.rec
                });
                console.log('parsed json', response.rec);
                if (this.state.login_status) {
                    this.props.history.push({
                        pathname: '/lol'
                    })
                }     
            }, (ex) => {
                this.setState({
                    requestError : true
                });
                console.log('parsing failed', ex)
            })
        
        


    }
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>User Name</label>
                <input type="text" response-test="username" value={this.state.username} onChange={this.handleEmailChange} required/>
                <label>Password</label>
                <input type="text" response-test="password" value={this.state.password} onChange={this.handlePasswordChange } required/>
                <Link to="/personal"><input type="submit" value="Log In" response-test="submit" /></Link>
                Success: {this.state.login_status != 0}
            </form> 
        );
    }
}

export default withRouter(LoginForm); 