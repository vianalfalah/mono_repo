import { useState, useEffect } from 'react'
import { IDELayout } from '@mono/ui'

export default function App() {
  const [cpuUsage, setCpuUsage] = useState<number[]>([12, 45, 23, 89, 56, 34, 12, 8])
  const [memUsage, setMemUsage] = useState(45.2)

  // Fake changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => prev.map(() => Math.floor(Math.random() * 100)))
      setMemUsage(prev => {
        let next = prev + (Math.random() * 4 - 2)
        if (next > 95) next = 95
        if (next < 20) next = 20
        return Number(next.toFixed(1))
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <IDELayout appName="System Monitor" activePath="/htop-monitor">
      <div className="p-6 w-full text-[#cccccc]">
        <div className="mb-6 border-b border-[#333333] pb-4">
          <h1 className="text-xl font-bold text-primary mb-2">htop - vian-portfolio.local</h1>
          <p className="text-xs opacity-70">Uptime: 24 days, 13:42:15 | Load average: 1.45, 1.28, 1.15</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* CPU Cores */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold opacity-90 mb-3 border-b border-[#333333] pb-1">CPU Usage</h2>
            {cpuUsage.map((usage, index) => (
              <div key={index} className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0">{index + 1}</span>
                <div className="flex-1 h-3 bg-[#222222] border border-[#333333] relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${usage}%` }}
                  />
                </div>
                <span className="w-12 text-right">{usage}%</span>
              </div>
            ))}
          </div>

          {/* Memory & Swap */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold opacity-90 mb-3 border-b border-[#333333] pb-1">Memory</h2>
              <div className="flex items-center gap-3 text-xs mb-1">
                <span className="w-8 shrink-0">Mem</span>
                <div className="flex-1 h-3 bg-[#222222] border border-[#333333] relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${memUsage}%` }}
                  />
                </div>
                <span className="w-16 text-right">{memUsage.toFixed(1)}G/32G</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0">Swp</span>
                <div className="flex-1 h-3 bg-[#222222] border border-[#333333] relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <span className="w-16 text-right">0K/4G</span>
              </div>
            </div>

            {/* Fake Processes */}
            <div>
              <h2 className="text-sm font-semibold opacity-90 mb-3 border-b border-[#333333] pb-1">Top Processes</h2>
              <table className="w-full text-xs text-left">
                <thead className="opacity-60 border-b border-[#333333]">
                  <tr>
                    <th className="font-normal pb-1">PID</th>
                    <th className="font-normal pb-1">USER</th>
                    <th className="font-normal pb-1">CPU%</th>
                    <th className="font-normal pb-1">MEM%</th>
                    <th className="font-normal pb-1">COMMAND</th>
                  </tr>
                </thead>
                <tbody className="opacity-80">
                  <tr><td className="py-1">1024</td><td>node</td><td className="text-red-400">45.2</td><td>2.1</td><td>next start</td></tr>
                  <tr><td className="py-1">2043</td><td>node</td><td className="text-yellow-400">12.5</td><td>1.4</td><td>vite</td></tr>
                  <tr><td className="py-1">899</td><td>root</td><td>2.1</td><td>0.5</td><td>/sbin/launchd</td></tr>
                  <tr><td className="py-1">4562</td><td>vian</td><td>1.0</td><td>4.8</td><td>typescript-es...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </IDELayout>
  )
}
