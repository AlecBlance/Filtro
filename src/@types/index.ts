export interface FilterData {
  urlFilter: string[];
  productTitleFilter: string[];
  productDescriptionFilter: string[];
  tagFilter: string[];
}

export interface ICategory {
  node: {
    name: string;
    path: string;
    subCategories?: { nodes: { name: string; path: string }[] };
  };
}
