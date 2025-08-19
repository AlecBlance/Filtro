import { ICategory } from "@/@types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const InclusionSelector = () => {
  const [categories, setCategories] = useState<
    { value: string; label: string; parentCategory?: string }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const query = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });
  const [isSelectedOnly, setIsSelectedOnly] = useState(false);

  async function fetchCategories() {
    try {
      const productsCategories = await includeCategoriesStorage.getValue();
      const selectedValues = await includeSelectedCategoriesStorage.getValue();
      setCategories(productsCategories);
      selectValues(selectedValues);
      return productsCategories;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function selectValues(values: string[]) {
    setSelectedValues(values);
    await includeSelectedCategoriesStorage.setValue(values);
  }

  useEffect(() => {
    selectedValues.length === 0 && setIsSelectedOnly(false);
  }, [selectedValues.length]);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div>
          <Input
            className="text-sm rounded-xs"
            placeholder="Search for tag/category"
            value={search}
            onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              setSearch(searchValue);
            }}
          />
        </div>
        <div className="flex items-center gap-x-2 text-slate-700">
          <button
            className="hover:underline cursor-pointer"
            onClick={async () => {
              const allValues = categories.map((cat) => cat.value);
              await selectValues(allValues);
            }}
          >
            Select all ({categories.length})
          </button>
          <span>-</span>
          <button
            className="hover:underline cursor-pointer"
            onClick={async () => {
              await selectValues([]);
            }}
          >
            Clear ({selectedValues.length})
          </button>
          <span>-</span>
          <button
            className="hover:underline cursor-pointer"
            onClick={() => {
              setIsSelectedOnly(!isSelectedOnly);
              setSearch("");
            }}
          >
            {isSelectedOnly ? "Uns" : "S"}how Selected ({selectedValues.length})
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 h-44 overflow-y-auto">
        {query.isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">Loading categories...</p>
          </div>
        )}
        {!query.isLoading &&
          categories.map((category) => {
            if (
              search &&
              !(
                category.label.toLowerCase().includes(search) ||
                category.parentCategory?.toLowerCase().includes(search)
              )
            ) {
              return null;
            }
            if (isSelectedOnly && !selectedValues.includes(category.value)) {
              return null;
            }
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
                    if (selectedValues.includes(category.value)) {
                      selectValues(
                        selectedValues.filter((val) => val !== category.value)
                      );
                    } else {
                      selectValues([...selectedValues, category.value]);
                    }
                  }}
                />
                <p className="text-sm">{category.label}</p>
              </label>
            );
          })}
      </div>
    </>
  );
};

export default InclusionSelector;
