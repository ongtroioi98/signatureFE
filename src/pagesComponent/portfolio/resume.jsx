'use client';
import React from 'react';
import BigTitle from '@/components/BigTitle';
import { Button, Col, Flex, Row, Timeline, Typography } from 'antd';
import styles from './style.module.css';
import Image from 'next/image';
import { ClockCircleOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
const Item = ({ title, time, content }) => {
  return (
    <Flex vertical gap={12} data-aos="fade-up" data-aos-duration="1000">
      <Typography.Title level={4} className="primary-color-title">
        {title}
      </Typography.Title>
      <Typography.Text type="secondary">{time}</Typography.Text>
      <Typography.Text>{content}</Typography.Text>
    </Flex>
  );
};
const educationTimeLine = [
  {
    title: 'aaaaaa',
    time: '2022',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
  {
    title: 'Solve initial network problems 2015-09-01',
    time: '10/2021',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
  {
    title: 'Technical testing 2015-09-01',
    time: '01/2019',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
];
const workingTimeLine = [
  {
    title: 'aaaaaa',
    time: '2022',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
  {
    title: 'Solve initial network problems 2015-09-01',
    time: '10/2021',
    dot: <HeartOutlined />,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
  {
    title: 'Technical testing 2015-09-01',
    time: '01/2019',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
  {
    title: 'Network problems being solved 2015-09-01',
    time: '01/2017',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
  },
];
const educationTimeLineData = educationTimeLine.map((item) => ({
  ...item,
  children: <Item {...item} />,
  dot: item.dot || (
    <ClockCircleOutlined
      className="primaryHover secondary"
      style={{ fontSize: '20px' }}
    />
  ),
}));
const workingTimeLineData = workingTimeLine.map((item) => ({
  ...item,
  children: <Item {...item} />,
  dot: item.dot || (
    <ClockCircleOutlined
      className="primaryHover secondary"
      style={{ fontSize: '20px' }}
    />
  ),
}));
export default function MyResume() {
  return (
    <Flex
      id="resume"
      vertical
      justify="center"
      className={classNames(styles.aboutMeContainer)}
      gap={30}
    >
      <BigTitle text="RESUME" />
      <Flex gap={16} className={styles.verticalOnMobile}>
        <Flex flex={1} vertical className={styles.containerMobileBig}>
          <Flex gap={30} align="center" style={{ marginBottom: '24px' }}>
            <Image
              width={39}
              height={33}
              src="/images/icons/work.png"
              alt="education icon"
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
              Working Experiences
            </Typography.Title>
          </Flex>
          <Flex>
            <Timeline items={workingTimeLineData} />
          </Flex>
        </Flex>
        <Flex flex={1} vertical className={styles.containerMobileBig}>
          <Flex gap={30} align="center" style={{ marginBottom: '24px' }}>
            <Image
              width={39}
              height={33}
              src="/images/icons/edu.png"
              alt="education icon"
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
              Education
            </Typography.Title>
          </Flex>
          <Flex>
            <Timeline items={educationTimeLineData} />
          </Flex>
        </Flex>
      </Flex>
      {/* <div className={styles.skillList}></div> */}
    </Flex>
  );
}
