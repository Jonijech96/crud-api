import { useState,useEffect } from 'react'
import './App.css'
import UsersList from "./components/UsersList"
import UsersForm from "./components/UsersForm"
import axios from "axios"
import {Flex,Heading,Spacer } from "@chakra-ui/react";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  return (
    <div className="App">
      <Flex alignItems="center">
          <Heading mb={4}>Users</Heading>
          <Spacer />
          <UsersForm
            getUsers={getUsers}
          />
        </Flex>
      <UsersList users={users} />
    </div>
  )
}

export default App
