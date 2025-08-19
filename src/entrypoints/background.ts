import { onMessage } from "webext-bridge/background";
import { filter } from "@/utils/storage";
import axios from "axios";
import { IGQLCategory, ICategory } from "@/@types";

export default defineBackground(async () => {
  onMessage("filter", async () => {
    return await filter.getValue();
  });

  const graphqlEndpoint =
    "https://www.producthunt.com/frontend/graphql?operationName=HeaderDesktopProductsNavigationQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22fd37cb954d265af3f43315fe547c112ca5e1c8e0ef70d1cec6b1601f01c7aa08%22%7D%7D";

  const response = await axios.get(graphqlEndpoint);
  const productsArray: ICategory[] =
    response.data.data.productCategories.edges.reduce(
      (accu: Record<string, string>[], item: IGQLCategory) => {
        console.log(item.node);
        const categoryName = item.node.name;
        const categoryPath = item.node.path;

        let subCategories =
          item.node.subCategories?.nodes.map(
            (item: { name: string; path: string }) => ({
              label: item.name,
              value: item.path,
              parentCategory: categoryName,
            })
          ) ?? [];

        return [
          ...accu,
          { label: categoryName, value: categoryPath },
          ...subCategories,
        ];
      },
      []
    );

  includeCategoriesStorage.setValue(productsArray);
});
