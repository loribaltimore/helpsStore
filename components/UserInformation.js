"use client"
import { SignUpContext } from './SignUpContext';
import { useState, useContext } from 'react';

function UserInformation(props) {
    let { setRenderBio, setRenderAddress } = props;
    let { setBio } = useContext(SignUpContext);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [age, setAge] = useState('');

    let handleClick = () => {
        if (firstName && lastName && age ) {
            setBio({ firstName, lastName, age });
            setRenderBio(false);
            setRenderAddress(true);
        };
    };

    return (
        <div className="flex justify-center items-center m-32 text-black font-extralight">
            <div className="bg-white p-10 rounded border border-black w-1/2">
                <h1 className="text-center text-2xl mb-6">Tell us about yourself..</h1>
                <div>
                    <label className="block mb-2 text-gray-700">First Name</label>
                    <input
                        className="w-full p-2 border rounded mb-2 border border-black"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Last Name</label>
                    <input
                        className="w-full p-2 border rounded mb-2  border border-black"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Age</label>
                    <input
                        className="w-full p-2 border rounded mb-2  border border-black"
                        onChange={(event) => setAge(event.target.value)}
                        value={age}
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="border border-black text-black px-4 py-2 rounded hover:scale-110 transform transition-all active:scale-90"
                        onClick={() => handleClick()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;
