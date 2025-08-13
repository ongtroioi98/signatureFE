'use client';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import FacebookIcon from './facebook.svg';
import styles from './style.module.css';
// import { useMessages, useTranslations } from 'next-intl';
import i18nConfig from 'i18nConfig';
const Container = styled.div`
  margin: 50px auto;
  text-align: center;
  .st-social-btn {
    height: 44px;
    width: 44px;
    border-radius: 50%;
    border: 2px solid var(--ant-color-border-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin: 0 10px;
    color: var(--ant-color-primary-text);
  }
`;
const Avatar = styled.div`
  width: 178px;
  height: 178px;
  margin: auto;
  border-radius: 50%;
  border: 6px solid var(--ant-color-border-secondary);
  overflow: hidden;
`;
// export function generateStaticParams() {
//   return i18nConfig.locales.map((locale) => ({ locale }));
// }
export default function Portfolio({ locale }) {
  // const t = useTranslations();
  // const messages = useMessages();
  const theme = useTheme();
  return (
    <Container className={styles.containerMobile}>
      <Avatar data-aos="fade-up" data-aos-duration="500">
        <Image
          src="/images/avatar.webp"
          alt="avatar"
          width={178}
          height={178}
        />
      </Avatar>
      <Typography.Title
        level={1}
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="300"
        className={styles.smallerFontSizeOnMobile}
      >
        Hi, I am <span style={{ color: theme.colorLinkHover }}>Jhon Doe</span>
      </Typography.Title>
      <Typography.Paragraph
        style={{ fontSize: '1.1rem' }}
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="400"
      >
        I am a frontend web developer. I can provide clean code and pixel
        perfect design.
        <br />I also make website more &amp; more interactive with web
        animations.
      </Typography.Paragraph>
      <Flex
        justify="center"
        gap={theme.sizeMD}
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="500"
      >
        <a
          className="st-social-btn"
          href="#"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <span className="st-social-icon">
            <LinkedinOutlined />
          </span>
        </a>
        <a
          className="st-social-btn"
          href="#"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <span className="st-social-icon">
            <FacebookIcon />
          </span>
        </a>
        <a
          className="st-social-btn"
          href="#"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <span className="st-social-icon">
            <GithubOutlined />
          </span>
        </a>
      </Flex>
    </Container>
  );
}
