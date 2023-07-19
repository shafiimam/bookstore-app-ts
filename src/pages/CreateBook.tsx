import { useCreateBookMutation } from '@/app/features/Books/bookApi';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Image,
  useToast,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface IFormValues {
  title: string;
  author: string[];
  genre: string;
  publishedAt: Date;
  coverImage: string;
}

export default function CreateBook() {
  const imageRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<IFormValues>();
  const [
    createBook,
    { isLoading: isCreating, isSuccess: isCreateSuccess, data:bookData },
  ] = useCreateBookMutation();

  useEffect(() => {
    const coverImage = getValues('coverImage');
    if(imageRef.current) imageRef.current!.src = coverImage ? coverImage : '';
  }, [watch('coverImage'), getValues]);



  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    createBook(data);
  };

  if (isCreateSuccess && !toast.isActive('success-create')) {
    toast({
      title: 'Success',
      description: 'Book created successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
      id: 'success-create',
    });
    navigate(`/bookDetail/${bookData?.data?._id}`);
  }
  return (
    <Box p={5}>
      <Heading textAlign={'center'} mb="5">
        Create New Book
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={
            typeof errors?.title?.message?.length === 'number' &&
            errors?.title?.message?.length > 0
          }
          mb={5}
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            typeof errors?.author?.message?.length === 'number' &&
            errors?.author?.message?.length > 0
          }
          mb={5}
        >
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            {...register('author', {
              required: {
                value: true,
                message: 'Author is required',
              },
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.author && errors.author.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            typeof errors?.genre?.message?.length === 'number' &&
            errors?.genre?.message?.length > 0
          }
          mb={5}
        >
          <FormLabel htmlFor="genre">Genre</FormLabel>
          <Input
            {...register('genre', {
              required: {
                value: true,
                message: 'Genre is required',
              },
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.genre && errors.genre.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            typeof errors?.publishedAt?.message?.length === 'number' &&
            errors?.publishedAt?.message?.length > 0
          }
          mb={5}
        >
          <FormLabel htmlFor="publishedAt">Published At</FormLabel>
          <Input {...register('publishedAt', { required: {
            value: true,
            message: 'Published Date  is required',
          } })} type="date" />
          <FormErrorMessage>
            {errors.publishedAt && errors.publishedAt.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            typeof errors?.coverImage?.message?.length === 'number' &&
            errors?.coverImage?.message?.length > 0
          }
          mb={5}
        >
          <FormLabel htmlFor="coverImage">Book Cover</FormLabel>
          <Input
            {...register('coverImage', {
              required: {
                value: true,
                message: 'Cover Image is required',
              },
            })}
          />
          {getValues('coverImage') && (
            <Image
              ref={imageRef}
              loading="lazy"
              src={getValues('coverImage')}
              height={'300px'}
              width={'200px'}
              margin={'20px auto'}
            />
          )}
          <FormErrorMessage>
            {errors.coverImage && errors.coverImage.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isCreating}
          type="submit"
          bg={'blue.400'}
          color={'white'}
          _hover={{ bg: 'blue.500' }}
          mb={5}
          width={'100%'}
        >
          Create Book
        </Button>
      </form>
    </Box>
  );
}
