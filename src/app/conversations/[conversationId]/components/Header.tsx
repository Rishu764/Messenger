'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import React from "react";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}
const Header: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);


    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return 'Active';

    }, [conversation]);



    return (
        <>
        <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div
            className="
         bg-white
         w-full
         flex
         items-center
         justify-between
         px-4
         py-3
         border-b-[1px]
         sm:px-4
         lg:px-6
         shadow-sm
        "
        >
            <div className="
             flex 
             items-center
             gap-3
            ">

                <Link
                    className="
                 lg:hidden
                 block
                 text-sky-500
                 hover:text-sky-600
                 transition
                 cursor-pointer
                "
                    href="/conversations"
                >
                    <HiChevronLeft size={32} />

                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div>
                        {
                            conversation.name || otherUser.name
                        }
                    </div>
                    <div
                        className="
                      text-sm
                      font-light
                      text-neutral-500
                     "
                    >
                        {
                            statusText
                        }
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal size={32} className="cursor-pointer text-sky-500 hover:text-sky-600 transition" onClick={() => setDrawerOpen(true)} />
        </div>
        
        </>
    )
};

export default Header;