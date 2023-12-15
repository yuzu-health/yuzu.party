import * as server from '../entries/pages/_slug_/(root)/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/(root)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[slug]/(root)/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.kXBHIb83.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/index.ry5Ra-Ly.js","_app/immutable/chunks/each.PK6sAFCL.js","_app/immutable/chunks/index.1TP0rt78.js","_app/immutable/chunks/firebase.ldIwJ5_z.js","_app/immutable/chunks/public.pXZZxOvD.js","_app/immutable/chunks/stores.5MMSktsx.js","_app/immutable/chunks/singletons.02HVuiAF.js","_app/immutable/chunks/index.oOdcuu6N.js","_app/immutable/chunks/utils.W3KuLhvY.js","_app/immutable/chunks/ProfilePic.61gLdwPY.js","_app/immutable/chunks/store.-1J7pbUR.js","_app/immutable/chunks/Trash.k2u1Lcjy.js"];
export const stylesheets = ["_app/immutable/assets/5.PE3aP6EI.css"];
export const fonts = [];
