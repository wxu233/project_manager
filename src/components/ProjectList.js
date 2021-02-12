import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import { Button, Container, Dropdown, Modal } from 'react-bootstrap'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firestore } from './firebase'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import '../App.css'

// TODO: add set deadline for inactive items

const ProjectList = () => {
    const { docs } = useFirestore('projects');
    const [ show, setShow ] = useState(false);
    const [ date, setDate ] = useState(false);
    const [ d, setD ] = useState(null);
    const handleClose = () => setShow(false);
    const closeDate = () => setDate(false);
    const [ time, setTime ] = useState('');
    // const [update, showUpdate] = useState(null);
    // console.log(docs);
    function setStyle(prio) {
        switch(prio) {
            case '3':
                return <span class="badge badge-danger">urgent</span>
            case '2':
                return <span class="badge badge-warning">moderate</span>
            case '1':
                return <span class="badge badge-info">meh</span>
            default:
                return <span class="badge badge-secondary">chill</span>
        }
    }

    function getDate(timestamp){
        if(timestamp){
            return "Deadline: " + (new Date(timestamp * 1000)).toUTCString().slice(0, -13);
        }
        else{
            return "No deadline owo"
        }
    }

    function getStatus(createdAt, dueday, progress){
        const currentDate = Date.now() / 1000;
        if( dueday !=='' && currentDate > dueday && progress !== 1 ){
            progress = -1
        }
        // console.log(progress);
        switch (progress) {
            case 0:
                return <span class="badge badge-info">In progress</span>
            case -1:
                return <span class="badge badge-danger">Overdued</span>
            case 1:
                return <span class="badge badge-success">Completed</span>
            default: 
                return <span class="badge badge-secondary">Inactive</span>
        }
    }   

    const handleEdit = (e, doc) => {
        setD(doc);  // for modal
        switch (e) {
            case "fin":
                return setFinished(doc.id);
            case "del":
                return setShow(true);
            case "date":
                return setDate(true);
            default:
        }
    }

    async function setDeadline ( id ){
        closeDate();
        await firestore.collection('projects').doc(id).update({
            dueday: time,
            progress: 0
        })
    }

    async function setFinished ( id ) {
        // console.log("updating " + doc.name);
        await firestore.collection('projects').doc(id).update({
            progress: 1
        });
        // console.log(res);
    }

    async function setDelete ( id ) {
        await firestore.collection('projects').doc(id).delete()
        .then( () => {
            console.log(d.name + " deleted");
        });
        handleClose();
    }

    function valid(t) {
        return t.isAfter(new Date());
    }

    return (
        <div className="prj-list">
            
            <ul class="list-group-flush">
                {docs && docs.map(doc => (
                    <li class="list-group-item " key={doc.id}>
                        {/* {console.log(doc.id)} */}
                        <div class="row d-flex align-items-center">
                            <div class="mr-auto p-2">{doc.name}</div>
                            <div class="mr-2">{getStatus(doc.createdAt, doc.dueday, doc.progress)}</div>
                            <div class="p-2">{setStyle(doc.priority)}</div>
                            <div class="p-2">{getDate(doc.dueday)}</div> 
                            <Dropdown size="sm"  onSelect={(e) => { handleEdit(e, doc) } }>
                                <Dropdown.Toggle className="noCaret" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    {doc.dueday === '' && <Dropdown.Item eventKey="date">Set Deadline</Dropdown.Item>}
                                    <Dropdown.Item eventKey="fin">Finished</Dropdown.Item>
                                    <Dropdown.Item eventKey="del">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </li>
                ))}
                <>
                    <Modal show={show} onHide={handleClose} id="confirm-delete">
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="row d-flex justify-content-center">
                                    Are you sure you want to delete this project?{'\n\n'}   
                                    <Container className="row d-flex justify-content-center">
                                        <Button className="mx-2" variant="danger" onClick={() => { setDelete(d.id) } }>Yes</Button>
                                        <Button className="mx-2" onClick={() => { handleClose() } }>No</Button>
                                    </Container>
                        </Modal.Body>
                    </Modal>

                    <Modal show={date} onHide={closeDate} id="set-date">
                        <Modal.Header>
                            <Modal.Title>Choose a deadline for this project</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body className="row d-flex justify-content-center">
                            <Datetime isValidDate={valid} dateFormat="YYYY-MM-DD" closeOnSelect onChange={(e) => setTime((new Date(e._d)).getTime() / 1000)}></Datetime>
                            <Container className="row mt-3 d-flex justify-content-center">
                                        <Button className="mx-2" variant="success" onClick={() => { setDeadline(d.id) } }>Confirm</Button>
                                        <Button className="mx-2" variant="secondary" onClick={() => { closeDate() } }>Cancel</Button>
                            </Container>
                        </Modal.Body>
                    </Modal> 
                </>
            </ul>
        </div>
    )
}



export default ProjectList;