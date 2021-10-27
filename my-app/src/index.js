import React from "react";
import ReactDOM from 'react-dom';

import LoginForm from './LoginForm.js'
import FilterableProductTable from './SearchBar.js'

class Test extends React.Component{
    render(){
        return(
            <div>
                <LoginForm/>
                <FilterableProductTable/>
                <div>test</div>
            </div>
        )
    }
}



ReactDOM.render(<Test />, document.getElementById("root"));
