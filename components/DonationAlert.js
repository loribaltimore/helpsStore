import { useContext } from 'react';
import { CheckoutContext } from './CheckoutContext';

function DonationAlert(props) {
    const { setOpen, totalCoin, setTotalCoin } = useContext(CheckoutContext);

    const handleClickAdd = () => {
        setTotalCoin(totalCoin + (2 - totalCoin));
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const coinRequired = {
        0: {
            amt: 10,
            text: '2 Coin for $10'
        },
        1: {
            amt: 5,
            text: '1 Coin for 5$'
        }
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">{totalCoin > 1 ? "Choose Charities" : "Minimum Donation"}</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {totalCoin < 2 && 
                                    <div>
                                        <p>Due to processing fees, the minimum donation amount is 2 Coins. ($10) To make a separate donation, you'll need to either de-select a charity you've already chosen, or add {coinRequired[totalCoin].text}!</p>
                                        <hr className="my-4"/>
                                    </div>
                                }
                                {totalCoin === 1 &&
                                    <p>If you want to spread the wealth, you can add your remaining Coin to the helps Pool. We will take your Coin, add it to a growing pool of donated Coins to create a much larger donation to a non-profit that users get to vote on!</p>
                                }
                                {totalCoin >= 2 &&
                                    <p className="text-red-500 text-center">Please select charities before checking out</p>
                                }
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClickAdd}>
                            {totalCoin < 2 ? `Add Coin ($${coinRequired[totalCoin].amt})` : ""}
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
                            Close
                        </button>
                        {totalCoin === 1 &&
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Pool
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationAlert;
