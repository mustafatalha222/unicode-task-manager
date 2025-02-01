import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useTranslations } from 'next-intl'

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Task = {
  id: string
  status: string
  createdAt: string
}

type LineChartProps = {
  tasks: Task[]
}

const LineChart: React.FC<LineChartProps> = ({ tasks }) => {
  const t = useTranslations()

  // Group tasks by date
  const tasksByDate = tasks.reduce((acc: Record<string, number>, task: Task) => {
    const date = new Date(task.createdAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  // Sort dates
  const sortedDates = Object.keys(tasksByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: t('Tasks Created'),
        data: sortedDates.map(date => tasksByDate[date]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('Tasks Creation Timeline'),
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
    <div className="h-[75vh]">
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart