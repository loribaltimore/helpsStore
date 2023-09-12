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
import { Pie } from 'react-chartjs-2';
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



export default function DashboardWidget({ looksMetrics, likeRatio, likedLineData, datedLineData, matchedLineData, passedLineData, pieDataTest }) {
    const pieData = {
  labels: ['28', '29', '30', '31', '32', '33'],
  datasets: [
    {
      label: '# of Likes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(106, 0, 0, 0.8)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  
  const bubbleData = {
  datasets: [
            {
                label: 'Looks Rating by Age',
          data: looksMetrics ? Object.keys(JSON.parse(looksMetrics)).map((key, index) => {
              return {
                  x: parseInt(key),
                  y: Math.round(JSON.parse(looksMetrics)[key].total / JSON.parse(looksMetrics)[key].count),
                  r: 9
              }
                }) : null,
                backgroundColor: '#7C02F3',
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
      borderColor: 'rgba(106, 0, 0, 0.8)',
      backgroundColor: 'rgba(106, 0, 0, 0.8)',
      yAxisID: 'y1',
    },
    {
      label: 'Matched',
      data: matchedLineData ? matchedLineData : [1,2,3],
      borderColor: 'rgba(0, 0, 106, 0.8)',
      backgroundColor: 'rgba(0, 0, 106, 0.8)',
      yAxisID: 'y',
    },
    {
      label: 'Dated',
      data: datedLineData ? datedLineData : [1,2,3],
      borderColor: 'rgba(0, 106, 7, 0.8)',
      backgroundColor: 'rgba(0, 106, 7, 0.8)',
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
        <div className=''>
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
                        <Line options={lineOptions} data={lineData} /> : pieDataTest ? <Pie data={pieData} /> : null
            }
        </div>
    )
}