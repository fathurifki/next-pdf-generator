import JsonPlaceholderTab from "@/components/pages/json-placeholder-tab";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6 lg:p-8 lg:pl-[18rem] space-y-6">
          <JsonPlaceholderTab />
        </div>
      </div>
    </div>
  );
}
