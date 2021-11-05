import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Updateinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // var/objs to use
            username: "",
            email: "",
            birthday: "",
            gender: '',
            succeed: 0
        };
        this.handleEmailRegistration = this.handleEmailRegistration.bind(this);
        this.handleUsernameRegistration = this.handleUsernameRegistration.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameRegistration(e) {
        this.setState({
            username: e.target.value
            
        });
    }
    handleEmailRegistration(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleBirthday(e){
        this.setState({
            birthday: e.target.value
        });
    }
    handleGender(e){
        this.setState({
            gender: e.target.value
        });
    }
    handleSubmit(e) {
        // alert('info ' + this.state.username+','+this.state.email+','+this.state.password+','+this.state.succeed);
        alert('Birthday: '+this.state.birthday+"; "+"Gender: "+this.state.gender);
        e.preventDefault();
        const request ={
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {'Content-type':'text/plain'},
            body:JSON.stringify({'username':this.state.username, 'email':this.state.email, 'password':this.state.password })
        };
        fetch('http://localhost:8000/update_user', request)
            // if backend receive and response
            .then(response => {
                return response.json();
            }) 
            .then(response => {
                this.setState({succeed: response.rec});
                // if (this.state.succeed) {
                //     this.props.history.push({
                //         pathname: '/lol'
                //     })
                console.log('parsed json', response.rec); 
                if(this.state.succeed === 1){
                    alert('Your account has been registered successfully!')
                    
                }else{
                    alert('Username or Email already existed! Please use another usernames or Email address')
                }  
            },(e)=>{
                this.setState({requestError: true});
                console.log('parsing failed', e)
            })
            
            // try to clear the input box after inputs
            this.setState({
                username: '',
                email: '',
                password: '',
                gender: '',
                birthday: document.getElementById("birthday").value = ""
                        })
        

    }
    
    
    // myclick(e) {
    //     alert('info ' + this.state.username+','+this.state.email+','+this.state.password);
    // }
    render() {
         
        return(
            <div>
            <Link to = ""><button>
                Back to main page
                </button>
                </Link>
                
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <h1>Update personal information</h1>
                
                    <label htmlFor = 'username'>New Username: 
                    </label> 
                    <input type="text"  placeholder="New Username" value={this.state.username} onChange = {this.handleUsernameRegistration} name="username" id="username" required/><br/>
                    <label htmlFor = 'gender'> Update your gender: </label>
                    <select id = 'gender' value={this.state.gender} onChange = {this.handleGender}>
                        <option value="" disabled selected>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-Binary</option>
                    </select><br/>
                    
                    <label htmlFor = 'email'>Email
                    </label> 
                    <input type="email" placeholder="Email" value={this.state.email} onChange = {this.handleEmailRegistration} name="Email" id="Email" required/><br/>
                    <label htmlFor="birthday">Birthday:</label>
                    <input type="date"  onChange = {this.handleBirthday} id="birthday" name="birthday"  /><br/>
                    {/* <h2>Succeed: {this.state.succeed}</h2> */}
           
                <button>
                Save Changes
                </button>
                <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } />


                </div>
            </form>
            </div>
        )
    }
}
export default Updateinfo;