import { s as storage, a as auth } from "../../../../chunks/firebase.js";
const POST = async ({ request, locals }) => {
  if (!locals.session?.uid) {
    return new Response(null, { status: 401 });
  }
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.profilePic) {
    const buffer = await data.profilePic.arrayBuffer();
    const bf = Buffer.from(buffer);
    const file = storage.bucket().file(locals.session.uid + "/avatar");
    await file.save(bf);
  }
  if (data.displayName) {
    await auth.updateUser(locals.session.uid, { displayName: data.displayName });
  }
  return new Response("OK");
};
export {
  POST
};
