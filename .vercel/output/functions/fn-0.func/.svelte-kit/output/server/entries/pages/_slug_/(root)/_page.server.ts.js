import { a as auth } from "../../../../chunks/firebase.js";
const load = async ({ locals }) => {
  try {
    const token = await auth.createCustomToken(locals.session?.uid);
    return {
      token,
      uid: locals.session?.uid
    };
  } catch (e) {
    return {};
  }
};
export {
  load
};
