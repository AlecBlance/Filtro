import InputTags from "@/entrypoints/popup/components/inputTags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { ICategory } from "@/@types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

function App() {
  const [categories, setCategories] = useState<
    { value: string; label: string; parentCategory?: string }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://www.producthunt.com/frontend/graphql?operationName=HeaderDesktopProductsNavigationQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22fd37cb954d265af3f43315fe547c112ca5e1c8e0ef70d1cec6b1601f01c7aa08%22%7D%7D"
        );
        const productsArray = response.data.data.productCategories.edges.reduce(
          (accu: Record<string, string>[], item: ICategory) => {
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
        setCategories(productsArray);
        setSelectedValues(productsArray.map((cat: any) => cat.value)); // Select all categories by default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center shadow-[0px_18px_43px_-24px_rgba(0,_0,_0,_0.1)] py-2">
        <img src="/icon-128.png" alt="Icon" className="w-12 h-12" />
        <div className="flex flex-col -space-y-1">
          <div className="flex items-end gap-x-1">
            <h1 className="text-lg font-bold text-primary">Filtro</h1>
            <p className="mb-[0.10rem] text-slate-500">
              {import.meta.env.VITE_VERSION}
            </p>
          </div>
          <p className="text-slate-500">Your Product Hunt Filter</p>
        </div>
      </div>
      <div className="p-2 space-y-2">
        <Tabs defaultValue="include" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="include" className="text-sm">
              Include
            </TabsTrigger>
            <TabsTrigger value="exclude">Exclude</TabsTrigger>
          </TabsList>
          <TabsContent value="include" className="space-y-2">
            <div className="flex flex-col gap-y-2">
              <div>
                <Input
                  className="text-sm rounded-xs"
                  placeholder="Search for category"
                  onChange={(e) => {
                    const searchValue = e.target.value.toLowerCase();
                    setSearch(searchValue);
                  }}
                />
              </div>
              <div className="flex items-center gap-x-2 text-slate-700">
                <button
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    setSelectedValues(categories.map((cat) => cat.value));
                  }}
                >
                  Select all ({categories.length})
                </button>
                <span>-</span>
                <button
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    setSelectedValues([]);
                  }}
                >
                  Clear ({selectedValues.length})
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 h-44 overflow-y-auto">
              {categories.map((category) => {
                if (
                  search &&
                  !(
                    category.label.toLowerCase().includes(search) ||
                    category.parentCategory?.toLowerCase().includes(search)
                  )
                )
                  return null;
                return (
                  <label
                    className="flex px-4 py-2 first:rounded-t-sm gap-x-2 bg-slate-50 items-center"
                    key={category.value}
                    htmlFor={`${category.label}-checkbox`}
                  >
                    <Checkbox
                      id={`${category.label}-checkbox`}
                      checked={selectedValues.includes(category.value)}
                      onCheckedChange={() => {
                        setSelectedValues((prev) => {
                          if (prev.includes(category.value)) {
                            return prev.filter((val) => val !== category.value);
                          } else {
                            return [...prev, category.value];
                          }
                        });
                      }}
                    />
                    <p className="text-sm">{category.label}</p>
                  </label>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="exclude" className="flex flex-col gap-2">
            <p className="text-slate-700">
              Type text to block products if it appears in any section: title,
              description, tags, or URL.
            </p>
            <InputTags />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
