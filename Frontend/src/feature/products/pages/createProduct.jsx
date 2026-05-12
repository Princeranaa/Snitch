import React, { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import {
  Package,
  Tag,
  FileText,
  DollarSign,
  X,
  ArrowRight,
  Upload,
} from "lucide-react";
import bgImage from "../../../assets/Snitch.png";

const MAX_IMAGES = 4;

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceamount: "",
    priceCurrency: "INR",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImages.length !== selectedFiles.length) {
      setError("Only image files are allowed.");
    }

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setError(`You can upload only ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    const filesToAdd = validImages.slice(0, remainingSlots);

    if (validImages.length > remainingSlots) {
      setError(`Only ${MAX_IMAGES} images are allowed.`);
    }

    setImages((prev) => [...prev, ...filesToAdd]);

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFormData({
      title: "",
      description: "",
      priceamount: "",
      priceCurrency: "INR",
    });

    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!images.length) {
      setError("Please upload at least one product image.");
      return;
    }

    if (Number(formData.priceamount) <= 0) {
      setError("Price amount must be greater than 0.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("priceamount", formData.priceamount);
      data.append("priceCurrency", formData.priceCurrency);

      images.forEach((img) => {
        data.append("images", img);
      });

      await handleCreateProduct(data);
      alert("Product created successfully!");
      
      resetForm();
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Something went wrong while creating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] font-['Inter'] selection:bg-amber-200 selection:text-black">
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Background"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 backdrop-blur-[2px]" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-5xl">
          <div className="mb-10 text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl">
                <Package className="h-5 w-5 text-amber-400" />
              </div>

              <h1 className="text-xl font-black uppercase tracking-widest text-white">
                Snitch
              </h1>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Inventory Management
            </h3>

            <h2 className="mt-2 font-['Playfair_Display'] text-4xl font-bold text-white md:text-5xl">
              Create New{" "}
              <span className="italic text-amber-400">Product</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                  {error}
                </div>
              )}

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Product Title
                    </label>

                    <div className="group relative">
                      <Tag className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-amber-400" />

                      <input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. Minimalist Watch Edition 1"
                        className="w-full rounded-2xl bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-gray-600 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Description
                    </label>

                    <div className="group relative">
                      <FileText className="absolute left-4 top-5 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />

                      <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Describe the luxury and details of this item..."
                        className="w-full resize-none rounded-2xl bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-gray-600 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Price Amount
                      </label>

                      <div className="group relative">
                        <DollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-amber-400" />

                        <input
                          required
                          min="1"
                          name="priceamount"
                          value={formData.priceamount}
                          onChange={handleChange}
                          type="number"
                          placeholder="0.00"
                          className="w-full rounded-2xl bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-gray-600 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Currency
                      </label>

                      <select
                        name="priceCurrency"
                        value={formData.priceCurrency}
                        onChange={handleChange}
                        className="w-full cursor-pointer appearance-none rounded-2xl bg-white/5 px-4 py-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                      >
                        <option value="INR" className="bg-[#0a0a0a]">
                          INR (₹)
                        </option>
                        <option value="USD" className="bg-[#0a0a0a]">
                          USD ($)
                        </option>
                        <option value="EUR" className="bg-[#0a0a0a]">
                          EUR (€)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Product Images
                      </label>

                      <span className="text-xs font-semibold text-gray-500">
                        {previews.length}/{MAX_IMAGES}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {previews.map((preview, index) => (
                        <div
                          key={preview}
                          className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                        >
                          <img
                            src={preview}
                            alt={`Product preview ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}

                      {previews.length < MAX_IMAGES && (
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:border-amber-400/50 hover:bg-white/10">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors">
                            <Upload className="h-6 w-6 text-gray-400" />
                          </div>

                          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Add Image
                          </span>

                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 lg:pt-10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-amber-400 font-bold text-black shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-3 border-black border-t-transparent" />
                      ) : (
                        <div className="flex items-center gap-3 text-lg">
                          Publish Product
                          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;