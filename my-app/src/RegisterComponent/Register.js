import React from 'react';
class URegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // var/objs to use
            username: "",
            email: "",
            password: "",
            succeed: 0

        };
        this.handleEmailRegistration = this.handleEmailRegistration.bind(this);
        this.handleUsernameRegistration = this.handleUsernameRegistration.bind(this);
        this.handlePasswordRegistration = this.handlePasswordRegistration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    let 
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
    handlePasswordRegistration(e){
        this.setState({
            password: e.target.value
        });
    }
    handlBirthdayRegistration(e) {
        this.setState({
            username: e.target.value
            
        });
    }
    handleSubmit(e) {
        alert('info ' + this.state.username+','+this.state.email+','+this.state.password+','+this.state.succeed);
        e.preventDefault();
        const request ={
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {'Content-type':'text/plain'},
            body:JSON.stringify({'username':this.state.username, 'email':this.state.email, 'password':this.state.password })
        };
        fetch('http://localhost:8000/register', request)
            // if backend receive and response
            .then(response => {
                return response.json();
            }) 
            .then(response => {
                this.setState({succeed: response.rec});
                if (this.state.succeed) {
                    this.props.history.push({
                        pathname: '/lol'
                    })
                }
            },(e)=>{
                this.setState({requestError: true});
                console.log('parsing failed', e)
            })

    }
    
    // myclick(e) {
    //     alert('info ' + this.state.username+','+this.state.email+','+this.state.password);
    // }
    render() {
         
        return(
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <h1>Create Your Account</h1>
                
                    <label htmlFor = 'username'>Username
                    </label> 
                    <input type="text"  placeholder="New Username" value={this.state.username} onChange = {this.handleUsernameRegistration} name="username" id="username" required/><br/>

                    <label htmlFor = 'email'>Email
                    </label> 
                    <input type="email" placeholder="Email" value={this.state.email} onChange = {this.handleEmailRegistration} name="Email" id="Email" required/><br/>
                    <label htmlFor = 'password'>Password
                    </label> 
                    <input type="text" placeholder="Password" value={this.state.password} onChange = {this.handlePasswordRegistration} name="Password" id="Password" required/>
                    <h2>Succeed: {this.state.succeed}</h2>
           
                <button>
                Create Account
                </button>

                </div>
            </form>
        )
    }
}
export default URegister;
