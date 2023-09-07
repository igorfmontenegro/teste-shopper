import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 40px;
`

export const TitleHeader = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #ffffff;
`

export const Card = styled.div`
  background-color: #fff;
  border-radius: 16px;
  max-width: 1000px;
  width: 100%;
  padding: 20px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 24px;
`

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 25px;
`

export const Button = styled.button`
  height: 46px;
  width: 250px;
  background-color: #0dab77;
  border-radius: 8px;
  border: 0;
  color: #fff;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
`
