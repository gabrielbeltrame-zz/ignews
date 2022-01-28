import { query as q } from 'faunadb';

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react"

import {fauna} from '../../../services/fauna';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  jwt: {
    secret: process.env.SIGNING_KEY
  },
  callbacks: {
    async signIn(params) {
      const { email } = params.user
      
      try {
        await fauna.query(

          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(params.user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data:  {email} }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(params.user.email)
              )
            )
          )
        )
        
        return true;

      } catch(error) {
        console.log(error)
        return false
      }

    }
  }
})