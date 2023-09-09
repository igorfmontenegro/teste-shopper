import { useEffect, useState } from 'react'
import { Container } from './TableData.styles'

export function TableData() {
  const [dataResults, setDataResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDataFromBackend()
  }, [])

  const fetchDataFromBackend = async () => {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST'
    })
    if (!response.ok) {
      console.error()
    }
    const responseData = await response.json()
    setDataResults(responseData.data)
    setLoading(false)
  }

  return (
    <Container>
      {loading ? (
        <p> Loading </p>
      ) : (
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
      )}
    </Container>
  )
}
