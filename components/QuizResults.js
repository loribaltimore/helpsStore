"use client"
import Link from 'next/link';
import { useState, useContext } from 'react';
import AreYouSure from 'components/AreYouSure';
import { ReviewContext } from 'components/ReviewContext';
import { NotifContext } from 'components/NotifContext';
import { PolarArea } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export default function QuizResults({ setConnection, connection, compatibility}) {;
  const [areYouSure, setAreYouSure] = useState(false);
  const { setBankConnection } = useContext(ReviewContext);
  const {setPChat} = useContext(NotifContext);
const chartConfig  = {
  labels: [
    'Neuroticism',
    'Agreeableness',
    'Extraversion',
    'Conscientiousness',
    'Openness'],
  datasets: [{
    label: 'Compatibility Results',
    data: Object.values(compatibility) || [0, 0, 0, 0, 0],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ],
    
  }]
};
    return (
        <div className=' w-100 mx-auto block space-y-5 bg-white p-5 rounded '>
            <h1 className='block mx-auto text-4xl text-black font-extralight'>Compatability Results</h1>
        <p className='text-sm text-slate-800'>
          This graph is a visual representation of your compatibility across the Big 5 personality traits.
            </p>
            <div className='w-1/3 block mx-auto'>
                <PolarArea data={chartConfig} />
            </div>
            <p className='text-xs text-black italic'>**The higher a value, the more compatibility there is in that category.</p>
            <div className='flex space-x-5'>
                <button className='text-black border border-black py-2 px-3 rounded'
                    onClick={() => {
                      setConnection(false);
                      setBankConnection(undefined);
                      setPChat(true);
                    }}
                >Match</button>
                <button className='text-black border border-black p-2 px-3 rounded'
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