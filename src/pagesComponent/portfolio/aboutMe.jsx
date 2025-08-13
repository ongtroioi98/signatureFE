'use client';
import React from 'react';
import BigTitle from '@/components/BigTitle';
import { Button, Col, Flex, Image, Row, Typography } from 'antd';
import styles from './style.module.css';
import classNames from 'classnames';
export default function AboutMe() {
  return (
    <Flex
      id="about"
      vertical
      justify="center"
      className={classNames(styles.aboutMeContainer, styles.containerMobile)}
    >
      <BigTitle text="About Me" data-aos="fade-up" data-aos-duration="1000" />
      <Flex gap={50} className={styles.verticalOnMobile}>
        <Flex flex={1}>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            style={{
              background: 'url("/images/about.jpg") no-repeat center / cover',
              width: '100%',
              height: '100%',
              minHeight: '300px',
            }}
          ></div>
        </Flex>
        <Flex
          flex={1}
          className="mobileContainer"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <Flex vertical gap={16} flex>
            <Typography.Title level={2} style={{ margin: 0, fontWeight: 400 }}>
              {"Hi There! I'm Edward Devis"}
            </Typography.Title>
            <Typography.Title
              className="primary-color-title"
              level={4}
              style={{ margin: 0, fontWeight: 400 }}
            >
              Visual Designer
            </Typography.Title>
            <Typography.Text>
              I am a Visual Designer with a strong focus on digital branding.
              Visul design seeks to attract, inspire, create desires and otivate
              people to respond to messages, with a view to making a favorable
              impact.
            </Typography.Text>
            <table style={{ color: 'var(--ant-color-primary-text)' }}>
              <tbody>
                <tr>
                  <td>Birthday</td>
                  <td>May 07, 1990</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>+1 876-369-9009</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>devis@example.com</td>
                </tr>
                <tr>
                  <td>From</td>
                  <td>2661 Hich meadow lane bear creek</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>English, Germanic</td>
                </tr>
                <tr>
                  <td>Freelance</td>
                  <td>Available</td>
                </tr>
              </tbody>
            </table>
            <Button type="primary" className="round-button" size="large">
              Download CV
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
