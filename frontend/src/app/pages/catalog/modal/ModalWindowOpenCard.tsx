"use client"

import React from 'react';
import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface ModalWindowProps {
    item: { name: string; description: string };
    open: boolean;
}

export const ModalWindowOpenCard = ({ item, open }: ModalWindowProps) => {
    const [opened, { open: openModal, close }] = useDisclosure(false);

    return (
        <Modal opened={opened} onClose={close}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
        </Modal>
    );
};
