"use client";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import {ReactNode} from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
            <MantineProvider>
                {children}
            </MantineProvider>
        </body>
        </html>
    );
}
