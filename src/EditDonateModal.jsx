import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  Select,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { DonatesContext } from './context/donates'

export default function EditDoanteModal({
  isOpen,
  onClose,
  onOpen,
  donateIndexSelected,
}) {
  const { donates, setDonates } = useContext(DonatesContext)
  const [typeInput, setTypeInput] = useState('none')
  const [field, setField] = useState('')
  const [value, setValue] = useState('')

  function handleChange(e) {
    setField(e.target.value)
    if (e.target.value === 'date') {
      setTypeInput('date')
    } else {
      setTypeInput('text')
    }
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent w={['90%', 500, 600]}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Editar Doação
          </AlertDialogHeader>

          <AlertDialogBody>
            <Select onChange={(e) => handleChange(e)} mb="2rem">
              <option defaultValue="choose" hidden>
                Escolha o campo
              </option>
              <option value="family">Família</option>
              <option value="responsible">Responsável</option>
              <option value="date">Data</option>
              <option value="obs">Observação</option>
            </Select>

            <Input
              type={typeInput}
              placeholder="Digite a nova informação"
              disabled={typeInput != 'none' ? false : true}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </AlertDialogBody>
          <AlertDialogFooter
            style={{
              marginTop: '1rem',
              borderRadius: '0 0 8px 8px',
            }}
            backgroundColor="gray.200"
            borderTopColor="gray.300"
            borderTopWidth="1px"
          >
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              colorScheme="red"
              ml={4}
              onClick={() => {
                let changed = donates[donateIndexSelected]
                changed[field]  = value;
                donates[donateIndexSelected] = changed;
                setDonates(donates)
                onClose()
                setValue("")
                toast.success('Doação Editata')
              }}
            >
              Salvar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
