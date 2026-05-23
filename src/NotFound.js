import React, { useState } from 'react';
import './NotFound.css';

const WINNING_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const emptyBoard = () => Array(9).fill(null);

function checkWin(board) {
  return WINNING_PATTERNS.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[b] === board[c]
  );
}

function NotFound() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleCellClick = (index) => {
    if (board[index]) return;

    const nextBoard = board.slice();
    nextBoard[index] = currentPlayer;

    if (checkWin(nextBoard)) {
      window.alert('You won! Now go find what you were looking for D:');
      setBoard(emptyBoard());
      setCurrentPlayer('X');
      return;
    }

    if (nextBoard.every(cell => cell !== null)) {
      window.alert('You tied! Now go find what you were looking for D:');
      setBoard(emptyBoard());
      setCurrentPlayer('X');
      return;
    }

    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  return (
    <div className="notFound">
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <p>But while you're here, why not play a quick game of Tic-Tac-Toe with yourself?</p>

      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleCellClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="info">
        Current Player: <span>{currentPlayer}</span>
      </div>
    </div>
  );
}

export default NotFound;
