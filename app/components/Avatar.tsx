'use client'

import Image from "next/image"
import avatar from "@/public/images/avatar.png"

const Avatar = () => {
    return (
        <Image
            className="rounded-full"
            width="30"
            height="30"
            alt="Avatar"
            src={avatar}
        />
    )
}

export default Avatar