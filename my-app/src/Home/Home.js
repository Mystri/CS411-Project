import React from 'react';
import { Card, Container , Stack, ListGroup} from 'react-bootstrap'

import Header from '../Header/Header';
import 'holderjs';
import 'bootstrap/dist/css/bootstrap.min.css';


const MovieCard = () => (
    <Card style={{ width: '15rem' }}>
    <Card.Body>
        <script src="holder.js"></script>
        <Card.Title>Movie Title</Card.Title>
        <Card.Img variant="top" src="holder.js/100px180" />

    </Card.Body>
    </Card>
)

const ListCard = () => (
    <Card style={{ width: '15rem' }}>
    <Card.Body>
        <script src="holder.js"></script>
        <Card.Title>List Title</Card.Title>
        <Card.Img variant="top" src="holder.js/100px180" />
        <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>

    </Card.Body>
    </Card>
)

export default () => {
    return (
        <Stack gap={3}>
            <Header/>
            
            <Container>
                <Stack gap={3}>
                    <h2>
                    Featured Movies
                    </h2>
                    <Stack direction="horizontal" gap={3}>

                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>
                    <MovieCard/>

                    

                    </Stack>
                    <h2>
                    Featured Lists
                    </h2>
                    <Stack direction="horizontal" gap={3}>

                    <ListCard/>
                    <ListCard/>
                    <ListCard/>
                    <ListCard/>
                    <ListCard/>

                    

                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}


