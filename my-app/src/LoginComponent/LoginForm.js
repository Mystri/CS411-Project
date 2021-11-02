import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        // handle initialization activities
        this.state = {
            email : "",
            password : "",
            login_status : "",

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
    handleSubmitevents(event) {

    alert('A name was submitted: ' + this.state.email);
    fetch('http://localhost:8000/login/', )
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
        alert('1')
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