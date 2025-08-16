export const urlFilter = storage.defineItem<string[]>("local:urlFilter", {
  fallback: [],
});
