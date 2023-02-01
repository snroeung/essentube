import NextAuth, { Account, Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

async function refreshAccessToken(token: JWT) {
    try {
      const url =
        "https://oauth2.googleapis.com/token?" +
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          grant_type: "refresh_token" as string,
          refresh_token: token.refreshToken as string,
        })
  
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      })
  
      const refreshedTokens = await response.json()
  
      if (!response.ok) {
        throw refreshedTokens
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      }
    } catch (error) {
      console.log(error)
  
      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
  }

export default NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                url: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code" as string,
                params: {
                    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    callbacks: {
        async jwt({ token, user, account}): Promise<JWT> {
            let exp = account?.expires_at ?? 0;
            if (account && user) {
            return {  
              accessToken: account.access_token,
              accessTokenExpires: Date.now() + exp * 1000,
              refreshToken: account.refresh_token,
              user
            }
          }
    
          // Return previous token if the access token has not expired yet
          if (account?.expires_at === null || Date.now() < token.accessTokenExpires) {
            return token
          }
    
          // Access token has expired, try to update it
          return refreshAccessToken(token)
        },
        async session({ session, token }: {session: Session, token: JWT}): Promise<Session> {
          session.user = token.user
          session.accessToken = token.accessToken
          session.error = token.error
    
          return session
        },
      }
});

