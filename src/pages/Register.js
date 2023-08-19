import React, { useState } from "react";
import "../resources/register.css";
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

import img1 from '../images/search.png'
import img2 from '../images/facebook.png';
import img3 from '../images/github.png'
import { Link, useNavigate } from "react-router-dom";


import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebase"


const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",
  });

  const style = {
    h : '10',
    w : '10',
    borderRadius : '50%',
    cursor : "pointer"
  }

  // Use the correct hook for navigation
  const navigate = useNavigate();

  // sign up
  const signUp = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");  // Use the navigate function to redirect
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  }



  return (
    <div className="register">
    <Heading color="white">Register</Heading>
      <div className="bg_img">
        <VStack  w={'100%'} spacing={4} pos={"absolute"} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'}>
          <Input
            w={'70%'}
            placeholder="Name"
            _placeholder={{ color: "inherit" }}
            onChange={(event) => setValues((prev) => ({...prev,name:event.target.value}))}
          />

          <Input
            w={'70%'}
            placeholder="Email"
            _placeholder={{ color: "inherit" }}
            onChange={(event) => setValues((prev) => ({...prev,email:event.target.value}))}
          />

          <InputGroup w={'70%'}>
            <Input    
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              _placeholder={{ color: "inherit" }}
              onChange={(event) => setValues((prev) => ({...prev,password:event.target.value}))}
            />
            <InputRightElement width="4.5rem">
              <Button
                bgColor={"lightcyan"}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={signUp} colorScheme="whiteAlpha" color={'white'} variant="outline">
            Register
          </Button>
         <Heading  as='h4' size='md'>Already have an account ? <Link to={'/login'}>Login</Link> </Heading> 
          <Heading  as='h5' size='sm'>--- or register with ---</Heading>
          <HStack>
            < Box  {...style}> <img src={img1} /></Box>
            < Box  {...style}> <img src={img2} /></Box>
            < Box  {...style}> <img src={img3} /></Box>
          </HStack>
        </VStack>
      </div>
    </div>
  );
};

export default Register;
