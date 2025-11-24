import { useAuth } from "@/hooks/authHooks/auth.hooks"
import { GoogleAuthSvg } from "../Svg/AuthSvg"

const GoogleAuthButton = () => {

    const { loginWithGoogle } = useAuth();

  return (
    <div aria-label="google-auth" onClick={loginWithGoogle} className="w-full py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800 border-zinc-100">
      <button type="button" className="w-full h-full flex items-center justify-center gap-2">
        <GoogleAuthSvg />
        <p className="text-sm md:text-base">Continue with Google</p>
      </button>
    </div>
  )
}

export default GoogleAuthButton