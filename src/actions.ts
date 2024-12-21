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
import { testimonials, treckImages, trecks, users } from "./lib/db/schema";
import { eq } from "drizzle-orm";
import { getSuperUser } from "./lib/superuser";

export type ActionResult = {
  success: boolean;
  message: string;
};

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

export async function createTreck(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const priceStr = formData.get("price")?.toString().trim();
  const datesRaw = formData
    .getAll("dates")
    .map((date) => date.toString().trim());
  const images = formData
    .getAll("images")
    .map((img) => img.toString().trim())
    .filter(Boolean);

  if (!title || !description || !priceStr || datesRaw.length === 0) {
    return { success: false, message: "Title and description are required." };
  }

  const price = parseFloat(priceStr);
  if (isNaN(price) || price < 0) {
    return {
      success: false,
      message: "Price must be a valid non-negative number.",
    };
  }

  const dates: Date[] = [];
  for (const dateStr of datesRaw) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return {
        success: false,
        message: `Invalid date format: ${dateStr}`,
      };
    }
    dates.push(date);
  }

  try {
    const [newTreck] = await db
      .insert(trecks)
      .values({
        title,
        description,
        price,
        dates,
      })
      .returning();

    if (images.length > 0) {
      const imageInserts = images.map((imageUrl, index) => ({
        treckId: newTreck.id,
        imageUrl,
        order: index,
      }));
      await db.insert(treckImages).values(imageInserts);
    }

    return { success: true, message: "Treck created successfully." };
  } catch (error: any) {
    console.error("Error creating treck:", error);
    return {
      success: false,
      message: "An error occurred while creating the treck.",
    };
  }
}

export async function createTestimonial(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await getCurrentSession();
  if (!user?.is_admin) {
    return {
      success: false,
      message: "Unauthorised",
    };
  }
  const name = formData.get("name") as string;
  const heading = formData.get("heading") as string;
  const review = formData.get("review") as string;
  const image = formData.get("image") as string;

  if (!name || !heading || !review || !image) {
    console.error(name, heading, review, image);
    return {
      success: false,
      message: ">_",
    };
  }
  try {
    await db.insert(testimonials).values({
      name,
      heading,
      review,
      image,
    });
    return {
      success: true,
      message: "Added Testimonial",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: `${e}`,
    };
  }
}

export async function deleteTreck(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  const treckId = formData.get("treeckId");

  if (!treckId) {
    return {
      success: false,
      message: "Treck ID not provided.",
    };
  }
  console.log(treckId);
  try {
    await db
      .delete(treckImages)
      .where(eq(treckImages.treckId, Number(treckId)));

    await db.delete(trecks).where(eq(trecks.id, Number(treckId)));

    return {
      success: true,
      message: "Treck has been successfully deleted.",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Error in deleting",
    };
  }
}
