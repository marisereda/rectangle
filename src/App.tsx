import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Description } from './components/Description'

function App () {
  const offset = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const setTargetPosition = (x: number, y: number) => {
    if (targetRef.current === null || containerRef.current === null) { return }
    const maxX = containerRef.current.clientWidth - targetRef.current.clientWidth
    const maxY = containerRef.current.clientHeight - targetRef.current.clientHeight

    let newX = x < 0 ? 0 : x
    let newY = y < 0 ? 0 : y
    // if (newX < 0) { newX = 0 }
    // if (newY < 0) { newY = 0 }

    if (newX > maxX) { newX = maxX }
    if (newY > maxY) { newY = maxY }

    targetRef.current.style.top = `${newY}px`
    targetRef.current.style.left = `${newX}px`
    targetRef.current.style.transform = 'translate(0%,0%)'
  }

  useEffect(() => {
    const onResize = () => {
      if (targetRef.current === null) { return }
      const currentX = targetRef.current.offsetLeft
      const currentY = targetRef.current.offsetTop
      setTargetPosition(currentX, currentY)
    }
    window.addEventListener('resize', onResize)
  }, [])

  const startMoving = (e: React.MouseEvent) => {
    if (targetRef.current === null) { return }
    offset.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    isMoving.current = true
    targetRef.current.style.pointerEvents = 'none'
  }

  const onMoving = (e: React.MouseEvent) => {
    if (!isMoving.current || targetRef.current === null || containerRef.current === null) { return }
    const newPositionX = e.nativeEvent.offsetX - offset.current.x
    const newPositionY = e.nativeEvent.offsetY - offset.current.y

    setTargetPosition(newPositionX, newPositionY)
  }

  const stopMoving = () => {
    if (targetRef.current === null) { return }
    isMoving.current = false
    targetRef.current.style.pointerEvents = 'auto'
  }
  return (
    <div className="App">
      <Description />
      <div
        className="container"
        ref={containerRef}
        onMouseMove={onMoving}
        onMouseUp={stopMoving}
        onMouseLeave={stopMoving}

      >
        B
        <div className="target" ref={targetRef} onMouseDown={startMoving}>A</div>
      </div>
    </div>
  )
}

export default App
