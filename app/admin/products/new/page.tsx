import ProductForm from "@/Components/Admin/ProductForm";

export const metadata = {
  title: "Add Product - Mak Wines Admin",
};

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
