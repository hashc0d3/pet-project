"use client";

import { useRouter } from "next/navigation";
import styles from './page.module.css';
import {Button} from "@mantine/core";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <div className={styles.header}>
                <Button
                    onClick={() => router.push('/pages/auth')}
                >
                    Авторизация
                </Button>
            </div>
            <div className={styles.page}>
                <p className={styles.shopText}>I:SHOP</p>
                <Button
                    onClick={() => router.push('/pages/catalog')}
                >
                    Перейти в каталог
                </Button>
            </div>

        </>
    );
}
