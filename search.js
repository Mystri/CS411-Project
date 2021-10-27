import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

// class searchbar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e){
//         e.preventDefault();
//         let inputText = this.refs.inputText.value;
//         this.props.onSearch(inputText);
//     }

//     render(){
//         return (
//             <div>
//                 <input type="text" ref="inputText" onChange={this.handleChange} value={this.props.filterText}/>
//             </div>
//         )
//     }
// }

// class searchresult extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             banners: ['']
//         }
//     }

//     componentDidMount () {
//         fetch('http://localhost:8000/search_movie/' + this.props.input)
//             .then(data => {
//                 console.log('parsed json', data);
//                 return data.json()})
//             .then(data => {
//                 this.setState({
//                     banners: data.rec
//                 });
//                 console.log('parsed json', data.rec);            
//             }, (ex) => {
//                 this.setState({
//                     requestError : true
//                 });
//                 console.log('parsing failed', ex)
//             })
//     } 
    

//     render() {
//         return (
//             <div>
//             <h1>Get </h1>
//             {
//                 this.state.banners.map((photo,index) =>{
//                     return(
//                         <ul key = {index}>
//                             <h3>{index}:{photo}</h3>
//                         </ul>
//                     )
//                 })
//             }
//             </div>
            
//         )
//     }
// }

// class Game extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             filterText: ''
//         }
//         this.handleSearch = this.handleSearch.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleSearch(event) {
//         this.setState({value: event});
//     }
    
//     handleSubmit(event) {
//         console.log("aa");
//         this.setState({displayform: event});
//     }

//     render(){
//         const filterText = this.state.filterText;
//         return(
// <div>
//         <searchbar filterText = {filterText}/>
//         <searchresult filterText = {filterText}/>
//         </div>
//         )

//     }
    
//   }
  
//   // ========================================
  
//   ReactDOM.render(<Game />, document.getElementById("root"));
// //   ReactDOM.render(<Board />, document.getElementById("root"));
  
 

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            banners:[]
        };
        this.handleSearch=this.handleSearch.bind(this);
    }
    handleSearch(keywords){
        this.setState({
            filterText:keywords
        });
        fetch('http://localhost:8000/search_movie/' + keywords)
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
        const filterText=this.state.filterText;
        const banners=this.state.banners;
        // const inStockOnly=this.state.inStockOnly;
        // const list=this.state.list;
        return(
            <div>
                <SearchBar
                    filterText={filterText}
                    // inStockOnly={inStockOnly}
                    onSearch={this.handleSearch}
                    // list={list}
                    onCheckBox={this.handleCheckBox}/>
                <ProductTable
                    banners={banners}
                    // inStockOnly={inStockOnly}
                    // list={list}
                    />
            </div>
        )
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keywords:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        let inputText=this.refs.inputText.value;
        this.setState({keywords:inputText});
    }
    handleSubmit(e){
        e.preventDefault();
        let inputText = this.state.keywords;
        this.props.onSearch(inputText)
    }
    render(){
        return(
            <div>
                <input type="text" ref='inputText' value={this.state.keywords} onChange={this.handleChange} placeholder="Search Movie"/>
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
            
            </div>
        )
    }
}

class ProductTable extends React.Component{
    constructor() {
                super();
                this.state = {
                    banners: ['']
                }
            }
            
            
        
            render() {
                
                return (
                    <div>
                    <h1>Get </h1>
                    {
                        this.props.banners.map((photo,index) =>{
                            return(
                                <ul key = {index}>
                                    <h3>{index}:{photo}</h3>
                                </ul>
                            )
                        })
                    }
                    </div>
                    
                )}
    /* constructor(props){
         super(props);
     }*/
    //  render(){
    //     //  let filterText=this.props.filterText;
    //     //  let inStockOnly=this.props.inStockOnly;
    //     //  let curCategory="";
    //      return(
    //          <table>
    //              {/* <thead>
    //                  <tr style={{fontWeight:'bold'}}>
    //                      <td>Name</td>
    //                      <td>Price</td>
    //                  </tr>
    //              </thead>
    //                  {this.props.list.map((value,index) => {
    //                          let listItemShow;
    //                          if(value.name.toLowerCase().indexOf(filterText.toLowerCase())!==-1||filterText===''){
    //                              listItemShow=true;
    //                              if(inStockOnly===true&&value.stocked===true){
    //                                  listItemShow=true;
    //                              }else if(inStockOnly===true&&value.stocked===false){
    //                                  listItemShow=false;
    //                              }
    //                          }else{
    //                              listItemShow=false;
    //                          }
    //                          let categoryStatus=false;
    //                          if(value.category===curCategory){
    //                              categoryStatus=false;
    //                          }else{
    //                              categoryStatus=true;
    //                          }
    //                          curCategory=value.category;
    //                          return (
    //                              <tbody key={index}>
    //                                  <ProductCategoryRow category={value.category} categoryStatus={categoryStatus}/>
    //                                  <ProductRow
    //                                      stocked={value.stocked}
    //                                      name={value.name}
    //                                      price={value.price}
    //                                      show={listItemShow}/>
    //                              </tbody>
    //                          )
    //                      })
    //                  } */}
    //          </table>
    //      )
    //  }
 }

//  class ProductCategoryRow extends React.Component{
//     /*constructor(props){
//         super(props);
//     }*/
//     render(){
//         let styleObj = {
//             display : this.props.categoryStatus ? 'block':'none',
//             fontWeight:"bold"
//         };
//         return(
//             <tr style={styleObj}>
//                 <td>
//                     {this.props.category}
//                 </td>
//             </tr>
//         )
//     }
// }

// class ProductRow extends React.Component{
//     /*constructor(props){
//         super(props);
//     }*/
//     render(){
//         let styleObj = {
//             display : this.props.show ? 'block':'none',
//         };
//         return (
//             <tr style={styleObj}>
//                 <td>
//                     {this.props.name}
//                 </td>
//                 <td>
//                     {this.props.price}
//                 </td>
//             </tr>
//         )
//     }
// }
ReactDOM.render(
    <FilterableProductTable/>,
    document.getElementById('root')
);
