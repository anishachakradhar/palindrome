import React, { Component } from 'react';

import ModalForm from './ModalForm';

import { Button, Table } from 'react-bootstrap';

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {},
      modalShow: false,
      indexToUpdate: null
    }
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        posts: data
      })
      console.log(this.state.posts);
    })
    .catch(console.log)
  }

  modalOpen = () => {
    this.setState({
      modalShow: true
    })
  }

  modalClose = () => {
    this.setState({
      modalShow: false
    })
  }

  addPost = (payload) => {
    const post = {
      ...payload,
      id: this.state.posts.length + 1
    }
    return fetch('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        posts: [...this.state.posts, data],
        modalShow: false
      })
    })
  }

  onDelete = (index) => {
    const posts = [...this.state.posts]
    posts.splice(index,1)
    this.setState({
      posts
    })
  }

  onEdit = (indexToUpdate) => {
    const post = this.state.posts[indexToUpdate]
    this.setState({
      post,
      indexToUpdate,
      modalShow: true
    })
    console.log(post, 'edit button is pressed............................');
  }

  handleUpdate = (post, id) => {
    return fetch(`http://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(post)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      const posts = [...this.state.posts];
      posts[this.state.indexToUpdate] = data;
      this.setState({
        posts,
        modalShow: false
      })
    })
  }

  render() {
    return(
      <div className="post">
        <div className="add-post">
          <Button variant="info" onClick={this.modalOpen}>Add Post</Button>
          <ModalForm
            show={this.state.modalShow}
            hide={this.modalClose} 
            handleChange={this.handleChange}
            addPost={this.addPost}
            indexToUpdate={this.state.indexToUpdate}
            update={this.handleUpdate}
            activePost={this.state.post}
          />
        </div>
        <div className="show-post">
          <Table responsive>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Post title</th>
                <th>Description</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post, index) =>
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td><Button variant="primary" onClick={() => this.onEdit(index)}>Edit</Button></td>
                  <td><Button variant="danger" onClick={() => this.onDelete(index)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
            
          </Table>
        </div>
      </div>
    )
  }
}

export default PostContainer