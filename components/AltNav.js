import React from 'react';
import UserMenu from 'components/UserMenu';
import CartBtn from 'components/CartBtn';
import Link from 'next/link'
import { v4 } from 'uuid';
function AltNav({cart}) {

    const pages = [
          <Link key={v4()} href="/home" className="font-extralight text-black text-2xl font-bold">Home</Link>,
        <Link key={v4()} href="/explore" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={1}>Explore</Link>,
        <Link key={v4()} href="/master" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={2}>Orders</Link>,
        <Link key={v4()} href="/shop" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={3}>Shop</Link>,
        <CartBtn serverCart={cart} />,
        <UserMenu />
    ];

    return (
                    <div className="flex space-x-4 border border-black rounded p-3 mb-5">
                        {pages.map((page, index) => (
                            <div key={v4()} className='hover:scale-110'>{page}</div>
                        ))}
                    </div>
    );
}

export default AltNav;


///back button and master page;

// display which charities are included in /checkout => figure out what the order is between /donate and / Checkout /
//     checkout comes first
// make sure undonate is working.