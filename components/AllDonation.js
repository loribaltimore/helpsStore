"use client"
import { useContext, useEffect, useState } from 'react';
import { MainContext } from './MainContext';
import CartDropdown from './CartDropdown';
import NewCharityCard from './NewCharityCard';

function AllDonation({ user, sessionCart }) {
    let { setCart, cart } = useContext(MainContext);
    const [open, setOpen] = useState(false);
    let [toPool, setToPool] = useState(undefined);
console.log(JSON.parse(user))
    const handleClickPool = async () => {
        if (toPool === undefined) {
            let poolCode = uuidv4();
            setToPool(poolCode);
            await updateSession('toPoolID', poolCode)
                .then(data => { return data }).catch(err => console.log(err));
        }
        // Update your pool logic here
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="fixed left-1/3 z-20">
                <CartDropdown isFinalStep={true} toPool={toPool} setOpen={setOpen} />
            </div>

            <div className="flex flex-wrap pt-60 z-20 space-y-20">
                {
                    cart !== undefined ? 
                    JSON.parse(user).charities.liked.orgs.map((element, index) => {
                        let liked, cardType;
                        element.name === 'helps Pool' ?
                            cardType = 'pool' : cardType = 'donate';
                        const allNames = cart.toDonate ? cart.toDonate.map(x => x.name) : [];
                        (allNames.indexOf(element.name) > -1 )|| 
                        (element.name === 'helps Pool' && toPool !== undefined)?
                            liked = true : liked = false;

                        if (index % 2 === 0) {
                            return (
                                <div className="w-1/2 mb-20" key={index}>
                                    <NewCharityCard 
                                      org={element} 
                                      cardType={cardType} 
                                      liked={liked} 
                                      cart={cart} 
                                      setOpen={setOpen} 
                                      setCart={setCart} 
                                      setToPool={setToPool} 
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div className="w-1/2 relative top-60" key={index}>
                                    <NewCharityCard 
                                      org={element} 
                                      cardType={cardType} 
                                      liked={liked} 
                                      cart={cart} 
                                      setOpen={setOpen} 
                                      setCart={setCart} 
                                      setToPool={setToPool} 
                                    />
                                </div>
                            )
                        }
                    }) : ''
                }
            </div>


                {/* <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 className="text-xl font-bold mb-4">Minimum Donation</h2>
        
                        <div className="mb-4">
                            <p className="text-sm">
                               Due to processing fees, the minimum donation amount is 2 Coins. ($10)
                                    To make a separate donation, you'll need to either de-select a charity you've 
                                already chosen, or add
                            </p>
                        </div>
 
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">Close</button>
                            <button onClick={handleClickAdd} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                                Add Coin
                            </button>

                            {cart.coin.qty === 1 &&
                                <button onClick={() => handleClickPool()} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Pool</button>
                            }
                        </div>

                    </div>
                </div> */}

        </div>
    )
};

export default AllDonation;

