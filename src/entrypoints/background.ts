import { onMessage } from "webext-bridge/background";
import { filter } from "@/utils/storage";

export default defineBackground(() => {
  onMessage("filter", async () => {
    return await filter.getValue();
  });
});
