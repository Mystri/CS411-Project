import React from "react";
import ReactDOM from 'react-dom';
import FilterableProductTable from './SearchBar.js'
// import PopupLoginForm from "./LoginComponent/PopupLoginForm.js";
import LoginForm from "./LoginComponent/LoginForm.js";
import URegister from "./RegisterComponent/Register.js";
import LLL from "./test_page/test.js";
import Updateinfo from "./Updateinfo.js";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Test extends React.Component {
   
    constructor(props) {
        super(props);
        /**
         * 0 : Main page.
         * ...
         */

        this.state = {
            page: 0
        }
    }

    render() {
        if (this.state.page === 0) {
            return(
                <div>
                    <Link to="/newuser"><button>New User</button></Link>
                    <LoginForm/>
                    <FilterableProductTable/>
                    
                </div>
            )
        }
        return (<div></div>);

    }
}

ReactDOM.render(
    
    <Router>
        
        <Switch>

            <Route path="/lol">
                <LLL />
            </Route>
            <Route path = "/newuser" ><URegister/></Route>
            <Route path ="/personal"><Updateinfo/></Route>
            <Route path = "">
            
                <Test />
            </Route>

        </Switch>
    </Router>

    , document.getElementById("root"));
