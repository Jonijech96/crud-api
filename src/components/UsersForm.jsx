import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const UsersForm = ({
  getUsers,
  isOpen,
  onOpen,
  onClose,
  userSelected,
  setUserSelected,
  selectUser,
}) => {
  const { handleSubmit, register, reset } = useForm();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const initialValue = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
  };
  const toast = useToast();
  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    } else {
      reset(initialValue);
    }
  }, [userSelected]);

  const submit = (data) => {
    if (userSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          data
        )
        .then(() => getUsers())
        .catch((error) => console.log(error.response?.data));
      selectUser(null);
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => getUsers())
        .catch((error) => console.log(error.response?.data));
      reset(initialValue);
    }
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };
  const cancel = () => {
    onClose();
    toast({
      title: userSelected ? "card edit cancel." : "card create cancel",
      description: "We've created your account for you.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
    setUserSelected(null);
    reset(initialValue);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" ml={2}>
        Add New User
      </Button>

      <Modal isOpen={isOpen} onClose={cancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!userSelected ? "Add New User" : "Edit User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action="" onSubmit={handleSubmit(submit)} id="newForm">
              <FormControl isRequired mb={4} id="email">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon />}
                  />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...register("email")}
                  />
                </InputGroup>
                <FormHelperText>ingrese email del usuario</FormHelperText>
              </FormControl>
              <FormControl isRequired mb={4} id="password">
                <FormLabel>Password</FormLabel>
                {/* <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                /> */}
                <InputGroup size="md">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<LockIcon />}
                  />
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>ingrese password</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="first_name">
                <FormLabel>First name</FormLabel>

                <Input
                  type="text"
                  placeholder="first name"
                  {...register("first_name")}
                />
                <FormHelperText>ingrese nombre</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="last_name">
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  placeholder="last name"
                  {...register("last_name")}
                />
                <FormHelperText>ingrese segundo nombre</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="birthday">
                <FormLabel>birthday</FormLabel>
                <Input
                  type="date"
                  placeholder="birthday"
                  {...register("birthday")}
                />
                <FormHelperText>ingrese cumpleaños</FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" form="newForm" colorScheme="teal" mr={2}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={cancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersForm;
