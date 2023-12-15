import { a as auth } from "../../../chunks/firebase.js";
const load = async ({ url, locals, parent }) => {
  const uid = locals?.session?.uid;
  const pathname = url?.pathname;
  const { party } = await parent();
  let hostnames;
  try {
    hostnames = await Promise.all(
      (party?.hosts || []).map(async (uid2) => {
        const user = await auth.getUser(uid2);
        return user?.displayName || "";
      })
    );
  } catch (error) {
    hostnames = [];
  }
  if (party) {
    return { pathname, uid, party, hostnames };
  }
  return { pathname, uid };
};
export {
  load
};
