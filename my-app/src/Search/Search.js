import React, {useState, useEffect} from 'react'
import {Stack, Form, FormControl, Button, Container, Card, Dropdown, Collapse, Image, Row, Col, Ratio} from 'react-bootstrap'


import Header from "../Header/Header"

const ResultCardMovie = () => {
    return (
        <Container className="mb-2">
            <Card>
                <script src="holder.js"></script>
                <Card.Body>
                    <Row>
                        <Col xs='2'>
                                <Image src="holder.js/100px200" className='mx-auto'/>
                        </Col>
                        <Col>
                            <h2>
                                Title
                            </h2>
                            <div>
                                Actor:
                            </div>
                            <div>
                                Text
                            </div>
                        </Col>
                        <Col className='m-auto'>
                            <Button variant='outline-primary' className='m-auto ' style={{float: 'right'}}>+</Button>   
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Body>
                    lasdkfj
                </Card.Body>
            </Card>
        </Container>
    )
}

export default () => {

    const [method, setMethod] = useState("");
    const [keyword, setKeyword] = useState("");
    const [banners, setBanners] = useState([""]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        
        const link = window.location.href.split("#");
        if (link.length == 3) {
            console.log("length", link.length);
            setMethod(link[1]);
            setKeyword(link[2]);
        } 
        
        }, []);


    const [language, setLanguage] = useState(
        new Map([
            ['English', false],
            ['Spanish', false],
            ['French', false],
            ['Chinese', false],
            ['Japanese', false],
            ['Korean', false]
        ])
    );
    const [type, setType] = useState(
        new Map([
            ['Documentary', false],
            ['Comedy', false],
            ['Drama', false],
            ['Horror', false],
            ['Thriller', false],
            ['Action', false],
        ])
    );

    const mapToObj = m => {
        return Array.from(m).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };

    const handleChangeLanguage = (languageName) => {
        
        const updated = new Map(language);
        updated.set(languageName, !updated.get(languageName));
        setLanguage(updated);
    } 

    const handleChangeType = (typeName) => {
        
        const updated = new Map(type);
        updated.set(typeName, !updated.get(typeName));
        setType(updated);
    }

    const handleChangeKeyword = (event) => {
        setKeyword(event.target.value)
    }



    const handleSearch = (event) => {
        event.preventDefault();


        var bodyObject;
        if ( method === "Actor") {
            bodyObject = {
            "language": mapToObj(language),
            "type": mapToObj(type),
            "keyword": keyword,
            "isActor": true
            };
        } else {
            bodyObject = {
                "language": mapToObj(language),
                "type": mapToObj(type),
                "keyword": keyword,
                "isActor": false
                };
        }

        const request ={
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {'Content-type':'text/plain'},
            body: JSON.stringify(bodyObject)
        };

        console.log(request.body);


        fetch('http://localhost:8000/search_movie', request)
                    .then(data => {
                        console.log('parsed json', data);
                        return data.json()})
                    .then(data => {
                        console.log(data.rec);
                        if (!data.rec) {
                            console.log('no results');
                            setBanners(['No results!']);
                        } else {
                            setBanners(data.rec);
                        }
                        console.log('parsed json', data.rec);            
                    }, (ex) => {
                        console.log('parsing failed', ex)
                    })

    };



    
    

    return (
        <Stack gap={3}>
            <Header/>


            <Container>
                <Card className="mb-2">
                    <Card.Body>


                        <Form className="d-flex mb-2" >
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="me-2">
                                {method}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item  onClick={ () => setMethod("Movie") }>Movie</Dropdown.Item>
                                <Dropdown.Item  onClick={ () => setMethod("Actor") }>Actor</Dropdown.Item>
                                <Dropdown.Item  onClick={ () => setMethod("List") }>List</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            onChange={ (e) => setKeyword(e.target.value) }
                            value={keyword}
                            />
                            <Button variant="outline-success" onClick={handleSearch}> Search </Button>
                        </Form>

                        <Collapse in={method=="Movie" || method == "Actor"}>

                            <div>

                                <Form.Check
                                    label="Japanese"
                                    type="checkbox"
                                    value={language["Japanese"]}
                                    onChange={() => handleChangeLanguage("Japanese")}
                                    />

                                <Form.Check
                                    inline
                                    label="Documentary"
                                    type="checkbox"
                                    value={language["Documentary"]}
                                    onChange={() => handleChangeType("Documentary")}
                                    />

                            </div>

                        </Collapse>

                        

                        


                        </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <ResultCardMovie/>
                        <ResultCardMovie/>
                        <ResultCardMovie/>
                        <ResultCardMovie/>
                    </Card.Body>
                </Card>
            </Container>




        </Stack>
    )
}

