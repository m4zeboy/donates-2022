import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { DonatesContext } from './context/donates'

export default function DeleteDoanteModal({ isOpen, onClose, onOpen, donateIndexSelected }) {
  const {donates, setDonates} = useContext(DonatesContext)
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent w={["90%",500,600]}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Doação
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja excluir essa doação?
          </AlertDialogBody>
          <AlertDialogFooter
            style={{
              marginTop: "1rem",
              borderRadius: "0 0 8px 8px",
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
                setDonates(
                  donates.filter(
                    (donate, index) => index !== donateIndexSelected,
                  ),
                )
                onClose()
                toast.success('Doação Excluida')
              }}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
