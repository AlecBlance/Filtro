import { FilterData, ICategory } from "@/@types";

export const filter = storage.defineItem<FilterData>("sync:filter", {
  fallback: {
    urlFilter: [],
    productTitleFilter: [],
    productDescriptionFilter: [],
    tagFilter: [],
  },
});

export const includeCategoriesStorage = storage.defineItem<ICategory[]>(
  "sync:includeCategories",
  {
    fallback: [],
  }
);

export const includeSelectedCategoriesStorage = storage.defineItem<string[]>(
  "sync:includeSelectedCategories",
  {
    fallback: [],
  }
);

export const optionsStorage = storage.defineItem<{ isOn: boolean }>(
  "sync:options",
  {
    fallback: {
      isOn: true,
    },
  }
);
