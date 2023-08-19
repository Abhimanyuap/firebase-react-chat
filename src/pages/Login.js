import { Box, Button, HStack, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import '../resources/login.css'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 


const Login = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [values, setValues] = useState({
      email:"",
      password:""
    });
  
    const style = {
      h : '10',
      w : '10',
      borderRadius : '50%'
    }

    const navigate = useNavigate();

    const login = async () => {
      try {
        const { email, password } = values; // Assuming you have a values state similar to the Register component
        
        await signInWithEmailAndPassword(auth, email, password);
        
        // Login successful, 
        navigate('/')
        console.log("Login successful!");
        
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
      }
    }
  
    return (
      <div className="login">
      <Heading color="white">LogIn</Heading>
        <div className="lg_img">
          <VStack w={'100%'} spacing={4} pos={"absolute"} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'}>
         
            <Input
              w={'70%'}
              color="white"
              placeholder="Email"
              _placeholder={{ color: "inherit" }}
              onChange={(event) => setValues((prev) => ({...prev, email : event.target.value}))}
            />
  
            <InputGroup w={'70%'}>
              <Input    
                pr="4.5rem"
                color={"white"}
                type={show ? "text" : "password"}
                placeholder="Enter password"
                _placeholder={{ color: "inherit" }}
                onChange={(event) => setValues((prev) => ({...prev, password : event.target.value}))}
              />
              <InputRightElement width="4.5rem">
                <Button
                  color={"blue"}
                  bgColor={"#f8f8f8"}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button onClick={login} colorScheme="whiteAlpha" color={'white'} variant="outline">
              LogIn
            </Button>
            <Heading p={10} color={"white"} as='h4' size='md'>Don't have an account ? <Link to={'/register'}>Register</Link> </Heading> 
          </VStack>
        </div>
      </div>
  )
}

export default Login
