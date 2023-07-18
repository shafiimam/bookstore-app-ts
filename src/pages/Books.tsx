import { useGetBooksQuery } from "@/app/features/Books/bookApi"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Box, Card, CardBody, Image, Spinner, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import { setPage } from "@/app/features/Books/bookSlice";
export default function Books() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 10;
  let currentItems = [];
  let pageCount = 0;
  const bookFilterState = useAppSelector(state => state.book)
  const { data: booksData, isLoading, isFetching } = useGetBooksQuery(bookFilterState)
  const handlePageClick = (event: any) => {
    console.log('books data', event);
    const newOffset = (event.selected * itemsPerPage) % booksData.meta.total!;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    dispatch(setPage(event.selected + 1));
  };
  let contentToRender = null;
  if ((isLoading || isFetching) && !booksData) {
    contentToRender = <Box display={'flex'} justifyContent={'center'} p={5}><Spinner /></Box>
  }
  if (!isLoading && booksData?.success) {
    itemsPerPage = booksData.meta.limit;
    currentItems = booksData.data;
    pageCount = Math.ceil(booksData.meta.total / itemsPerPage);
    contentToRender = (
      <Box >
        <Box display={'flex'} flexDir={'row'} flexWrap={'wrap'} gap={'10px'} justifyContent={'center'} alignContent={'center'}>
          {currentItems.map((book) =>
            <Card background={'whiteAlpha.400'} key={book._id} width={'30%'} onClick={() => navigate(`/bookDetail/${book._id}`)} cursor={'pointer'} _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.01)', transition: 'all 0.2s' }} >
              <CardBody>
                <Image src={book.coverImage} height='500px' width='100%' borderRadius={'10px'} />
                <Text fontSize={'20px'} letterSpacing={'1px'} color={'whiteAlpha.900'}>{book.title}</Text>
                <Text fontSize={'12px'}>{book.author} - {new Date(book.publishedAt).toLocaleDateString()}</Text>
              </CardBody>
            </Card>
          )}
        </Box>
        <div
          className="custom-pagination"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </Box>)
  }

  return (
    <Box display={'flex'} flexDir={'row'} width={'100%'}>
      <Box width={'20%'}>

      </Box>
      <Box width={'80%'}>
        {contentToRender}
      </Box>
    </Box>
  )
}
