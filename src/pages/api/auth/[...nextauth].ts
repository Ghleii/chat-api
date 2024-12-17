import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // JWTを使用
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // JWTにユーザ情報を追加
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        session.user.email = token.email; // セッションにユーザ情報を追加
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl; // 認証後のリダイレクトURL
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
