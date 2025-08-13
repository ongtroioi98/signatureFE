'use client';
import React from 'react';
import BigTitle from '@/components/BigTitle';
import { Button, Col, Flex, Row, Typography } from 'antd';
import styles from './style.module.css';
import Image from 'next/image';
import classNames from 'classnames';
const SERVICES = [
  {
    id: 1,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon1',
  },
  {
    id: 2,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon2',
  },
  {
    id: 3,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon3',
  },
  {
    id: 4,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon4',
  },
  {
    id: 5,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon5',
  },
  {
    id: 6,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'icon6',
  },
];
export default function MyServices() {
  return (
    <Flex
      vertical
      justify="center"
      className={classNames(styles.aboutMeContainer, styles.containerMobile)}
    >
      <BigTitle text="SERVICES" />
      <div className={styles.cardList}>
        {SERVICES.map((item, index) => (
          <div
            key={item.id}
            className={styles.card}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <Flex
              className={styles.cardTop}
              justify="center"
              align="center"
              vertical
            >
              <Flex
                className={styles.imageRoundContainer}
                justify="center"
                align="center"
              >
                <Image
                  src={`/images/icons/${item.icon}.png`}
                  alt="service image"
                  width={52}
                  height={52}
                />
              </Flex>
              <Typography.Title level={5} className={styles.hoverTitle}>
                {item.title}
              </Typography.Title>
              <Typography.Text>{item.body}</Typography.Text>
            </Flex>
          </div>
        ))}
      </div>
    </Flex>
  );
}
