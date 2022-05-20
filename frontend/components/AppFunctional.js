import React, { useState } from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const initialState = {
    message: '',
    emailInput: '',
    moves: 0,
    grid: ['', '', '', '', 'B', '', '', '', ''],
    activeSquare: 4
  }

  const [state, setState] = useState(initialState);

  const getXCoordinate = () => {
    if (state.activeSquare === 0 || state.activeSquare === 3 || state.activeSquare === 6) {
      return 1;
    } else if (state.activeSquare === 1 || state.activeSquare === 4 || state.activeSquare === 7) {
      return 2;
    } else {
      return 3;
    }
  }

  const getYCoordinate = () => {
    if (state.activeSquare === 0 || state.activeSquare === 1 || state.activeSquare === 2) {
      return 1;
    } else if (state.activeSquare === 3 || state.activeSquare === 4 || state.activeSquare === 5) {
      return 2;
    } else {
      return 3;
    }
  }

  const getCoordinates = () => {
    const x = getXCoordinate();
    const y = getYCoordinate();
    return `(${x}, ${y})`;
  }

  const setActiveSquare = (newIndex) => {
    const oldIndex = state.activeSquare;
    const updatedGrid = [ ...state.grid];
    updatedGrid[oldIndex] = '';
    updatedGrid[newIndex] = 'B';
    setState({
      ...state,
      grid: updatedGrid,
      moves: state.moves + 1,
      activeSquare: newIndex,
      message: ''
    })
  }

  const handlePlayerMoveLeft = () => {
    if (state.activeSquare === 0 || state.activeSquare === 3 || state.activeSquare === 6) {
      return setState({
        ...state,
        message: `You can't go left`
      })
    } else {
      return setActiveSquare(state.activeSquare - 1);
    }
  }

  const handlePlayerMoveUp = () => {
    if (state.activeSquare === 0 || state.activeSquare === 1 || state.activeSquare === 2) {
      return setState({
        ...state,
        message: `You can't go up`
      })
    } else {
      return setActiveSquare(state.activeSquare - 3);
    }
  }

  const handlePlayerMoveRight = () => {
    if (state.activeSquare === 2 || state.activeSquare === 5 || state.activeSquare === 8) {
      return setState({
        ...state,
        message: `You can't go right`
      })
    } else {
      return setActiveSquare(state.activeSquare + 1);
    }
  }

  const handlePlayerMoveDown = () => {
    if (state.activeSquare === 6 || state.activeSquare === 7 || state.activeSquare === 8) {
      return setState({
        ...state,
        message: `You can't go down`
      })
    } else {
      return setActiveSquare(state.activeSquare + 3);
    }
  }

  const onChange = (event) => {
    const emailInputValue = event.target.value;
    setState({
      ...state,
      emailInput: emailInputValue
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      'x': getXCoordinate(),
      'y': getYCoordinate(),
      'steps': state.moves,
      'email': state.emailInput
    })
      .then((response) => {setState({ ...state, message: response.data.message })})
      .catch((error) => {setState({ ...state, message: error.response.data.message })})
    resetEmailInput();
  }

  const reset = () => {
    setState(initialState);
  }

  const resetEmailInput = () => {
    setState({
      ...state,
      emailInput: ''
    })
  }

  return (
    <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {getCoordinates()}</h3>
          <h3 id="steps">{state.moves === 1 ? `You moved ${state.moves} time` : `You moved ${state.moves} times`}</h3>
        </div>
        <div id="grid">
          {state.grid.map((letter, index) => letter ? <div key={index} className="square active">{letter}</div> : <div key={index} className="square">{letter}</div>)}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={handlePlayerMoveLeft}>LEFT</button>
          <button id="up" onClick={handlePlayerMoveUp}>UP</button>
          <button id="right" onClick={handlePlayerMoveRight}>RIGHT</button>
          <button id="down" onClick={handlePlayerMoveDown}>DOWN</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="text" placeholder="type email" onChange={onChange} value={state.emailInput}></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
