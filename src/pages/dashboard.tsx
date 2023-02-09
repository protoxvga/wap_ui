import { useEffect } from "react";

import { useAppSelector } from "store/hooks/hooks";

import Head from "next/head";
import { useRouter } from "next/router";

import NavBar from "features/navigation/NavBar";

import { sessionExpiredNotification } from "components/notifications/errors";

import { AppShell } from "@mantine/core";

const Dashboard = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user.auth);

    useEffect(() => {
        if (user.refreshToken === undefined) {
            router.push('/login')
            sessionExpiredNotification();
        }
    }, [])

    return (
        <>
            <Head><title>WAP | Dashboard</title></Head>
            <AppShell
                padding="md"
                navbar={<NavBar page={"Dashboard"} />}
            >
                <h1>{user.refreshToken}</h1>
            </AppShell>
        </>
    );
}

export default Dashboard;