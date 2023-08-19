import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, url, user = "other" }) => {
  return (
    <HStack
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
      borderRadius={"4"}
      bg={ user == "me" ? "whatsapp.100" : "telegram.100"}
      px={4}
      py={2}
    >
      <VStack>
      {user == "other" && <Avatar h={8} src={url} /> }    
      </VStack>
      <Text>{text}</Text>
      {user == "me" && <Avatar src={url} /> }    
    </HStack>
  );
};

export default Message;
