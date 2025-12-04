"use server"
import { getUserSession } from "@/lib/action/auth-action";
import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const saveEdit = async (newUserName: string, oldUsername: string) => {
  const session = await getUserSession();
  if (!session || !session.user) {
    return { message: "User not authenticated", success: false };
  }
  const userId = session.user.id;
  const userEmail = session.user.email;

  if (!userId || !userEmail || !newUserName || !oldUsername) {
    console.log("Missing parameters for updating user.");
    return { message: "Missing parameters for updating user.", success: false };
  }
  try {
    const host = process.env.HOST;

    const nameCheck = await prisma.user.findUnique({
      where: { username: newUserName },
    });
    if (nameCheck) {
      return { message: "Name already in Use", success: false };
    }
    console.log(host);
    const updatedPostLink = await prisma.post.updateMany({
      where: { reciever: `${host}${oldUsername}` },
      data: { reciever: `${host}${newUserName!}` },
    });
    const updatedUser = await prisma.user.update({
      where: { id: userId, email: userEmail },
      data: {
        username: newUserName!,
        userUrl: `${host}${newUserName!}`,
      },
    });

    revalidatePath("/dashboard");
    return {
      message: "Username updated successfully!",
      success: true,
      user: {
        username: updatedUser.username,
        userUrl: updatedUser.userUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update username", success: false };
  }
};

export const sendMessage = async (content: string, url: string) => {
  const session = await getUserSession();

  if (!content || !url) {
    return { message: " missing Values", success: false };
  }

  const findUrl = await prisma.user.findUnique({
    where: {
      userUrl: url,
    },
  });
  if (!findUrl) {
    return { message: "This user is not registered", success: false };
  }

  const generateId = crypto.randomUUID();

  const checkId = (): string => {
    if (session?.user?.id) {
      return `REG_${generateId}`;
    } else {
      return `NOTREG_${generateId}`;
    }
  };

  try {
    const message = await prisma.post.create({
      data: {
        id: checkId(),
        message: content,
        reciever: url,
        authorId: session?.user?.id,
      },
    });
    return { message: " Sent Successfully", success: true };
  } catch (error) {
    console.log(error);
    return { message: "failed to send message", success: false };
  }
};

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
        take: 3,
      });
      return {
        posts,
        message: "",
        success: true,
      };
    } else {
      return { message: "failed to get Message", success: false };
    }
  } catch (error) {
    console.log(error);
    return { message: "failed to get Message", success: false };
  }
};

export const setUsername = async ()=>{
    const session = await getUserSession()
    const email = session?.user?.email
    const username = session?.user?.name
      try {

    const host = process.env.HOST;
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        username: username!.toLowerCase(),
        userUrl: `${host}${username!.toLowerCase()}`,
      },
    });

    return {
      message: "Signin Successful, Username updated!",
      success: true,
      user: {
        username: updatedUser.username,
        userUrl: updatedUser.userUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return { message: "Failed to set username", success: false };
  }
}