interface TableRow {
  column1: string
  column2: string
  column3: number
  column4: number
}

import { useEffect, useState } from 'react'
import { Container } from './TableData.styles'

interface TableDataProps {
  data: TableRow[]
}

export function TableData() {
  const [dataResults, setDataResults] = useState([])

  useEffect(() => {
    fetchDataFromBackend()
  }, [])

  const fetchDataFromBackend = async () => {
    const response = await fetch('http://localhost:3000/upload')
    if (!response.ok) {
      console.error()
    }
    const dataResults = await response.json()
    setDataResults(dataResults.data)
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
          </tr>
        </thead>
        <tbody>
          {dataResults.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.cost_price}</td>
              <td>{item.new_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
