import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  if (locals.session?.uid)
    redirect(303, "/profile");
};
export {
  load
};
