import { useState } from 'react';
import { Navbar, UnstyledButton } from '@mantine/core';

import UserButton from './components/UserButton';

import { logoutHandling } from './utils/logoutHandling';

import { SlLogout } from "react-icons/sl";
import Navigationtabs from './components/navigationTabs';

import { useRouter } from 'next/router';

import { useAppDispatch } from 'store/hooks/hooks';

import { useStyles } from './styles/navigationStyle';

interface Props {
    page: string;
}

const NavBar: React.FC<Props> = ({page}) => {
    const { classes, cx } = useStyles();
    
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <Navbar p="xs" width={{ base: 275 }} className={classes.navbar}>
            <Navbar.Section>
                <UserButton
                    name="Pierre Perrin"
                    email="pierre.perrin@epitech.eu"
                />
            </Navbar.Section>

            <Navbar.Section grow mt="xl">
                <Navigationtabs active={page} />
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UnstyledButton
                    mb={5}
                    style={{width: "100%"}}
                    className={classes.link}
                    onClick={(event) => {logoutHandling({dispatch, router})}}
                >
                    <SlLogout className={classes.linkIcon} />
                    <span>Logout</span>
                </UnstyledButton>
            </Navbar.Section>
        </Navbar>
    );
}

export default NavBar;