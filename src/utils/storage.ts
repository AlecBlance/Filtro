import { FilterData } from "@/@types";

export const filter = storage.defineItem<FilterData>("local:filter", {
  fallback: {
    urlFilter: [],
    productTitleFilter: [],
    productDescriptionFilter: [],
    tagFilter: [],
  },
});
