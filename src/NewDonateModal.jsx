import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DonatesContext } from './context/donates'

export function NewDonateModal({ isOpen, onClose }) {
  const [family, setFamily] = useState('')
  const [responsible, setResponsible] = useState('')
  const [obs, setObs] = useState('')
  const [date, setDate] = useState('')
  const { donates, setDonates } = useContext(DonatesContext)
  const [responsibles, setResponsibles] = useState([
    'Sandra',
    'Luciana Montalvão',
    'Promoção Humana',
    'Gorete',
    'Débora',
    'Elsa',
    'Selma',
    'Fátima',
    'Jair'
  ])

  useEffect(() => {
    setResponsibles(responsibles.sort())
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    setDonates([
      {
        family,
        responsible,
        obs,
        date,
      },
      ...donates,
    ])

    setFamily('')
    setResponsible('')
    setObs('')
    setDate('')

    onClose()
    toast.success('Doação Salva')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <form onSubmit={handleSubmit}>
          <ModalContent w={['90%', 500, 600]}>
            <ModalHeader>Nova Doação</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel mb="4px">Família</FormLabel>
                <Input
                  type="text"
                  value={family}
                  placeholder="Família"
                  onChange={(e) => setFamily(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel mb="4px">Responsável</FormLabel>
                <Input 
                  type="text"
                  placeholder='Responsável'
                  list="responsibles_list"
                />
                <datalist id="responsibles_list">
                  {responsibles.map((responsible, index) => {
                    return (
                      <option value={responsible} key={index}>{responsible}</option>
                    )
                  })}
                </datalist>
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel mb="4px">Cesta</FormLabel>
                <Textarea
                  placeholder="Cesta completa... apenas um pacote de 2kg de arroz... meia cesta..."
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                ></Textarea>
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Data</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter
              style={{
                marginTop: '1rem',
                borderRadius: '0 0 8px 8px',
              }}
              backgroundColor="gray.200"
              borderTopColor="gray.300"
              borderTopWidth="1px"
            >
              <Button onClick={onClose} type="reset">
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit" ml={4}>
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </ModalOverlay>
    </Modal>
  )
}
