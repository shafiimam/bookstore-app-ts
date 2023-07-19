import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Main from './layout/Main';
import { onAuthStateChanged } from 'firebase/auth';
import { setLoading, setUser } from './app/features/user/userSlice';
import { auth } from './lib/firebase';
import { Box, Spinner, Text } from '@chakra-ui/react';

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  let contentToRender = null;
  if (isLoading) {
    contentToRender = (
      <Box height={'100dvh'} width={'100dvw'} display={'flex'} flexDir={'column'} justifyContent={'center'} p={5} alignItems={'center'}>
        <Text mb={4}>Loading App</Text>
        <Spinner size={'xl'} />
      </Box>
    );
  }
  if (!isLoading) {
    contentToRender = <Main />;
  }
  return <>{contentToRender}</>;
}

export default App;
