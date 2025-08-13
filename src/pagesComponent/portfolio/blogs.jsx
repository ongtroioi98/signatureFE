'use client';
import React from 'react';
import BigTitle from '@/components/BigTitle';
import { Button, Col, Flex, Image, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import styles from './style.module.css';
import classNames from 'classnames';
import { ClockCircleOutlined, SignatureOutlined } from '@ant-design/icons';
const SERVICES = [
  {
    id: 1,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://blog.zapr.in/hubfs/1-4.jpg',
  },
  {
    id: 2,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://nirmawebsite.s3.ap-south-1.amazonaws.com/wp-content/uploads/sites/22/2019/06/pgtechnology.jpg',
  },
  {
    id: 3,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://www.electric.ai/wp-content/uploads/BLOG-The-Top-IT-Blogs-You-Need-To-Know.png',
  },
  {
    id: 4,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://cdn.prod.website-files.com/64f0b4402cf68354b45974a0/66ab1f59e4dcf29e3278b07d_blog-hero-agents.jpg',
  },
  {
    id: 5,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://blog.zapr.in/hubfs/1-4.jpg',
  },
  {
    id: 6,
    title: 'Sketches',
    body: 'Lorem ipsum dolor sittem ametamn elit, per sed do eiusmoad teimpor sittem elit inuning utsed sittem.',
    icon: 'https://blog.zapr.in/hubfs/1-4.jpg',
  },
];
export default function MyBlogs() {
  return (
    <Flex
      id="blogs"
      vertical
      justify="center"
      className={classNames(styles.aboutMeContainer, styles.containerMobile)}
    >
      <BigTitle text="BLOGS" />
      <div className={styles.cardList}>
        {SERVICES.map((item, index) => (
          <div
            key={item.id}
            className={classNames(styles.card, styles.blogCard)}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Flex justify="center" align="center">
              <Image
                preview={false}
                src={item.icon}
                alt="blog image"
                width="100%"
                height="230px"
              />
            </Flex>
            <Flex vertical className={styles.cardBody}>
              <Typography.Title level={5} className={styles.hoverTitle}>
                {item.title}
              </Typography.Title>
              <Typography.Text type="secondary">{item.body}</Typography.Text>
              <Flex justify="space-between">
                <Typography.Text type="secondary">
                  <SignatureOutlined /> <i>Lâm Ánh</i>
                </Typography.Text>
                <Typography.Text type="secondary">
                  <ClockCircleOutlined />{' '}
                  {dayjs(item.createdAt).format('HH:mm DD/MM/YYYY')}
                </Typography.Text>
              </Flex>
            </Flex>
          </div>
        ))}
      </div>
    </Flex>
  );
}
