'use client';

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
const Form = () => {
    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }

    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {
            shouldValidate: true
        });
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    };

    const handleUpload = async (result: any) => {
        if (!result?.info?.secure_url) {
            console.error("Image upload failed");
            return;
        }
        try {
            await axios.post('/api/messages', {
                image: result.info.secure_url,
                conversationId
            });
        } catch (error) {
            console.error("Failed to send image message", error);
        }
    };
    

    return (
        <div
            className="
         py-4
         px-4
         bg-white
         border-t
         flex
         items-center
         gap-2
         lg:gap-4
         w-full
        "
        >
           <CldUploadButton
           options={{maxFiles: 1}}
           uploadPreset="ydyrulps"
           onSuccess={handleUpload}
           >
            <HiPhoto size={30} className="text-sky-500" />
           </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 w-full lg:gap-4"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />

                <button
                    type="submit"
                    className="
             rounded-full
             p-2
             bg-sky-500
             hover:bg-sky-600
             transition
             cursor-pointer
            "
                >
                    <HiPaperAirplane size={18} className="text-white" />

                </button>

            </form>

        </div>
    );
};

export default Form;