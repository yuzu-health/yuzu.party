import { a as auth } from "../../../chunks/firebase.js";
import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  const uid = locals.session?.uid;
  if (!uid) {
    redirect(303, "/signin");
  }
  return {
    uid,
    displayName: (await auth.getUser(uid)).displayName
  };
};
export {
  load
};
