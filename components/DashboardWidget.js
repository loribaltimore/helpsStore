"use client"
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
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




export default function DashboardWidget({ looksMetrics }) {
    const data = {
  datasets: [
            {
                label: 'Red dataset',
                data: Array.from(looksMetrics).map(([key, value]) => ({
                    x: parseInt(key),
                    y: Math.round(value.total / value.count),
                }))
            }
  ],
};
    return (
        <div>
            <Bubble
  options={options}
  data={data}

/>
        </div>
    )
}