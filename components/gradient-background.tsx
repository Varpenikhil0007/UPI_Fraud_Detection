"use client"

import { useEffect, useRef } from "react"

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let time = 0
    const colors = [
      { r: 147, g: 51, b: 234 }, // Purple
      { r: 236, g: 72, b: 153 }, // Pink
      { r: 249, g: 115, b: 22 }, // Orange
    ]

    // Animation function
    const animate = () => {
      time += 0.005

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Animate gradient colors - ensure positions are always between 0 and 1
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i]
        // Calculate base position
        let position = i / (colors.length - 1)
        // Add sine wave variation but ensure it stays in range
        position = Math.max(0, Math.min(1, position + Math.sin(time + i) * 0.1))
        gradient.addColorStop(position, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`)
      }

      // Fill background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()

      // Apply skew transform
      ctx.transform(1, 0.2, 0, 1, 0, 0)
      ctx.fillStyle = gradient
      ctx.fillRect(-100, 0, canvas.width + 200, canvas.height)

      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[400px] overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

