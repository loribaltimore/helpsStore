"use client"
import UserInformation from 'components/UserInformation';
import SelectCauses from 'components/SelectCauses';
import UserAddress from 'components/UserAddress';
import UserContact from 'components/UserContact';
// import JustLoadBar from 'components/JustLoadBar';
import { useState } from 'react';


function SignUp({}) {
    let [renderBio, setRenderBio] = useState(false);
    let [renderInterests, setRenderInterests] = useState(true);
    let [renderAddress, setRenderAddress] = useState(false);
    let [isBilling, setIsBilling] = useState(false);
    let [renderContact, setRenderContact] = useState(false);
    let [renderAuth, setRenderAuth] = useState(false);
    
    return (
        <div className=''>
            {
                renderInterests === true ?
                    <SelectCauses setRenderBio={setRenderBio} setRenderInterests={setRenderInterests}/>: ''
            }
            {
                renderBio === true ?
                    <UserInformation setRenderBio={setRenderBio} setRenderAddress={setRenderAddress}/> : ''
            }
            {
                renderAddress === true ?
                    <UserAddress isBilling={isBilling} setIsBilling={setIsBilling} setRenderContact={setRenderContact} setRenderAddress={setRenderAddress}/> : ''
            }
            {
                renderContact === true ?
                    <UserContact setRenderAuth={setRenderAuth} setRenderContact={setRenderContact} /> : ''
            }
        </div>
    )
};

export default SignUp;