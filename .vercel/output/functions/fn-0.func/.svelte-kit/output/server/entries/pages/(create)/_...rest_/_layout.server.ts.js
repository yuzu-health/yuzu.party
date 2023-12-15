import { d as db } from "../../../../chunks/firebase.js";
const load = async ({ url, locals }) => {
  const parts = url.pathname.split("/");
  if (parts[1] === "edit" && parts[2]) {
    const party = await db.collection("parties").doc(parts[2]).get();
    const data = party.data();
    return {
      pathname: url.pathname,
      loggedIn: !!locals.session,
      party: { id: party.id, ...data }
    };
  }
  return { pathname: url.pathname, loggedIn: !!locals.session };
};
export {
  load
};
