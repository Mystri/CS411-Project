import React, {useEffect, useState} from 'react';
import { Card, Container , Stack, ListGroup, Image } from 'react-bootstrap'

import Header from '../Header/Header';
import 'holderjs';
import 'bootstrap/dist/css/bootstrap.min.css';


const MovieCard = ({title}) => (
    <Card style={{ width: '15rem', minHeight: '18rem' }}>
    <Card.Body>
        <script src="holder.js"></script>
        <Card.Img src="holder.js/100x180" />
        <Card.Title>{title}</Card.Title>

    </Card.Body>
    </Card>
)

const MovieCardGroup = ({movies}) => (
    movies.map((m) => (
        <MovieCard title={m.title}/>
    ))
)

const ListCard = ({title, movies}) => (
    <Card style={{ width: '15rem', minHeight: '18rem'}}>
    <Card.Body>
        <script src="holder.js"></script>
        <Card.Title>{title}</Card.Title>
        <Image src="holder.js/100px180" />
        <ListGroup variant="flush">
            {movies.map((m) => <ListGroup.Item>{m}</ListGroup.Item>)}
        </ListGroup>

    </Card.Body>
    </Card>
)

const ListCardGroup = ({lists}) => (
    lists.map((l) => (
        <ListCard title={l.list_name} movies={l.movie}/>
    ))
)

export default () => {
    
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:8000/randomly_generate_movie', { method: 'GET' })
        .then(response => response.json())
        .then(response => {
            setMovies(response.rec);
        })

        fetch('http://localhost:8000/randomly_generate_list', { method: 'POST', body: JSON.stringify({"user_id": ''})})
        .then(response => response.json())
        .then(response => {
            setLists(response.rec);
        })

    }, []);

    useEffect(() => {
        lists.map(l => {
            console.log(JSON.stringify(l));
        })
    }, [lists]);


    return (
        <Stack gap={3}>
            <Header/>
            
            <Container>
                <Stack gap={3}>
                    <h2>
                    Featured Movies
                    </h2>
                    <Stack direction="horizontal" gap={3}>

                    <MovieCardGroup movies={movies}/>

                    </Stack>
                    <h2>
                    Featured Lists
                    </h2>
                    <Stack direction="horizontal" gap={3}>

                    <ListCardGroup lists={lists}/>

                    

                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}


