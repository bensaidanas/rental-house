'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisetModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "../hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const router = useRouter();
    const registerModal = useRegisetModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative min-w-[200px]">
            <div className="flex justify-end items-center gap-3">
                {/* <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Rent your home
                </div> */}
                <div 
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                    <AiOutlineMenu />
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[200px] md:w-3/4 bg-neutral-900 overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        { currentUser ? (
                            <>
                                <MenuItem 
                                    onClick={() => router.push("/trips")}
                                    label="My trips"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/favorites")}
                                    label="My favorites"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/reservations")}
                                    label="My reservations"
                                />
                                <MenuItem 
                                    onClick={() => router.push("/properties")}
                                    label="My properties"
                                />
                                <MenuItem 
                                    onClick={rentModal.onOpen}
                                    label="Rent Your Property"
                                />
                                <hr />
                                <MenuItem 
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem 
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu