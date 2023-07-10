"use client"
import Link from 'next/link';
import { useState } from 'react';
import AreYouSure from 'components/AreYouSure';
import { PolarArea } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const chartConfig  = {
  labels: [
    'Conscientiousness',
    'Thoughtfulness',
    'Oppenness',
    'Intuitiveness',
    'Extraversion'
  ],
  datasets: [{
    label: 'Compatibility Results',
    data: [Math.floor(Math.random() * 16 + 1),
    Math.floor(Math.random() * 12 + 1),
    Math.floor(Math.random() * 14 + 1),
    Math.floor(Math.random() * 12 + 1),
     Math.floor(Math.random() * 14 + 1)],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
};

export default function QuizResults({ setConnection, connection}) {;
    const [areYouSure, setAreYouSure] = useState(false);

    return (
        <div className='w-3/4 mx-auto block space-y-5 bg-white p-5 rounded-xl '>
            <h1 className='block mx-auto text-4xl text-black'>Compatability Results</h1>
            <p className='text-sm text-slate-800'>Based on the compatibility quiz results, our compatibility results graph examines the similarity of key personality traits between users: openness, extraversion, thoughtfulness, intuitiveness, and conscientiousness.
                It is important to clarify that the graph does not measure individual trait scores.
                Rather, it focuses on assessing compatibility by comparing the traits between users.
                This graph provides insights into the potential harmony and synergy between users based on shared characteristics.
                It serves as a valuable tool for users to gauge their compatibility with others in a meaningful way.</p>
            <div className='w-1/2 block mx-auto'>
                <PolarArea data={chartConfig} />
            </div>
            <p className='text-xs text-black'>**The higher a value, the more compatibility there is in that category.</p>
            <div className='flex space-x-5'>
                <Link className='bg-indigo-500 py-2 px-3 rounded-lg'
                    href={`/chat/${connection[connection.activelyConnectedWith].id}`}
                    onClick={() => {
                        setConnection(false);
                    }}
                >Chat</Link>
                <button className='bg-red-500 p-2 px-3 rounded-lg'
                    onClick={() => {
                        setAreYouSure(true);
                     }
                    }
                >Pass</button>
                {
                    areYouSure ?
                        <AreYouSure connection={connection} /> : null
                }
        </div>
        </div>
)
};