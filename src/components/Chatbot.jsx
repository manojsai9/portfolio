import { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { chatbubbleEllipsesOutline, closeOutline, sendOutline } from 'ionicons/icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const messagesEndRef = useRef(null);

  // Game states
  const [ticTacToe, setTicTacToe] = useState({
    board: Array(9).fill(null),
    isPlayerTurn: true,
    winner: null
  });

  const [chess, setChess] = useState({
    board: initializeChessBoard(),
    selectedPiece: null,
    validMoves: []
  });

  const defaultQuestions = [
    "What services do you offer?",
    "Can you tell me about your experience?",
    "How can I contact you?",
    "Let's play a game!"
  ];

  // Initialize chess board
  function initializeChessBoard() {
    const board = Array(8).fill().map(() => Array(8).fill(null));
    
    // Set up pawns
    for (let i = 0; i < 8; i++) {
      board[1][i] = { type: 'pawn', color: 'black' };
      board[6][i] = { type: 'pawn', color: 'white' };
    }

    // Set up other pieces
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let i = 0; i < 8; i++) {
      board[0][i] = { type: pieces[i], color: 'black' };
      board[7][i] = { type: pieces[i], color: 'white' };
    }

    return board;
  }

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, activeGame]);

  // Initialize bot message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello! I'm Manoj's assistant. How can I help you today?");
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { text, isUser: false }]);
    setIsTyping(false);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => handleBotResponse(text), 1000);
  };

  const handleBotResponse = (userMessage) => {
    if (activeGame) {
      handleGameResponse(userMessage);
      return;
    }

    let response = "";
    
    switch(userMessage.toLowerCase()) {
      case "what services do you offer?":
        response = "I offer web development and design services. I build full-stack applications using MERN stack and create clean, modern designs.";
        break;
      case "can you tell me about your experience?":
        response = "I have experience as a Full Stack Developer at Slash Mark and currently interning as a Data Engineer at Digitide. Check my resume section for details!";
        break;
      case "how can i contact you?":
        response = "You can contact me via the contact form on this website or directly at manojsaei9@gmail.com. My social links are in the sidebar.";
        break;
      case "let's play a game!":
        response = "Great! Which game would you like to play?\n\n1. Tic-Tac-Toe\n2. Chess";
        break;
      case "1":
      case "tic-tac-toe":
        startGame('tic-tac-toe');
        return;
      case "2":
      case "chess":
        startGame('chess');
        return;
      default:
        response = "I'm not sure I understand. You can ask about my services, experience, or how to contact me. Or say 'Let's play a game!'";
    }
    
    addBotMessage(response);
  };

  const startGame = (gameType) => {
    setActiveGame(gameType);
    if (gameType === 'tic-tac-toe') {
      addBotMessage("Starting Tic-Tac-Toe! You're X, I'm O. Click on the board to make your move.");
    } else if (gameType === 'chess') {
      addBotMessage("Starting Chess! Click on a piece to select it, then click where you want to move it.");
    }
  };

  const endGame = () => {
    setActiveGame(null);
  };

  // Tic-Tac-Toe Logic
  const handleTicTacToeMove = (position) => {
    if (ticTacToe.winner || !ticTacToe.isPlayerTurn) return;

    const newBoard = [...ticTacToe.board];
    if (newBoard[position] !== null) return;

    newBoard[position] = 'X';
    setTicTacToe({...ticTacToe, board: newBoard});

    // Check for winner
    if (checkTicTacToeWinner(newBoard, 'X')) {
      addBotMessage("You win! 🎉");
      setTicTacToe({...ticTacToe, board: newBoard, winner: 'X'});
      setTimeout(endGame, 2000);
      return;
    }

    // Check for draw
    if (!newBoard.includes(null)) {
      addBotMessage("It's a draw!");
      setTimeout(endGame, 2000);
      return;
    }

    // Bot's turn
    setTimeout(() => makeBotMove(newBoard), 1000);
  };

  const makeBotMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((val, idx) => val === null ? idx : null)
      .filter(val => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    const botPosition = emptyIndices[randomIndex];
    const newBoard = [...currentBoard];
    newBoard[botPosition] = 'O';

    setTicTacToe({...ticTacToe, board: newBoard, isPlayerTurn: true});

    // Check for winner
    if (checkTicTacToeWinner(newBoard, 'O')) {
      addBotMessage("I win! Better luck next time!");
      setTicTacToe({...ticTacToe, board: newBoard, winner: 'O'});
      setTimeout(endGame, 2000);
      return;
    }

    // Check for draw
    if (!newBoard.includes(null)) {
      addBotMessage("It's a draw!");
      setTimeout(endGame, 2000);
    }
  };

  const checkTicTacToeWinner = (board, player) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => 
      pattern.every(index => board[index] === player)
    );
  };

  // Chess Logic
  const handleChessMove = (row, col) => {
    const { selectedPiece, validMoves } = chess;
    
    // If no piece selected, select one
    if (!selectedPiece) {
      const piece = chess.board[row][col];
      if (piece && piece.color === 'white') { // Player is white
        // Calculate valid moves (simplified for demo)
        const moves = calculateValidMoves(row, col, piece);
        setChess({
          ...chess,
          selectedPiece: { row, col, piece },
          validMoves: moves
        });
      }
      return;
    }
    
    // If a piece is selected, try to move it
    const isMoveValid = validMoves.some(move => 
      move.row === row && move.col === col
    );
    
    if (isMoveValid) {
      // Make the move
      const newBoard = chess.board.map(r => [...r]);
      newBoard[selectedPiece.row][selectedPiece.col] = null;
      newBoard[row][col] = selectedPiece.piece;
      
      setChess({
        board: newBoard,
        selectedPiece: null,
        validMoves: []
      });
      
      // Bot's turn (simplified - just moves a random piece)
      setTimeout(makeChessBotMove, 1000);
    } else {
      // Invalid move, deselect
      setChess({
        ...chess,
        selectedPiece: null,
        validMoves: []
      });
    }
  };

  const calculateValidMoves = (row, col, piece) => {
    // Simplified move calculation for demo
    const moves = [];
    const { type } = piece;
    
    if (type === 'pawn') {
      if (row > 0 && !chess.board[row-1][col]) {
        moves.push({ row: row-1, col });
      }
    } else if (type === 'rook') {
      // Horizontal and vertical moves
      for (let i = 0; i < 8; i++) {
        if (i !== col) moves.push({ row, col: i });
        if (i !== row) moves.push({ row: i, col });
      }
    }
    // Add more piece movement logic as needed
    
    return moves.filter(move => 
      move.row >= 0 && move.row < 8 && 
      move.col >= 0 && move.col < 8
    );
  };

const makeChessBotMove = () => {
  // Simplified bot move - just moves a random black piece
  const newBoard = chess.board.map(r => [...r]);
  let moved = false;
  
  for (let row = 0; row < 8 && !moved; row++) {
    for (let col = 0; col < 8 && !moved; col++) {
      const piece = newBoard[row][col];
      if (piece && piece.color === 'black') {
        // Try to move forward (simplified)
        if (row < 7 && !newBoard[row+1][col]) {
          newBoard[row+1][col] = piece;
          newBoard[row][col] = null;
          moved = true;
        }
      }
    }
  }
  
  setChess({
    board: newBoard,
    selectedPiece: null,
    validMoves: []
  });
};

  const handleGameResponse = (userMessage) => {
    if (activeGame === 'tic-tac-toe') {
      const position = parseInt(userMessage) - 1;
      if (position >= 0 && position <= 8) {
        handleTicTacToeMove(position);
      } else {
        addBotMessage("Please enter a number between 1 and 9");
      }
    } else {
      addBotMessage("Use the game board to play!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addUserMessage(inputValue);
    }
  };

  const handleQuickQuestion = (question) => {
    addUserMessage(question);
  };

  const renderGameDisplay = () => {
    if (activeGame === 'tic-tac-toe') {
      return (
        <div className="tic-tac-toe-board">
          {ticTacToe.board.map((cell, index) => (
            <div 
              key={index}
              className={`tic-tac-toe-cell ${ticTacToe.winner ? 'game-ended' : ''}`}
              onClick={() => !ticTacToe.winner && handleTicTacToeMove(index)}
            >
              {cell}
            </div>
          ))}
          <button className="end-game-btn" onClick={endGame}>
            End Game
          </button>
        </div>
      );
    } else if (activeGame === 'chess') {
      return (
        <div className="chess-game-container">
          <div className="chess-board">
            {chess.board.map((row, rowIndex) => (
              <div key={rowIndex} className="chess-row">
                {row.map((piece, colIndex) => {
                  const isSelected = chess.selectedPiece?.row === rowIndex && 
                                   chess.selectedPiece?.col === colIndex;
                  const isValidMove = chess.validMoves.some(move => 
                    move.row === rowIndex && move.col === colIndex
                  );
                  
                  return (
                    <div
                      key={colIndex}
                      className={`chess-square 
                        ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}
                        ${isSelected ? 'selected' : ''}
                        ${isValidMove ? 'valid-move' : ''}`}
                      onClick={() => handleChessMove(rowIndex, colIndex)}
                    >
                      {piece && (
                        <div className={`chess-piece ${piece.color}`}>
                          {getChessPieceSymbol(piece)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <button className="end-game-btn" onClick={endGame}>
            End Game
          </button>
        </div>
      );
    }
    return null;
  };

  const getChessPieceSymbol = (piece) => {
    const symbols = {
      king: '♔',
      queen: '♕',
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙'
    };
    return piece.color === 'black' 
      ? symbols[piece.type].toLowerCase() 
      : symbols[piece.type];
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chatbot"
      >
        <IonIcon icon={isOpen ? closeOutline : chatbubbleEllipsesOutline} />
      </button>

      {/* Chatbot container */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Manoj's Assistant</h3>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`message ${msg.isUser ? 'user' : 'bot'}`}
            >
              {msg.text.split('\n').map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          ))}
          
          {renderGameDisplay()}
          
          {isTyping && (
            <div className="message bot typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!activeGame && messages.length > 0 && (
          <div className="quick-questions">
            {defaultQuestions.map((q, i) => (
              <button 
                key={i} 
                className="quick-question"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">
            <IonIcon icon={sendOutline} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;