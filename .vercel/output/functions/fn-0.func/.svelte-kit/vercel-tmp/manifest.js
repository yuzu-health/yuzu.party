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
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js'))
		],
		routes: [
			{
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/auth/_server.ts.js'))
			},
			{
				id: "/api/party/attend",
				pattern: /^\/api\/party\/attend\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/party/attend/_server.ts.js'))
			},
			{
				id: "/api/party/create",
				pattern: /^\/api\/party\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/party/create/_server.ts.js'))
			},
			{
				id: "/api/party/list",
				pattern: /^\/api\/party\/list\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/party/list/_server.ts.js'))
			},
			{
				id: "/api/party/message",
				pattern: /^\/api\/party\/message\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/party/message/_server.ts.js'))
			},
			{
				id: "/api/profile",
				pattern: /^\/api\/profile\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/profile/_server.ts.js'))
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/signin",
				pattern: /^\/signin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/signout",
				pattern: /^\/signout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[slug]/(root)",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[slug]/people",
				pattern: /^\/([^/]+?)\/people\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(create)/[...rest]",
				pattern: /^(?:\/(.*))?\/?$/,
				params: [{"name":"rest","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
