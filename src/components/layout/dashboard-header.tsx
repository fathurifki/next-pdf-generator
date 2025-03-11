export default function DashboardHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex-1 flex items-center justify-end md:justify-start">
        {children}
      </div>
    </header>
  );
}
