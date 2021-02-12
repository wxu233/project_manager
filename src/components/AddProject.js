import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { auth, firestore } from './firebase'
import firebase from 'firebase/app';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"

const AddProject = () => {

    const projectRef = firestore.collection('projects');

    const [show, setShow] = useState(false);

    const [pname, setName] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPrio] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(firestore);
        await projectRef.add({
            name: pname,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid,
            dueday: time,
            priority: priority,
            progress: time === '' ? 2 : 0
        })

        // setName('');
        // setTime('');
        // setPrio('');
        handleClose();
    }

    function valid(t) {
        return t.isAfter(new Date());
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add Project</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a project</Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control required type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter project name..." />
                        <Form.Label>Due Date</Form.Label>
                        <Datetime isValidDate={valid} dateFormat="YYYY-MM-DD" closeOnSelect onChange={(e) => setTime((new Date(e._d)).getTime() / 1000)}/>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" className="my-1 mr-sm-2" onChange={(e) => setPrio(e.target.value)}>
                            <option value="0">Choose...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Control>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
               
            </Modal>
        </>
    )
}

export default AddProject;