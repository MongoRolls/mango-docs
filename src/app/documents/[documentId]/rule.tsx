import type { MouseEvent as ReactMouseEvent } from 'react'
import { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'

const markers = Array.from({ length: 83 }, (_, index) => index)

function Ruler() {
  const [leftMargin, setLeftMargin] = useState(56)
  const [rightMargin, setRightMargin] = useState(65)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)

  const ruleRef = useRef<HTMLDivElement>(null)

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true)
  }

  const handleMouseDownRight = () => {
    setIsDraggingRight(true)
  }

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const PAGE_WIDTH = 816
    const MINNUM_SPACE = 100

    if ((isDraggingLeft || isDraggingRight) && ruleRef.current) {
      const container = ruleRef.current.querySelector('#rule-container')
      if (container) {
        const containerRect = container.getBoundingClientRect()
        // 相对
        const relativeX = e.clientX - containerRect.left
        // 有效
        const rawPosition = Math.max(0, Math.min(relativeX, PAGE_WIDTH))

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MINNUM_SPACE
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition)

          // 协作 todo
          setLeftMargin(newLeftPosition)
        }
        else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMargin - MINNUM_SPACE
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)

          // 协作 todo
          setRightMargin(constrainedRightPosition)
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56)
  }

  const handleRightDoubleClick = () => {
    setRightMargin(65)
  }

  return (
    <div
      ref={ruleRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-neutral-300 flex items-center relative select-none print:hidden"
    >
      <div id="rule-container" className="w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={handleMouseDownLeft}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleMouseDownRight}
          onDoubleClick={handleRightDoubleClick}
        />
        {/*  */}
        <div className="absolute inset-x-0 bottom-0 h-full ">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82

              return (
                <div key={marker} className="absolute bottom-0" style={{ left: `${position}px` }}>
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 h-2 w-[1px] bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div className="absolute bottom-0 h-1.5 w-[1px] bg-neutral-500" />
                    </>
                  )}
                  {marker % 5 !== 0 && (
                    <>
                      <div className="absolute bottom-0 h-1 w-[1px] bg-neutral-500" />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number
  isLeft?: boolean
  isDragging?: boolean
  onMouseDown: () => void
  onDoubleClick: () => void
}

function Marker({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute top-0 left-1/2 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 duration-150"
        style={{
          width: '1px',
          height: '100vh',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none',
        }}
      />

    </div>
  )
}

export default Ruler
