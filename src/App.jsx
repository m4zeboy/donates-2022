import React, { useContext, useEffect, useState } from 'react'
import { AddIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import './styles/App.scss'
import logo from './assets/logo.png'
import {
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
} from '@chakra-ui/react'

import { NewDonateModal } from './NewDonateModal'
import { DonatesContext } from './context/donates'
import toast, { Toaster } from 'react-hot-toast'
import DeleteDoanteModal from './DeleteDonateModal'

function App() {
  const newDonateModal = useDisclosure()
  const deleteDonateModal = useDisclosure()

  const { donates, setDonates } = useContext(DonatesContext)
  const [donateIndexSelected, setDonateIndexSelected] = useState(0);
  //form
  useEffect(() => {
    localStorage.setItem('donates', JSON.stringify(donates))
  }, [donates])

  async function copyTextToClipboard(text) {
    if('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text)
    }
  }

  return (
    <>
      <div id="App">
        <header>
          <img src={logo} alt="Coragem Logo" />
          <Box>
            <Heading>
              <em>CORAGEM</em>
            </Heading>
            <Text>Paróquia Saõ Jośe de Castilho - SP</Text>
          </Box>
        </header>
        <main>
          <Box id="actions" style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <Toaster/>
            <button 
              onClick={newDonateModal.onOpen} 
              className="round-btn"
              style={{
                backgroundColor: 'rgba(66, 153, 225, 0.15)'
              }}
              >
              <AddIcon color="blue.600"/>
            </button>
            <button
              className="round-btn"
              onClick={() => {
                copyTextToClipboard(JSON.stringify(donates));
                toast("Copiado!");
              }}
            >
              <CopyIcon />
            </button>
          </Box>

          <Box
            id="reports"
            style={{
              display: 'flex',
              gap: '20px',
            }}
            flexDirection={["column", "row"]}
          >
            <Stat
              style={{
                borderWidth: '1px',
                borderColor: 'gray.200',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <StatLabel>QTD DE DOAÇÕES</StatLabel>
              <StatNumber>{donates.length}</StatNumber>
            </Stat>

            <Stat
              style={{
                borderWidth: '1px',
                borderColor: 'gray.200',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <StatLabel>ÚLTIMA DOAÇÃO</StatLabel>
              <StatNumber>{donates.length > 0 ? donates[0].family : ''}</StatNumber>
            </Stat>
          </Box>
          <Box id="table">
            <TableContainer>
              <Table variant="striped">
                <TableCaption>Relações das doações</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Família</Th>
                    <Th>Responsável</Th>
                    <Th>Data</Th>
                    <Th>Observação</Th>
                    <Th></Th>
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
                        <Td onClick={() => {
                          setDonateIndexSelected(index);
                          deleteDonateModal.onOpen();
                        }}>
                          <DeleteIcon />
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </main>
      </div>
      <NewDonateModal
        isOpen={newDonateModal.isOpen}
        onClose={newDonateModal.onClose}
      ></NewDonateModal>
      <DeleteDoanteModal 
        isOpen={deleteDonateModal.isOpen} 
        onClose={deleteDonateModal.onClose}
        onOpen={deleteDonateModal.onOpen}
        donateIndexSelected={donateIndexSelected}
        >

      </DeleteDoanteModal>
    </>
  )
}

export default App
