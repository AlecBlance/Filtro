import {
  sendMessage,
  allowWindowMessaging,
} from "webext-bridge/content-script";
import { FilterData } from "@/@types";

declare global {
  interface Window {
    urlFilter: any;
  }
}

export default defineContentScript({
  matches: ["*://*.producthunt.com/*"],
  async main() {
    const filter = await sendMessage("filter", { sync: false }, "background");

    await injectScript("/productSift.js", {
      keepInDom: true,
    });

    console.log("Content script loaded for Product Hunt Filter");
    console.log("Filter data:", filter);

    allowWindowMessaging("producthunt-filter");
    await sendMessage("filter", filter, "window");
  },
});
