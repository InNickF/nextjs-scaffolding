import React, { FunctionComponent } from 'react'
import { HeadingKind } from './props'
import './styles.css'

/**
 * link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param kind
 * Default: 'display' |
 * Specifies which heading kind to render.
 * @param className
 * Default: null |
 *  * You can use this prop to send a string with your custom css classes.
 * @param children |
 * The classic React children prop.
 * @interface HeadingProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A heading react component
 */
export const Heading: React.FC<HeadingKind> = ({
  kind = 'display',
  children,
  className,
  ...props
}) => {
  const customElements: { [key: string]: string } = {
    'subtitle-1': 'h5',
    'subtitle-2': 'h6',
    display: 'h1',
    'sub-display': 'h2'
  }

  const renderElement = () => {
    return customElements[kind] || kind
  }

  const Heading = renderElement() as unknown as FunctionComponent<
    Omit<HeadingKind, 'size'>
  >

  const prefix = 'heading'

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`, `${prefix}--${kind}-kind`]
    className && classes.push(className)

    return classes.join(' ')
  }

  return (
    <Heading {...props} className={getClasses()}>
      {children}
    </Heading>
  )
}
