import { Loader2 } from "lucide-react"

export default function SpinLoading() {
    return <div className="h-[100vh] flex items-center justify-center">
        <Loader2 className="animate-spin h-7 w-7 " />
    </div>
}