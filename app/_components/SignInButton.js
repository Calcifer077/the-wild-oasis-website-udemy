import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

function SignInButton() {
  return (
    // Below is a example of server action. By default if you want to add interactivity to your component you need to do so in client components, but if you want to do in server components you do so using server action which are build around forms.
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
