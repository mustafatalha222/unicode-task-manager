import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useTranslations } from 'next-intl'

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Task = {
  id: string
  priority: string
}

type BarChartProps = {
  tasks: Task[]
}

const BarChart: React.FC<BarChartProps> = ({ tasks }) => {
  const t = useTranslations()
  
  // Count tasks by priority
  const priorityCounts = tasks.reduce((acc: Record<string, number>, task: Task) => {
    if (task.priority) {
      acc[task.priority] = (acc[task.priority] || 0) + 1
    }
    return acc
  }, {})

  const data = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: t('Tasks by Priority'),
        data: Object.values(priorityCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('Tasks by Priority Distribution'),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default BarChart