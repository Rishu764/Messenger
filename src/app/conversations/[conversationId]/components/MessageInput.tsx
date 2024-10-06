'use client';

import { Conversation } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id:string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    type?: string,
    placeholder?: string,
    required?: boolean,

}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    type,
    errors,
    placeholder,
    required
}) => {
    return (
        <div
         className="
         relative w-full"
        >

            <input
                id={id}
                type={type}
                autoComplete="off"
                {...register(id, { required })}
                placeholder={placeholder}
                className="
                text-black
                font-light
                py-2
                px-4
                w-full
                bg-neutral-100
                focus:outline-none
                rounded-full
                p-4
                "
            />

        </div>
    );
};

export default MessageInput;