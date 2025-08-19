import { onMessage } from "webext-bridge/background";
import { filter } from "@/utils/storage";
import productHuntTopics from "@/lib/productHuntTopics";

export default defineBackground(async () => {
  onMessage("filter", async () => {
    return await filter.getValue();
  });

  onMessage("include", async () => {
    return await includeSelectedCategoriesStorage.getValue();
  });

  includeCategoriesStorage.setValue(productHuntTopics);
});
