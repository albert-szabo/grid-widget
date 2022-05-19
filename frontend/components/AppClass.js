import React from 'react'

export default class AppClass extends React.Component {

  state = {
    message: '',
    moves: 0,
    grid: ['', '', '', '', '', '', '', '', '']
  }

  render() {
    const { className } = this.props

    // const [x, y] = getCoordinates(grid);
    // console.log(`(${x}, ${y})`) // (1 ,2)
    // Coordinates `(${x}, ${y})`

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
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
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
