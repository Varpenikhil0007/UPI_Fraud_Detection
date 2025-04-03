"use client"

import { useEffect, useRef } from "react"

export default function ChartCard() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate the line chart
    const lineAnimation = () => {
      const line = document.querySelector(".chart-line") as SVGPathElement
      if (!line) return

      let progress = 0
      const duration = 2000
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        progress = Math.min(elapsed / duration, 1)

        line.style.strokeDashoffset = `${(1 - progress) * 300}`

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      line.style.strokeDasharray = "300"
      line.style.strokeDashoffset = "300"
      requestAnimationFrame(animate)
    }

    // Animate the bars
    const barAnimation = () => {
      const bars = document.querySelectorAll(".chart-bar") as NodeListOf<HTMLDivElement>
      if (!bars.length) return

      bars.forEach((bar, index) => {
        const height = bar.dataset.height || "0%"

        setTimeout(() => {
          bar.style.height = height
        }, index * 50)
      })
    }

    lineAnimation()
    barAnimation()
  }, [])

  return (
    <div
      ref={chartRef}
      className="bg-white rounded-xl shadow-lg p-6 transform rotate-1 transition-transform hover:rotate-0 duration-300"
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Fraud & risk</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-xs text-gray-600">Fraud disputes</span>
          </div>
          <div className="font-semibold flex items-center gap-1">
            <span className="counter" data-target="0.06">
              0.06
            </span>
            %<span className="text-green-500 text-xs">↓</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
            <span className="text-xs text-gray-600">UPI fraud attempts</span>
          </div>
          <div className="font-semibold flex items-center gap-1">
            <span className="counter" data-target="0.02">
              0.02
            </span>
            %
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-xs text-gray-600">Fraud rate</span>
          </div>
          <div className="font-semibold flex items-center gap-1">
            <span className="counter" data-target="0.08">
              0.08
            </span>
            %
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 w-full">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
            <span>150%</span>
            <span>100%</span>
            <span>50%</span>
            <span>0</span>
          </div>

          {/* Chart bars */}
          <div className="ml-8 h-full flex items-end">
            {Array.from({ length: 12 }).map((_, i) => {
              const blueHeight = Math.max(20, Math.min(90, 30 + Math.sin(i) * 30))
              const purpleHeight = Math.max(10, Math.min(70, 20 + Math.cos(i) * 20))

              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center space-x-1">
                    <div
                      className="w-2/3 bg-blue-500 chart-bar transition-all duration-1000 ease-out"
                      data-height={`${blueHeight}%`}
                      style={{ height: "0%" }}
                    ></div>
                    <div
                      className="w-1/3 bg-purple-500 chart-bar transition-all duration-1000 ease-out"
                      data-height={`${purpleHeight}%`}
                      style={{ height: "0%" }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Line chart overlay */}
          <div className="absolute inset-0 ml-8 flex items-center">
            <svg className="w-full h-20" viewBox="0 0 100 20">
              <path
                className="chart-line"
                d="M0,10 Q10,5 20,10 T40,8 T60,12 T80,7 T100,10"
                fill="none"
                stroke="#ef4444"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 mt-1 ml-8">
            <span>Aug '19</span>
            <span className="ml-auto">Dec '19</span>
          </div>
        </div>
      </div>
    </div>
  )
}

