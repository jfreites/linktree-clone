import { TreePalm } from "lucide-react";
import Link from "next/link";

export function NotUserFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="mt-40 text-center items-center flex flex-col gap-5">
        <TreePalm className="h-20 w-20 text-green-400" />
        <div className="text-2xl font-semibold">404: Profile not found</div>
        <div className="text-gray-500">The page that you are looking for does not exists.</div>

        <p className="mt-12">
          Want this to be your profile?{" "}<Link href="/signup" className="text-blue-500">Create an account now, its free!</Link>
        </p>
      </div>

      <div className="font-semibold pb-5 flex gap-2 items-center justify-center">
        Linktree Clone <TreePalm className="h-5 w-5 text-green-400" />
      </div>
    </div>
  )
}
