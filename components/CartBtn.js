"use client"
import { MainContext } from 'components/MainContext';
import { useContext } from 'react';

function CartBtn({ serverCart }) {
    let { renderCart, setRenderCart, cart, setCart } = useContext(MainContext);
    console.log(cart.items)
    console.log()
    const handleClick = async () => {
        setRenderCart(!renderCart);
        if (!cart) {
            setCart(serverCart);
        }
    };

    return (
        <div className="w-full">
            {
                cart && cart.items && cart.items.length > 0 ? (
                    <div className="relative inline-block w-[5rem]">
                        <h4 
                            onClick={handleClick} 
                            className="font-extralight text-black text-2xl cursor-pointer"
                        >
                            Cart
                        <span 
                            className="absolute top-0 right-0 border border-black text-black text-xs font-extralight rounded-full h-5 w-5 flex items-center justify-center"
                        >
                            {cart.items.length}
                        </span>
                        </h4>
                        
                    </div>
                ) : (
                    <h4 
                        onClick={handleClick} 
                        className="text-red-500 text-2xl cursor-pointer"
                    >
                        Cart
                    </h4>
                )
            }
        </div>
    )
};

export default CartBtn;
