
let board = null;
let game = new Chess();

const onDragStart = (source, piece) => {
  if (game.game_over() || (game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

const onDrop = (source, target) => {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateStatus();
};

const onSnapEnd = () => {
  board.position(game.fen());
};

const updateStatus = () => {
  let status = '';

  const moveColor = game.turn() === 'w' ? 'White' : 'Black';

  if (game.in_checkmate()) {
    status = `Game Over, ${moveColor} is in checkmate.`;
    document.getElementById('gameStatus').textContent = `Congratulations! ${moveColor === 'White' ? 'Black' : 'White'} wins the game!`;
    alert(`Congratulations! ${moveColor === 'White' ? 'Black' : 'White'} wins the game!`);
  } else if (game.in_draw()) {
    status = "Game Over, it's a draw!";
    document.getElementById('gameStatus').textContent = "It's a draw!";
    alert("It's a draw!");
  } else {
    status = `${moveColor} to move`;

    if (game.in_check()) {
      status += `, ${moveColor} is in check`;
    }
  }

  document.getElementById('gameStatus').textContent = status;
};

document.getElementById('startButton').addEventListener('click', () => {
  game.reset();
  board.start();
  updateStatus();
});

const config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  pieceTheme: 'img/chesspieces/wikipedia/{piece}.png'  // Local path to chess piece images
};

board = Chessboard('chessBoard', config);
updateStatus();
