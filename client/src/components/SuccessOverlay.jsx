import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Flex, 
} from "@chakra-ui/react";
import "./navbar.css";

function SuccessOverlay({ isOpen, onClose }) {
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader><Flex justify="center">
                        <img src="tick.png" className="tick" />
                    </Flex></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize="xl"><Flex justify="center">Your Registration has been Successful !</Flex></Text>
                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SuccessOverlay;