"use client"
import { addToCart, removeFromCart } from 'lib/updateCart';
import { useState, useContext } from 'react';
import { MainContext } from 'components/MainContext';
import Link from 'next/link';

function NewCart({}) {
  let { setCart, renderCart, setRenderCart, cart, currentUser } = useContext(MainContext);

  let handleClick = async (type, item) => {
    if (type === 'add') {
      let response = await addToCart(JSON.parse(currentUser)._id, cart, item).then(data => { console.log(data); return data }).catch(err => console.log(err));
      setCart(response.cart);
    } else {
      let response = await removeFromCart(JSON.parse(currentUser)._id, cart, item).then(data => { console.log(data); return data }).catch(err => console.log(err));
      !response.cart.items.length ?
        setCart({total: 0}) : setCart(response.cart);
    }
  };

  return (
    <div className="text-black font-extralight  absolute bg-white w-1/4 mt-32 z-30 shadow-xl rounded ">
      {
        renderCart ?
          <div className=''>
            <div className='w-full h-[2rem] text-right py-1 px-3 font-extralight text-2xl cursor-pointer hover:text-3xl active:text-2xl'
              onClick={() => setRenderCart(false)}
            >
            X
              </div>
            {
              cart &&  cart.items && cart.items.map((element, index) => (
                <div key={index} className="p-3 cursor-pointer w-full">
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
                    <div className="w-1/4 text-center flex ">
                      <div className="font-extralight space-x-1 flex">
                        <span className='border rounded hover:bg-gray-200 active:bg-gray-300 active:scale-90'
                          onClick={() => handleClick('remove', element)}
                        >-</span>
                        <h1>{element.config.qty}</h1>
                        <span className='border rounded hover:bg-gray-200 active:bg-gray-300 active:scale-90'
                        onClick={() => handleClick('add', element)}
                        >+</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            }
            <div className="text-center bg-beige">
        {cart && cart.items && cart.items.length ? <h2>Total ${cart.total}</h2> : 'Cart Empty'}
      </div>
            {cart && cart.items && cart.items.length ? <div className="text-center my-4"
                onClick={() => setRenderCart(false)}
            ><Link href="/checkout" className="px-4 py-2 bg-blue-500 text-white rounded">Checkout</Link></div> 
              : <div className="text-center my-4"
                onClick={() => setRenderCart(false)}
            ><Link href="/shop" className="px-4 py-2 bg-gray-100 shadow-xl text-white rounded hover:scale-105 active:scale-100">Shop</Link></div>}
            </div> : null
      }
    </div>
  );
      }
     

export default NewCart;
