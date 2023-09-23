import React, { useContext } from 'react';
import { addToCart, removeFromCart } from 'lib/updateCart';
import { MainContext } from 'components/MainContext';
import CheckoutBtn from 'components/CheckoutBtn';
import DonateBtn from 'components/DonateBtn';
import CartTotal from './CartTotal';

function CartDropdown({ isFinalStep, currentUser, toPool, setOpen }) {
  let { setCart, cart } = useContext(MainContext);
  console.log(cart);
  
  const handleClick = async (type, item) => {
    if (type === 'add') {
      let response = await addToCart(currentUser, cart, item, cart.coin).then(data => { return data }).catch(err => console.log(err));
      setCart(response);
    } else {
      let response = await removeFromCart(cart, item).then(data => { return data }).catch(err => console.log(err));
      !response.items.length ?
        setCart(undefined) : setCart(response);
    }
  };

  return (
    <div className="rounded bg-white font-extralight">
      <ul className="divide-y divide-gray-200">
        {cart !== undefined ?
          cart.items.map(function (element, index) {
            return (
              <li key={index} className="py-2 ">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img src={element.img} alt={element.name} className="w-24 h-24" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg text-gray-900 truncate">{element.name}</p>

                    <div className="p-3 space-x-3 text-black w-full h-full">

                      <div className='w-full h-1/4'>
                        <div className="w-full h-full flex space-x-1">
                      <div className="w-1/4 h-full rounded border border-black" style={{ backgroundColor: element.config.colors[0] }}></div>
                      <div className="w-1/4 h-full rounded border border-black" style={{ backgroundColor: element.config.colors[1] }}></div>
                    </div>
                      </div>

                      <div className='flex space-x-3 py-2'>
                        <div className="text-center">
                      <h3 className="font-extralight">Size: {element.config.size}</h3>
                    </div>
                    <div className="text-center">
                      <h2 className="font-extralight">${element.price}</h2>
                    </div>
                    <div className=" text-center">
                      <h2 className="font-extralight">qty:{element.config.qty}</h2>
                    </div>
                    </div>
                    <div className="py-3">
                      <button
                        onClick={() => handleClick('add', element)}
                        className="mr-2 border rounded px-2 text-black"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => handleClick('remove', element)}
                        className="border rounded px-2  text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                    
                  </div>
                </div>
              </li>
            );
          }) :
          <li className="py-2">
            <p className="text-lg font-medium text-gray-900">Cart Empty</p>
          </li>
        }
        {cart !== undefined ?
          <li className="pt-4">
            <CartTotal cart={cart} />
          </li> :
          <li className="pt-4">
            <CartTotal cart={undefined} />
          </li>
        }
        {isFinalStep === false ?
          cart !== undefined && cart.items.length ?
            <li className="pt-4">
              <DonateBtn />
            </li> : '' :
          cart !== undefined
            // && cart.coin.qty === 0
            ?
            <li className="pt-4">
              <CheckoutBtn canCheckout={true} toPool={toPool} />
            </li> :
            <li className="pt-4">
              <CheckoutBtn canCheckout={false} setOpen={setOpen} />
            </li>
        }
      </ul>
    </div>
  );
}

export default CartDropdown;
