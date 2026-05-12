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

  const { handleGetProductDetails } = useProduct();

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

  const currencySymbol =
    product?.price?.currency === "INR" ? "₹" : product?.price?.currency;

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
          <div className="flex h-full flex-col   p-3">
            {/* Main Image */}
            <div className="relative flex flex-1 items-center justify-center  ">
              <img
                src={product?.images?.[selectedImage]?.url}
                alt={product.title}
                className="h-[320px] w-full object-contain p-3 lg:h-[420px]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2">
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
                  {product.price.amount.toLocaleString()}
                </span>

                <span className="text-sm font-semibold text-white/35 line-through">
                  {currencySymbol}
                  {(product.price.amount * 1.2).toLocaleString()}
                </span>

                <span className="text-xs font-bold text-emerald-400">
                  20% off
                </span>
              </div>

              <p className="mt-1 text-[11px] text-white/35">
                Inclusive of all taxes
              </p>
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
