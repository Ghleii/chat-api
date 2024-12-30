import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google client ID or secret in environment variables.');
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Missing NEXTAUTH_SECRET in environment variables.');
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // セッションの暗号化に必要
  session: {
    strategy: 'jwt', // JWTを使用してセッションを管理
  },
  callbacks: {
    async jwt({ token, user }) {
      // ユーザ情報をトークンに追加
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // トークンからセッションにユーザ情報を追加
      if (token.email) {
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 認証後のリダイレクト処理
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: process.env.NODE_ENV === 'development', // 開発環境でのみデバッグを有効化
});
