import Filter from "bad-words";
import { v4 } from "uuid";
import { d as db } from "./firebase.js";
const filter = new Filter();
const addMessage = async ({ uid = "", message = "", alert = "", partyId = "" }) => {
  const newMessage = {
    message: message ? filter.clean(message) : void 0,
    alert,
    timestamp: Date.now(),
    uid
  };
  const blocks = [];
  const ref = db.collection("parties").doc(partyId).collection("blocks");
  const snapshot = await ref.orderBy("createdAt", "desc").limit(1).get();
  snapshot.forEach((doc) => blocks.push({ id: doc.id, ...doc.data() }));
  if (snapshot.size && Object.values(blocks[0].messages).length < 1e3) {
    await ref.doc(blocks[0].id).set({ messages: { [v4()]: newMessage } }, { merge: true });
  } else {
    await ref.add({ createdAt: Date.now(), messages: { [v4()]: newMessage } });
  }
};
export {
  addMessage as a
};
