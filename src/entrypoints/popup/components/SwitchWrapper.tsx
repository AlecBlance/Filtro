import { useQuery } from "@tanstack/react-query";
import { optionsStorage } from "@/utils/storage";
import { Switch } from "@/components/ui/switch";

const SwitchWrapper = () => {
  const [isOn, setIsOn] = useState<boolean>(true);
  const query = useQuery({
    queryKey: ["fetchOptions"],
    queryFn: fetchOptions,
  });

  async function fetchOptions() {
    const response = await optionsStorage.getValue();
    setIsOn(response.isOn);
  }

  if (query.isLoading) {
    return null;
  }

  return (
    <Switch
      checked={isOn}
      onCheckedChange={() => {
        setIsOn(!isOn);
        optionsStorage.setValue({ isOn: !isOn });
      }}
    />
  );
};

export default SwitchWrapper;
