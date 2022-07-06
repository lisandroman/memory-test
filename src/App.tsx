import { useState } from 'react'
import Board from './components/Board';
import Score from './components/Score';

const bookID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
bookID.sort(() => 0.5 - Math.random())

function App() {

  const [moves, setMoves] = useState<number>(0)
  const [bestScore, setBestScore] = useState<number>(
    parseInt(localStorage.getItem('bestScore') || '0') || Number.MAX_SAFE_INTEGER
  )
  const gameOver = () => {
    const newBestScore = moves < bestScore 
      ? moves 
      : bestScore
    setBestScore(newBestScore)
    localStorage.setItem('bestScore', '' + newBestScore)
  }

  return (
    <div className="app-container">
      <Score moves={ moves } bestScore={bestScore} />
      <Board setMoves={ setMoves } gameOver={ gameOver } bookID={ bookID } />
    </div>
  )
}

export default App