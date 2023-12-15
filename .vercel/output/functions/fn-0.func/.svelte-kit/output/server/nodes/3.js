import * as server from '../entries/pages/_slug_/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/[slug]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.gf6fajGo.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/index.ry5Ra-Ly.js","_app/immutable/chunks/each.PK6sAFCL.js","_app/immutable/chunks/index.1TP0rt78.js","_app/immutable/chunks/navigation.AbnT0D0z.js","_app/immutable/chunks/singletons.02HVuiAF.js","_app/immutable/chunks/index.oOdcuu6N.js","_app/immutable/chunks/Layout.wAdxJ5Ve.js","_app/immutable/chunks/store.-1J7pbUR.js","_app/immutable/chunks/widget.Xqlhco1b.js","_app/immutable/chunks/firebase.ldIwJ5_z.js","_app/immutable/chunks/public.pXZZxOvD.js","_app/immutable/chunks/utils.W3KuLhvY.js","_app/immutable/chunks/User.emr7DbTE.js"];
export const stylesheets = [];
export const fonts = [];
