import { fail, redirect } from "@sveltejs/kit";
import { APIError } from "better-auth/api";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { auth } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { signupSchema } from "./schema";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }
  return { form: await superValidate(zod4(signupSchema)) };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(signupSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const { email, password, name } = form.data;

    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          callbackURL: "/auth/verification-success",
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, {
          form,
          message: error.message || "Registration failed",
        });
      }
      return fail(500, { form, message: "Unexpected error" });
    }

    return redirect(302, "/");
  },
};
