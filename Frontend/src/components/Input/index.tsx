import { InputHTMLAttributes, forwardRef } from 'react'
import { Container } from './Input.styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  error?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type, error, ...props },
  ref
) {
  return (
    <Container error={Boolean(error)}>
      <label> {label} </label>
      <input type={type} {...props} ref={ref}></input>
      {error && <p>{error}</p>}
    </Container>
  )
})
