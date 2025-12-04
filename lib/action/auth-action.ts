"use server";
import { redirect } from "next/navigation";
import { auth, prisma } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
const host = process.env.HOST;

export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return result;
  } catch (error) {
    console.log(`login error: ${error}`);
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    await prisma.user.update({
      where: { email },
      data: {
        username: name.toLowerCase(),
        userUrl: `${host}${name.toLowerCase()}`,
      },
    });
    return result;
  } catch (error) {
    console.log(`signup error: ${error}`);
  }
};

export const logOut = async () => {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });
    return { message: "Logged out successfully", success: true };
  } catch (error) {
    console.log(`logout error: ${error}`);
    return { message: "failed to LogOut", success: false };
  }
};

export const signInSocial = async (provider: "github") => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
  });

  if (url) {
    redirect(url);
  }
};

export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        userUrl: true,
        image: true,
        emailVerified: true,
      },
    });

    return {
      ...session,
      user,
    };
  } catch (error) {
    console.log(`get session error: ${error}`);
  }
};
