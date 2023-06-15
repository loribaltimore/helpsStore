"use client";
import MatchAction from './MatchAction';
import FullQuiz from '@/components/FullQuiz';

import { useState } from 'react';

export default function Matched({}) {
    const [isTrivia, setIsTrivia] = useState(false);
    const [isJokes, setIsJokes] = useState(false);

    return (
        <>
            {
                isTrivia ?
            <FullQuiz />
            :
            <MatchAction setIsTrivia={setIsTrivia} />
            }
        </>
    )
}