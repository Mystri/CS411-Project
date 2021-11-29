import React, { useState, useEffect } from 'react'
import { Stack, Form, FormControl, Button, Container, Card, Dropdown, Collapse, Image, Row, Col, Ratio, Modal, ModalTitle, InputGroup, Alert} from 'react-bootstrap'


import Header from "../Header/Header"
import Mydisplay from "../List/Mylistdisplay.js"
import Createlist from "../List/Createlist.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    hashHistory,
    Link
} from "react-router-dom";
function ResultCardMovie(item) {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [userlist, setUserList] = useState([]);
    const [disableList, setDisableList] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => {
        
        setShow(true);
        setShow1(false);
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({"user_id":item.user_id})
        };
        fetch('http://localhost:8000/get_owned_list', request)
            .then(data => {
                console.log('parsed json', data);
                return data.json()
            })
            .then(data => {
                console.log(data.rec);
                if (!data.rec) {
                    console.log('no results');
                    setUserList(['No results!']);
                } else {
                    for (let i=0;i<data.rec.length;i++){
                        disableList.push(false)
                    }
                    setUserList(data.rec);
                }
                console.log('banner', userlist);
            }, (ex) => {
                console.log('parsing failed', ex)
            })
    
    };
    const handleList = (listid,index)=>{
        let newarr = [...disableList];
        newarr[index] = true;
        setDisableList(newarr);
        console.log(disableList)
        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify({"movie_id":item.valueProps.movie_id, "list_id":listid})
        };
        console.log("hhhhhhhh",request);
        fetch('http://localhost:8000/add_movie_to_list', request)
            .then(data => {
                console.log('parsed json', data);
                return data.json()
            })
            .then(data => {
                console.log(data.rec);
            }, (ex) => {
                console.log('parsing failed', ex)
            })
    };
    const handleCreate = () => {
        if (name){
            const request = {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                headers: { 'Content-type': 'text/plain' },
                body: JSON.stringify({"user":item.user_id, "list_name":name, "description":desc})
            };
            fetch('http://localhost:8000/create_list', request)
                .then(data => {
                    console.log('parsed json', data);
                    return data.json()
                })
                .then(data => {
                    console.log('parsed json', data.rec);
                    if (data.rec){
                        handleShow();
                    }else{
                        return(alert('You have already have this list!'))
                    }
                }, (ex) => {
                    console.log('parsing failed', ex)
                });
            setName("")
            setDesc("");
        }else{
            return(alert('The list should have name!'));
    }};
    const handleClose1 = () => {setShow1(false);}
    const handleShow1 = () => {setShow1(true);setShow(false);}
    console.log("hhhhh",item)
    return (
        
        <Container className="mb-2">
            <Card>
                <script src="holder.js"></script>
                <Card.Body>
                    <Row>
                        <Col xs='2'>
                        <Link style={{ textDecoration:'none'}} to={'/movie/'+item.valueProps.movie_id}>
                            <Image src="https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_QL75_UX190_CR0,0,190,281_.jpg" height='150' width='100' className='mx-auto' />
                        </Link>
                        </Col>
                        <Col xs='9'>
                            <Link style={{ textDecoration:'none'}} to={'/movie/'+item.valueProps.movie_id}>
                            <h3>
                                {item.valueProps.title}
                            </h3>
                            </Link>
                            <div>
                                Runtime: {item.valueProps.runtime} min
                            </div>
                            <div>
                                Type: {item.valueProps.type}
                            </div>
                        </Col>
                        <Col className='m-auto'>
                        <Button variant='outline-primary' style={{ float: 'right' }} onClick={handleShow}>
                                +
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Your List</Modal.Title>
                                </Modal.Header>
                                {userlist.map((item,index)=>{
                                    return(
                                
                                <Modal.Body>{item.list_name}
                                {console.log(disableList[index])}
                                <Button variant='primary' style={{ float: 'right' }} disabled={disableList[index]} onClick={()=>handleList(item.listid, index)}>
                                    +
                                </Button>
                                </Modal.Body>
                                )})}
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleShow1}>
                                    Create New List
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                <Modal.Title>Create New List</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon3">
                                name
                                </InputGroup.Text>
                                <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={(e) => setName(e.target.value)}
                                                            value={name}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon3">
                                desc
                                </InputGroup.Text>
                                <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={(e) => setDesc(e.target.value)}
                                                            value={desc}/>
                            </InputGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose1}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={()=>{handleCreate()}}>
                                    Create
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default () => {

    const [method, setMethod] = useState("");
    const [keyword, setKeyword] = useState("");
    const [banners, setBanners] = useState([]);
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
        if (method === "Actor") {
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

        const request = {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-type': 'text/plain' },
            body: JSON.stringify(bodyObject)
        };

        console.log(request.body);


        fetch('http://localhost:8000/search_movie', request)
            .then(data => {
                console.log('parsed json', data);
                console.log('parsed json', keyword);
                return data.json()
            })
            .then(data => {
                console.log(data.rec);
                if (!data.rec) {
                    console.log('no results');
                    setBanners(['No results!']);
                } else {
                    setBanners(data.rec);
                }
                console.log('banner', banners);
            }, (ex) => {
                console.log('parsing failed', ex)
            })

    };






    return (
        <Stack gap={3}>
            <Header />


            <Container>
                <Card className="mb-2">
                    <Card.Body>


                        <Form className="d-flex mb-2" >
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="me-2">
                                    {method}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setMethod("Movie")}>Movie</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setMethod("Actor")}>Actor</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setMethod("List")}>List</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                onChange={(e) => setKeyword(e.target.value)}
                                value={keyword}
                            />
                            <Button variant="outline-success" onClick={handleSearch}> Search </Button>
                        </Form>

                        <Collapse in={method == "Movie" || method == "Actor"}>

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
                        {banners.map((item,index)=>{
                            return(<ResultCardMovie valueProps = {item} user_id ={"demo@gmail.com"} />)
                        })}
                    </Card.Body>
                </Card>
            </Container>




        </Stack>
    )
}

