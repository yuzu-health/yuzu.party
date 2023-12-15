import { c as create_ssr_component, a as add_attribute, s as subscribe, e as escape, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import "firebase/auth";
import "firebase/firestore";
import "../../../../chunks/firebase2.js";
import { p as page } from "../../../../chunks/stores.js";
import "cleave.js";
import { P as ProfilePic } from "../../../../chunks/ProfilePic.js";
const Send = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${add_attribute("class", clazz, 0)}><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"></path></svg>`;
});
const Phone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", clazz, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path></svg>`;
});
const Submit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { class: clazz = "" } = $$props;
  let message = "";
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  $$unsubscribe_page();
  return `<form class="${escape(clazz, true) + " yuzui-row"}"><div class="yuzui w-full"><input class="h-full w-full flex-grow !px-4" placeholder="type a message..." required${add_attribute("value", message, 0)}></div> ${$page?.data?.party?.hosts?.includes($page?.data?.uid) ? `<button data-tooltip="Make message a text alert" type="button" class="yuzui !px-2">${validate_component(Phone, "Phone").$$render(
    $$result,
    {
      class: "w-6 h-6 opacity-50"
    },
    {},
    {}
  )}</button>` : ``} <button type="submit" class="${[
    "yuzui after:!right-[14px] !px-3",
    " " + (!$page?.data?.party?.attendees?.[$page?.data?.uid]?.status ? "disabled" : "")
  ].join(" ").trim()}">${validate_component(Send, "Send").$$render(
    $$result,
    {
      class: `w-4 h-5 ${""}`
    },
    {},
    {}
  )}</button></form>`;
});
const css = {
  code: ".delete-button.svelte-149p0b3.svelte-149p0b3{opacity:0}.message.svelte-149p0b3:hover .delete-button.svelte-149p0b3{opacity:100}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attending;
  let numAttending;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let messageRef;
  let loadingMessage = "fetching...";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  attending = Object.entries(data.party?.attendees || {}).filter(([, { status }]) => status === "yes");
  numAttending = attending.length;
  $$unsubscribe_page();
  return `<div class="flex justify-between items-center font-medium -mb-[1px]"><div class="yuzui pl-4 h-10 w-full -mr-[1px] flex items-center border-b-0" data-svelte-h="svelte-16mfoz">Activity</div> ${data?.party?.attendees?.[data.uid]?.status ? `${each(attending.splice(0, 3), ([id, { name }]) => {
    return `${validate_component(ProfilePic, "ProfilePic").$$render(
      $$result,
      {
        class: "w-10 h-10 yuzui -mr-[1px] object-cover yuzui-bg-dots",
        uid: id,
        name
      },
      {},
      {}
    )}`;
  })} <a data-sveltekit-noscroll${add_attribute("href", $page.data.pathname + "/people", 0)} class="h-10 yuzui flex items-center whitespace-nowrap border-b-0 !px-2"><div class="text-sm">${escape(numAttending)} attending</div></a>` : ``}</div> <div class="h-full yuzui overflow-y-auto !border-b-0"${add_attribute("this", messageRef, 0)}>${`<div class="p-4 flex items-center justify-center h-full font-medium">${escape(loadingMessage)}</div>`}</div> ${``} ${validate_component(Submit, "Submit").$$render(
    $$result,
    {
      class: "sticky bottom-0 z-10  h-12 shrink-0 flex"
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
