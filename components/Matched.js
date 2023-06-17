"use client";
import MatchAction from './MatchAction';
import FullQuiz from '@/components/FullQuiz';

import { useState } from 'react';

export default function Matched({currentMingle}) {
    const [isTrivia, setIsTrivia] = useState(false);
    const [isJokes, setIsJokes] = useState(false);

    return (
        <>
            {
                isTrivia ?
                    <FullQuiz currentMingle={currentMingle} />
            :
            <MatchAction setIsTrivia={setIsTrivia} />
            }
        </>
    )
}