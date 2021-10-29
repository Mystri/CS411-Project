import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            banners: ['']
        }
    }

    componentDidMount () {
        fetch('http://localhost:8000/search_movie/world')
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


    render(){
        return(
            <div>
                <hr/>
                <h1>Get </h1>
                
               {
                   this.state.banners.map((photo,index) =>{
                       return(
                           <ul key = {index}>
                               <h3>{index}:{photo}</h3>
                           </ul>
                       )
                   })
               }
            </div>
        )
    }
    
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
//   ReactDOM.render(<Board />, document.getElementById("root"));
  
  