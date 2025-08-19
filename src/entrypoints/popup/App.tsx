import InputTags from "@/entrypoints/popup/components/InputTags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InclusionSelector from "@/entrypoints/popup/components/InclusionSelector";

function App() {
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
            <InclusionSelector />
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
