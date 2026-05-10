import { fail, redirect } from "@sveltejs/kit";
import { APIError } from "better-auth/api";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { auth } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { loginSchema } from "./schema";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/projects");
  }
  return { form: await superValidate(zod4(loginSchema)) };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const { email, password } = form.data;

    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: "/auth/verification-success",
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, { form, message: error.message || "Signin failed" });
      }
      return fail(500, { form, message: "Unexpected error" });
    }

    return redirect(302, "/projects");
  },
};
