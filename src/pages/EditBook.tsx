import {
  useEditBookMutation,
  useGetBookDetailsQuery,
} from '@/app/features/Books/bookApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export interface IFormValues {
  title: string;
  author: string[];
  genre: string;
  publishedAt: string;
  coverImage: string;
}

export default function EditBook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<IFormValues>();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement>(null);
  const toast = useToast();

  const { isLoading, data: bookDetails } = useGetBookDetailsQuery(id as string);
  const [
    updateBook,
    {
      isLoading: isUpading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useEditBookMutation();

  useEffect(() => {
    if (bookDetails?.data) {
      setValue('title', bookDetails.data.title);
      setValue('author', bookDetails.data.author);
      setValue('genre', bookDetails.data.genre);
      setValue(
        'publishedAt',
        new Date(bookDetails.data.publishedAt).toISOString().split('T')[0]
      );
      setValue('coverImage', bookDetails.data.coverImage);
      if (typeof imageRef?.current?.src == 'string')
        imageRef.current.src = bookDetails.data.coverImage;
    }
  }, [bookDetails, setValue]);

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
    updateBook({
      id: id as string,
      book: data,
    });
  };

  if (isUpdateError && !toast.isActive('error-toast')) {
    toast({
      id: 'error-toast',
      colorScheme: 'red',
      variant: 'solid',
      title: 'Error Updating Book',
    });
  }

  if (isUpdateSuccess && !toast.isActive('success-toast')) {
    toast({
      id: 'success-toast',
      colorScheme: 'green',
      variant: 'solid',
      title: 'Book Updated',
      description: 'Book has been updated successfully',
    });
  }

  let contentToRender = null;
  if (isLoading) {
    contentToRender = (
      <Box display={'flex'} justifyContent={'center'} p={5}>
        <Spinner />
      </Box>
    );
  }
  if (!isLoading && bookDetails?.data) {
    contentToRender = (
      <Box padding={10}>
        <Button
          m={'10px 0'}
          leftIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
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
                required: true,
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
            <Input
              {...register('publishedAt', { required: true })}
              type="date"
            />
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
                required: true,
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <Image
              ref={imageRef}
              loading="lazy"
              src={getValues('coverImage')}
              height={'300px'}
              width={'200px'}
              margin={'20px auto'}
            />
            <FormErrorMessage>
              {errors.coverImage && errors.coverImage.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isUpading}
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}
            mb={5}
            width={'100%'}
          >
            Update Book
          </Button>
        </form>
      </Box>
    );
  }
  return contentToRender;
}
