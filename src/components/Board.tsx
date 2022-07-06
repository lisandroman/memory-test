import { useEffect, useRef, useState } from 'react';
import Card from './Book';
import '../scss/board.scss';

type BoardProps = {
  setMoves: React.Dispatch<React.SetStateAction<number>>
  gameOver: () => void
  bookID: Array<number>
}

function Board(props: BoardProps) {
  const [openBooks, setOpenBooks] = useState<Array<number>>([]);
  const [disableAllBooks, setDisableAllBooks] = useState<boolean>(false);
  const [clearedBooks, setClearedBooks] = useState<Array<number>>([]);

  const controlTimmer = useRef<NodeJS.Timeout>(setTimeout(()=>{}));

  useEffect(() => {
    let controlTimmer: NodeJS.Timeout = setTimeout(()=>{});
    if (openBooks.length === 2) {
      controlTimmer = setTimeout(gameState, 500);
    }
    return () => {
      clearTimeout(controlTimmer);
    };
  }, [openBooks]);

  
  const disable = () => {
    setDisableAllBooks(true);
  };
  const enable = () => {
    setDisableAllBooks(false);
  };
  
  const gameClosed = () => {
    if (clearedBooks.length === props.bookID.length) {
      props.gameOver();
    }
  }

  useEffect(() => {
    gameClosed();
  }, [clearedBooks]);

  const gameState = () => {
    const [first, second] = openBooks;
    enable();
    if ((first % 6 + 1) === (second % 6 + 1)) {
      setClearedBooks((prev) => [...prev, first, second]);
      setOpenBooks([]);
      return;
    }
    controlTimmer.current = setTimeout(() => {
      setOpenBooks([]);
    }, 500);
  }

  const handleClickOnCard = (id: number) => {
    if (openBooks.length === 1) {
      setOpenBooks((prev) => [...prev, id]);
      props.setMoves((moves) => moves + 1)
      disable();
    } else {
      clearTimeout(controlTimmer.current);
      setOpenBooks([id]);
    }
  };

  const checkIsFlipped = (id: number) => {
    return clearedBooks.includes(id) || openBooks.includes(id);
  };

  const checkIsInactive = (id: number) => {
    return clearedBooks.includes(id)
  };

  return (
    <div className={'board'}>
      {props.bookID.map(i => {
        return <Card
          key={i}
          image={`/images/${i % 6 + 1}.png`}
          id={i}
          isDisabled={ disableAllBooks }
          isInactive={ checkIsInactive(i) }
          isFlipped={ checkIsFlipped(i) }
          onClick={ handleClickOnCard }
        />
      })}
    </div>
  )
}

export default Board