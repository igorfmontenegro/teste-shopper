import { useState } from 'react'
import { Container } from './FileSent.styles'
import { Button, ContainerButtons } from '../PriceControl/PriceControl.styles'

interface FileSentProps {
  validation: boolean
  setValidation: React.Dispatch<React.SetStateAction<boolean>>
}

export function FileSent({ setValidation }: FileSentProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    setFile(selectedFile)
  }

  const handleFileSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault()
    if (file) {
      const formData = new FormData()
      formData.append('arquivo', file)

      try {
        await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        }).then(() => setValidation(true))
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error)
      }
    } else {
      console.error('Nenhum arquivo selecionado.')
    }
  }

  return (
    <Container action="/">
      <label htmlFor="arquivo">Enviar Arquivo</label>
      <input
        type="file"
        accept=".csv"
        id="arquivo"
        name="arquivo"
        onChange={handleFileChange}
      />
      {file ? (
        <p> Arquivo selecionado: {file.name} </p>
      ) : (
        <p> Envie seu arquivo .csv para validação.</p>
      )}

      {file && (
        <ContainerButtons>
          <Button type="submit" onClick={handleFileSubmit}>
            Validar
          </Button>
        </ContainerButtons>
      )}
    </Container>
  )
}
