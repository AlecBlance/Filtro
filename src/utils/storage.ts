import { FilterData, ICategory } from "@/@types";

export const filter = storage.defineItem<FilterData>("local:filter", {
  fallback: {
    urlFilter: [],
    productTitleFilter: [],
    productDescriptionFilter: [],
    tagFilter: [],
  },
});

export const includeCategoriesStorage = storage.defineItem<ICategory[]>(
  "local:includeCategories",
  {
    fallback: [],
  }
);

export const includeSelectedCategoriesStorage = storage.defineItem<string[]>(
  "local:includeSelectedCategories",
  {
    fallback: [],
  }
);

export const optionsStorage = storage.defineItem<{ isOn: boolean }>(
  "local:options",
  {
    fallback: {
      isOn: true,
    },
  }
);
