import { useDeleteBookMutation, useGetBookDetailsQuery } from "@/app/features/Books/bookApi"
import Reviews from "@/components/Review";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom"

export default function BookDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [deletBook, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] = useDeleteBookMutation();

  const { isLoading, data: bookDetails } = useGetBookDetailsQuery(id as string);

  const handleDelete = () => {
    deletBook(id as string)
    onClose()
  }
  if(isDeleteSuccess && !toast.isActive('delete-success')){
    toast({
      id: 'delete-success',
      colorScheme: 'green',
      variant: 'solid',
      title: 'Book Deleted',
    })
    navigate(-1)
  }

  let contentToRender = null;
  if (isLoading) {
    contentToRender = <Box display={'flex'} justifyContent={'center'} p={5}><Spinner /></Box>
  }
  if (!isLoading && bookDetails?.data) {
    contentToRender = <Box>
      <Box display={'flex'} flexWrap={'wrap'}>
        <Box>
          <Image loading="lazy" src={bookDetails.data.coverImage} height={'80dvh'} width={'30dvw'} />
        </Box>
        <Box padding={5} width={'800px'}>
          <Text fontSize={'5xl'}>{bookDetails?.data.title}</Text>
          <Text fontSize={'2xl'}>Author: {bookDetails?.data.author}</Text>
          <Text fontSize={'xl'}>Genre: {bookDetails?.data.genre}</Text>
          <Text fontSize={'xl'}>Published: {new Date(bookDetails?.data.publishedAt).toLocaleDateString()}</Text>
        </Box>
        <Box mt={5} display={'flex'} gap={'10px'} >
          <Button onClick={() => navigate(`/editBook/${id}`)} variant={'solid'} bg={'blue'} color={'white'} _hover={{ bg: 'blue.500' }}>Edit Book</Button>
          <Button variant={"solid"} bg={'red'} onClick={onOpen} isLoading={isDeleting}> Delete Book</Button>
        </Box>
      </Box>
      <Reviews reviews={bookDetails?.data?.reviews || []} />
    </Box>
  }
  return (
    <Box padding={'0 100px'} >
      <Button m={'10px 0'} leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
      {contentToRender}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this book?
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDelete} bg={'red'}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
