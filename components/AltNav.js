import React from 'react';
import UserMenu from 'components/UserMenu';
import CartBtn from 'components/CartBtn';
import Link from 'next/link'
import { v4 } from 'uuid';
import Image from 'next/image';

function AltNav({cart}) {
    const pages = [
        <Link key={v4()} href="/home" className="font-extralight text-black text-2xl font-bold z-20">
            <Image
                src="/img/helpsLogoBig.png"
                alt="Picture of the author"
                width={40}
                height={40}
            />
        </Link>,
        <Link key={v4()} href="/explore" className=" font-extralight text-black text-2xl z-20 my-4 text-center cursor-pointer"><p className='my-1'>Explore</p></Link>,
        <Link key={v4()} href="/master" className="font-extralight text-black text-2xl z-20 my-4 text-center cursor-pointer"><p className='my-1'>Orders</p></Link>,
        <Link key={v4()} href="/shop" className="font-extralight text-black text-2xl z-20 my-4 text-center cursor-pointer"><p className='my-1'>Shop</p></Link>,
        <CartBtn serverCart={cart} key={v4()} />,
        <UserMenu key={v4()} />
    ];

    return (
                    <div className="flex space-x-4  bg-white shadow-xl  p-3 mb-5 z-100 relative">
                        {pages.map((page, index) => (
                            <div key={v4()} className={`${index !== 5 ? 'hover:scale-110':null} align-bottom`}>{page}</div>
                        ))}
                    </div>
    );
}

export default AltNav;


///back button and master page;

// display which charities are included in /checkout => figure out what the order is between /donate and / Checkout /
//     checkout comes first
// make sure undonate is working.