import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct";
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ArrowLeft,
  Heart,
  Tag,
  MapPin,
} from "lucide-react";

function Productdetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const { handleGetProductDetails } = useProduct();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const data = await handleGetProductDetails(productId);
      setProduct(data);
      if (data?.variants?.length > 0) {
        setSelectedAttributes(data.variants[0].attributes || {});
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  const selectedVariant = product?.variants?.find((v) =>
    Object.entries(selectedAttributes).every(
      ([key, value]) => v.attributes?.[key] === value,
    ),
  );

  const displayPrice = selectedVariant?.price?.amount
    ? selectedVariant.price
    : product?.price;
  const displayImages =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : product?.images;
  const displayStock = selectedVariant?.stock ?? product?.stock;

  const attributeKeys = [
    ...new Set(
      product?.variants?.flatMap((v) => Object.keys(v.attributes || {})),
    ),
  ];

  const getAttributeOptions = (key) => {
    return [
      ...new Set(
        product?.variants?.map((v) => v.attributes?.[key]).filter(Boolean),
      ),
    ];
  };

  const handleAttributeSelect = (key, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant?._id]);

  const currencySymbol =
    displayPrice?.currency === "INR" ? "₹" : displayPrice?.currency;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0b0b0b] px-4 text-white font-['Inter']">
        <h2 className="text-xl font-semibold">Product not found</h2>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-black"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0b0b] px-3 py-3 text-white font-['Inter'] sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate("/")}
          className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/45 transition hover:text-amber-400"
        >
          <ArrowLeft size={14} />
          Back to Products
        </button>

        <div className="grid gap-3 lg:grid-cols-[42%_58%]">
          {/* LEFT SIDE */}
          <div className="flex h-full flex-col p-3">
            {/* Main Image */}
            <div className="relative flex min-h-[320px] flex-1 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 lg:min-h-[420px]">
              <img
                src={displayImages?.[selectedImage]?.url}
                alt={product.title}
                className="h-[320px] w-full object-contain p-6 transition-all duration-500 lg:h-[420px]"
              />
            </div>

            {/* Thumbnails */}
            {displayImages?.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((img, idx) => (
                  <button
                    key={img._id || idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === idx
                        ? "border-amber-400"
                        : "border-transparent bg-white/5 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title} thumb ${idx}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-md bg-[#492027] px-3 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#5b2932]">
                <ShoppingCart size={17} />
                Add to Cart
              </button>

              <button className="flex items-center justify-center gap-2 rounded-md bg-amber-400 px-3 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-amber-300">
                <Zap size={17} />
                Buy Now
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-lg border border-[#1e1e1e] bg-[#111] p-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                Premium Product
              </p>

              <h1 className="mt-1 font-['Playfair_Display'] text-2xl font-bold leading-tight text-white sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
                  4.4 <Star size={10} fill="currentColor" />
                </span>

                <span className="text-xs font-medium text-white/45">
                  1,248 Ratings & 120 Reviews
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-emerald-400">
                Special price
              </p>

              <div className="mt-1 flex flex-wrap items-end gap-2">
                <span className="text-3xl font-black text-white">
                  {currencySymbol}
                  {displayPrice.amount.toLocaleString()}
                </span>

                <span className="text-sm font-semibold text-white/35 line-through">
                  {currencySymbol}
                  {(displayPrice.amount * 1.2).toLocaleString()}
                </span>

                <span className="text-xs font-bold text-emerald-400">
                  20% off
                </span>
              </div>

              <p className="mt-1 text-[11px] text-white/35">
                Inclusive of all taxes
              </p>
            </div>

            {/* Variant Selection */}
            {attributeKeys.length > 0 && (
              <div className="mt-6 space-y-4">
                {attributeKeys.map((key) => (
                  <div key={key}>
                    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Select {key}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getAttributeOptions(key).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAttributeSelect(key, option)}
                          className={`rounded-md border px-4 py-2 text-xs font-bold transition-all ${
                            selectedAttributes[key] === option
                              ? "border-amber-400 bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                              : "border-white/10 bg-[#1a1a1a] text-white/60 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              {displayStock > 0 ? (
                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  In Stock ({displayStock} units)
                </p>
              ) : (
                <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest">
                  Out of Stock
                </p>
              )}
            </div>


            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-md border border-[#252525] bg-[#151515] p-3">
                <Truck size={17} className="mb-1 text-amber-400" />
                <p className="text-[10px] font-black uppercase text-white">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-md border border-[#252525] bg-[#151515] p-3">
                <RefreshCw size={17} className="mb-1 text-amber-400" />
                <p className="text-[10px] font-black uppercase text-white">
                  Easy Return
                </p>
              </div>

              <div className="rounded-md border border-[#252525] bg-[#151515] p-3">
                <ShieldCheck size={17} className="mb-1 text-amber-400" />
                <p className="text-[10px] font-black uppercase text-white">
                  Secure Payment
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-[#252525] bg-[#151515] p-3">
              <div className="flex items-center gap-2">
                <MapPin size={17} className="text-amber-400" />

                <div>
                  <h3 className="text-xs font-black text-white">Delivery</h3>
                  <p className="text-[11px] text-white/40">
                    Delivery in 3-5 days · Fast & secure shipping
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-black text-white">
                Available offers
              </h3>

              <div className="space-y-2 text-xs text-white/60">
                <p className="flex gap-2">
                  <Tag size={14} className="mt-0.5 text-amber-400" />
                  10% instant discount on selected cards.
                </p>

                <p className="flex gap-2">
                  <Tag size={14} className="mt-0.5 text-amber-400" />
                  Extra 20% off on this product.
                </p>

                <p className="flex gap-2">
                  <Tag size={14} className="mt-0.5 text-amber-400" />
                  Free delivery available.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-black text-white">
                Description
              </h3>

              <p className="text-sm leading-6 text-white/55">
                {product.description ||
                  "Premium quality product crafted for modern shopping experience."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Productdetails;
