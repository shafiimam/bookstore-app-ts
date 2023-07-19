import { createUser } from '@/app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Box, Text, FormControl, Input, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface IFormData {
  email: string;
  password: string;
}
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const { isLoading, user, error, isError } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.email && !isLoading && !isError) {
      navigate('/');
    }
  }, [user.email, isLoading, isError, navigate]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(createUser({ email: data.email, password: data.password }));
  });
  let errorContentToRender = null;
  if (isError && error === 'Firebase: Error (auth/email-already-in-use).') {
    errorContentToRender = (
      <Text
        color={'white'}
        bg={'red'}
        textAlign={'center'}
        fontSize={'16px'}
        p={'5px'}
        mb={2}
      >
        Email already in use
      </Text>
    );
  }
  return (
    <Box
      p={10}
      width={'600px'}
      m={'200px auto'}
      display={'flex'}
      flexDir={'column'}
    >
      <Text textAlign={'center'} fontSize={'3xl'} mb={5}>
        Signup
      </Text>
      {errorContentToRender}
      <form onSubmit={onSubmit}>
        <FormControl
          isInvalid={
            typeof errors.email?.message?.length === 'number' &&
            errors.email?.message?.length > 0
          }
        >
          <Input
            borderRadius={0}
            mb={2}
            type="email"
            placeholder="Email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
            })}
          />
          <Text color={'red'}>{errors.email?.message}</Text>
        </FormControl>
        <FormControl
          isInvalid={
            typeof errors.password?.message?.length === 'number' &&
            errors.password?.message?.length > 0
          }
        >
          <Input
            borderRadius={0}
            mb={2}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
          />
          <Text color={'red'}>{errors.password?.message}</Text>
        </FormControl>
        <Button
          isLoading={isLoading}
          mt={5}
          bg={'blue.400'}
          color={'white'}
          borderRadius={0}
          width={'100%'}
          type="submit"
        >
          Signup
        </Button>
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={20}
        >
          <Text>Already have an account?</Text>
          <Link to="/login">
            <Text _hover={{ textDecoration: 'underline' }}>Log In</Text>
          </Link>
        </Box>
      </form>
    </Box>
  );
}
