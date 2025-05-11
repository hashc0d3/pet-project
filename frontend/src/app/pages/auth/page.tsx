"use client";

import React, { useState } from "react";
import styles from "@/app/page.module.css";
import { Button, Notification, PasswordInput, TextInput } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AccessKeys } from "@/consts/AccessKeys";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type AuthFormData = {
    login: string;
    password: string;
};

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormData>();

    const onSubmit = async (data: AuthFormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.login, password: data.password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Ошибка авторизации");
            }

            setSuccess(true);
            localStorage.setItem("access", AccessKeys.ACCESS_ALLOWED);
            router.push("/pages/catalog");
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Произошла ошибка");
            localStorage.setItem("access", AccessKeys.ACCESS_DENIED);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        placeholder="Введите логин"
                        label="Логин"
                        {...register("login", { required: "Логин обязателен" })}
                        error={errors.login?.message}
                    />
                    <PasswordInput
                        placeholder="Введите пароль"
                        label="Пароль"
                        {...register("password", { required: "Пароль обязателен" })}
                        error={errors.password?.message}
                        mt="md"
                    />
                    <Button type="submit" loading={loading} mt="md">
                        Войти
                    </Button>
                </form>

                {error && (
                    <Notification
                        icon={<IconX size={20} />}
                        color="red"
                        title="Ошибка"
                        mt="md"
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Notification>
                )}
                {success && (
                    <Notification
                        icon={<IconCheck size={20} />}
                        color="teal"
                        title="Успешно"
                        mt="md"
                        onClose={() => setSuccess(false)}
                    >
                        Вы вошли в систему
                    </Notification>
                )}
            </div>
        </div>
    );
};

export default Page;
