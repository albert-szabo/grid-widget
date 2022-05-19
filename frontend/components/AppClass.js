import React from 'react'

export default class AppClass extends React.Component {

  state = {
    message: '',
    moves: 0,
    grid: ['', '', '', '', 'B', '', '', '', ''],
    activeSquare: 4
  }

  // const [x, y] = getCoordinates(grid);
  // console.log(`(${x}, ${y})`) // (1 ,2)
  // Coordinates `(${x}, ${y})`

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

// } else if (this.state.activeSquare === 1) {
//   return this.setActiveSquare(0);
// } else if (this.state.activeSquare === 2) {
//   return this.setActiveSquare(1)
// } else if (this.state.activeSquare === 4) {
//   return this.setActiveSquare(3)
// } else if (this.state.activeSquare === 5) {
//   return this.setActiveSquare(4)
// } else if (this.state.activeSquare === 7) {
//   return this.setActiveSquare(6)
// } else if (this.state.activeSquare === 8) {
//   return this.setActiveSquare(7)

  handlePlayerMoveUp = () => {

  }

  handlePlayerMoveRight = () => {

  }

  handlePlayerMoveDown = () => {

  }

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">{`You moved ${this.state.moves} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((letter, index) => <div key={index} className="square">{letter}</div>)}
          {/* <div className="square active">B</div> */}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handlePlayerMoveLeft}>LEFT</button>
          <button id="up" onClick={this.handlePlayerMoveUp}>UP</button>
          <button id="right" onClick={this.handlePlayerMoveRight}>RIGHT</button>
          <button id="down" onClick={this.handlePlayerMoveDown}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
