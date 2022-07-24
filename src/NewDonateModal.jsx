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
  ])

  useEffect(() => {
    setResponsibles(responsibles.sort())
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

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
        <ModalContent w={["90%",500,600]}>
          <ModalHeader>Nova Doação</ModalHeader>
          <ModalBody>
            <form onScroll={handleSubmit}>
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
                <Select
                  onChange={(e) =>
                    setResponsible(e.target.selectedOptions[0].value)
                  }
                >
                  <option defaultValue="Responsável" hidden color="gray.300">
                    Responsável
                  </option>
                  {responsibles.map((resp, index) => {
                    return <option key={index}>{resp}</option>
                  })}
                </Select>
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
            </form>
          </ModalBody>
          <ModalFooter style={{
            marginTop: "1rem",
            borderRadius: "0 0 8px 8px",
          }}
          backgroundColor="gray.200"
          borderTopColor="gray.300"
          borderTopWidth="1px"
          >
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" type="submit" ml={4}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
