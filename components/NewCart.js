"use client"
import { addToCart, removeFromCart } from 'lib/updateCart';
import { useState, useContext } from 'react';
import { MainContext } from 'components/MainContext';
import Link from 'next/link';

function NewCart({ currentUser, cart }) {
  let { setCart, renderCart, setRenderCart } = useContext(MainContext);
  let [isHover, setIsHover] = useState(false);
  let handleClick = async (type, item) => {
    if (type === 'add') {
      let response = await addToCart(currentUser, cart, item, cart.coin).then(data => { return data }).catch(err => console.log(err));
      setCart(response);
    } else {
      let response = await removeFromCart(cart, item).then(data => { console.log(data); return data }).catch(err => console.log(err));
      !response.items.length ?
        setCart(undefined) : setCart(response);
    }
  };

  let handleHover = () => {
    setIsHover(true);
  };

  let handleLeave = () => {
    setIsHover(false);
  }
  return (
    <div className="text-black  absolute bg-white w-1/4 mt-32 z-30">
      {
        renderCart ?
          <div className='border border-black rounded '>
            {
              cart && cart.items.map((element, index) => (
                <div key={index} className="p-3 cursor-pointer w-full" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                  <div className="flex space-x-1">
                    <img src={element.img} className="rounded-full w-10 h-10" />
                    <div className="w-3/4 text-center">
                      <h2 className="text-md font-extralight">{element.name}</h2>
                    </div>
                  </div>
                  <div className="flex p-3 space-x-3">
                    <div className="w-full flex space-x-1">
                      <div className="w-full rounded border border-black" style={{ backgroundColor: element.config.colors[0] }}></div>
                      <div className="w-full  rounded border border-black" style={{ backgroundColor: element.config.colors[1] }}></div>
                    </div>
                    <div className="w-1/4 text-center">
                      <h3 className="font-extralight">{element.config.size}</h3>
                    </div>
                    <div className="w-1/4 text-center">
                      <h2 className="font-extralight">${element.price}</h2>
                    </div>
                    <div className="w-1/4 text-center">
                      <h2 className="font-extralight">qty:{element.config.qty}</h2>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            }
            <div className="text-center bg-beige">
        {cart ? <h2>Total ${cart.total}</h2> : 'Cart Empty'}
      </div>
            {cart && <div className="text-center my-4"
            ><Link href="/checkout" className="px-4 py-2 bg-blue-500 text-white rounded">Checkout</Link></div>}
            </div> : null
      }
    </div>
  );
      }
     

export default NewCart;
