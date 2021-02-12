import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { auth, firestore } from './firebase'
import firebase from 'firebase/app';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css"

const UpdateProject = (props) => {
 

    return(
        <div class="modal fade" id="updateModal" tabIndex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update the project</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
 
}

export default UpdateProject;