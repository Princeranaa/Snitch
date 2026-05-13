import React, { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useParams } from "react-router";
import {
  Plus,
  Package,
  Image as ImageIcon,
  Loader2,
  Save,
  X,
  DollarSign,
} from "lucide-react";

function SellerProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStockId, setUpdatingStockId] = useState(null);

  const { handleGetProductDetails, handleUpdateVariantStock } = useProduct();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const data = await handleGetProductDetails(productId);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  const updateStock = async (variantId, newStock) => {
    setUpdatingStockId(variantId);

    try {
      const updatedProduct = await handleUpdateVariantStock(
        productId,
        variantId,
        newStock,
      );

      if (updatedProduct) {
        setProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Failed to update stock:", error);
    } finally {
      setUpdatingStockId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        Product not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] px-4 py-8 font-['Inter'] text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
            Seller Product
          </p>

          <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-white md:text-5xl">
            Product Details
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[380px_1fr]">
          <div className="overflow-hidden rounded-xl p-3">
            <div className="aspect-square overflow-hidden rounded-xl bg-white/5">
              {product.images?.[0] ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-600">
                  <ImageIcon size={44} />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl p-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Product Information
            </p>

            <h2 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-white">
              {product.title}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-amber-400 px-5 py-2 text-xs font-black uppercase tracking-widest text-black">
                {product.price?.currency} {product.price?.amount}
              </span>

              <span className="rounded-full border border-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl">
            <AddVariantForm
              productId={productId}
              onSuccess={(updatedProduct) => setProduct(updatedProduct)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AddVariantForm({ productId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");

  const [formData, setFormData] = useState({
    images: [],
    stock: 0,
    price: {
      amount: "",
      currency: "INR",
    },
    attributes: {},
  });

  const { handleAddProductVariant } = useProduct();

  const handleAddAttr = () => {
    if (!attrKey || !attrValue) return;

    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrKey]: attrValue,
      },
    }));

    setAttrKey("");
    setAttrValue("");
  };

  const removeAttr = (key) => {
    const newAttrs = { ...formData.attributes };
    delete newAttrs[key];

    setFormData((prev) => ({
      ...prev,
      attributes: newAttrs,
    }));
  };

  const resetForm = () => {
    setAttrKey("");
    setAttrValue("");
    setFormData({
      images: [],
      stock: 0,
      price: {
        amount: "",
        currency: "INR",
      },
      attributes: {},
    });
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const imageObjects = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: imageObjects,
    }));

    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Variant Payload:", formData);

      const updatedProduct = await handleAddProductVariant(productId, formData);

      console.log("Updated Product:", updatedProduct);

      if (updatedProduct) {
        onSuccess(updatedProduct?.product || updatedProduct);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add variant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111111]/90 p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400">
          Product Variant
        </p>

        <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold text-white sm:text-4xl">
          Create New Variant
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500">
          Add stock, pricing, attributes and images for this product variant.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
            Images
          </label>

          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="variant-images"
          />

          <label
            htmlFor="variant-images"
            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] transition-all hover:border-amber-400/40 hover:bg-white/[0.05]"
          >
            <ImageIcon className="mb-3 text-gray-600" size={30} />

            <span className="text-sm font-medium text-gray-500">
              {formData.images.length
                ? `${formData.images.length} images selected`
                : "Select variant images"}
            </span>

            <span className="mt-1 text-xs text-gray-600">
              PNG, JPG or WEBP supported
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputBox
            label="Stock"
            icon={Package}
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            placeholder="0"
          />

          <InputBox
            label="Price"
            icon={DollarSign}
            value={formData.price.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: {
                  ...formData.price,
                  amount: e.target.value,
                },
              })
            }
            placeholder="1000"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
            Attributes
          </label>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_48px]">
            <input
              type="text"
              value={attrKey}
              onChange={(e) => setAttrKey(e.target.value)}
              placeholder="Color"
              className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-700 focus:border-amber-400/40"
            />

            <input
              type="text"
              value={attrValue}
              onChange={(e) => setAttrValue(e.target.value)}
              placeholder="Black"
              className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-700 focus:border-amber-400/40"
            />

            <button
              type="button"
              onClick={handleAddAttr}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-amber-400 text-black transition-all hover:bg-amber-300 sm:w-12"
            >
              <Plus size={22} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(formData.attributes).map(([key, value]) => (
              <span
                key={key}
                className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400"
              >
                {key}: {value}
                <X
                  size={12}
                  onClick={() => removeAttr(key)}
                  className="cursor-pointer hover:text-white"
                />
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create Variant"
          )}
        </button>
      </form>
    </div>
  );
}

function InputBox({ label, icon: Icon, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
        {label}
      </label>

      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
          size={16}
        />

        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-700 focus:border-amber-400/40"
        />
      </div>
    </div>
  );
}

export default SellerProductDetails;
