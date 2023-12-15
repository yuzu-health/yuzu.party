import * as server from '../entries/pages/(create)/_...rest_/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(create)/_...rest_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(create)/[...rest]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.-5_-TA2f.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/index.ry5Ra-Ly.js","_app/immutable/chunks/Trash.k2u1Lcjy.js","_app/immutable/chunks/index.1TP0rt78.js","_app/immutable/chunks/browser-image-compression.3GdFFIbm.js","_app/immutable/chunks/navigation.AbnT0D0z.js","_app/immutable/chunks/singletons.02HVuiAF.js","_app/immutable/chunks/index.oOdcuu6N.js","_app/immutable/chunks/store.D356hAJX.js","_app/immutable/chunks/widget.Xqlhco1b.js","_app/immutable/chunks/firebase.ldIwJ5_z.js","_app/immutable/chunks/public.pXZZxOvD.js","_app/immutable/chunks/store.-1J7pbUR.js","_app/immutable/chunks/utils.W3KuLhvY.js"];
export const stylesheets = [];
export const fonts = [];
