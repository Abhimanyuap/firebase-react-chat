import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

function Home() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();
  const divForScroll = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    }

    divForScroll.current.scrollIntoView({behaviour : "smooth"});
  };

  const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is authenticated:", user);
        setUser(user);
      } else {
        // console.log("User is not authenticated");
        setUser(null);
        navigate('/login')
      }
    });

    const unsubscribeMessage = onSnapshot(q,(snap) => {
      setMessages(snap.docs.map((items) => {
        const id = items.id;
        return {id,...items.data()};
      }));
    })

    return () => {
      unsubscribe();
      unsubscribeMessage();
    };
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("Sign-out successful!");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };


  return (
    <Box bg="red.50">
      <Container h="100vh" bg="white">
        <VStack h="full" paddingY="4">
          (
          <Button onClick={signOut} colorScheme="red" w="full">
            Logout
          </Button>
          )
          <VStack h="full" w="full" overflowY="auto">
            {messages.map((items) => (
              <Message
                key={items.id}
                user={items.uid === user.uid ? "me" : "other"}
                text={items.text}
                uri={items.uri}
              />
            ))}
            <div ref={divForScroll}></div>
          </VStack>
          <form style={{ width: "100%" }} onSubmit={submitHandler}>
            <HStack>
              <Input
                placeholder="Enter Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" colorScheme="purple">
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;
