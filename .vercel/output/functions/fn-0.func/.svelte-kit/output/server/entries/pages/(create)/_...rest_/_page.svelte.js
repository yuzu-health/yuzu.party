import { c as create_ssr_component, a as add_attribute, s as subscribe, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { C as Camera } from "../../../../chunks/Camera.js";
import { p as party } from "../../../../chunks/store.js";
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"></path></svg>`;
});
const css = {
  code: "input.svelte-h1lww7{position:relative}input.svelte-h1lww7::-webkit-calendar-picker-indicator{position:absolute;right:0;width:100%;height:100%;background:none}@supports (-webkit-touch-callout: none){input[type='datetime-local'].opacity-30.svelte-h1lww7::before{content:'Date'}}input.svelte-h1lww7::-webkit-date-and-time-value{text-align:left}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let src;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(party, (value) => $store = value);
  const generateDateTimeLocal = (date) => {
    const d = date ? new Date(date) : void 0;
    if (!d)
      return "";
    return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
  };
  const minDate = generateDateTimeLocal(/* @__PURE__ */ new Date());
  let showEnd = !!$store.end;
  $$result.css.add(css);
  src = $store.files?.[0] ? URL.createObjectURL($store.files?.[0]) : $store.image;
  $$unsubscribe_store();
  return `${$$result.head += `<!-- HEAD_svelte-ptk1n7_START -->${$$result.title = `<title>Yuzu Party</title>`, ""}<!-- HEAD_svelte-ptk1n7_END -->`, ""} <div class="p-2 yuzui font-semibold" data-svelte-h="svelte-1uwi6e0">Create a party</div> <div class="relative border-b yuzui">${src ? `<button type="button" class="absolute top-1 right-1 z-10">${validate_component(X, "X").$$render($$result, { class: "w-5 h-5" }, {}, {})}</button>` : ``} <label class="relative">${src ? `<img class="yuzui-bg-dots h-56 w-full max-w-[32rem] object-cover text-primary text-opacity-30"${add_attribute(
    "src",
    $store.files?.[0] ? URL.createObjectURL($store.files?.[0]) : $store.image,
    0
  )} alt="Cover">` : `<div class="yuzui-bg-dots h-56 w-full max-w-[32rem] text-primary text-opacity-30 flex items-center justify-center cursor-pointer">${validate_component(Camera, "Camera").$$render(
    $$result,
    {
      class: "w-6 h-6 text-opacity-100 text-primary"
    },
    {},
    {}
  )}</div>`} <input class="hidden svelte-h1lww7" name="image" type="file" accept="image/*"></label></div> <label class="flex yuzui px-2"><div class="font-medium w-24 py-2 shrink-0" data-svelte-h="svelte-vqm7ak">Title</div> <input class="w-full svelte-h1lww7" required maxlength="50" placeholder="Title"${add_attribute("value", $store.name, 0)}></label> <div class="flex yuzui"><div class="flex items-center pl-2 w-full"><div class="font-medium w-24 py-2 shrink-0" data-svelte-h="svelte-dav48q">Start</div> <input${add_attribute("value", generateDateTimeLocal($store.date), 0)}${add_attribute("min", minDate, 0)} class="${[
    "w-full text-left h-10 accent-primary svelte-h1lww7",
    !$store.date ? "opacity-30" : ""
  ].join(" ").trim()}" type="datetime-local" required></div> <button type="button" class="${["whitespace-pre text-sm font-medium pr-2", !$store.date ? "disabled" : ""].join(" ").trim()}">${escape(showEnd ? "-" : "+")} End</button></div> ${showEnd ? `<div class="flex border-b yuzui items-center pl-2 w-full"><div class="font-medium w-24 py-2 shrink-0" data-svelte-h="svelte-ua1lu1">End</div> <input${add_attribute("value", generateDateTimeLocal($store.end), 0)}${add_attribute("min", generateDateTimeLocal($store.date), 0)} class="${[
    "w-full text-left h-10 accent-primary svelte-h1lww7",
    !$store.end ? "opacity-30" : ""
  ].join(" ").trim()}" type="datetime-local"></div>` : ``} <label class="flex yuzui px-2"><div class="font-medium w-24 py-2 shrink-0" data-svelte-h="svelte-4wtb0b">Location</div> <input class="w-full svelte-h1lww7" placeholder="Location" maxlength="60"${add_attribute("value", $store.location, 0)}></label> <label class="flex items-center yuzui px-2 pr-3"><div class="font-medium py-2 shrink-0" data-svelte-h="svelte-17c30dg">Require approval to join?</div> <input class="ml-auto svelte-h1lww7" type="checkbox"${add_attribute("checked", $store.requireApproval, 1)}></label> <div class="flex flex-grow py-2 px-2 h-full yuzui !border-b-0 shrink"><div class="font-medium w-24 shrink-0" data-svelte-h="svelte-1j7ajua">Description</div> <div contenteditable="true" data-placeholder="Description" class="w-full resize-none h-full min-h-[3.5rem] outline-0" placeholder="Description">${/* @__PURE__ */ (($$value) => $$value === void 0 ? `` : $$value)($store.description)}</div> </div>`;
});
export {
  Page as default
};
