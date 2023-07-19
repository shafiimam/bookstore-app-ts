import { loginUser } from '@/app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import loginImage from '@/assets/login.jpg';
import { Box, Button, FormControl, Input, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IFormData {
  email: string;
  password: string;
}

export default function Login() {
  const location = useLocation();
  console.log("🚀 ~ file: Login.tsx:16 ~ Login ~ location:", location)
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  });
  useEffect(() => {
    if (user.email && !isLoading && !isError && location?.state?.path) {
      navigate(location.state.path);
    } else if (user.email && !isLoading && !isError) {
       navigate('/');
    }
  }, [user.email, isLoading, navigate, isError]);
  let errorContentToRender = null;

  if (isError && error === 'auth/wrong-password') {
    errorContentToRender = (
      <Text
        color={'white'}
        bg={'red'}
        textAlign={'center'}
        fontSize={'16px'}
        p={'5px'}
        mb={2}
      >
        Invalid Password
      </Text>
    );
  }

  if (isError && error === 'auth/user-not-found') {
    errorContentToRender = (
      <Text
        color={'white'}
        bg={'red'}
        textAlign={'center'}
        fontSize={'16px'}
        p={'5px'}
        mb={2}
      >
        User doesn't exist
      </Text>
    );
  }
  if (isError && error === 'auth/too-many-requests') {
    errorContentToRender = (
      <Text
        color={'white'}
        bg={'red'}
        textAlign={'center'}
        fontSize={'16px'}
        p={'5px'}
        mb={2}
      >
        Too many requests! Try again after some time
      </Text>
    );
  }
  return (
    <Box display={'flex'} height={'100dvh'}>
      <Box width={'50%'}>
        <img src={loginImage} alt="login" height={'100%'} />
      </Box>
      <Box
        width={'50%'}
        p={10}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignContent={'center'}
      >
        <Text fontSize={'4xl'} textAlign={'center'} mb={5}>
          Login to your account
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
            Login
          </Button>
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={20}
          >
            <Text>Don't have an account?</Text>
            <Link to="/signup">
              <Text _hover={{ textDecoration: 'underline' }}>Signup</Text>
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
