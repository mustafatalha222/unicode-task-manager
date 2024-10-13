import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useTranslations } from 'next-intl'

// Register required components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

type Task = {
  id: string
  status: string
}

type PieChartProps = {
  tasks: Task[]
}

const PieChart: React.FC<PieChartProps> = ({ tasks }) => {
  const t = useTranslations()
  // Prepare data
  const statusCounts = tasks.reduce((acc: Record<string, number>, task: Task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {})

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: t('Task Count'),
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  }

  return (
    <div className="h-[75vh]">
      <Pie data={data} />
    </div>
  )
}

export default PieChart
