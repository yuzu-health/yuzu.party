import { d as db } from "../../../../../chunks/firebase.js";
import { j as json } from "../../../../../chunks/index.js";
const GET = async ({ locals, url }) => {
  const uid = locals.session?.uid;
  const sort = url.searchParams.get("sort") || "all";
  const startAfter = url.searchParams.get("startAfter") || "";
  if (!uid) {
    return json({ parties: [], uid });
  }
  let parties;
  if (sort === "hosting") {
    parties = db.collection("parties").where("hosts", "array-contains", uid).orderBy("createdAt", "desc");
  } else if (sort === "upcoming") {
    parties = db.collection("parties").where("guests", "array-contains", uid).orderBy("date", "asc").where("date", ">", Date.now());
  } else {
    parties = db.collection("parties").where("guests", "array-contains", uid).orderBy("createdAt", "desc");
  }
  if (startAfter) {
    parties = parties.startAfter(await db.collection("parties").doc(startAfter).get());
  }
  const data = await parties.limit(10).get();
  const partiesData = data.docs.map((doc) => {
    const data2 = doc.data();
    return { id: doc.id, ...data2 };
  });
  return json({ parties: partiesData });
};
export {
  GET
};
