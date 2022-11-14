import React from "react";
import {
  ListItem,
  UnorderedList,
  Divider,
  Heading,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { AlertDelete } from "./AlertDelete";
import { EditIcon } from "@chakra-ui/icons";

const UsersList = ({ users, selectUser, deleteUser }) => {
  return (
    <>
      <UnorderedList
        m="0"
        display="grid"
        gridGap={6}
        gridTemplateColumns="repeat(auto-fill, minmax(min(100%,20rem),1fr))"
      >
        {users.map((user) => (
          <ListItem
            p={6}
            border="1px"
            borderRadius="20px"
            key={user.id}
            display="grid"
            gridGap={2}
            _hover={{
              boxShadow: "dark-lg",
            }}
            transitionDuration="200ms"
          >
            <Heading mb={2} size="lg">
              {user.first_name} {user.last_name}
            </Heading>
            <Divider />
            <Text opacity=".6" fontWeight="bold">
              Email
            </Text>
            <Text fontWeight="bold">{user.email}</Text>
            <Text opacity=".6" fontWeight="bold">
              Birthday
            </Text>
            <Text fontWeight="bold">{user.birthday}</Text>
            <Divider />

            <Box display="flex" justifyContent="end" gridGap={2}>
              <Button colorScheme="blue" onClick={() => selectUser(user)}>
                <EditIcon />
              </Button>
              <AlertDelete deleteUser={deleteUser} idUser={user.id} />
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default UsersList;
