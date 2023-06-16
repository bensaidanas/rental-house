'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/images/logo.png"


const Logo = () => {
    const router = useRouter()
    return (
        <Image
            alt="Venus Logo"
            className="hidden md:block cursor-pointer"
            width="100"
            height="50"
            src={logo}
        />
    )
}

export default Logo