import { setUser } from '@/app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };

  const links = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Books',
      path: '/books',
    },
  ];
  return (
    <Box
      p={4}
      bg={'brown'}
      boxShadow={'md'}
      position={'fixed'}
      top={0}
      width={'100%'}
      zIndex={1}
    >
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        gap={'20px'}
        margin={'20px'}
      >
        {links.map((link) => (
          <Link key={link.name} to={link.path}>
            {link.name}
          </Link>
        ))}
        {!user.email && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user.email && (
          <>
            <Link to="/createBook">Create Book</Link>
            <Text cursor={'pointer'} onClick={handleLogout}>Logout</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
