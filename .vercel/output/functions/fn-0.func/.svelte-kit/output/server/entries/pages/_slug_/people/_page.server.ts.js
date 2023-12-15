import { a as auth } from "../../../../chunks/firebase.js";
const load = async ({ parent, locals }) => {
  const { party } = await parent();
  if (!party?.hosts.includes(locals.session.uid)) {
    return {};
  }
  const attendeeIds = Object.keys(party?.attendees || {});
  const numbers = await Promise.all(
    attendeeIds.map(async (uid) => {
      const user = await auth.getUser(uid);
      return [uid, user?.phoneNumber || ""];
    })
  );
  return { numbers: Object.fromEntries(numbers) };
};
export {
  load
};
