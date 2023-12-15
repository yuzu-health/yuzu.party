export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico","favicon.svg","transparent.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ZRL43vf_.js","app":"_app/immutable/entry/app.FvP8Oxkc.js","imports":["_app/immutable/entry/start.ZRL43vf_.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/singletons.02HVuiAF.js","_app/immutable/chunks/index.oOdcuu6N.js","_app/immutable/entry/app.FvP8Oxkc.js","_app/immutable/chunks/scheduler.DCRTzJa9.js","_app/immutable/chunks/index.ry5Ra-Ly.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			{
				id: "/api/remind",
				pattern: /^\/api\/remind\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/remind/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
