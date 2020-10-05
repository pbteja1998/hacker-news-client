import React from 'react'
import classNames from 'classnames'
import styles from './style.module.css'

export default function Ring({
  color = '#ff5a1f',
  size = 80,
  className = '',
  style = {},
  progress,
}: {
  color?: string
  size?: number
  className?: string
  style?: object
  progress?: number
}) {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        key={index}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.1,
        }}
      ></div>
    )
  })

  return (
    <div
      className={classNames(styles['lds-ring'], className)}
      style={{ width: size, height: size, ...style }}
    >
      {progress !== undefined && progress < 100 && (
        <p className='relative text-2xl font-semibold top-3/4 left-1/3'>
          {`${progress < 10 ? '0' : ''}${progress}`}
        </p>
      )}

      {circles}
    </div>
  )
}
