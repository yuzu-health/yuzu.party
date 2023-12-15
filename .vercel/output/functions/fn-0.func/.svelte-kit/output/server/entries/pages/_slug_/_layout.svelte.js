import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, f as each } from "../../../chunks/ssr.js";
import { L as Layout } from "../../../chunks/Layout.js";
import "firebase/auth";
import "cleave.js";
import "../../../chunks/firebase2.js";
import { U as User } from "../../../chunks/User.js";
const Marker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>`;
});
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path></svg>`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"></path><path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd"></path></svg>`;
});
const ExternalLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clip-rule="evenodd"></path></svg>`;
});
const Layout_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let startTime;
  let endTime;
  let timezone;
  let { data } = $$props;
  let status;
  const generateDateString = (date) => !date ? "" : new Date(date).toLocaleString(void 0, {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  data.pathname;
  data?.uid;
  startTime = data.party?.date ? generateDateString(data.party?.date) : "hidden";
  endTime = startTime.split(" at ")[0] === generateDateString(data.party?.end).split(" at ")[0] ? generateDateString(data.party?.end).split(" at ")[1] : generateDateString(data.party?.end);
  timezone = (/* @__PURE__ */ new Date())?.toLocaleDateString(void 0, { day: "2-digit", timeZoneName: "long" })?.substring(4)?.match(/\b(\w)/g)?.join("");
  return `${$$result.head += `<!-- HEAD_svelte-1ulq8tz_START -->${$$result.title = `<title>${escape(data.party?.name)}</title>`, ""}<meta name="description"${add_attribute("content", data.party?.description, 0)}><meta property="og:title"${add_attribute("content", data.party?.name, 0)}><meta property="og:description"${add_attribute("content", data.party?.description, 0)}><meta property="og:image"${add_attribute("content", data.party?.image, 0)}><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", data.party?.name, 0)}><meta name="twitter:description"${add_attribute("content", data.party?.description, 0)}><meta name="twitter:image"${add_attribute("content", data.party?.image, 0)}><!-- HEAD_svelte-1ulq8tz_END -->`, ""} ${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    col2: () => {
      return `<div slot="col2" class="h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 -ml-[1px] z-10"><div class="relative flex flex-col h-full">${slots.default ? slots.default({}) : ``}</div></div>`;
    },
    col1: () => {
      return `<div slot="col1" class="flex flex-col h-[calc(100%-90px)] sm:max-h-[34rem] mt-[5px] sm:mt-0 z-10"><div class="yuzui overflow-y-auto flex flex-col h-full">${data.party?.image ? `<img class="w-full h-56 object-cover border-b border-panel" alt="Cover"${add_attribute("src", data.party?.image, 0)}>` : ``} <div class="p-4 flex flex-col gap-4"><div class="font-semibold text-xl whitespace-pre-wrap">${escape(data.party?.name)}</div> ${data.party?.date ? `<div class="text-primary text-opacity-75 flex items-center min-w-[50%] flex-wrap">${validate_component(Calendar, "Calendar").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(startTime)} ${data.party?.end ? `<span class="mx-2" data-svelte-h="svelte-2j6xs">-</span> ${escape(endTime)}` : ``}

						(${escape(timezone)})</div>` : ``} ${data.party?.location ? `<div class="text-primary text-opacity-75 flex">${validate_component(Marker, "Marker").$$render($$result, { class: "w-4 h-5 mr-2 shrink-0" }, {}, {})} ${escape(data.party?.location)}</div>` : ``} <div class="flex items-center gap-1 text-primary text-opacity-75">${validate_component(User, "User").$$render($$result, { class: "w-4 h-4" }, {}, {})} <div class="" data-svelte-h="svelte-19lzvj1">Hosted by</div> ${escape(data?.hostnames?.join(", "))}</div> <div class="flex flex-wrap items-start gap-x-4"><button class="flex items-center text-primary text-opacity-70 hover:text-opacity-100 transition-colors" type="button">${validate_component(ExternalLink, "ExternalLink").$$render($$result, { class: "w-4 h-4 mr-1" }, {}, {})}
						Share</button> ${data.party?.hosts.includes(data.uid) ? `<div><a class="inline-flex items-center gap-2 opacity-75 hover:opacity-100"${add_attribute("href", `/edit/${data.party?.id}`, 0)}>${validate_component(Edit, "Edit").$$render($$result, { class: "w-4 h-4" }, {}, {})}
								Edit</a></div>` : ``}</div> <div class="whitespace-pre-wrap">${escape(data.party?.description || "")}</div></div></div> <div class="z-0 sticky bottom-0 shrink-0 -mt-[1px]">${`${data?.party?.requireApproval && !["yes", "maybe"].includes("") ? `<button class="${["yuzui -mr-[1px] h-12 w-full", ""].join(" ").trim()}" data-svelte-h="svelte-5a8o32">Request to join</button>` : `<div class="yuzui-row w-full h-12 font-semibold">${each(["yes", "maybe", "no"], (option, i) => {
        return `<button class="${[
          "yuzui w-full " + escape(i === 2 ? "" : "-mr-[1px]", true) + " capitalize",
          status === option ? "pressed" : ""
        ].join(" ").trim()}">${escape(option)} </button>`;
      })}</div>`}`}</div></div>`;
    }
  })}`;
});
export {
  Layout_1 as default
};
