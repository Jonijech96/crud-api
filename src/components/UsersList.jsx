import React from 'react'
import {
    ListItem,
    UnorderedList,
    Divider,
    Heading,
  } from "@chakra-ui/react";

const UsersList = ({users}) => {
  return (
    <>
    <UnorderedList
      display="grid"
      gridGap={6}
      gridTemplateColumns="repeat(2, 1fr)"
    >
      {users.map((user) => (
        <ListItem
          p={6}
          border="1px"
          borderRadius="20px"
          key={user.id}
          boxShadow="dark-lg"
          display="grid"
          gridGap={2}
          _hover={{
            background: "white",
            color: "teal.500",
          }}
          transitionDuration="200ms"
        >
          <Heading mb={2} size="lg">
            {user.first_name}
          </Heading>
          <Divider />
          <p>{user.email}</p>
          <p>{user.last_name}</p>
          <p>{user.birthday}</p>
          <p>{user.password}</p>
          <Divider />

          {/* <Box display="flex" justifyContent="end" gridGap={2}>
            <Button colorScheme="blue" onClick={() => selectCard(car)}>
              select
            </Button>
            <AlertDelete deleteCard={deleteCard} idcar={car.id}/>
          </Box> */}
        </ListItem>
      ))}
    </UnorderedList></>
  )
}

export default UsersList