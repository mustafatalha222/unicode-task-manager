'use client'
import React, { useEffect } from 'react'
import PieChart from './components/PieChart'
import useApi from '@/hooks/useApi'
import { Skeleton } from '@/components/ui/skeleton'
import { socket } from '@/lib/socket'
import { useTranslations } from 'next-intl'

function Dashboard() {
  const t = useTranslations()
  const { data, loading, refresh } = useApi('/api/task')
  const { data: tasks = [] } = data || {}

  useEffect(() => {
    //refresh task on socket event
    socket.on('refreshTasks', () => {
      refresh()
    })

    return () => {
      socket.off('refreshTasks')
    }
  }, [])

  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold my-4">{t('My Tasks By Status')}</h1>

      {loading ? <Skeleton className="h-32 mt-2" /> : <PieChart tasks={tasks} />}
    </div>
  )
}

export default Dashboard
