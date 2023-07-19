import { useEditBookMutation, useGetBookDetailsQuery } from "@/app/features/Books/bookApi";
import { useParams } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Image, Input, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface IFormValues {
  title: string;
  author: string[];
  genre: string;
  publishedAt: Date ;
  coverImage: string;
}


export default function EditBook() {
  const { register, handleSubmit, setValue, formState: { errors, isValid }, getValues } = useForm<IFormValues>();
  const { id } = useParams();
  const imageRef = useRef<HTMLImageElement>(null);
  const toast = useToast();

  const { isLoading, data: bookDetails } = useGetBookDetailsQuery(id as string);
  const [updateBook, { isLoading: isUpading, isSuccess:isUpdateSuccess, isError: isUpdateError, error }] = useEditBookMutation();

  console.log({isUpading, isUpdateSuccess, isUpdateError, error})


  useEffect(() => {
    if (bookDetails?.data) {
      setValue("title", bookDetails.data.title);
      setValue("author", bookDetails.data.author);
      setValue("genre", bookDetails.data.genre);
      setValue("publishedAt", new Date(bookDetails.data.publishedAt).toISOString().split("T")[0]);
      setValue("coverImage", bookDetails.data.coverImage);
      imageRef.current.src! = bookDetails.data.coverImage;
    }
  }, [bookDetails, setValue]);

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
    updateBook({
      id: id as string,
      book: data
    })
  };

  if (isUpdateError && !toast.isActive('error-toast')) {
    toast({
      id: 'error-toast',
      colorScheme: 'red',
      variant: 'solid',
      title: 'Error Updating Book',
    })
  }

  if (isUpdateSuccess && !toast.isActive('success-toast')) {
    toast({
      id: 'success-toast',
      colorScheme: 'green',
      variant: 'solid',
      title: 'Book Updated',
      description: 'Book has been updated successfully'
    })
  }


    let contentToRender = null;
  if (isLoading) {
    contentToRender = <Box display={'flex'} justifyContent={'center'} p={5}><Spinner /></Box>
  }
  if (!isLoading && bookDetails?.data) {
    contentToRender = <Box padding={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors?.title?.message?.length > 0} mb={5}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input {...register("title", {
            required: {
              value: true,
              message: 'Title is required'
            }, minLength: { value: 4, message: 'Minimum length should be 4' },
          })} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.author?.message?.length > 0} mb={5}>
          <FormLabel htmlFor='author'>Author</FormLabel>
          <Input {...register("author", {
            required: {
              value: true,
              message: 'Author is required'
            }, minLength: { value: 4, message: 'Minimum length should be 4' },
          })} />
          <FormErrorMessage>
            {errors.author && errors.author.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.genre?.message?.length > 0} mb={5}>
          <FormLabel htmlFor='genre'>Genre</FormLabel>
          <Input {...register("genre", { required: true, minLength: { value: 4, message: 'Minimum length should be 4' }, })} />
          <FormErrorMessage>
            {errors.genre && errors.genre.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.publishedAt?.message?.length > 0} mb={5}>
          <FormLabel htmlFor='publishedAt'>Published At</FormLabel>
          <Input {...register("publishedAt", { required: true })} type="date" />
          <FormErrorMessage>
            {errors.publishedAt && errors.publishedAt.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.coverImage?.message?.length > 0} mb={5}>
          <FormLabel htmlFor='coverImage'>Book Cover</FormLabel>
          <Input {...register("coverImage", { required: true, minLength: { value: 4, message: 'Minimum length should be 4' }, })} />
          <Image ref={imageRef} loading="lazy" src={getValues("coverImage")} height={'300px'} width={'200px'} margin={'20px auto'} />
          <FormErrorMessage>
            {errors.coverImage && errors.coverImage.message}
          </FormErrorMessage>
        </FormControl>
        <Button isLoading={isUpading} type="submit" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }} mb={5} width={'100%'}>Update Book</Button>
      </form>
    </Box>
  }
  return contentToRender;
}
