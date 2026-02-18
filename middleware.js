/* This is a middleware function that will run on every request to the server. It takes in a request object and can perform any necessary operations before the request is processed further. In this example, it simply logs the request to the console.
export function middleware(request) {
  console.log(request);
}
*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// Below is a config object with matcher property to specify which paths the middleware should run on. In this case, it will only run on the '/account' path.
export const config = {
  matcher: ["/account"],
};
