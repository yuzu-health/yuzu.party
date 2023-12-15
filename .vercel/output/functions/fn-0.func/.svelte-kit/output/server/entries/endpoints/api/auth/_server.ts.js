import { a as auth } from "../../../../chunks/firebase.js";
import { j as json } from "../../../../chunks/index.js";
const GET = async ({ request }) => {
  const phoneNumber = request.headers.get("x-phone-number");
  if (!phoneNumber)
    return json({ message: "new user" });
  const cleanedPhoneNumber = "+" + phoneNumber.replace(/\D/g, "");
  try {
    const userRecord = await auth.getUserByPhoneNumber(cleanedPhoneNumber);
    if (!userRecord?.displayName)
      return json({ message: "no name" });
  } catch (err) {
    await auth.createUser({ phoneNumber: cleanedPhoneNumber });
    return json({ message: "no name" });
  }
  return json({ message: "ok" });
};
const POST = async ({ request, cookies }) => {
  const { idToken, name } = await request.json();
  let user;
  try {
    user = await auth.verifyIdToken(idToken);
  } catch (err) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (name) {
    await auth.updateUser(user.uid, { displayName: name });
  }
  const userRecord = await auth.getUser(user.uid);
  if (!userRecord.displayName) {
    return new Response("No name", { status: 400 });
  }
  const expiresIn = 60 * 60 * 24 * 14 * 1e3;
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  cookies.set("session", sessionCookie, {
    path: "/",
    maxAge: expiresIn,
    httpOnly: true,
    secure: true
  });
  return new Response("OK");
};
const DELETE = async ({ cookies }) => {
  cookies.delete("session", { path: "/" });
  return new Response("OK");
};
export {
  DELETE,
  GET,
  POST
};
