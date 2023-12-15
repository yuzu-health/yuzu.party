import { c as create_ssr_component, s as subscribe, a as add_attribute, e as escape, f as each, v as validate_component } from "../../../../chunks/ssr.js";
import { P as ProfilePic } from "../../../../chunks/ProfilePic.js";
import { p as page } from "../../../../chunks/stores.js";
import "cleave.js";
function timeSince(date) {
  const seconds = Math.floor((+/* @__PURE__ */ new Date() - +date) / 1e3);
  let interval = seconds / 31536e3;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592e3;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attendees;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let pageRef;
  let sort = $page.url.searchParams.get("sort") || "name";
  let showNum = 20;
  let isHost = $page.data.party?.hosts.includes($page.data.uid);
  const ranking = {
    request: "a",
    yes: "b",
    maybe: "c",
    no: "d",
    blocked: "e"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  attendees = Object.entries($page.data.party?.attendees || {}).sort((a, b) => {
    if (sort === "name")
      return a[1].name?.localeCompare(b[1].name);
    else if (sort === "status")
      return ranking[a[1].status]?.localeCompare(ranking[b[1].status]);
    else if (sort === "time")
      return b[1].timestamp - a[1].timestamp;
    else
      return 0;
  });
  {
    {
      showNum = 20;
    }
  }
  $$unsubscribe_page();
  return `<div class="yuzui-row"><a data-sveltekit-noscroll${add_attribute("href", $page.data.pathname.split("/").slice(0, -1).join("/"), 0)} class="yuzui !px-3 h-10 w-10 shrink-0">${escape("<-")}</a> <div class="yuzui !border-r-0 p-2 pl-4 w-full h-10" data-svelte-h="svelte-ab1ld0"><div class="font-semibold">People</div></div> <div class="yuzui !border-l-0 pr-8 flex items-center h-10"><div class="shrink-0 opacity-50 pr-1" data-svelte-h="svelte-1e4occp">Sort by</div> <select class="border-0 font-medium cursor-pointer text-center h-9 text-primary accent-primary"><option value="name" data-svelte-h="svelte-8o3xma">Name</option><option value="status" data-svelte-h="svelte-1xwofxm">Status</option><option value="time" data-svelte-h="svelte-f2efcy">Time</option></select></div></div> <div class="h-full overflow-y-auto yuzui !border-t-0"${add_attribute("this", pageRef, 0)}>${each(attendees.slice(0, showNum), (attendee, i) => {
    return `<div class="border-b flex gap-2 -ml-[1px] items-center">${validate_component(ProfilePic, "ProfilePic").$$render(
      $$result,
      {
        class: "h-10 w-10 shrink-0 inline-block border-r object-cover yuzui-bg-dots text-xs",
        uid: attendee[0],
        name: attendee[1].name
      },
      {},
      {}
    )} <div class="w-full flex flex-wrap items-center py-2"><div class="mr-2 overflow-hidden text-ellipsis whitespace-pre">${escape(attendee[1].name)}</div> <span class="opacity-50 shrink-0 text-sm">${escape(timeSince(new Date(attendee[1].timestamp)))}</span></div> ${isHost ? `<div>${escape(data.numbers?.[attendee[0]])}</div> <select class="text-right h-10 pr-2 font-medium underline cursor-pointer appearance-none accent-primary" style="direction: ltr;"${add_attribute("value", attendee[1].status, 0)}><option value="yes" data-svelte-h="svelte-y2mbp4">Yes</option><option value="maybe" data-svelte-h="svelte-uhe3fm">Maybe</option><option value="no" data-svelte-h="svelte-u9l2ja">No</option><option value="block" data-svelte-h="svelte-1rbqjqk">Block</option><option disabled value="request" data-svelte-h="svelte-jxlyxr">Requested</option></select>` : ``} </div>`;
  })}</div>`;
});
export {
  Page as default
};
