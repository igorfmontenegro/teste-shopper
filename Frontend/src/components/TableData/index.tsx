// interface TableRow {
//   column1: string
//   column2: string
//   column3: number
//   column4: number
// }

import { Container } from './TableData.styles'

// interface TableDataProps {
//   data: TableRow[]
// }

export function TableData() {
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
          <tr>
            <td> 16</td>
            <td>ENERGÉTICO RED BULL ENERGY DRINK SEM AÇÚCAR 250ML</td>
            <td>18.44</td>
            <td>20.49</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
