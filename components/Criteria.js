import { CheckCircleOutline, CancelOutline } from '@heroicons/react/solid';

function Criteria({ isLength, isStrong, isForbidden }) {
  return (
    <div className="mt-3 flex justify-center text-black">
      <div className="w-1/2">
        <div className="flex items-center mb-2">
          <div className="flex-grow">
            <h4 className="mt-0">minimum length is 8</h4>
          </div>
          <div>
            {isLength ? (
              <CheckCircleOutline className="h-5 w-5 text-green-500" />
            ) : (
              <CancelOutline className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex-grow">
            <h4 className="mt-0">
              must contain at least 1: lowercase, uppercase, number, special
              character
            </h4>
          </div>
          <div>
            {isStrong ? (
              <CheckCircleOutline className="h-5 w-5 text-green-500" />
            ) : (
              <CancelOutline className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        <div className="flex items-start mb-2">
          <div className="flex-grow">
            <h4 className="mt-0">
              cannot contain:{" "}
              <span className="text-teal-500">{'// $ * .' }&lt; {'\\ / | : ; ] [ /'} &gt;</span>
              <br />
            </h4>
          </div>
          <div className="self-center">
            {isForbidden !== false ? (
              <CheckCircleOutline className="h-5 w-5 text-green-500" />
            ) : (
              <CancelOutline className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Criteria;
