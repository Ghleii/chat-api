import ChatGPT from '@/components/ChatGPT'
import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import { signIn, useSession } from "next-auth/react";

import FooterBar from '@/components/FooterBar'
import HeaderBar from '@/components/HeaderBar'

import styles from './index.module.less'

// "{!session ? (" の後に追加することでログイン機能を有効にする
/* <>
<h2>ようこそ！以下のボタンを押してログインしてください．</h2>
<button onClick={() => signIn("google")}>Sign in with Google</button>
</>
) : (
<> */

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <Layout hasSider className={styles.layout}>
            <Layout>
              <HeaderBar />
              <Content className={styles.main}>
          <ChatGPT fetchPath="/api/chat-completion" />
              </Content>
              <FooterBar />
            </Layout>
          </Layout>
        </>
      ) : (
        <>
         
          <Layout hasSider className={styles.layout}>
            <Layout>
              <HeaderBar />
              <Content className={styles.main}>
                <ChatGPT fetchPath="/api/chat-completion" />
              </Content>
              <FooterBar />
            </Layout>
          </Layout>
        </>
      )}
    </div>
  );
}