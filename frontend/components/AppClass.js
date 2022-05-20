import React from 'react';
import axios from 'axios';

export default class AppClass extends React.Component {
  initialState = {
    message: '',
    emailInput: '',
    moves: 0,
    grid: ['', '', '', '', 'B', '', '', '', ''],
    activeSquare: 4
  }

  state = this.initialState;

  getXCoordinate = () => {
    if (this.state.activeSquare === 0 || this.state.activeSquare === 3 || this.state.activeSquare === 6) {
      return 1;
    } else if (this.state.activeSquare === 1 || this.state.activeSquare === 4 || this.state.activeSquare === 7) {
      return 2;
    } else {
      return 3;
    }
  }

  getYCoordinate = () => {
    if (this.state.activeSquare === 0 || this.state.activeSquare === 1 || this.state.activeSquare === 2) {
      return 1;
    } else if (this.state.activeSquare === 3 || this.state.activeSquare === 4 || this.state.activeSquare === 5) {
      return 2;
    } else {
      return 3;
    }
  }

  getCoordinates = () => {
    const x = this.getXCoordinate();
    const y = this.getYCoordinate();
    return `(${x}, ${y})`;
  }

  setActiveSquare = (newIndex) => {
    const oldIndex = this.state.activeSquare;
    const updatedGrid = [ ...this.state.grid];
    updatedGrid[oldIndex] = '';
    updatedGrid[newIndex] = 'B';
    this.setState({
      ...this.state,
      grid: updatedGrid,
      moves: this.state.moves + 1,
      activeSquare: newIndex,
      message: ''
    })
  }

  handlePlayerMoveLeft = () => {
    if (this.state.activeSquare === 0 || this.state.activeSquare === 3 || this.state.activeSquare === 6) {
      return this.setState({
        ...this.state,
        message: `You can't go left`
      })
    } else {
      return this.setActiveSquare(this.state.activeSquare - 1);
    }
  }

  handlePlayerMoveUp = () => {
    if (this.state.activeSquare === 0 || this.state.activeSquare === 1 || this.state.activeSquare === 2) {
      return this.setState({
        ...this.state,
        message: `You can't go up`
      })
    } else {
      return this.setActiveSquare(this.state.activeSquare - 3);
    }
  }

  handlePlayerMoveRight = () => {
    if (this.state.activeSquare === 2 || this.state.activeSquare === 5 || this.state.activeSquare === 8) {
      return this.setState({
        ...this.state,
        message: `You can't go right`
      })
    } else {
      return this.setActiveSquare(this.state.activeSquare + 1);
    }
  }

  handlePlayerMoveDown = () => {
    if (this.state.activeSquare === 6 || this.state.activeSquare === 7 || this.state.activeSquare === 8) {
      return this.setState({
        ...this.state,
        message: `You can't go down`
      })
    } else {
      return this.setActiveSquare(this.state.activeSquare + 3);
    }
  }

  // function postTodo(name) {
  //   axios.post('http://localhost:9000/api/todos', { name })
  //     .then((res) => {
  //       setTodos(todos.concat(res.data.data))
  //     })
  //     .catch((err) => {
  //       debugger
  //     })
  // }

  onChange = (event) => {
    const emailInputValue = event.target.value;
    this.setState({
      ...this.state,
      emailInput: emailInputValue
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      'x': this.getXCoordinate(),
      'y': this.getYCoordinate(),
      'steps': this.state.moves,
      'email': this.state.emailInput
    })
      .then((response) => {this.setState({ ...this.state, message: response.data.message })})
      .catch((error) => console.error(error))
  }

  reset = () => {this.setState(this.initialState)}

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getCoordinates()}</h3>
          <h3 id="steps">{this.state.moves === 1 ? `You moved ${this.state.moves} time` : `You moved ${this.state.moves} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((letter, index) => letter ? <div key={index} className="square active">{letter}</div> : <div key={index} className="square">{letter}</div>)}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handlePlayerMoveLeft}>LEFT</button>
          <button id="up" onClick={this.handlePlayerMoveUp}>UP</button>
          <button id="right" onClick={this.handlePlayerMoveRight}>RIGHT</button>
          <button id="down" onClick={this.handlePlayerMoveDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}



// import React, { useState, useContext } from 'react'
// import { CountContext } from '../contexts/count'
// import Form from './Form'
// import TodoList from './TodoList'
// import { TodosContext } from '../contexts/todos'

// const initialForm = {
//   name: '',
// }
// const initialState = {
//   form: initialForm,
//   displayCompleteds: true,
// }

// export default function App() {
//   const { todos, postTodo, patchTodo } = useContext(TodosContext)

//   const onChange = ({ name, value }) => {
//     setState({ ...state, form: { [name]: value } })
//   }
//   const onSubmit = () => {
//     postTodo(state.form.name)
//     setState({ ...state, form: initialForm })
//   }

//   return (
//     <div>
//       <div>Count is {count}</div>
//       <button onClick={inc}>increment</button>
//       <button onClick={dec}>decrement</button>
//       <Form
//         onSubmit={onSubmit}
//         onChange={onChange}
//         values={state.form}
//       />
//     </div>
//   )
// }

