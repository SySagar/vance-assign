"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Menu, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { signInWithGoogle, signOutUser, auth } from "@app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@app/components/ui/sheet";
import {LogInIcon} from "lucide-react";

const navigation = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(router);
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  console.log(user);

  return (
    <nav className="bg-[#111111] p-4 border-b-[1px] border-[#292929]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <svg
              width="111"
              height="24"
              viewBox="0 0 111 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-auto"
            >
              <path
                d="M0.143311 0.279297H33.3691L19.8556 23.7636H15.1666L8.94765 8.29519H13.7194L18.1729 19.0558L26.4551 4.02467H2.16652L0.143311 0.279297Z"
                fill="#81EBAB"
              />
              <path
                d="M77.1865 12.5543C77.5023 11.6665 77.9589 10.8902 78.5583 10.2308C79.1578 9.57142 79.8684 9.06108 80.687 8.70168L80.6887 8.70091L80.6904 8.70022C81.5319 8.33955 82.4565 8.16254 83.4584 8.16254C84.5019 8.16254 85.423 8.3693 86.2056 8.80128C86.8673 9.15794 87.4219 9.64831 87.8676 10.2665L91.2301 7.58634C90.5907 6.6203 89.6761 5.862 88.4684 5.31461C87.1304 4.70816 85.5849 4.39941 83.8225 4.39941C82.0373 4.39941 80.4176 4.6816 78.9586 5.23985C77.5149 5.79937 76.2756 6.59086 75.2353 7.61318L75.234 7.61447L75.2327 7.61574C74.192 8.62051 73.3835 9.81425 72.8071 11.2013C72.2324 12.5841 71.9426 14.0977 71.9426 15.7471C71.9426 17.3776 72.3268 18.8034 73.0849 20.0379C73.8433 21.2544 74.9208 22.2118 76.3317 22.9085C77.7582 23.6036 79.4391 23.9581 81.3859 23.9581C83.0971 23.9581 84.6423 23.6945 86.0264 23.1735C87.2847 22.6828 88.4153 21.8808 89.4164 20.7562L86.7241 18.1105C86.0796 18.7867 85.3732 19.2961 84.6046 19.6283C83.7495 20.0058 82.8528 20.195 81.9181 20.195C80.8792 20.195 79.9556 20.0088 79.1597 19.621L79.1539 19.6182L79.1482 19.6152C78.3751 19.2083 77.7665 18.6432 77.3333 17.9211L77.3297 17.9152L77.3263 17.9091C76.9141 17.1671 76.714 16.3211 76.714 15.3831C76.714 14.3698 76.8699 13.4256 77.1865 12.5543Z"
                fill="#81EBAB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.9304 19.7577H41.9273L42.713 23.5666H47.3533L42.3948 4.79199H36.7624L25.9114 23.5666H30.7364L32.9304 19.7577ZM39.5551 8.25718L41.2551 16.4987H34.8077L39.5551 8.25718Z"
                fill="#81EBAB"
              />
              <path
                d="M64.2483 16.2313L66.5313 4.79199H71.118L67.3631 23.5666H63.3727L56.4611 12.0962L54.1719 23.5666H49.5852L53.3401 4.79199H57.3309L64.2483 16.2313Z"
                fill="#81EBAB"
              />
              <path
                d="M96.922 20.1115L97.7962 15.6968H106.524L107.173 12.3817H98.452L99.2705 8.24704H109.159L109.859 4.79199H95.3585L91.6042 23.5666H106.472L107.195 20.1115H96.922Z"
                fill="#81EBAB"
              />
            </svg>
          </Link>
        </div>
        <div className="hidden md:flex md:ml-80 space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex md:justify-center md:items-center gap-3">

        {user!==null ? (
                  <>
                    <span className="mr-4">Hello, {user.displayName}</span>
                    <button
                      onClick={()=>signOutUser(router)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Button
                  variant={"ghost"}
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 rounded-xl text-primary  hover:bg-[#5FD789] hover:bg-opacity-25 hover:text-white"
                  >
                     Login <LogInIcon className="h-5 w-5" />
                  </Button>
                )}

          <Button className="text-black p-6 rounded-3xl font-bold tracking-tight">
            Download app
            <div className="h-5 w-5 ml-2 bg-black rounded-3xl flex justify-center items-centers">
              <ArrowDown className="stroke-[var(--stroke-color)] max-h-4 max-w-4 mt-[2px]" />
            </div>
          </Button>
      
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-[#111111]"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="text-black hover:bg-[#5FD789] w-full">
                  Download app
                </Button>

                {user!==null ? (
                  <>
                    <span className="mr-4">Hello, {user.displayName}</span>
                    <button
                      onClick={()=>signOutUser(router)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 text-white hover:bg-blue-700 rounded"
                  >
                    Login with Google
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
