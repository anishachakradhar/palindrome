import React, { Component } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

class ModalForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      post: {
        title: '',
        body: ''
      }
    }
  }

  componentDidUpdate(prevProps){
    console.log( prevProps.indexToUpdate, this.props.indexToUpdate)

    if(prevProps.indexToUpdate === null && this.props.indexToUpdate !== null) {
      this.setState({
        post: {
          title: this.props.activePost.title,
          body: this.props.activePost.body
        }
      })
    } else if(prevProps.indexToUpdate !== null && this.props.indexToUpdate === null) {
      this.setState({
        post: {
          title: '',
          body: ''
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }

  onAdd = (e) => {
    e.preventDefault();
    const post = this.state.post
    this.props.addPost(post)
    .then(() => {
      this.setState({
        post: {
          title: '',
          body: ''
        }
      })
    })
  }

  onUpdate = () => {
    const post = {
      title: this.state.post.title,
      body: this.state.post.body
    }
    this.props.update(post, this.props.activePost.id)
    .then(() => {
      this.setState({
        post: {
          title: '',
          body: ''
        }
      })
    })
  }

  render() {
    return(
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.hide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Add Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" type="text" value={this.state.post.title} placeholder="Enter post title" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="body" type="text" value={this.state.post.body} placeholder="Enter description" onChange={this.handleChange}/>
              </Form.Group>
              {this.props.indexToUpdate !== null ? 
              <Button variant="primary" onClick={this.onUpdate}>Update</Button> :
              <Button variant="primary" onClick={this.onAdd}>Add</Button>
              }
              <Button className="close-button" variant="secondary" onClick={this.props.hide}>Close</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ModalForm