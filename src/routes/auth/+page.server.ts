import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  throw redirect(303, "/auth/signup");
}) satisfies PageServerLoad;
