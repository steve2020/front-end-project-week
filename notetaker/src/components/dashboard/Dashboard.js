import React, { Component } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Note from './Note';
import axios from 'axios';

export default class Dashboard extends Component {
    
  constructor(){
      super();
      this.state = {
          notes: []
      };
  }

  componentWillMount() {
    if (this.props.location.state) {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        };
        console.log(this.props.location.state);
        console.log(this.props.location.state.userID);
        axios
            .get(`https://note-app-sam.herokuapp.com/api/notes/${this.props.location.state.userID}`, requestOptions)
            .then(response => {
                this.setState({ notes: response.data });
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }
  }

  render() {
    if (!this.props.location.state) return (
        <div>
            Please Sign In:<br></br>
            <Link to='/signup'>New User</Link><br></br>
            <Link to='/login'>Login</Link>
        </div>
    )
    return (
        <div>
            <Link to='/login'>Login To Another Account</Link><br></br>
            <Link to='/signup'>New User</Link>
            <Container className="container">
                <Row className="border">
                    <Col xs="3" className="sidebar">
                        <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                        <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                            View Your Notes
                        </button>
                        <Link to={{
                            pathname: "/create",
                            state: { userID: this.props.location.state.userID }
                        }} className="create-link">
                            <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                                + Create New Note
                            </button>
                        </Link>
                    </Col>
                    <Col xs="9" className="main">
                        <Row className="ml-2 mt-5 pt-4 mb-4">
                            <h4 className="text-left heading">Your Notes:</h4>
                        </Row>
                        <Row className="mb-4">
                        {this.state.notes.map(note =>
                            <Col xs="4" className="mb-4" key={note._id}>
                            <Note
                            key={note._id} 
                            id={note._id}
                            title={note.title}
                            body={note.body}
                            userID={this.props.location.state.userID}
                             />
                            </Col>
                        )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}
