import React, { Component } from 'react'

class MyChild extends Component {

  handleInputChange = event => {
    this.props.onNameChange(event.target.value)
  }

 handleAlgoChange = event => {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInputChange} value={this.props.name} />
        <div>The name is: {this.props.name}</div>
        <input type="text" onChange={this.handleAlgoChange} value={this.props.algo} />
		<p>Maicao {this.props.algo}</p>
      </div>
    )
  }

}

export default MyChild
