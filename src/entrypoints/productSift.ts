import { onMessage, setNamespace } from "webext-bridge/window";
import { FilterData } from "@/@types";

export default defineUnlistedScript(() => {
  console.log("Product Hunt Filter script loaded");
  const comingSoonProductCardSelector = `[data-sentry-component="ViewableImpression"]`;
  const normalProductCardSelector = `section`;

  const selectors = {
    tag: `[data-sentry-component="TagList"] a`,
    productCard: `${normalProductCardSelector}, ${comingSoonProductCardSelector}`,
    productCardLink: `${normalProductCardSelector} > a, ${comingSoonProductCardSelector} [data-sentry-component="ProductItem"] > a`,
    productCardTitle: `${normalProductCardSelector} > div > a:nth-child(1)`,
    productCardDescription: `${normalProductCardSelector} > div > a:nth-child(2)`,
    // Coming soon card has a different title and description structure, but an okay selector for its link
    comingSoonText: `${comingSoonProductCardSelector} [data-sentry-component="ProductItem"] > div > a > div`,
    comingSoonTags: `${comingSoonProductCardSelector} [data-sentry-component="ProductItem"] > div > div > div:nth-child(3) > a`,
  };

  setNamespace("producthunt-filter");
  onMessage("filter", (contentScript) => {
    const { filter, include } = contentScript.data as unknown as {
      filter: FilterData;
      include: string[];
    };

    // Remove products that is based on the filter
    removeMatchingElements(filter, include);
    // Remove again for newly added products
    const observer = new MutationObserver(() =>
      removeMatchingElements(filter, include)
    );
    observer.observe(document.body, { childList: true, subtree: true });
  });

  // Helper Functions

  // Extracts product information from the product card element
  function getProductInfo(product: Element) {
    const productLink = product
      .querySelector(selectors.productCardLink)
      ?.getAttribute("href");
    const productTitle = product.querySelector(
      selectors.productCardTitle
    )?.textContent;
    const productDescription = product.querySelector(
      selectors.productCardDescription
    )?.textContent;
    const [comingSoonTitle, ...comingSoonDescription] =
      product
        .querySelector(selectors.comingSoonText)
        ?.textContent?.split(" — ") ?? [];
    const tags = [...product.querySelectorAll(selectors.tag)].reduce<string[]>(
      (accu, tag) => {
        return [...accu, tag.textContent, tag.getAttribute("href")!];
      },
      []
    );

    console.log(tags);

    const comingSoonTags = [
      ...product.querySelectorAll(selectors.comingSoonTags),
    ].reduce<string[]>((accu, tag) => {
      return [...accu, tag.textContent, tag.getAttribute("href")!];
    }, []);

    return {
      link: productLink,
      title: productTitle ?? comingSoonTitle,
      description: productDescription ?? comingSoonDescription.join(" — "), //* in case where one description has a " — " in it
      tags: [...tags, ...comingSoonTags],
    };
  }

  // Removes products that match the filter criteria
  function removeMatchingElements(filter: FilterData, include: string[]) {
    const {
      urlFilter,
      productDescriptionFilter,
      productTitleFilter,
      tagFilter,
    } = filter;

    document.querySelectorAll(selectors.productCard).forEach((product) => {
      const { link, description, tags, title } = getProductInfo(product);

      const urlFilterMatch = urlFilter.some((url) => link?.includes(url));
      const titleFilterMatch = productTitleFilter.some((titleFilter) =>
        title?.toLowerCase().includes(titleFilter.toLowerCase())
      );
      const descriptionFilterMatch = productDescriptionFilter.some(
        (descFilter) =>
          description?.toLowerCase().includes(descFilter.toLowerCase())
      );
      const tagFilterMatch = tags.some(
        (tag) =>
          tagFilter.some(
            (tagFilter) => tag.toLowerCase().includes(tagFilter.toLowerCase()) // it is filtered out
          ) && !include.includes(tag) // and not in the included list
      ); // it should be removed in terms of excluding.

      if (include.length > 0) {
        // if tags of product is included, return cause we remove
        if (tags.some((tag) => include.includes(tag))) return;
        product.remove();
        // if included no remove if in filtered
        // but if not included, remove if in filtered
      } else if (
        urlFilterMatch ||
        titleFilterMatch ||
        descriptionFilterMatch ||
        tagFilterMatch
      ) {
        product.remove();
        console.log(
          "Removed product:",
          title,
          "| link:",
          link,
          "| description:",
          description,
          "| tags:",
          tags.join(", ")
        );
      }
    });
  }
});
