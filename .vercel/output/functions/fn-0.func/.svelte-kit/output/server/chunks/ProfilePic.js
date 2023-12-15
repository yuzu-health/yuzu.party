import { c as create_ssr_component, e as escape, a as add_attribute } from "./ssr.js";
import { P as PUBLIC_FIREBASE_STORAGE_BUCKET } from "./public.js";
const ProfilePic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "" } = $$props;
  let { uid = "" } = $$props;
  let { name = "" } = $$props;
  let { class: className = "" } = $$props;
  const fbImage = `https://firebasestorage.googleapis.com/v0/b/${PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${uid}%2Favatar?alt=media`;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.uid === void 0 && $$bindings.uid && uid !== void 0)
    $$bindings.uid(uid);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div class="${escape(className, true) + " relative shrink-0"}">${name ? `<div class="absolute h-full w-full flex items-center justify-center"><span class="p-1 bg-light uppercase font-normal">${escape(name.split(" ").map((w) => w[0]).splice(0, 3).join(""))}</span></div>` : ``} <img${add_attribute("class", "h-full w-full absolute object-cover ", 0)}${add_attribute("src", src || (uid ? fbImage : "/transparent.png"), 0)} alt="${"Profile Picture of " + escape(uid, true)}"></div>`;
});
export {
  ProfilePic as P
};
