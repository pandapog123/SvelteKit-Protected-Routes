import { getUser, getUserByEmailAndPassword } from "$lib/auth.js";
import { fail, redirect } from "@sveltejs/kit";
import { ZodError, z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const actions = {
  default: async ({ request, cookies }) => {
    const id = cookies.get("id");

    if (id && getUser(id)) {
      throw redirect(303, "/");
    }

    const formData = Object.fromEntries(await request.formData());

    try {
      const parsedData = loginSchema.parse(formData);

      const id = getUserByEmailAndPassword(
        parsedData.email,
        parsedData.password
      );

      if (!id) {
        throw new Error(`User not found`);
      }

      cookies.set("id", id, {
        path: "/",
        httpOnly: true,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return fail(500, {
          error: err.issues[0].message,
          data: formData,
        });
      }

      if (err instanceof Error) {
        return fail(500, {
          error: err.message,
          data: formData,
        });
      }

      return fail(500, {
        error: "Sample text",
        data: formData,
      });
    }

    throw redirect(303, "/account");
  },
};
