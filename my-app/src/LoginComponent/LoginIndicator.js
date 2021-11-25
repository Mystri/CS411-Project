import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

import LoginModal from './LoginModal.js'

export default () => {

    const [login, setLogin] = useState(0);

    useEffect(() => {
      setLogin(JSON.parse(window.localStorage.getItem('login')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('login', login);
    }, [login]);

    const onLogin = () => {
        setLogin(1);
    }

    const onLogout = () => {
        setLogin(0);
    }

    if (!login) {
        return (
            
            <div>
            <LoginModal onLogin={onLogin}/>
            </div>
        );
    } else {
        return (            
            <div>
            <Button variant="outline-success" onClick={onLogout}> Log out </Button>
            </div>
            );
    }
}