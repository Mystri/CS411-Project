import React from "react";
import ReactDOM from 'react-dom';

import LoginForm from './LoginComponent/LoginForm.js'
import FilterableProductTable from './SearchBar.js'
import PopupLoginForm from "./LoginComponent/PopupLoginForm.js";

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
        if (this.state.page == 0) {
            return(
                <div>
                    <PopupLoginForm/>
                    <FilterableProductTable/>
                    <div>test</div>
                </div>
            )
        }
        return (<div></div>);

    }
}



ReactDOM.render(<Test />, document.getElementById("root"));
