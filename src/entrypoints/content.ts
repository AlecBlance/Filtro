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
    // const response = await sendMessage(
    //   "getUrlFilter",
    //   { sync: false },
    //   "background"
    // );

    await injectScript("/productHuntFilter.js", {
      keepInDom: true,
    });

    const filter: FilterData = {
      urlFilter: [],
      productTitleFilter: [],
      productDescriptionFilter: [],
      tagFilter: [],
    };

    allowWindowMessaging("producthunt-filter");
    await sendMessage("filter", { ...filter }, "window");
  },
});
