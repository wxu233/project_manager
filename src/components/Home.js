import React from 'react'
import { auth } from './firebase'
// import firebase from 'firebase/app';
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button, Container } from 'react-bootstrap'
import AddProject from './AddProject'
import ProjectList from './ProjectList'
import "react-datetime/css/react-datetime.css"
import '../App.css';

export default function Home() {


    return (
        <div className="Home">
            <div class="container-fluid" style={{paddingBottom: "10px"}}>
                <nav class="navbar fixed-top navbar-dark bg-dark">
                    <span class="navbar-brand mb-0 h1">Welcome, {auth.currentUser.displayName}</span>
                    <SignOut />
                </nav>
            </div>

            <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"50vh"}}> 
                <div class="card d-flex flex-fill">
                    <div class="card-header">
                        <span class="left h4">Projects Created</span>
                        <span class="right"><AddProject /></span>
                    </div>
                    <div class="card-body flex-fill">
                        <ProjectList />
                    </div>
                </div>
            </Container>
        </div>      
    )
}

function SignOut() {
    return auth.currentUser && (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
    )
}
