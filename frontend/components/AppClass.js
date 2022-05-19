import React from 'react'

export default class AppClass extends React.Component {
  initialState = {
    message: '',
    moves: 0,
    grid: ['', '', '', '', 'B', '', '', '', ''],
    activeSquare: 4
  }

  state = this.initialState;

  getCoordinates = () => {
    if (this.state.activeSquare === 0) {
      return '(1, 1)';
    } else if (this.state.activeSquare === 1) {
      return '(2, 1)';
    } else if (this.state.activeSquare === 2) {
      return '(3, 1)';
    } else if (this.state.activeSquare === 3) {
      return '(1, 2)';
    } else if (this.state.activeSquare === 4) {
      return '(2, 2)';
    } else if (this.state.activeSquare === 5) {
      return '(3, 2)';
    } else if (this.state.activeSquare === 6) {
      return '(1, 3)';
    } else if (this.state.activeSquare === 7) {
      return '(2, 3)';
    } else {
      return '(3, 3)';
    }
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
      activeSquare: newIndex
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

  reset = () => {
    this.setState(this.initialState);
  }

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getCoordinates()}</h3>
          <h3 id="steps">{this.state.moves === 1 ? `You moved ${this.state.moves} time` : `You moved ${this.state.moves} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((letter, index) => letter ? <div className="square active">{letter}</div> : <div key={index} className="square">{letter}</div>)}
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
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
