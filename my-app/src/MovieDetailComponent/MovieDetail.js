import React from 'react';
import "./MovieDetail.css"
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // var/objs to use
            display: "",
            movie_id:"",
            cover:"",
            decription:"",
            language:"",
            people_id:[],
            production:"",
            release_year:"",
            runtime:"",
            title:"",
            type:""
        };
    }
    componentDidMount(e) {
        const request ={
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {'Content-type':'text/plain'},
            body:JSON.stringify({'movie_id':'tt10056564'})
        };
        fetch('http://localhost:8000/get_all_movies', request)
            .then(response => response.json())
            .then(response => {
                // this.setState({ movie_id: response.rec.movie_id })
                this.setState({ 
                movie_id: response.rec,
                cover:response.rec.cover,
                decription:response.rec.decription,
                language:response.rec.language,
                people_id:response.rec.people_id,
                production:response.rec.production,
                release_year:response.rec.release_year,
                runtime:response.rec.runtime,
                title:response.rec.title,
                type:response.rec.type         
                })
                console.log(response.rec + "info");
                console.log(this.state)
            })
    }
    // <img alt="Lee Jung-jae, Anupam Tripathi, Oh Yeong-su, Heo Sung-tae, Park Hae-soo, Jung Hoyeon, and Wi Ha-Joon in Ojing-eo geim (2021)" class="ipc-image" loading="lazy" src="https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_QL75_UX190_CR0,0,190,281_.jpg" srcset="https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_QL75_UX190_CR0,0,190,281_.jpg 190w, https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_QL75_UX285_CR0,0,285,422_.jpg 285w, https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_QL75_UX380_CR0,0,380,562_.jpg 380w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="190">
    // <img alt="Jeremy Renner and Hailee Steinfeld in Hawkeye (2021)" class="ipc-image" loading="lazy" src="https://m.media-amazon.com/images/M/MV5BNmQ1MGQ2NjItNzVmOC00MmIwLWJjZTUtNGFlMmNjYWE2NjNkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_QL75_UY281_CR18,0,190,281_.jpg" srcset="https://m.media-amazon.com/images/M/MV5BNmQ1MGQ2NjItNzVmOC00MmIwLWJjZTUtNGFlMmNjYWE2NjNkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_QL75_UY281_CR18,0,190,281_.jpg 190w, https://m.media-amazon.com/images/M/MV5BNmQ1MGQ2NjItNzVmOC00MmIwLWJjZTUtNGFlMmNjYWE2NjNkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_QL75_UY422_CR26,0,285,422_.jpg 285w, https://m.media-amazon.com/images/M/MV5BNmQ1MGQ2NjItNzVmOC00MmIwLWJjZTUtNGFlMmNjYWE2NjNkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_QL75_UY562_CR35,0,380,562_.jpg 380w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="190"></img>
    // // myclick(e) {
    //     alert('info ' + this.state.username+','+this.state.email+','+this.state.password);
    // }
    render() {
         
        return(
            <div>
                <div class='header'>
                <Link to = "">
                <div class='matrix'>
                    MATRIX
                </div>
                </Link>
                <input class='searchbox' type="text"/>
                </div>
                <img src="https://m.media-amazon.com/images/M/MV5BNmQ1MGQ2NjItNzVmOC00MmIwLWJjZTUtNGFlMmNjYWE2NjNkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_QL75_UY281_CR18,0,190,281_.jpg" alt="" height="400" width="275"/>
            </div>

        )
    }
}
// export default URegister;
export default withRouter(MovieDetail);