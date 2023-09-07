import styled from 'styled-components'

export const Container = styled.form`
  display: grid;
  gap: 40px;
  margin: 20px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: auto;

  input[type='file'] {
    display: none;
  }

  label {
    margin: auto;
    padding: 10px;
    width: 200px;
    background-color: #1e2044;
    color: #fff;
    border-radius: 8px;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
  }
`
