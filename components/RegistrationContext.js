"use client"
import { createContext, useState } from 'react';

export const RegistrationContext = createContext();

export function RegistrationProvider({children, isRegistered}) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [streetAddress, setStreetAddress] = useState('');
    const [zip, setZip] = useState('');
    const [coord, setCoord] = useState([]);
    const [location, setLocation] = useState(undefined);
    const [manualLoc, setManualLoc] = useState(false);
    const [age, setAge] = useState('');
  const [files, setFiles] = useState([]);
  const [preferredAge, setPreferredAge] = useState('28');
  const [preferredGender, setPreferredGender] = useState('');
    const [preferredDistance, setPreferredDistance] = useState('10');
    const [isPersonality, setIsPersonality] = useState(false);
    const [Openness, setOpenness] = useState(0);
    const [Agreeableness, setAgreeableness] = useState(0);
    const [Extraversion, setExtraversion] = useState(0);
    const [Conscientiousness, setConscientiousness] = useState(0);
    const [Neuroticism, setNeuroticism] = useState(0);
    const [entered, setEntered] = useState(false);

    return (
        <RegistrationContext.Provider
            value={{
                username, setUsername, hobbies,
                setHobbies, description, setDescription, setImages, images, name, setName,
                streetAddress, setStreetAddress, zip, setZip, coord, setCoord,
                location, setLocation, manualLoc, setManualLoc, age, setAge,
                files, setFiles, preferredAge, setPreferredAge, preferredGender,
                setPreferredGender, preferredDistance, setPreferredDistance,
                isPersonality, setIsPersonality, Openness, setOpenness,
                Agreeableness, setAgreeableness, Extraversion, setExtraversion,
                Conscientiousness, setConscientiousness, Neuroticism, setNeuroticism,
                entered, setEntered, isRegistered
            }}
        >
            {children}
        </RegistrationContext.Provider>
    )
};