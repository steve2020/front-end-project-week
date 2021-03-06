import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './noteview.css';
import fire from '../../components/newnote/fire.js';

export default class NoteView extends Component {
  constructor(props) {
      super(props);
      this.state ={
          modal:false,
          redirect: false
      };
      this.toggle = this.toggle.bind(this);
      this.removeNote = this.removeNote.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  removeNote = e => {    
    e.preventDefault(); 
    const notesRef = fire.database().ref(`/notes/${this.props.location.state.id}`);
    notesRef.remove();
    this.setState({
        redirect: true
    })
  }

  render() {
    if (this.state.redirect === true) return <Redirect to="/" />;     
    const { title } = this.props.location.state;
    const { body } = this.props.location.state;
    const { id } = this.props.location.state;
    return (
        <Container>
            <Row className="border">
                <Col xs="3" className="sidebar">
                    <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                    <Link to="/" className="create-link">
                        <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                            View Your Notes
                        </button>
                    </Link>
                    <Link to="/create" className="create-link">
                        <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                            + Create New Note
                        </button>
                    </Link>
                </Col>
                <Col xs="9" className="pr-5">
                    <Row className="justify-content-end mt-3">
                        <Col xs="1">
                            <Link to={{
                                    pathname:`/edit/${id}`,
                                    state: {
                                        id: {id},
                                        title: {title},
                                        body: {body}
                                    }
                                }} style={{ textDecoration: 'underline', color: 'black' }}>
                                edit
                            </Link>
                        </Col>
                        <Col xs="1">
                            <p className="delete-button" 
                            onClick={this.toggle} 
                            style={{ textDecoration: 'underline' }}>
                                delete
                            </p>
                            <Modal isOpen={this.state.modal}>
                                <ModalBody className="text-center mt-3">
                                    Are you sure you want to delete this?
                                </ModalBody>
                                <ModalFooter className="justify-content-between">
                                    <Button color="danger" 
                                    onClick={this.removeNote}
                                    className="ml-5 rounded-0 buttons"> 
                                        Delete
                                    </Button>{' '}
                                    <Button color="info" 
                                    onClick={this.toggle}
                                    className="mr-5 rounded-0 buttons">
                                        No
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                    <Row className="ml-3 mt-2 pt-4 mb-3">
                        <h3 className="text-left heading">
                            {title}
                        </h3>
                    </Row>
                    <Row className="ml-3 mb-4 pr-4 text-left">
                        <p>
                            {body}
                        </p>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
  }
}
