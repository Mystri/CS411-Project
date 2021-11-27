// this file will contains the personal info of user, including user's own list, user's fav list
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React from "react";
import Updateinfo from "../Updateinfo.js"
import mydisplay from "../List/Mylistdisplay.js"
import Favdisplay from "../List/Favlistdisplay.js"

// export default function UserInfo(){
//     return (
//         <Nav variant="pills" defaultActiveKey="/home">
//             <Nav.Item>
//                 <Nav.Link href="/home">Active</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-1">Option 2</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//                 <Nav.Link eventKey="disabled" disabled>
//                     Disabled
//                 </Nav.Link>
//             </Nav.Item>
//         </Nav>
//     )
// };

class UserInfo extends React.Component {
    render() {
        return (
            <Tab.Container id="left-tabs" defaultActiveKey="info">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="info">Update Your Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="mylist">My Own Lists</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="favlist">My Favorite Lists</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="info">
                                <div>
                                <br/>
                                <h2>
                                 Update Your Information   
                                </h2><br/>
                                <Updateinfo />
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="mylist">
                            <br/>
                            <h2>
                                 My Own Lists  
                            </h2><br/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="favlist">
                            <br/>  
                            <h2>
                                 My Favorite Lists  
                            </h2>
                            <br/>
                                <Favdisplay />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}
export default UserInfo