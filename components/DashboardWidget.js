"use client"
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
    Legend,
    ArcElement,
  CategoryScale,
  LineElement,
  Title,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';


ChartJS.register(LinearScale, PointElement, Tooltip, Legend, ArcElement, CategoryScale, LineElement, Title);

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

export const lineOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Overall Performance',
    },
  },
  scales: {
      y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
              beginAtZero: true,
              stepSize: 1,
              max: 10,
                min: 10
          }
      },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: true,
        },
      ticks: {
            beginAtZero: false,
            stepSize: 1
    },
    },
  },
};

const labels = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];



export default function DashboardWidget({ looksMetrics, likeRatio, likedLineData, datedLineData, matchedLineData, passedLineData }) {
    const bubbleData = {
  datasets: [
            {
                label: 'Looks Rating by Age',
                data: looksMetrics ? Array.from(looksMetrics).map(([key, value]) => ({
                    x: parseInt(key),
                    y: Math.round(value.total / value.count),
                    r: 9
                })) : null,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
    const lineData = {
  labels,
  datasets: [
    {
      label: 'Liked',
      data: likedLineData ? likedLineData : [1,2,3],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y1',
    },
    {
      label: 'Matched',
      data: matchedLineData ? matchedLineData : [1,2,3],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dated',
      data: datedLineData ? datedLineData : [1,2,3],
      borderColor: 'rgb(19, 212, 165)',
      backgroundColor: 'rgba(19, 212, 165, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Passed',
      data: passedLineData ? passedLineData : [1,2,3],
      borderColor: 'goldenrod',
      backgroundColor: 'goldenrod',
      yAxisID: 'y1',
    },
  ],
};

    return (
        <div className='w-100'>
            {looksMetrics ? 
            <Bubble
            options={bubbleOptions}
                data={bubbleData}
                /> : null}
            {
                likeRatio ?
                    <div className='w-100'>
                        <Doughnut data={doughnutData} />
                    </div> : null}
            {
                likedLineData ?
                        <Line options={lineOptions} data={lineData} /> : null
            }
        </div>
    )
}