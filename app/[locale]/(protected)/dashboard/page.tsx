'use client'
import React, { useEffect } from 'react'
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import useApi from '@/hooks/useApi'
import { Skeleton } from '@/components/ui/skeleton'
import { socket } from '@/lib/socket'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Dashboard() {
  const t = useTranslations()
  const { data, loading, refresh } = useApi('/api/task')
  const { data: tasks = [] } = data || {}

  useEffect(() => {
    socket.on('refreshTasks', () => {
      refresh()
    })

    return () => {
      socket.off('refreshTasks')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto container p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('Dashboard')}
          </h1>
          <Button
            onClick={refresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {t('Refresh')}
          </Button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {t('Tasks By Status')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <PieChart tasks={tasks} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {t('Tasks Timeline')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <LineChart tasks={tasks} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
