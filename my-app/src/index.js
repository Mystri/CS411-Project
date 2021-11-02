import React from "react";
import ReactDOM from 'react-dom';
import FilterableProductTable from './SearchBar.js'
import PopupLoginForm from "./LoginComponent/PopupLoginForm.js";
import Userregister from "./RegisterComponent/Register.js";

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
                    <UserRegister/>
                    <PopupLoginForm/>
                    <FilterableProductTable/>
                </div>
            )
        }
        return (<div></div>);

    }
}



ReactDOM.render(<Test />, document.getElementById("root"));
