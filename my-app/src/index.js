import React from "react";
import ReactDOM from 'react-dom';
import LoginForm from "./LoginComponent/LoginForm.js";
import URegister from "./RegisterComponent/Register.js";
import LLL from "./test_page/test.js";
import Updateinfo from "./Updateinfo.js"
import TaggedSearchBar from "./SearchBar/TaggedSearchBar.js";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount(e) {
        fetch('http://localhost:8000/top_5_actor', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ display: response.rec })
                console.log(response.rec + "info");
                console.log(this.state.display)
            })


    }
    render() {
        return (
            <div>
                {/* <Link to="/newuser"><button>New User</button></Link> */}
                <LoginForm />

                <Link to="/newuser"><button>New User</button></Link>
                <h2>Top Five Actors</h2>
                <ul>
                    <li>{this.state.display[0]}</li>
                    <li>{this.state.display[1]}</li>
                    <li>{this.state.display[2]}</li>
                    <li>{this.state.display[3]}</li>
                    <li>{this.state.display[4]}</li>
                </ul>
                <TaggedSearchBar />



            </div>
        )

    }
}


ReactDOM.render(

    <Router>

        <Switch>

            <Route path="/lol"><LLL /></Route>
            <Route path="/newuser" ><URegister /></Route>
            <Route path="/personal"><Updateinfo /></Route>
            <Route path="/home"><Home /></Route>
            <Route path="/advanced_search"><Search /></Route>
            <Route path=""><Main /></Route>


        </Switch>
    </Router>

    , document.getElementById("root"));
