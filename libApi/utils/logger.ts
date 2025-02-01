import fs from 'fs/promises'
import path from 'path'

interface LogEntry {
  method: string
  path: string
  status: number
  response?: any
  error?: any
  userId?: string
}

export class Logger {
  private static async writeLog(logEntry: LogEntry, logType: 'api' | 'error') {
    try {
      const timestamp = new Date()
      const dateStr = timestamp.toISOString().split('T')[0]
      const logDir = path.join(process.cwd(), 'logs')
      const logFile = path.join(logDir, `${logType}-${dateStr}.log`)

      // Ensure logs directory exists
      await fs.mkdir(logDir, { recursive: true })

      const logMessage = JSON.stringify({
        ...logEntry,
        timestamp: timestamp.toISOString(),
      }) + '\n'

      await fs.appendFile(logFile, logMessage)
    } catch (err) {
      console.error('Logging failed:', err)
    }
  }

  static async logApi(entry: LogEntry) {
    await this.writeLog(entry, 'api')
  }

  static async logError(entry: LogEntry) {
    await this.writeLog(entry, 'error')
  }
} 