export interface FilterData {
  urlFilter: string[];
  productTitleFilter: string[];
  productDescriptionFilter: string[];
  tagFilter: string[];
}

export interface IGQLCategory {
  node: {
    name: string;
    path: string;
    subCategories?: { nodes: { name: string; path: string }[] };
  };
}

export interface ICategory {
  label: string;
  value: string;
  parentCategory?: string;
}
