import styled, { css } from 'styled-components'

interface ContainerProps {
  error?: boolean
}

export const Container = styled.div<ContainerProps>`
  ${({ error }) => css`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;

    input {
      font-family: inherit;
      font-size: 1rem;
      padding-left: 10px;
      border-radius: 7px;
      border: 1.9px solid;
      border-color: ${error ? '#f44336' : '#b4b1b1'};
      height: 50px;
      width: 100%;
      outline: none;
    }

    input:focus {
      border: 1.9px solid #000000;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 2px;
    }

    p {
      font-size: 1rem;
      margin-top: 5px;
      color: #f44336;
    }
  `}
`
