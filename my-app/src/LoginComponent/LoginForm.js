import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // handle initialization activities
        this.state = {
            email : "",
            password : "",
            login_status : 0
        }
        this.handlePasswordChange = this.handleEmailChange.bind(this);
        this.handleSubmitevents = this.handleSubmitevents.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
        event.preventDefault();
    }

    handleSubmit(event) {

    alert('A name was submitted: ' + this.state.email);

    const login_request = {
        method : "POST",
        headers: {'Content-type':'application/json'},
        body: {'username':this.state.username, 'email':this.state.email, 'password':this.state.password }
    }

    fetch('http://localhost:8000/login', login_request)
        .then(data => {
            console.log('parsed json', data);
            return data.json()})
        .then(data => {
            this.setState({
                banners: data.rec
            });
            console.log('parsed json', data.rec);            
        }, (ex) => {
            this.setState({
                requestError : true
            });
            console.log('parsing failed', ex)
        })

    }

    

    handlePasswordChange(event){
        this.setState({
            password: event.target.password
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmitevents}>
                <label>User Name</label>
                <input type="text" data-test="username" value={this.state.username} onChange={this.handleEmailChange} />
                <label>Password</label>
                <input type="password" data-test="password" value={this.state.password} onChange={this.handlePasswordChange } />
                <input type="submit" value="Log In" data-test="submit" />
            </form> 
        );
    }
}

export default LoginForm 