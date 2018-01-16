import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';
import React from 'react';

const SIZE = 5;

function IsVictory(cells) {
  return cells[cells.length - 1] != null;
}

function neighbors(cells, id, flag) {
 return cells[id-1] === flag ||
         cells[id+1] === flag ||
         cells[id-SIZE] === flag ||
         cells[id+SIZE] === flag
}


const Nanaimo = Game({

  setup: () => {
    return { cells: Array(SIZE*SIZE).fill(null) }
  },
  
  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];
      const last = cells.length - 1;

      // First Move enforced
      if (cells[0] === null) {
        cells[0] = ctx.currentPlayer;
      }

      else {
        // Final move
        if (id === last) {
          if (cells.filter(x => x===null).length === 1) {
            cells[id] = ctx.currentPlayer;
          }
        }

        // If cell is valid
        else if (cells[id] === null) {
        // First move of a turn
          if (!cells.includes(ctx.currentPlayer)) {
            // Enforce neighboring x
            if (neighbors(cells, id, "x")) {
              cells[id] = ctx.currentPlayer;
            }
          }

          else if (neighbors(cells, id, ctx.currentPlayer)) {
            cells[id] = ctx.currentPlayer;
          }
        }
      }

      return { ...G, cells };
    }
  },
  
  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return ctx.currentPlayer;
      }
    },

    endTurnIf: (G, ctx) => {
      const cells = [...G.cells]
      return cells.filter(x => (x !== "x" && x !== null)).length >= 4;
    },

    onTurnEnd: (G, ctx) => {
      const cells = [...G.cells].map(x => {return  x===null? null : "x"});
      return { ...G, cells }
    }
  }
});


class NanaimoBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
    }
  }

  isActive(id) {
    return this.props.isActive && this.props.G.cells[id] == null;
  }

  endTurn() {
    this.props.events.endTurn();
  }

  render() {

    let tbody = [];
    for (let i = 0; i < SIZE; i++) {
      let cells = [];
      for (let j = 0; j < SIZE; j++) {
        const id = SIZE * i + j;
        cells.push(
          <td key={id}
              className={this.isActive(id) ? 'active' : ''}
              onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    let winner = '';
    if (this.props.ctx.gameover !== undefined) {
      winner = <div id='winner'>Winner: {this.props.ctx.gameover}</div>;
    }

    return (
      <div>
          <div>
            <h2>Welcome to Nanaimo!</h2>
            <i>Be the one to get the bottom right square!</i>
            <br/> <br/>
            <b>Rules:</b>
            <ul>
            <li>First move always top left</li>
            <li>First block you place must touch existing block</li>
            <li>You may place up to 3 more blocks per turn, all touching blocks placed that turn</li>
            <li>The bottom right square must be the last square left</li>
            </ul>
          </div>
        <table id="board">
        <tbody>{tbody}</tbody>
        </table>
        <button onClick={() => this.endTurn()}>End Turn</button>
        {winner}
      </div>
    );
  }
}

var App = Client({
  board: NanaimoBoard,
  game: Nanaimo,
  debug: false,
  multiplayer: true
});

export default App;