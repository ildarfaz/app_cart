"use client";
import { FC, MouseEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from './style.module.scss';

type THeader = {
    logo: string;
    userName: string;
};
export const Header: FC<THeader> = ({ logo, userName }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar className={styles.header__toolbar}>
                <IconButton
                    className={styles.header__menu__button}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick} >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>{userName}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
                </Menu>
                {<Image src={`data:image;base64,${logo}`} alt="Описание" width={32} height={32} />}
                <div className={styles.header__navigation}>
                    <Link href={"/"}>
                        <Typography className={styles.header__navigation__item} variant="h6">
                            Главная
                        </Typography>
                    </Link>
                    <Typography className={styles.header__navigation__item} variant="h6">
                        Продукты
                    </Typography>
                    <Typography className={styles.header__navigation__item} variant="h6">
                        О нас
                    </Typography >
                    <Typography className={styles.header__navigation__item} variant="h6">
                        Контакты
                    </Typography >
                </div >
                <Link href={"/cart"} >
                    <IconButton className={styles.header__cart} color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                </Link>
            </Toolbar >
        </AppBar >
    );
};