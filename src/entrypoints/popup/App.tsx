import { TagsInput } from "react-tag-input-component";
import { filter } from "@/utils/storage";
import { FilterData } from "@/@types";

function App() {
  const [filterData, setFilterData] = useState<FilterData>({
    productDescriptionFilter: [],
    productTitleFilter: [],
    tagFilter: [],
    urlFilter: [],
  });
  const [isDone, setIsDone] = useState(false);
  const inputs = [
    {
      label: "Title",
      name: "productTitleFilter",
    },
    {
      label: "Description",
      name: "productDescriptionFilter",
    },
    {
      label: "Tags",
      name: "tagFilter",
    },
    {
      label: "URL",
      name: "urlFilter",
    },
  ];

  const setSelected = async ({
    data,
    name,
  }: {
    data: string[];
    name: string;
  }) => {
    console.log("Setting filter data for:", name, "with data:", data);
    await filter.setValue({
      ...filterData,
      [name]: data,
    });
    setFilterData((prev) => ({
      ...prev,
      [name]: data,
    }));
  };

  useEffect(() => {
    filter.getValue().then((data) => {
      setFilterData(data);
      setIsDone(true);
    });
  }, []);

  if (!isDone) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

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
          <p className="text-[10px] text-slate-500">Your Product Hunt Filter</p>
        </div>
      </div>
      <div className="p-2 space-y-2">
        <p className="text-[10px] text-slate-500">
          Type text to block products if it appears in any section: title,
          description, tags, or URL.
        </p>
        {inputs.map((input) => {
          return (
            <div>
              <p className="text-slate-700">{input.label}</p>
              <TagsInput
                value={filterData[input.name as keyof FilterData]}
                onChange={(e) => {
                  setSelected({ data: e, name: input.name });
                }}
                name={input.name}
                placeHolder={`enter ${input.label.toLowerCase()} to block`}
                classNames={{
                  input: "text-slate-700",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
