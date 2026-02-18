// This whole thing is based on older version of next-auth.

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// For google to work as a provider you need to configure it on the console. You can do that by going to https://console.cloud.google.com/apis/credentials and creating a new OAuth 2.0 Client ID. You will need to set the authorized redirect URI to http://localhost:3000/api/auth/callback/google (or the appropriate URL for your deployment). Once you have created the client ID, you will get a client ID and client secret that you can use in your NextAuth configuration.
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Below 'authorized' needs to return either true or false. If it returns true, the user is authorized to access the protected route. If it returns false, the user is not authorized and will be redirected to the sign-in page. In this example, we are checking if the auth object has a user property. If it does, we return true, otherwise we return false. This means that only authenticated users will be able to access the protected route.
    // Will be run on request to 'account' because that's what we have mentioned in the middleware.
    authorized({ auth, request }) {
      // If auth.user return true else return false.
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Below two handlers 'GET' and 'POST' will be implemented by us in a route.js file, and we will export them from there. NextAuth will use these handlers to handle the authentication requests.
// Below we have also mentioned signIn and signOut functions which we will use in our server actions to sign in and sign out the user. It is just to make sure that the authentication happens on the app.
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
