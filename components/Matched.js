"use client";
import MatchAction from './MatchAction';
import FullQuiz from '@/components/FullQuiz';

import { useState } from 'react';

export default function Matched({matched, setMatched}) {
    const [isTrivia, setIsTrivia] = useState(false);
    const [isJokes, setIsJokes] = useState(false);

    return (
        <>
            {
                isTrivia ?
                    <FullQuiz connection={connection} setConnection={setConnection} />
            :
            <MatchAction setIsTrivia={setIsTrivia} />
            }
        </>
    )
};

// allProfiles => ProfileCard => Matched => FullQuiz is waiting for connection data, not user data to determine answers.
// after a user is liked in ProfileCard, isMatched returns a user. Have it return the connection instead