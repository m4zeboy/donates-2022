import { Button, FormControl, FormLabel, Input, Modal, ModalContent, ModalHeader, ModalOverlay, Select, Textarea } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { DonatesContext } from "./context/donates"

export function NewDonateModal({isOpen, onClose}) {
  const [family, setFamily] = useState('')
  const [responsible, setResponsible] = useState('')
  const [obs, setObs] = useState('')
  const [date, setDate] = useState('')
  const {donates, setDonates} = useContext(DonatesContext)
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
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent p="4">
            <ModalHeader paddingInlineStart="0" pt="0">
              Nova Doação
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel mb="4px">Família</FormLabel>
                <Input
                  type="text"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                />
              </FormControl>

              <FormControl mt="16px" isRequired>
                <FormLabel mb="4px">Responsável</FormLabel>
                <Select
                  onChange={(e) =>
                    setResponsible(e.target.selectedOptions[0].value)
                  }
                >
                  <option defaultValue="Responsável" hidden>
                    Responsável
                  </option>
                  {responsibles.map((resp, index) => {
                    return <option key={index}>{resp}</option>
                  })}
                </Select>
              </FormControl>

              <FormControl mt="16px" isRequired>
                <FormLabel mb="4px">Cesta</FormLabel>
                <Textarea
                  placeholder="Cesta completa... apenas um pacote de 2kg de arroz... meia cesta..."
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                ></Textarea>
              </FormControl>

              <FormControl mt="16px" isRequired>
                <FormLabel mb="4px">Data</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="blue" mt="16px" w="100%" type="submit">
                Salvar
              </Button>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
  )
}