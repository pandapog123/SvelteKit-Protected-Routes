import { getUser } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const id = cookies.get("id");

  if (!id) {
    return;
  }

  if (getUser(id)) {
    throw redirect(303, "/");
  }

  return;
}) satisfies LayoutServerLoad;
