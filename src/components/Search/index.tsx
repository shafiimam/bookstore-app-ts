import { Box, Input, Button, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { IBook } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSearchTerm } from '@/app/features/Books/bookSlice';

type IProps = {
  currentItems: IBook[],
  isLoading: boolean,
  isFetching: boolean
}
export default function Search({ currentItems, isFetching }: IProps) {
  const dispatch = useAppDispatch();
  const bookFilterState = useAppSelector(state => state.book);
  const [searchInputValue, setSearchInputValue] = useState(bookFilterState.searchTerm);
  const handleSearch = () => {
    dispatch(setSearchTerm(searchInputValue));
  }
  return (
    <Box bg={'grey'} display={'flex'} justifyContent={'center'} p={5} gap={'10px'} flexWrap={'wrap'} position={'fixed'} top={'80px'} width={'100%'} zIndex={1}>
      <Input width={'80%'}  placeholder="Search Book" value={searchInputValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchInputValue(event.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
      <Button bg='brown' onClick={handleSearch}>Search Book</Button>
      {currentItems.length === 0 && !isFetching && <Text width={'500px'} color={'whiteAlpha.900'} textAlign={'center'}>No books found</Text>}
    </Box>
  )
}
