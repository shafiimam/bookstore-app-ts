import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import App from '@/App';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import CreateBook from '@/pages/CreateBook';
import EditBook from '@/pages/EditBook';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/bookDetail/:id',
        element: <BookDetails />
      },
      {
        path: '/createBook',
        element: <CreateBook />
      },
      {
        path: '/editBook/:id',
        element: <EditBook />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);


export default router;