// #ifdef DEVELOPMENT
//
// 远程调试插件。
//
// 如需要启用需要先到 uniapp 插件网站下载相应插件
//
// 插件下载地址: https://ext.dcloud.net.cn/plugin?id=14224
//
// import RemoteConsole from "./uni_modules/zui-remote-console/js_sdk/client/client.es.js";
// RemoteConsole({
// 	// 如需在 nvue 页面中使用, 请设置为 true
//  	nvue: false
// });
// #endif

import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
