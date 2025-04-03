"use client"

import { useEffect, useRef } from "react"

export default function GlobeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Globe parameters
    const radius = Math.min(canvas.width, canvas.height) * 0.35
    const center = { x: canvas.width / 2, y: canvas.height / 2 }

    // Points on the globe
    const points: { x: number; y: number; z: number; size: number; color: string }[] = []
    const connections: { from: number; to: number }[] = []

    // Generate random points on the globe
    for (let i = 0; i < 200; i++) {
      // Random spherical coordinates
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      points.push({
        x,
        y,
        z,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.8 ? "#a855f7" : "#f472b6",
      })
    }

    // Create some connections between points
    for (let i = 0; i < 100; i++) {
      const from = Math.floor(Math.random() * points.length)
      const to = Math.floor(Math.random() * points.length)
      if (from !== to) {
        connections.push({ from, to })
      }
    }

    // Animation variables
    let rotationY = 0
    const rotationX = Math.PI / 10

    // Animation function
    const animate = () => {
      rotationY += 0.002

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw globe outline
      ctx.beginPath()
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"
      ctx.stroke()

      // Sort points by z-coordinate for proper rendering
      const sortedPoints = points
        .map((point, index) => {
          // Apply rotation
          const x = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY)
          const z = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY)
          const y = point.y * Math.cos(rotationX) + z * Math.sin(rotationX)
          const newZ = -point.y * Math.sin(rotationX) + z * Math.cos(rotationX)

          return {
            index,
            x: center.x + x,
            y: center.y + y,
            z: newZ,
            size: point.size,
            color: point.color,
            alpha: (newZ + radius) / (radius * 2),
          }
        })
        .sort((a, b) => a.z - b.z)

      // Draw connections
      ctx.lineWidth = 0.5
      connections.forEach((conn) => {
        const from = sortedPoints.find((p) => p.index === conn.from)
        const to = sortedPoints.find((p) => p.index === conn.to)

        if (from && to && from.alpha > 0.1 && to.alpha > 0.1) {
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.strokeStyle = `rgba(148, 163, 184, ${Math.min(from.alpha, to.alpha) * 0.3})`
          ctx.stroke()
        }
      })

      // Draw points
      sortedPoints.forEach((point) => {
        if (point.alpha > 0) {
          ctx.beginPath()
          ctx.arc(point.x, point.y, point.size * point.alpha, 0, Math.PI * 2)
          ctx.fillStyle =
            point.color +
            Math.floor(point.alpha * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

