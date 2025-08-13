import React from 'react';
import { Typography, Divider } from 'antd';
import styles from './BigTitle.module.css';

const { Title } = Typography;

const BigTitle = ({ text }) => {
  return (
    <div className={styles.aboutMe}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{text}</h2>
        <div className={styles.divider} />
      </div>
      <div className={styles.backgroundText}>{text}</div>
    </div>
  );
};

export default BigTitle;
