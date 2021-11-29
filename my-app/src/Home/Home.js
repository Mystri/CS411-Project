import React, {useEffect, useState} from 'react';
import { Card, Container , Stack, ListGroup} from 'react-bootstrap'

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

const ListCard = ({title}) => (
    <Card style={{ width: '15rem' }}>
    <Card.Body>
        <script src="holder.js"></script>
        <Card.Title>title</Card.Title>
        <Card.Img variant="top" src="holder.js/100px180" />
        <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>

    </Card.Body>
    </Card>
)

const ListCardGroup = ({lists}) => (
    lists.map((l) => (
        <MovieCard title={l.title}/>
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

        fetch('http://localhost:8000/randomly_generate_list', { method: 'POST' })
        .then(response => response.json())
        .then(response => {
            setLists(response.rec);
        })

    }, []);

    useEffect(() => {
        lists.map(l => {
            console.log(l);
        })
    }, []);


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


