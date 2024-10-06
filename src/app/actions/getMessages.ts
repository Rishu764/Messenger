import prisma from '@/app/libs/prismadb';

const getMessages = async (ConversationId: string) => {
    try{
        const messages = await prisma.message.findMany({
                where:{
                    conversationId:ConversationId
                },
                include:{
                    sender: true,
                    seen: true
                },
                orderBy:{
                    createdAt: 'asc'
                }
        });

        return messages;
    }catch(err){
        return [];
    }
};

export default getMessages;