export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <div className="aspect-square rounded-2xl bg-gray-200" />
          </div>
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-md">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            <div className="h-8 w-32 rounded bg-gray-200" />
            <div className="space-y-3 pt-4">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
