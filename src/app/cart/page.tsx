"use client"
import React, { useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';
import { useGetHeaderQuery, useDecProductQuantityMutation, useGetBaskedSummaryQuery, useGetProductsQuery, useIncProductQuantityMutation, useDelCartMutation, useDelProductCartMutation } from '@/stores/api/shoppingCartApi';

import styles from "./page.module.scss";

type TCart =
  {
    Id: number,
    Name: string,
    Images: {
      FileName: string,
      FileExtension: string,
      Image: string
    }[],
    Quantity: number,
    Price: number
  };


export default function Cart(): JSX.Element {

  const [incProductQuantity] = useIncProductQuantityMutation();
  const [decProductQuantity] = useDecProductQuantityMutation();
  const [delCart] = useDelCartMutation();
  const [delCartProduct] = useDelProductCartMutation();
  const {
    data: products, refetch: productsRefetch
  } = useGetProductsQuery({});
  const {
    data, refetch: basketRefetch } = useGetBaskedSummaryQuery({});
  const {
    data: header } = useGetHeaderQuery({});
  const { UsedGuid: userGuid } = header ?? {};
  const handleQuantityInc = async (id: number) => {
    await incProductQuantity({ ProductId: id, UserGuid: userGuid });
    productsRefetch();
    basketRefetch();
  };
  const handleQuantityDec = async (id: number) => {
    await decProductQuantity({ ProductId: id, UserGuid: userGuid });
    productsRefetch();
    basketRefetch();
  };

  const handleRemoveProduct = async (id: number) => {
    await delCartProduct({ ProductId: id, UserGuid: userGuid });
    productsRefetch();
    basketRefetch();
  };

  const handleClearCart = async () => {
    await delCart({});
    productsRefetch();
    basketRefetch();
  };
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8080/api/admin/create?value=${Math.round(Math.random() * 10)}`, {
      method: 'POST'
    });
    const result = await response.json();
    productsRefetch();
    basketRefetch();
  };
  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map(({ Id, Name, Images, Quantity, Price }: TCart) => (
              <TableRow key={Id}>
                <TableCell className={styles.cart__images}>
                  {Images.map(({ FileName, Image: Img }, index) => {
                    return (
                      <Image
                        key={index + FileName}
                        src={`data:image;base64,${Img}`}
                        alt={FileName}
                        width={64}
                        height={64} />
                    )
                  })}
                </TableCell>
                <TableCell>{Name}</TableCell>
                <TableCell >
                  <div className={styles.cart__quantity}>
                    <Button onClick={(e) => handleQuantityDec(Id)}>-</Button>
                    <Typography>
                      {Quantity}
                    </Typography>
                    <Button onClick={(e) => handleQuantityInc(Id)}>+</Button>
                  </div>
                </TableCell>
                <TableCell>{Price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveProduct(Id)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className={styles.cart__total} >
        Общая стоимость: <strong>{data?.Total || 0}</strong>
      </p>
      <div>
        <Button onClick={handleClearCart}>Очистить корзину</Button>
        <Button>Оформить заказ</Button>
      </div>
    </div>
  );
}
