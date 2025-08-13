'use client';
import React from 'react';
import BigTitle from '@/components/BigTitle';
import { Button, Col, Flex, Row, Typography } from 'antd';
import styles from './style.module.css';
import Image from 'next/image';
import classNames from 'classnames';
const SKILLS = [
  {
    id: 1,
    title: 'ReactJS',
    percent: 50,
  },
  {
    id: 2,
    title: 'Antd Design',
    percent: 50,
  },
  {
    id: 3,
    title: 'Map API',
    percent: 50,
  },
  {
    id: 4,
    title: 'Java script',
    percent: 50,
  },
  {
    id: 5,
    title: 'HTML',
    percent: 50,
  },
  {
    id: 6,
    title: 'CSS',
    percent: 50,
  },
  {
    id: 7,
    title: 'Photoshop',
    percent: 50,
  },
  {
    id: 8,
    title: 'Photoshop',
    percent: 50,
  },
];
const Item = ({ percent }) => {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillValue} style={{ width: `${percent}%` }}></div>
    </div>
  );
};
export default function MySkills() {
  return (
    <Flex
      vertical
      justify="center"
      className={classNames(styles.aboutMeContainer, styles.containerMobile)}
      gap={30}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <BigTitle text="SKILLS" />
      <Flex gap={16} className={styles.verticalOnMobile}>
        <Flex flex={1} vertical>
          <Typography.Title level={2}>
            All the skills that I have in that field of work are mentioned.
          </Typography.Title>
          <Typography.Text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
          </Typography.Text>
        </Flex>
        <Flex flex={1} vertical className={styles.skillList}>
          {SKILLS.map((item, index) => (
            <Flex
              key={index}
              vertical
              data-aos="fade-up"
              data-aos-duration="1000"
              className={styles.skilItem}
            >
              <Typography.Title level={5}>{item.title}</Typography.Title>
              <Item percent={item.percent} />
            </Flex>
          ))}
        </Flex>
      </Flex>
      {/* <div className={styles.skillList}></div> */}
    </Flex>
  );
}
