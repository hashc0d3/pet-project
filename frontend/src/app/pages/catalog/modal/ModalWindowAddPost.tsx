"use client";

import { useDisclosure } from '@mantine/hooks';
import { Notification, TextInput, Modal, Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import React, { useState } from "react";
import { ImageUploader } from "@/app/pages/catalog/components/ImageUploader";
import styles from "./ModalWindowAddPost.module.css";

interface ModalWindowProps {
    onItemAdded: () => void;
    className?: string;
}

export function ModalWindowAddPost({ onItemAdded , className}: ModalWindowProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [itemName, setItemName] = useState<string>("");
    const [itemDescription, setItemDescription] = useState<string>("");
    const [itemFullDescription, setItemFullDescription] = useState<string>("");
    const [imageData, setImageData] = useState<string | null>(null); // Состояние для хранения Base64 изображения
    const [success, setSuccess] = useState<boolean>();

    const handleOnClickSendItem = async () => {
        if (!itemName || !itemDescription || !imageData) {
            return setSuccess(false);
        }

        try {
            const response = await fetch('http://localhost:3001/catalog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: itemName,
                    description: itemDescription,
                    fullDescription: itemFullDescription,
                    image: imageData // Отправляем Base64 изображение
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Ошибка авторизации');
            }

            setSuccess(true);
            setItemName('');
            setItemDescription('');
            setItemFullDescription('');
            setImageData(null); // Сбрасываем загруженное изображение
            close();
            onItemAdded();
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Создать пост">
                <div>
                    <TextInput
                        placeholder="Name"
                        label="Имя товара"
                        value={itemName}
                        onChange={(event) => setItemName(event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder="Description"
                        label="Описание товара"
                        value={itemDescription}
                        onChange={(event) => setItemDescription(event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder="fullDescription"
                        label="Полное описание товара"
                        value={itemFullDescription}
                        onChange={(event) => setItemFullDescription(event.currentTarget.value)}
                    />
                    <ImageUploader onImageUpload={setImageData} />

                    <Button onClick={handleOnClickSendItem}>
                        Создать публикацию
                    </Button>

                    {success === true && (
                        <Notification icon={<IconCheck size={20} />} color="teal" title="Успешно!" mt="md" onClose={() => setSuccess(false)}>
                            Объект опубликован
                        </Notification>
                    )}
                </div>
            </Modal>

            <Button variant="default" onClick={open}>
                Добавить публикацию
            </Button>
        </>
    );
}