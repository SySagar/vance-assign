import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@app/store/useAuth";
import { Button } from "./ui/button";
import { TailSpin } from "react-loader-spinner";

export function withAuthProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthProtection(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#7265ee"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <p className="text-white text-xl">
            You need to be authenticated to access this page
          </p>
          <Button onClick={() => router.push("/")}>Go back to home</Button>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
