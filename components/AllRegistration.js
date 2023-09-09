"use client"
import RegistrationForm from 'components/RegistrationForm';
import Big5Quiz from 'components/Big5Quiz';
import { RegistrationContext } from 'components/RegistrationContext';
import { useContext, useState } from 'react';

export default function AllRegistration(){
    const { isPersonality } = useContext(RegistrationContext);
    const [isLocation, setIsLocation] = useState(false);

    return (
        <div>
            {
                isPersonality
                    && !isLocation ?
                    <Big5Quiz />
                    : <RegistrationForm
                        isLocation={isLocation}
                        setIsLocation={setIsLocation}
                    />
            }
        </div>
    )
};
