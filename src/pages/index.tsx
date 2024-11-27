import ChatGPT from '@/components/ChatGPT'
import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'

import { signIn, useSession } from "next-auth/react";

import FooterBar from '@/components/FooterBar'
import HeaderBar from '@/components/HeaderBar'

import styles from './index.module.less'

// export default function Home() {
//   return (
//     <Layout hasSider className={styles.layout}>
//       <Layout>
//         <HeaderBar />
//         <Content className={styles.main}>
//           <ChatGPT fetchPath="/api/chat-completion" />
//         </Content>
//         <FooterBar />
//       </Layout>
//     </Layout>
//   )
// }

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <h2>ようこそ！以下のボタンを押してログインしてください．</h2>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
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