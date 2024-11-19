import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import Image from 'next/image';
import styles from './index.module.less';
import { signIn, signOut, useSession } from "next-auth/react";

const { Link } = Typography;
const { Header } = Layout;

const HeaderBar = () => {
  return (
    <>
      <Header className={styles.header}>
        <div className={styles.logoBar}>
          <Link href="/">
            <Image alt="logo" src="/logo192.png" width={50} height={50} />
            <h1>Chat System</h1>
          </Link>
        </div>
        <Space className={styles.right} size={0}>
          <span className={styles.right}>
            <button onClick={() => signOut()}>ログアウト</button>
          </span>
        </Space>
      </Header>
      <div className={styles.vacancy} />
    </>
  );
};

export default HeaderBar;
