import RandomUserTab from "@/components/pages/random-user-tab";

export default function GenerateRandom() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-6 lg:p-8 lg:pl-[18rem] space-y-6">
          <RandomUserTab />
        </div>
      </div>
    </div>
  );
}
