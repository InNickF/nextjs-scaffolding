import { forwardRef } from 'react'
import { SkeletonTextProps } from '../../props'
import './styles.css'

/**
 * SkeletonText Component
 * @see {@link https://todo.com/} for official documentation.
 * @param rows
 * Default: '1' |
 * Specifies quantity of elements to render..
 * @param kind
 * Default: 'full' |
 * Specifies kind of element to render.
 * @param lastHalf
 * Default: false |
 * Specifies the last item width.
 * @returns
 * A SkeletonText react component
 */
export const SkeletonText = forwardRef<HTMLSpanElement, SkeletonTextProps>(
  ({ rows = 1, kind = 'paragraph', lastHalf = false, ...props }, ref) => {
    const prefix = 'skeleton-text'

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}-${kind}`]
      return classes.join(' ')
    }

    return (
      <>
        <div
          className={
            lastHalf ? `${prefix}--last-half` : `${prefix}__container`
          }>
          {[...Array(rows)].map((val, index) => {
            return (
              <span
                role={kind}
                ref={ref}
                className={getClasses()}
                key={index}
                {...props}
              />
            )
          })}
        </div>
      </>
    )
  }
)

SkeletonText.displayName = 'SkeletonText'
