import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MainContext } from './MainContext';
import UserMenu from './UserMenu';
import CartBtn from '../Cart/components/CartBtn';

function Navbar({ currentUser }) {
    let { cart } = useContext(MainContext);

    let isAdmin = currentUser && currentUser.admin.permissions.includes('admin');

    let router = useRouter();

    let isMaster = router.asPath === '/master';

    let Router = useRouter();

    return (
        <div className="pb-10">
            <nav className={`h-16 bg-teal-400 mb-8 w-1/4 rounded-full fixed left-${isMaster ? '1/3' : '2/5'} z-10 shadow-md`}>
                <div className="flex justify-between items-center h-full px-4">
                    <div className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                        <button onClick={() => Router.push('/home')} className="focus:outline-none">
                            {/* Placeholder for HomeOutlinedIcon */}
                            <div className="text-red-500 text-2xl">[HOME ICON]</div>
                        </button>
                    </div>
                    <div className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                        <button onClick={() => Router.push('/explore')} className="focus:outline-none">
                            {/* Placeholder for ContentPasteSearchIcon */}
                            <div className="text-red-500 text-2xl">[EXPLORE ICON]</div>
                        </button>
                    </div>
                    <div className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                        <CartBtn currentUser={currentUser} cart={cart} />
                    </div>
                    <div className={`${isAdmin ? 'w-1/5' : 'w-1/4'} text-center`}>
                        <UserMenu />
                    </div>
                    {
                        isAdmin &&
                        <div className="w-1/5 text-center">
                            <button onClick={() => Router.push('/master')} className="focus:outline-none">
                                {/* Placeholder for EngineeringOutlinedIcon */}
                                <div className="text-red-500 text-xl">[MASTER ICON]</div>
                            </button>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
};

export default Navbar;
