import { usePostReviewMutation } from '@/app/features/Books/bookApi'
import { Box, Button, Input, Text, useToast } from '@chakra-ui/react'
type IProps = {
  reviews: string[]
}
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Reviews({ reviews }: IProps) {
  const { id } = useParams()
  const [reviewInput, setReviewInput] = useState<string>('');
  const [postReview, { isLoading, isSuccess }] = usePostReviewMutation();
  const toast = useToast();

  const handleSubmitReview = () => {
    setReviewInput('')
    postReview({ review: reviewInput, id: id as string })
  }
  if (isSuccess && !isLoading && !toast.isActive('success')) {
    toast({
      title: 'Review Submitted',
      status: 'success',
      duration: 3000,
      isClosable: true,
      id: 'success',
    })
  }
  return (
    <Box m={'20px 0'}>
      <Text fontSize={'3xl'}>Reviews</Text>
      {reviews?.length > 0 && reviews.map((review: string, index: number) => {
        return (
          <Box key={review + index} >
            <Text fontSize={'xl'}>• {review}</Text>
          </Box>
        )
      })}
      {reviews.length === 0 && <Text>No Reviews</Text>}
      <Box display={'flex'} gap={'10px'} mt={'10px'}>
        <Input placeholder='Write a review' value={reviewInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReviewInput(e.target.value)} />
        <Button bg={'brown'} onClick={handleSubmitReview} > Submit</Button>
      </Box>
    </Box >
  )
}
