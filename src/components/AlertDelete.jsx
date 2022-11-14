import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const AlertDelete = ({ idUser, deleteUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const buttonDelete = () => {
    onClose();
    deleteUser(idUser);
    toast({
      title: "Account deleted.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const buttonCancel = () => {
    onClose();
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={buttonCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={buttonDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
