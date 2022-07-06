import classnames from 'classnames'
import '../scss/book.scss'

type BookProps = {
  image: string,
  onClick: (id: number) => void,
  id: number,
  isInactive: boolean,
  isFlipped: boolean,
  isDisabled: boolean
}

function Book(props: BookProps) {

  const backSide = '/images/backside.png'

  const handleClick = () => {
    !props.isFlipped && !props.isDisabled && props.onClick(props.id);
  };

  return (
    <div
      className={classnames("book", {
        "is-flipped": props.isFlipped,
        "is-inactive": props.isInactive
      })}
      onClick={ handleClick }
    >
      <div className="book-face">
        <img src={ backSide } alt="book backside" />
      </div>
      <div className="book-face book-back-face">
        <img src={ props.image } alt="book" />
      </div>
    </div>
  )
}

export default Book