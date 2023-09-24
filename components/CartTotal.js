"use client"
import { MainContext } from 'components/MainContext';
import { useContext } from 'react';

function CartTotal({ }) {
    const { cart } = useContext(MainContext);
    return (
        <div className="flex text-black font-extralight">
            <div className="w-1/3">
                {
                    cart !== undefined ? (
                        <div className="flex items-center space-x-2">
                            <span>Total:</span>
                            <span className="text-gray-500">${cart.total}</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <span>Total:</span>
                            <span className="text-gray-500">$0.00</span>
                        </div>
                    )
                }
            </div>

            <div className="w-1/3 flex items-center space-x-2">
                {/* Replaced Heroicon with placeholder */}
                <div className="bg-goldenrod w-6 h-6 relative top-0.5"></div> 
                <span>{cart !== undefined ? 5: 0}</span>
            </div>

            <div className="w-1/3">
                {
                    cart !== undefined && (
                        <div className="flex items-center space-x-2">
                            {/* Replaced Heroicon with placeholder */}
                            <div className="bg-blue-500 w-6 h-6"></div>
                            <span>{cart.pool}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CartTotal;
