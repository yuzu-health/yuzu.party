import * as server from '../entries/pages/_slug_/people/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/people/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[slug]/people/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.I1SN2GIJ.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/index.ry5Ra-Ly.js","_app/immutable/chunks/each.PK6sAFCL.js","_app/immutable/chunks/ProfilePic.61gLdwPY.js","_app/immutable/chunks/public.pXZZxOvD.js","_app/immutable/chunks/stores.5MMSktsx.js","_app/immutable/chunks/singletons.02HVuiAF.js","_app/immutable/chunks/index.oOdcuu6N.js","_app/immutable/chunks/utils.W3KuLhvY.js"];
export const stylesheets = [];
export const fonts = [];
