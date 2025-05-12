"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { Badge, Card, Group, Text, Image, Modal, Button, Rating } from "@mantine/core";
import { CheckAccess } from "@/helpers/checkAccess";
import { AccessKeys } from "@/consts/AccessKeys";
import { ModalWindowAddPost } from "@/app/pages/catalog/modal/ModalWindowAddPost";

const Page = () => {
    const [access, setAccess] = useState<boolean>(false);
    const [catalog, setCatalog] = useState<{
        id: any,
        name: string,
        description: string,
        image?: string,
        fullDescription?: string,
        rating?: { average: number, count: number }
    }[]>([]);
    const [opened, setOpened] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{
        id: any,
        name: string,
        description: string,
        image?: string,
        fullDescription?: string,
        rating?: { average: number, count: number }
    } | null>(null);

    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        const accessKey = localStorage.getItem('access') as AccessKeys;
        setAccess(CheckAccess(accessKey));

        fetch('http://localhost:3001/catalog')
            .then((res) => res.json())
            .then((data) => setCatalog(data))
            .catch((error) => console.error("Ошибка загрузки каталога:", error));
    }, []);

    const handleItemAdded = async () => {
        try {
            const response = await fetch('http://localhost:3001/catalog');
            if (!response.ok) {
                throw new Error('Ошибка при обновлении каталога');
            }
            const data = await response.json();
            setCatalog(data);
        } catch (error) {
            console.error("Ошибка при обновлении каталога:", error);
        }
    };

    const openModal = (item: { id: string, name: string, description: string, image?: string, rating?: { average: number, count: number } }) => {
        setSelectedItem(item);
        setOpened(true);
        setSelectedRating(item.rating?.average ?? 0); // Устанавливаем рейтинг товара в состояние при открытии модального окна
    };

    const closeModal = () => {
        setOpened(false);
        setSelectedItem(null);
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            const numericId = Number(itemId);

            if (isNaN(numericId)) {
                throw new Error("Некорректный формат ID");
            }

            const response = await fetch(`http://localhost:3001/catalog/${numericId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка при удалении: ${errorText}`);
            }

            setCatalog((prevCatalog) => prevCatalog.filter(item => item.id !== numericId));
        } catch (error) {
            console.error("Ошибка при удалении элемента:", error);
        }
    };

    const handleRateProduct = async (ratingValue: number) => {
        if (!selectedItem) return;

        try {
            const response = await fetch(`http://localhost:3001/ratings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: 1, // Здесь подставлять реального пользователя
                    productId: Number(selectedItem.id),
                    value: ratingValue
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при выставлении рейтинга");
            }

            // После успешного выставления рейтинга
            setSelectedRating(ratingValue); // Обновляем локальное состояние рейтинга
            handleItemAdded(); // Перезагрузка каталога
        } catch (error) {
            console.error("Ошибка при выставлении рейтинга:", error);
        }
    };

    return (
        <section>
            {access && <ModalWindowAddPost onItemAdded={handleItemAdded} />}
            <section className={styles.page}>

                {catalog.map((item) => (
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            key={item.id}
                            className={styles.card}
                            onClick={() => openModal(item)}
                        >
                            <Card.Section>
                                {access && (
                                    <Button
                                        variant="outline"
                                        color="red"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteItem(item.id);
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                )}
                                <Image
                                    src={item.image ?? "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
                                    height={160}
                                    alt={item.name}
                                />
                            </Card.Section>
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text>{item.name}</Text>
                                <Badge color="green">On Sale</Badge>
                            </Group>
                            <Text size="sm" c="dimmed">
                                {item.description}
                            </Text>
                            {/* Показываем только рейтинг, без возможности редактировать */}
                            <Group mt="md">
                                <Rating value={item.rating?.average ?? 0} fractions={2} readOnly />
                                <Text size="xs">рейтинг</Text>
                            </Group>
                        </Card>
                    ))
                }
            </section>

            {/* Модальное окно для просмотра информации о товаре */}
            <Modal opened={opened} onClose={closeModal} title={selectedItem?.name}>
                {selectedItem && (
                    <>
                        <Image
                            src={selectedItem.image ?? "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
                            height={160}
                            alt={selectedItem.name}
                        />
                        <Text size="sm" c="dimmed">
                            {selectedItem.description}
                        </Text>
                        <Text size="sm" c="dimmed">
                            {selectedItem.fullDescription}
                        </Text>
                        <Group mt="md">
                            <Rating
                                value={selectedRating}
                                onChange={(value) => {
                                    setSelectedRating(value);  // Меняем рейтинг в модальном окне
                                    handleRateProduct(value);  // Сразу отправляем рейтинг на сервер
                                }}
                            />
                            <Text size="xs">оставить оценку</Text>
                        </Group>
                        {/* Можно выставить рейтинг, нажав на звездочку */}

                    </>
                )}
                <Button onClick={closeModal} mt="md">Закрыть</Button>
            </Modal>
        </section>
    );
};

export default Page;