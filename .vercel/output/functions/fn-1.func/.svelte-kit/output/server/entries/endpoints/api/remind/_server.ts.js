import { d as db, a as auth } from "../../../../chunks/firebase.js";
import { t as text } from "../../../../chunks/twilio.js";
const config = {
  runtime: "nodejs18.x",
  split: true
};
const GET = async () => {
  const now = /* @__PURE__ */ new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(now.getDate() + 1);
  const timestamp = now.getTime();
  const later = /* @__PURE__ */ new Date();
  later.setHours(0);
  later.setMinutes(0);
  later.setSeconds(0);
  later.setMilliseconds(0);
  later.setDate(later.getDate() + 2);
  const laterTimestamp = later.getTime();
  const parties = await db.collection("parties").where("date", ">=", timestamp).where("date", "<", laterTimestamp).get();
  const partyData = parties.docs.map((party) => {
    const data = party.data();
    return { id: party.id, ...data };
  });
  await Promise.all(
    Object.values(partyData).map(async (party) => {
      if (!party.attendees || party.alerted)
        return;
      await Promise.all(
        Object.entries(party.attendees).map(async ([uid, { status }]) => {
          if (!["yes", "maybe"].includes(status))
            return;
          const user = await auth.getUser(uid);
          try {
            await text(
              user.phoneNumber,
              `Reminder: You have the party, ${party.name}, tomorrow!
							
https://${party.urlHost || "yuzu.party"}/${party.id}
        `
            );
          } catch (err) {
            console.log(err);
          }
        })
      );
      await db.collection("parties").doc(party.id).update({ alerted: true });
    })
  );
  return new Response("OK");
};
export {
  GET,
  config
};
