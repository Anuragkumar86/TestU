// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading products...</p>
      {/* You could add a spinner or skeleton loader here */}
    </div>
  );
}