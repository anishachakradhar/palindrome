import React, { Component } from 'react'

export class Palindrome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      isPalindrome: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = () => {
    const bodyToLowercase = this.state.body.toLowerCase()
    const reversedBody = bodyToLowercase.split('').reverse().join('')
    this.setState({
      isPalindrome: bodyToLowercase === reversedBody
    })
  }

  handleReset = () => {
    this.setState({
      body: [],
      isPalindrome: null
    })
  }

  render() {
    return (
      <div className="post">
        <input name="body" value={this.state.body} onChange={this.handleChange}></input>
        <button type="submit" onClick={this.handleCheck}>Check</button>
        <button onClick={this.handleReset}>Reset</button>
        {this.state.isPalindrome !== null && 
          (this.state.isPalindrome ? 
            <h1>This is a palindrome</h1> :
            <h1>This is not a palindrome</h1>
          )
        }
      </div>
    )
  }
}

export default Palindrome
