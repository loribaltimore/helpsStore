"use client"
import { addToCart, removeFromCart } from 'lib/updateCart';
import { useState, useContext } from 'react';
import {useEffect} from 'react';
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
    <div className="text-black font-extralight left-[10%] bg-gray-100 absolute  w-3/4 md:w-1/2 md:left-[25%] mt-32 z-30 shadow-xl rounded ">
      {
        renderCart ?
          <div className='w-full'>
            {
              cart && cart.items && cart.items.map((element, index) => (
                <div key={index} className="cursor-pointer w-full flex">
                  <img src={`/api/products/photos/${element.img}`} className="rounded max-w-[3rem] max-h-[5rem] aspect-auto" />
                  <div className={'pt-2 w-3/4'}>
                  <div className="flex space-x-1">
                    <div className="w-3/4 text-center">
                      <h2 className="text-md font-extralight">{element.name}</h2>
                    </div>
                  </div>
                  <div className="flex p-3 space-x-3 ">
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
                </div>
              ))
            }
            <div className="text-center bg-beige">
        {cart && cart.items && cart.items.length ? <h2>Total ${cart.total}</h2> : 'Cart Empty'}
      </div>
            {cart && cart.items && cart.items.length ? <div className="text-center my-4"
                onClick={() => setRenderCart(false)}
            > <div className={'w-full space-x-2'}>
                  <Link href="/checkout" className="w-3/4 px-2 py-2 bg-gray-200 shadow-xl text-black font-extralight rounded hover:scale-105 active:scale-100">Checkout</Link>
                  <button className="w-1/4 px-1 py-1 bg-gray-200 shadow-xl text-black font-extralight rounded hover:scale-105 active:scale-100">Close</button>
            </div>
            </div>
              : <div className="text-center my-4"
                onClick={() => setRenderCart(false)}
            ><Link href="/shop" className="px-4 py-2 bg-gray-200 shadow-xl text-black font-extralight rounded hover:scale-105 active:scale-100">Shop</Link></div>}
            </div> : null
      }
    </div>
  );
      }
     

export default NewCart;
