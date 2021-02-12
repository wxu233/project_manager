import React from 'react'
import firebase from 'firebase/app';
import { Button, Card, Container } from 'react-bootstrap'
import { auth } from "./firebase"
import logo from '../login-icon.png'

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }


    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"50vh"}}>
            <div className="w-200" style={{maxWidth: "500px"}}>
                <Card>
                    <Card.Body>
                        <img className="icon" src={logo} />
                        <h2 className="text-center mb-4">Login</h2>
                        <Button onClick={signInWithGoogle}>Sign in with Google</Button> 
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

