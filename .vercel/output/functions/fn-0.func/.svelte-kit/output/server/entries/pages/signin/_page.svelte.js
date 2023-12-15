import { c as create_ssr_component, h as createEventDispatcher, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "firebase/auth";
import "cleave.js";
import "../../../chunks/firebase2.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate" || key === "push_state" || key === "replace_state") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
const Widget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let phoneNumber = "";
  let countryCode = "1";
  let phoneRef;
  createEventDispatcher();
  return `${`<form class="yuzui-column"><div class="flex items-center yuzui gap-2 px-2"><div class="flex">+
				<span class="px-1 focus-visible:outline-0" contenteditable="true" role="textbox" data-svelte-h="svelte-11d1a8r">1</span> <input class="hidden" name="countryCode"${add_attribute("value", countryCode, 0)}></div> <input name="phone" required class="w-full border-b-0 py-2" placeholder="(111) 111-1111"${add_attribute("this", phoneRef, 0)}${add_attribute("value", phoneNumber, 0)}></div> <button class="${["yuzui", ""].join(" ").trim()}" data-svelte-h="svelte-uk0bq5">Sign In</button></form>`} <div id="recaptcha-div"></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  afterNavigate(({ from }) => {
    !from?.url.pathname || from?.url?.pathname === "/" ? "/profile" : from?.url.pathname;
  });
  return `${$$result.head += `<!-- HEAD_svelte-53wtks_START -->${$$result.title = `<title>Sign In</title>`, ""}<!-- HEAD_svelte-53wtks_END -->`, ""} <div class="h-screen max-w-lg mx-auto flex flex-col justify-center p-4">${validate_component(Widget, "SignIn").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
