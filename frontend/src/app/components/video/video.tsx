"use client";

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import '@mantine/carousel/styles.layer.css';
import {Box} from "@mantine/core";

export const Video = () => {
    return (
        <Box style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            >
                <source src="/prev.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>

            {/* Контент поверх видео */}
            <Box style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
                <h1>Добро пожаловать!</h1>
            </Box>
        </Box>
    );
}