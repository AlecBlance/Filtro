import { onMessage } from "webext-bridge/background";
import { urlFilter } from "@/utils/storage";

export default defineBackground(() => {
  onMessage("getUrlFilter", async () => {
    return await urlFilter.getValue();
  });
});
