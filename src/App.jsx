import { useState } from 'react'
import './NumberGuessingGame.css'

const NumberGuessingGame = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState('');
  const [guessCount, setGuessCount] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [lastResult, setLastResult] = useState('');
  const [lowOrHi, setLowOrHi] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const checkGuess = () => {
    const userGuess = Number(guess);

    if (guessCount === 1) {
      setGuesses(['Previous guesses:']);
    }

    setGuesses((prevGuesses) => [...prevGuesses, userGuess]);

    if (userGuess === randomNumber) {
      setLastResult('Congratulations! You got it right!');
      setLowOrHi('');
      setGameOver(true);
    } else if (guessCount === 10) {
      setLastResult('!!!GAME OVER!!!');
      setLowOrHi('');
      setGameOver(true);
    } else {
      setLastResult('Wrong!');
      if (userGuess < randomNumber) {
        setLowOrHi('Last guess was too low!');
      } else if (userGuess > randomNumber) {
        setLowOrHi('Last guess was too high!');
      }
    }

    setGuess('');
    setGuessCount(guessCount + 1);
  };

  const resetGame = () => {
    setGuessCount(1);
    setGuesses([]);
    setLastResult('');
    setLowOrHi('');
    setGameOver(false);
    setGuess('');
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div className="number-guessing-game">
      <h1>Number guessing game</h1>
      <p>
        We have selected a random number between 1 and 100. See if you can guess
        it in 10 turns or fewer. We`ll tell you if your guess was too high or
        too low.
      </p>
      <div className="form">
        <label htmlFor="guessField">Enter a guess: </label>
        <input
          type="number"
          min="1"
          max="100"
          required
          id="guessField"
          className="guessField"
          value={guess}
          onChange={handleGuessChange}
          disabled={gameOver}
        />
        <button onClick={checkGuess} disabled={gameOver}>
          Submit guess
        </button>
      </div>
      <div className="resultParas">
        <p className="guesses">{guesses.join(' ')}</p>
        <p className="lastResult" style={{ backgroundColor: lastResult === 'Congratulations! You got it right!' ? 'green' : 'red' }}>{lastResult}</p>
        <p className="lowOrHi">{lowOrHi}</p>
      </div>
      {gameOver && (
        <button onClick={resetGame}>Start new game</button>
      )}
    </div>
  );
};

export default NumberGuessingGame;
