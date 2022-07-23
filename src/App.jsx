import React, { useEffect, useState } from 'react'
import './styles/App.scss'
import logo from './assets/logo.png'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Box,
} from '@chakra-ui/react'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const [donates, setDonates] = useState(() => {
    const saved = localStorage.getItem('donates')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  //form
  const [family, setFamily] = useState('')
  const [responsible, setResponsible] = useState('')
  const [obs, setObs] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    setResponsibles(responsibles.sort())
  }, [])

  useEffect(() => {
    localStorage.setItem('donates', JSON.stringify(donates))
  }, [donates])

  function handleSubmit(e) {
    e.preventDefault()
    setDonates([
      ...donates,
      {
        family,
        responsible,
        obs,
        date,
      },
    ])

    setFamily("");
    setResponsible("");
    setObs("");
    setDate("");
    
    onClose();
  }
  return (
    <>
      <div id="App">
        <header>
          <img src={logo} alt="Coragem Logo" />
          <Box>
            <Heading><em>CORAGEM</em></Heading>
            <Text>Paróquia Saõ Jośe de Castilho - SP</Text>
          </Box>
        </header>
        <main>
          <Box id="actions">
            <Button onClick={onOpen}>+ Nova Doação</Button>
          </Box>
          <Box id="table">
            <TableContainer>
              <Table variant="simple">
              <TableCaption>Relações das doações</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Família</Th>
                    <Th>Responsável</Th>
                    <Th>Data</Th>
                    <Th>Observação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.from(donates).map((donate, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{donate.family}</Td>
                        <Td>{donate.responsible}</Td>
                        <Td>{donate.date}</Td>
                        <Td>{donate.obs}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </main>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent p="4">
            <ModalHeader paddingInlineStart="0">Nova Doação</ModalHeader>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel mb="4px">Família</FormLabel>
                <Input
                  type="text"
                  value={family}
                  onChange={(e) => setFamily(e.target.value)}
                />
              </FormControl>

              <FormControl mt="16px">
                <FormLabel mb="4px">Responsável</FormLabel>
                <Select
                  onChange={(e) =>
                    setResponsible(e.target.selectedOptions[0].value)
                  }
                  defaultValue="Reponsável"
                >
                  <option selected hidden >Responsável</option>
                  {responsibles.map((resp, index) => {
                    return <option key={index}>{resp}</option>
                  })}
                </Select>
              </FormControl>

              <FormControl mt="16px">
                <FormLabel mb="4px">Cesta</FormLabel>
                <Textarea
                  placeholder="Cesta completa... apenas um pacote de 2kg de arroz... meia cesta..."
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                ></Textarea>
              </FormControl>

              <FormControl mt="16px">
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
    </>
  )
}

export default App
