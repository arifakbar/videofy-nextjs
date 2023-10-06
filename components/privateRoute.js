import { UserStore } from "@/hooks/user-store"
import { redirect } from "next/navigation";

export const userRoutes = Component => {
    const Auth = (props) => {
        const { user, token } = UserStore();
        if (!user || !token) {
            return redirect("/")
        }
        return <Component {...props} />
    }
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }
    return Auth;
}