import { d as db } from "../../chunks/firebase.js";
const filterAttendees = (attendees, uid) => Object.entries(attendees).reduce((acc, [key, value]) => {
  const val = value;
  if (val && ["yes", "maybe"].includes(val?.status || ""))
    acc[key] = value;
  if (key === uid)
    acc[key] = value;
  return acc;
}, {});
const load = async ({ url, locals, params }) => {
  const uid = locals.session?.uid;
  const pathname = url.pathname;
  if (params.slug) {
    const partyGet = await db.collection("parties").doc(params.slug).get();
    const party = partyGet.data();
    if (!party)
      return { pathname, uid };
    const isHost = party?.hosts.includes(uid);
    const isAttending = ["yes", "maybe"].includes(party?.attendees[uid]?.status);
    return {
      pathname,
      uid,
      party: {
        id: partyGet.id,
        ...party,
        attendees: !uid ? {} : isHost ? party.attendees : filterAttendees(party.attendees, uid),
        location: isAttending ? party?.location : "hidden"
      }
    };
  }
  return { pathname, uid };
};
export {
  load
};
