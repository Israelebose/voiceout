"use server"
import { getUserSession } from "@/lib/action/auth-action";
import { prisma } from "@/lib/auth";
export const getMessage = async () => {
  const session = await getUserSession();
  if (!session || !session.user) {
    return { message: "User not authenticated", success: false };
  }
  const url = session?.user?.userUrl;
  try {
    if (url !== null) {
      const posts = await prisma.post.findMany({
        where: { reciever: url },
        orderBy: { createdAt: "desc" },
      });
      if (posts.length === 0) {
        return {
          posts,
          message: "No Messages Found",
          success: false,
          count: posts.length,
        };
      }
      return {
        posts,
        message: "",
        success: true,
        count: posts.length,
      };
    } else {
      return { message: "failed to get Message", success: false };
    }
  } catch (error) {
    console.log(error);
    return { message: "failed to get Message", success: false };
  }
};