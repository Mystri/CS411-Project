import React from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { x } from "./LoginComponent/LoginForm.js";
const gender = x[2]
const username = x[4]
class Updateinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // var/objs to use
            new_username: x[4],
            new_password: x[3],
            new_birthday: moment(x[0]).format('YYYY-MM-DD'),
            // new_birthday: x[0],
            new_gender: x[2],
            status: 0,
            delete: 0
        };
        // this.handleEmailRegistration = this.handleEmailRegistration.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);
        
    }
    handleUsername(e) {
        // if(e.target.value.length > 0){
        //     this.setState({
        //         new_username: e.target.value

        //     })
        // }else{
        {
            this.setState({
                new_username: e.target.value

            });
        }
    }
    handlePassword(e) {
        // console.log(e.target.value.length)

        this.setState({
            new_password: e.target.value

        })


    }
    handleBirthday(e) {

        this.setState({
            new_birthday: e.target.value

        })
    }
    handleGender(e) {
        // console.log(e.target.value.length);

        this.setState({
            new_gender: e.target.value

        })

    }
    handleSubmit(e) {
        // alert(x[3])
        // alert('Username' + this.state.new_username + ',Birthday: ' + this.state.new_birthday + "; " + "Gender: " + this.state.new_gender + ',password:' + this.state.new_password + ' ,email:' + x[1]);
        e.preventDefault();
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({ 'username': this.state.new_username, 'password': this.state.new_password, 'gender': this.state.new_gender, 'birthday': this.state.new_birthday, 'email': x[1] })
        };
        fetch('http://localhost:8000/update_user', request)
            // if backend receive and response
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({ status: response.rec });
                console.log(request.body)
                if (this.state.status === 0) {
                    alert('Your personal information has been successfully updated.')

                } else {
                    alert('Username may already existed! Please use other usernames')
                }
                console.log('parsed json', response.rec);
            }, (e) => {
                this.setState({ requestError: true });
                console.log('parsing failed', e)
            })
        // try to clear the input box after inputs
            document.getElementById('update').reset();



    }

    DeleteUser(e) {
        e.preventDefault();
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({ 'email': x[1] })
        };
        fetch('http://localhost:8000/delete_user', request)
            .then(response => {
                return response.json();
            })
            .then(response => {
                // should be 1 if delete request received
                this.setState({ delete: response.rec });
                console.log('parsed json', response.rec);
                if (this.state.delete === 1) {
                    alert('Your account has been deleted.')
                    this.props.history.push("");
                } else {
                    alert('something is wrong')
                }

            })
    }


    // myclick(e) {
    //     alert('info ' + this.state.username+','+this.state.email+','+this.state.password);
    // }
    render() {

        return (
            <div>
               
                {/* <Link to=""><button>
                    Back to main page
                </button>
                </Link> */}

                <form id="update" onSubmit={this.handleSubmit}>
                    <div>
                        {/* <h1>Update personal information</h1> */}

                        <label htmlFor='username'> New Username: </label>
                        <input type="text" placeholder="New Username" value={this.state.new_username} onChange={this.handleUsername} name="username" id="username" /><br />
                        <label htmlFor='password'> New Password: </label>
                        <input type="text" placeholder="New Password" value={this.state.new_password} onChange={this.handlePassword} name="Password" id="Password" /><br />
                        <label htmlFor='gender'> Update your gender: </label>
                        <select id='gender' value={this.state.new_gender} onChange={this.handleGender}>
                            <option value=""disabled selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-Binary</option>
                        </select><br />

                        {/* <label htmlFor = 'email'>Email
                    </label> 
                    <input type="email" placeholder="Email" value={this.state.email} onChange = {this.handleEmailRegistration} name="Email" id="Email" required/><br/> */}
                        <label htmlFor="birthday"> Update your Birthday: </label>
                        <input type="date" value={this.state.new_birthday} onChange={this.handleBirthday} id="birthday" name="birthday" /><br />
                        {/* <h2>Succeed: {this.state.succeed}</h2> */}
                        <input type="submit" value="Save Changes"></input>
                        {/* <button>
                            Save Changes
                        </button> */}



                    </div>
                </form>
                <button onClick={this.DeleteUser}>Delete Account</button>
            </div>
        )
    }
}
export default withRouter(Updateinfo);