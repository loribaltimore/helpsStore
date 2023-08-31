"use client"
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
    Legend,
  ArcElement
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, ArcElement);

export const bubbleOptions = {
  scales: {
    y: {
          beginAtZero: true,
          min: 0,
          max: 10,
          ticks: {
              stepSize: 1
            }
        },
        x: {
            beginAtZero: false,
            min: 18,
            max: 50,
            ticks: {
                stepSize: 5
            }
      }
  },
};




export default function DashboardWidget({ looksMetrics, likeRatio }) {
    console.log(likeRatio)
    const bubbleData = {
  datasets: [
            {
                label: 'Red dataset',
                data: looksMetrics ? Array.from(looksMetrics).map(([key, value]) => ({
                    x: parseInt(key),
                    y: Math.round(value.total / value.count),
                })) : null
            }
  ],
    };
    const doughnutData = {
  labels: ['liked', 'passed'],
  datasets: [
    {
      label: '# of Votes',
      data: likeRatio ?[ likeRatio.liked, likeRatio.passed] : null,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
    return (
        <div>
            {looksMetrics ? 
            <Bubble
            options={bubbleOptions}
                data={bubbleData}
                /> : null}
            {
                likeRatio ? 
                    <div className='w-100'>
                        <Doughnut data={doughnutData} /> 
                        </div>: null
            }
        </div>
    )
}