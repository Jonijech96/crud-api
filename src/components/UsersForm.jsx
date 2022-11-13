import React from 'react'
import axios from 'axios';
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
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";


const UsersForm = ({getUsers}) => {
    const { handleSubmit, register, reset } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValue = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
  };
//   const toast = useToast();
//   useEffect(() => {
//     if (carSelected) {
//       reset(carSelected);
//     } else {
//       reset(initialValue);
//     }
//   }, [carSelected]);

  const submit = (data) => {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => getUsers())
        .catch((error) => console.log(error.response?.data));
      reset(initialValue);
    // if (carSelected) {
    //   axios
    //     .put(`http://cars-crud.academlo.tech/cars/${carSelected.id}/`, data)
    //     .then(() => getCars())
    //     .catch((error) => console.log(error.response?.data));
    //   selectCard(null);
    // } else {
    //   axios
    //     .post("http://cars-crud.academlo.tech/cars/", data)
    //     .then(() => getCars())
    //     .catch((error) => console.log(error.response?.data));
    //   reset(initialValue);
    // }
    // toast({
    //   title: "Account created.",
    //   description: "We've created your account for you.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
    onClose();
  };
  const cancel = () => {
    onClose();
    // toast({
    //   title: carSelected ?"card edit cancel.": "card create cancel",
    //   description: "We've created your account for you.",
    //   status: "info",
    //   duration: 9000,
    //   isClosable: true,
    // });
    // setCarSelected(null);
    reset(initialValue);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Add new Car
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>{!carSelected ? +}"Add new Car" : "Edit Car"}</ModalHeader> */}
          <ModalHeader>{"Add new User"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action="" onSubmit={handleSubmit(submit)} id="newForm">
              <FormControl isRequired mb={4} id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email" {...register("email")} />
                <FormHelperText>ingrese email del usuario</FormHelperText>
              </FormControl>
              <FormControl isRequired mb={4} id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="password" {...register("password")} />
                <FormHelperText>ingrese password</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="first_name">
                <FormLabel>first_name</FormLabel>
                <Input type="text" placeholder="first name" {...register("first_name")} />
                <FormHelperText>ingrese nombre</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="last_name">
                <FormLabel>last name</FormLabel>
                <Input type="text" placeholder="last name" {...register("last_name")} />
                <FormHelperText>ingrese segundo nombre</FormHelperText>
              </FormControl>
              <FormControl isInvalid={false} mb={4} id="birthday">
                <FormLabel>birthday</FormLabel>
                <Input type="date" placeholder="birthday" {...register("birthday")} />
                <FormHelperText>ingrese cumpleaños</FormHelperText>
              </FormControl>
              

              {/* <button>enviar</button> */}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray.200"
              variant="outline"
              type="submit"
              form="newForm"
            >
              Save
            </Button>
            <Button colorScheme="blue" mr={3} onClick={cancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

export default UsersForm