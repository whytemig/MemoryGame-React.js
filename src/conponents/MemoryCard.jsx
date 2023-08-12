
const MemoryCard = (props) => {

  return (
    <div className="MemoryCard" onClick={ props.pickCard}>
        <div className={props.isFlipped ? 'MemoryCardInner flipped' : 'MemoryCardInner'}>
        <div className="MemoryCardBack">
        <img
          src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
          alt="Logo"
              />
        </div>
        <div className="MemoryCardFront">{ props.symbol}</div>
      </div>
    </div>
  );
};

export default MemoryCard;
