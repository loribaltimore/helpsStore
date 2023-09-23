import React from 'react';
import UserMenu from 'components/UserMenu';
import CartBtn from 'components/CartBtn';
import Link from 'next/link'

function AltNav({cart}) {

    const pages = [
          <Link href="/home" className="font-extralight text-black text-2xl font-bold">Home</Link>,
        <Link href="/explore" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={1}>Explore</Link>,
        <Link href="/master" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={2}>Orders</Link>,
        <Link href="/shop" className="font-extralight text-black text-2xl my-4 text-center cursor-pointer" key={3}>Shop</Link>,
        <CartBtn serverCart={cart} />,
        <UserMenu />
    ];

    return (
                    <div className="flex space-x-4 border border-black rounded p-3 mb-5">
                        {pages.map((page) => (
                            <div key={page} className='hover:scale-110'>{page}</div>
                        ))}
                    </div>
    );
}

export default AltNav;


///back button and master page;

// display which charities are included in /checkout => figure out what the order is between /donate and / Checkout /
//     checkout comes first
// make sure undonate is working.