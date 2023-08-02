/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect } from 'react'
import { Description } from './components/Description'

function App () {
  const offset = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const setTargetPosition = (x: number, y: number) => {
    if (targetRef.current === null || containerRef.current === null) { return }
    const maxX = containerRef.current.clientWidth - targetRef.current.clientWidth / 2
    const maxY = containerRef.current.clientHeight - targetRef.current.clientHeight / 2
    const minX = targetRef.current.clientWidth / 2
    const minY = targetRef.current.clientHeight / 2

    let newX = x < minX ? minX : x
    let newY = y < minY ? minY : y
    if (newX > maxX) { newX = maxX }
    if (newY > maxY) { newY = maxY }

    targetRef.current.style.top = `${newY / containerRef.current.clientHeight * 100}%`
    targetRef.current.style.left = `${newX / containerRef.current.clientWidth * 100}%`
  }

  useEffect(() => {
    const onResize = () => {
      if (targetRef.current === null) { return }
      const currentX = targetRef.current.offsetLeft
      const currentY = targetRef.current.offsetTop
      setTargetPosition(currentX, currentY)
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize) }
  }, [])

  const startMoving = (e: React.MouseEvent) => {
    if (targetRef.current === null) { return }
    offset.current = {
      x: e.nativeEvent.offsetX - targetRef.current.clientWidth / 2,
      y: e.nativeEvent.offsetY - targetRef.current.clientHeight / 2
    }
    isMoving.current = true
    targetRef.current.style.pointerEvents = 'none'
  }

  const onMoving = (e: React.MouseEvent) => {
    if (!isMoving.current || targetRef.current === null || containerRef.current === null) { return }
    const newX = e.nativeEvent.offsetX - offset.current.x
    const newY = e.nativeEvent.offsetY - offset.current.y

    setTargetPosition(newX, newY)
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
