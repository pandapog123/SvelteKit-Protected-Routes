import { createUser, getUser } from "$lib/auth.js";
import { fail, redirect } from "@sveltejs/kit";
import { ZodError, z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1),
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
      const parsedData = signupSchema.parse(formData);

      const id = createUser({
        name: parsedData.name,
        email: parsedData.email,
        password: parsedData.password,
      });

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
