import { TagsInput } from "react-tag-input-component";
import { filter } from "@/utils/storage";
import { FilterData } from "@/@types";

const InputTags = () => {
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
    <>
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
    </>
  );
};

export default InputTags;
