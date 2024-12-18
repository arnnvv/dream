"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import {
  invalidateSession,
  validateSessionToken,
  type SessionValidationResult,
} from "./lib/auth";
import { deleteSessionTokenCookie } from "./lib/session";
import { db } from "./lib/db";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";
import { getSuperUser } from "./lib/superuser";

export type ActionResult = { success: boolean; message: string };

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const token = (await cookies()).get("session")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  },
);

export const signOutAction = async (): Promise<ActionResult> => {
  const { session } = await getCurrentSession();
  if (session === null)
    return {
      success: false,
      message: "Not authenticated",
    };

  try {
    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
    return {
      success: true,
      message: "LoggingOut",
    };
  } catch (e) {
    return {
      success: false,
      message: `Error LoggingOut ${e}`,
    };
  }
};

export const addAdminAction = async (
  _: any,
  formData: FormData,
): Promise<ActionResult> => {
  const email = formData.get("email");

  if (typeof email !== "string")
    return {
      success: false,
      message: "Email is required",
    };

  if (!/^.+@.+\..+$/.test(email) || email.length >= 256)
    return {
      success: false,
      message: "Invalid email",
    };

  try {
    const { user, session } = await getCurrentSession();
    if (session === null) {
      return {
        success: false,
        message: "Log In",
      };
    }
    if (user.email !== getSuperUser()) {
      return {
        success: false,
        message: "Unauthorised",
      };
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found with this email",
      };
    }

    if (existingUser.email === user.email) {
      return {
        success: false,
        message: "Can't add Yourself",
      };
    }

    if (existingUser.is_admin) {
      return {
        success: false,
        message: "User is already an admin",
      };
    }

    await db
      .update(users)
      .set({ is_admin: true })
      .where(eq(users.email, email));

    return {
      success: true,
      message: "Successfully added admin privileges",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Failed to add admin privileges",
    };
  }
};

export async function removeAdmin(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email");
  if (typeof email !== "string")
    return {
      success: false,
      message: "Email is required",
    };

  if (!/^.+@.+\..+$/.test(email) || email.length >= 256)
    return {
      success: false,
      message: "Invalid email",
    };

  const { user, session } = await getCurrentSession();
  if (session === null)
    return {
      success: false,
      message: "Log In",
    };
  if (user.email !== getSuperUser())
    return {
      success: false,
      message: "Bakchodi Nhi",
    };
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (!existingUser.is_admin) {
      return {
        success: false,
        message: "User is not an admin",
      };
    }

    await db
      .update(users)
      .set({ is_admin: false })
      .where(eq(users.email, email));

    return {
      success: true,
      message: "Successfully removed admin privileges",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Failed to remove admin privileges",
    };
  }
}
