import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Description } from './components/Description'

function App () {
  const offset = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const startMoving = (e: React.MouseEvent) => {
    if (targetRef.current === null) { return }
    offset.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    isMoving.current = true
    targetRef.current.style.pointerEvents = 'none'
  }

  const onMoving = (e: React.MouseEvent) => {
    if (!isMoving.current || targetRef.current === null || containerRef.current === null) { return }
    const maxPositionX = containerRef.current.clientWidth - targetRef.current.clientWidth
    const maxPositionY = containerRef.current.clientHeight - targetRef.current.clientHeight
    let newPositionX = e.nativeEvent.offsetX - offset.current.x
    let newPositionY = e.nativeEvent.offsetY - offset.current.y

    if (newPositionX < 0) { newPositionX = 0 }
    if (newPositionY < 0) { newPositionY = 0 }
    if (newPositionX > maxPositionX) { newPositionX = maxPositionX }
    if (newPositionY > maxPositionY) { newPositionY = maxPositionY }

    targetRef.current.style.top = `${newPositionY}px`
    targetRef.current.style.left = `${newPositionX}px`
    targetRef.current.style.transform = 'translate(0%,0%)'
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
