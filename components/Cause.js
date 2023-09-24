import { useContext } from 'react';
import { SignUpContext } from '../components/SignUpContext';

function Cause(props) {
  const { interests, setInterests } = useContext(SignUpContext);
  const { cause } = props;
  let styleStatus = interests && interests.includes(cause) ? 'bg-green-100' : 'bg-gray-200';

  const handleClick = (event) => {
    if (!interests) {
      setInterests([event.target.innerText]);
    } else {
      setInterests([...interests, event.target.innerText]);
    }
  };

  return (
    <div className={`h-12 w-60 ${styleStatus} cursor-pointer text-black rounded border border-black flex items-center justify-center font-extralight hover:scale-110 active:scale-90`} onClick={handleClick}>
      <h4>{cause}</h4>
    </div>
  );
}

export default Cause;
