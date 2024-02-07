import { getUser } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const id = cookies.get("id");

  if (!id) {
    throw redirect(303, "/auth/signup");
  }

  const user = getUser(id);

  if (!user) {
    throw redirect(303, "/auth/signup");
  }

  return { user };
}) satisfies PageServerLoad;

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete("id");

    throw redirect(303, "/");
  },
};
