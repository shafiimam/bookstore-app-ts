import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Books",
      path: "/books",
    },
    {
      name: "Log In",
      path: "/login",
    },
    {
      name: "Sign Up",
      path: "/signup",
    }
  ]
  return (
    <Box p={4} bg={'brown'} boxShadow={"md"} position={"sticky"}>
      <Box display={"flex"} justifyContent={"flex-end"} gap={'20px'} margin={'20px'}>
        {links.map((link) => (
          <Link key={link.name} to={link.path}>
            {link.name}
          </Link>
        ))}
      </Box>
    </Box>
  )
}
