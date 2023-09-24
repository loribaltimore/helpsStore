import { useContext, useState } from 'react';
import { CheckoutContext } from 'components/CheckoutContext';
import Link from 'next/link';
import Undonate from 'components/Undonate';

function ChooseCharity({ charity, cart }) {
    let { setChosenCharity } = useContext(CheckoutContext);
    let [isHover, setIsHover] = useState(false);

    let style = {
        true: "border-2 border-gray-400 h-96",
        false: `bg-cover bg-center h-96 cursor-pointer relative bg-no-repeat` // You'll need to handle the backgroundImage through inline styles or other method.
    };

    return (
        <div className={`w-1/4 ${style[typeof charity !== 'object']}`} 
             onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
             style={typeof charity !== 'object' ? {} : { backgroundImage: `url(${charity.coverImageUrl})` }}>
             
            <div className="text-center">
                {charity.coin !== undefined && <Undonate org={charity} cart={cart} />}

                <div className="h-1/3">
                    {charity === false ? (
                        <h1 className="bg-beige">Choose Charity</h1>
                    ) : charity === 'home' ? (
                        <h1 className="bg-beige">Like Charities</h1>
                    ) : null}
                </div>

                <div className="h-1/3">
                    {charity === false ? (
                        <h3>Press Donate to Choose Charity</h3>
                    ) : charity === 'home' ? (
                        <h3>Press the Heart Icon to like Charity</h3>
                    ) : null}
                </div>

                <div className="mt-20 grid grid-cols-3 gap-4">
                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                        {charity === false ? (
                            <span className="text-5xl text-goldenrod"></span> // Placeholder for TollTwoToneIcon
                        ) : charity === 'home' ? (
                            <div>
                                <span className="text-5xl text-pink">Heart Icon Placeholder</span>
                                <Link href="'/explore'" className="mt-12 bg-blue-600 text-white p-2 rounded">Explore</Link>
                            </div>
                        ) : charity.coin !== undefined ? (
                            <h1 className="text-6xl text-goldenrod">{charity.coin}</h1>
                        ) : null}
                    </div>
                    <div className="col-span-1"></div>
                </div>

            </div>
        </div>
    )
};

export default ChooseCharity;
