import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../../chunks/ssr.js";
import "browser-image-compression";
import "../../../chunks/firebase2.js";
import { P as ProfilePic } from "../../../chunks/ProfilePic.js";
import { L as Layout } from "../../../chunks/Layout.js";
import { C as Camera } from "../../../chunks/Camera.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let src;
  let { data } = $$props;
  let files;
  let displayName = data.displayName || "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  src = files?.[0];
  return `${$$result.head += `<!-- HEAD_svelte-1u2dft7_START -->${$$result.title = `<title>Profile</title>`, ""}<!-- HEAD_svelte-1u2dft7_END -->`, ""} ${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    col2: () => {
      return `<form class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 flex flex-col" slot="col2"><div class="yuzui-row"><div class="yuzui p-2 font-medium w-full -mr-[1px]" data-svelte-h="svelte-snk5xn">Profile</div> <button type="button" class="yuzui whitespace-pre" data-svelte-h="svelte-1mxzaw7">Sign out</button></div> <div class="yuzui !border-b-0 overflow-y-auto h-full -mt-[1px] p-4 flex gap-4 flex-col"><div class="inline-block"><label class="relative cursor-pointer"><div class="h-20 w-20 absolute left-0 top-0 flex items-center justify-center"><span class="bg-light">${validate_component(Camera, "Camera").$$render($$result, { class: "h-10 w-10 p-1" }, {}, {})}</span></div> ${validate_component(ProfilePic, "ProfilePic").$$render(
        $$result,
        {
          class: "h-20 w-20 yuzui-bg-dots border border-current object-cover",
          src,
          uid: data?.uid
        },
        {},
        {}
      )} <input class="hidden" name="avatar" type="file" accept="image/*"></label></div> <input required maxlength="20" class="focus-visible:outline-0 border-b inline-block pb-1"${add_attribute("value", displayName, 0)}></div> <button class="${["yuzui", ""].join(" ").trim()}" ${!displayName || displayName === data?.displayName && !files?.[0] ? "disabled" : ""}>Save Profile</button></form>`;
    },
    col1: () => {
      return `<div class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 -mr-[1px] yuzui-column" slot="col1"><div class="yuzui flex"><span class="font-medium p-2 flex flex-row items-center w-full" data-svelte-h="svelte-17mcvv9">Parties</span> <span class="float-right pr-2 whitespace-pre"><span class="font-light opacity-50" data-svelte-h="svelte-1cwqabz">Sort By</span> <select class="h-10 text-primary accent-primary"><option selected value="all" data-svelte-h="svelte-1vc05mt">All </option><option value="upcoming" data-svelte-h="svelte-2m822">Upcoming</option><option value="hosting" data-svelte-h="svelte-o5opdq">Hosting</option></select></span></div> <div class="yuzui yuzui-column grow">${`<div class="grow yuzui flex items-center justify-center h-full" data-svelte-h="svelte-qrzu3t">fetching...</div>`}</div> <a href="/" class="yuzui sticky bottom-0 text-center yuzui-bg-dots -mt-[1px]" data-svelte-h="svelte-1k5mngf"><span class="px-2 bg-light font-semibold">Create a party</span></a></div>`;
    }
  })}`;
});
export {
  Page as default
};
