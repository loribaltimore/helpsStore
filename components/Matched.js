"use client";
import MatchAction from './MatchAction';
import FullQuiz from '@/components/FullQuiz';

import { useState } from 'react';

export default function Matched(connection, setConnection) {
    const [isTrivia, setIsTrivia] = useState(false);
    const [isJokes, setIsJokes] = useState(false);

    return (
        <div className='min-w-3/4 items-center px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl '>
            {
                isTrivia ?
                    <FullQuiz connection={connection} setConnection={setConnection} />
            :
            <MatchAction setIsTrivia={setIsTrivia} />
            }
        </div>
    )
};