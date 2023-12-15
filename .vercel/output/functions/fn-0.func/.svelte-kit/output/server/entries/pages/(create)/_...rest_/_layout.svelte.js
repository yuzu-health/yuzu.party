import { c as create_ssr_component, a as add_attribute, s as subscribe, d as add_classes, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import "browser-image-compression";
import { p as party } from "../../../../chunks/store.js";
import "firebase/auth";
import "cleave.js";
import "../../../../chunks/firebase2.js";
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", clazz, 0)}><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"></path></svg>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ready;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(party, (value) => $store = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      data.pathname;
      party.set({ ...data.party });
    }
  }
  ready = $store.name && $store.date;
  $$unsubscribe_store();
  return `<div class="flex flex-col items-center justify-center w-full h-screen max-w-screen-xs mx-auto px-2"><div class="yuzui-column h-[calc(100%-90px)] max-h-[34rem] mt-[5px] sm:mt-0 w-full"><form id="create-party" class="w-full shrink flex-grow yuzui-column yuzui !border-b-0">${slots.default ? slots.default({}) : ``}</form> ${`${`<div class="yuzui-row"><button form="create-party" class="${[
    "sticky bottom-0 yuzui w-full fixed-right",
    (!ready ? "pointer-events-none" : "") + " "
  ].join(" ").trim()}"><span${add_classes((!ready ? "opacity-30" : "").trim())}>${escape(data.party ? "Save" : "Create")}</span></button> ${data.party ? `<button type="button" class="yuzui !px-3">${validate_component(Trash, "Trash").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button>` : ``}</div>`}`}</div></div>`;
});
export {
  Layout as default
};
