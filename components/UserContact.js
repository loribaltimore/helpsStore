"use client"
import { SignUpContext } from './SignUpContext';
import { useState, useContext } from 'react';
import createUser from '../lib/createUser';
import { useRouter } from 'next/navigation';
import { MainContext } from 'components/MainContext';

function UserContact(props) {
    let {  billing, shipping, bio, interests, setShipping, setBilling, setContact } = useContext(SignUpContext);
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [renderAuth, setRenderAuth] = useState(false);
    const {currentUser} = useContext(MainContext);
    const router = useRouter();
const currentUserId = JSON.parse(currentUser)._id
    const handleClick = async () => {
        if (phone && email) {
            setRenderAuth(true);
            console.log(interests, 'interests')
             await createUser(bio, shipping, billing, { phone, email }, interests, currentUserId)
            .then(data => {
                    setBilling(undefined);
                    setShipping(undefined);
                    setBilling(undefined);
                    setContact(undefined);
                    // setRenderLoading(true);
                    setTimeout(async () => {
                        // setRenderLoading(false);
                        setRenderAuth(false);
                    }, 3000);
                     router.push('/home');
            }).catch(err => console.log(err));
        }
        };

console.log('THIS IS A CHANGE')
    return (
        <div className="flex justify-center items-center min-h-screen text-black font-extralight">
            <div className="bg-white p-10 rounded shadow-md border border-black w-1/2">
                <h1 className="text-center text-2xl mb-6">How can we get ahold of you?</h1>
                <div>
                    <label className="block mb-2 text-gray-700">Phone Number</label>
                    <input
                        className="w-full p-2 border border-black text-black rounded mb-2"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Email Address</label>
                    <input
                        className="w-full p-2 rounded mb-2 border border-black text-black"
                        value={email}
                        onKeyDown={(event) => { 
                        if (event.key === 'Enter') {
                            setRenderAuth(true)
                        }
                    }}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="flex justify-center mt-6"
                    
                >
                                {
                renderAuth === true &&
                    <button className="border border-black text-black px-4 py-2 rounded hover:scale-110 transform transition-all active:scale-90"
                        onClick={() => handleClick()}
                    >Submit</button>
            }
                </div>
            </div>
        </div>
    );
};

export default UserContact;


//finish user registration form

// undonate => set amt to donate => coin conversion => how to display on checkout page => user preferences =>