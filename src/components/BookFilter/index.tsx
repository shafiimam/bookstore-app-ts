import { setGenre } from '@/app/features/Books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { bookGenres } from '@/constants';
import { Box, Button, Text } from '@chakra-ui/react'

export default function BookFilters() {
  const dispatch = useAppDispatch();
  const bookFilterState = useAppSelector(state => state.book)
  return (
    <Box>
      <Text textAlign={'center'}>Filter by genre</Text>
      <Box display={'flex'} flexDir={'row'} gap={'10px'} margin={2} flexWrap={'wrap'} justifyContent={'center'}>
        {bookGenres.map((filter) => (
          <Button isDisabled={bookFilterState.genre === filter} variant={'outline'} key={filter} onClick={() => dispatch(setGenre(filter))}>{filter}</Button>
        ))}
      </Box>
    </Box>
  )
}
