import { useState } from 'react'
import { FileSent } from '../FileSent'
import {
  Container,
  Card,
  TitleHeader
  // Button,
  // ContainerButtons
} from './PriceControl.styles'
import { TableData } from '../TableData'

export function PriceControl() {
  const [validation, setValidation] = useState<boolean>(false)

  return (
    <Container>
      <TitleHeader> CENTRAL DE CONTROLE </TitleHeader>
      <Card>
        {validation ? (
          <TableData />
        ) : (
          <FileSent validation={validation} setValidation={setValidation} />
        )}
      </Card>
    </Container>
  )
}
