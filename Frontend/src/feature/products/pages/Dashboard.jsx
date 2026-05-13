import React, { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Plus,
  Package,
  ArrowRight,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import bgImage from "../../../assets/Snitch.png";

function Dashboard() {
  const { handleGetProduct } = useProduct();
  const products = useSelector((state) => state.product.sellerProduct);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] font-['Inter'] selection:bg-amber-200 selection:text-black">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Background"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/40 to-black/90 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                <LayoutDashboard className="h-6 w-6 text-amber-400" />
              </div>

              <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                Snitch
              </h1>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400/80">
              Merchant Dashboard
            </h3>

            <h2 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-white md:text-6xl">
              The <span className="italic text-amber-400">Collection</span>
            </h2>
          </div>

          <button
            onClick={() => navigate("/seller/create-product")}
            className="group flex items-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 font-black uppercase tracking-widest text-black shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all hover:bg-amber-300"
          >
            <Plus className="h-5 w-5 stroke-[3px]" />
            Create Product
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Active Listings",
              value: products?.length || 0,
              icon: Package,
              color: "text-amber-400",
            },
            {
              label: "Total Revenue",
              value: "₹0",
              icon: TrendingUp,
              color: "text-green-400",
            },
            {
              label: "Total Orders",
              value: "0",
              icon: ShoppingBag,
              color: "text-blue-400",
            },
            {
              label: "Store Views",
              value: "1.2k",
              icon: Users,
              color: "text-purple-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                {stat.label}
              </p>

              <p className="mt-2 text-2xl font-black tracking-tight text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Products Grid Header */}
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
          <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">
            Your Products
          </h3>

          <span className="text-xs font-medium text-gray-500">
            Sorted by Newest
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
              onClick={()=>navigate(`/seller/product/${product._id}`)}
                key={product._id}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl transition-all hover:border-amber-400/30"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/4.6] w-full overflow-hidden p-2">
                  <div className="h-full w-full overflow-hidden rounded-[1.2rem]">
                    <img
                      src={
                        product.images?.[0]?.url ||
                        "https://via.placeholder.com/400x500"
                      }
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Glass Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                      <Edit className="h-4 w-4" />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                      <Eye className="h-4 w-4" />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-transform hover:scale-105">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-5 left-5">
                    <div className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black shadow-xl backdrop-blur-md">
                      {product.price?.currency} {product.price?.amount}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-5 pb-5 pt-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">
                    Luxury Collection
                  </span>

                  <h4 className="mt-2 line-clamp-1 font-['Playfair_Display'] text-xl font-bold text-white transition-colors group-hover:text-amber-400">
                    {product.title}
                  </h4>

                  <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-gray-400">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      </div>

                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                        Live
                      </span>
                    </div>

                    <button className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-amber-400">
                      Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-[2rem] border border-white/5 bg-white/[0.02] py-24 text-center backdrop-blur-sm">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Package className="h-9 w-9 text-gray-600" />
              </div>

              <h3 className="font-['Playfair_Display'] text-3xl font-bold text-white">
                Your store is empty
              </h3>

              <p className="mt-4 max-w-xs font-light leading-relaxed text-gray-500">
                Curate your collection and start showcasing your unique style to
                the world.
              </p>

              <button
                onClick={() => navigate("/seller/create-product")}
                className="mt-10 rounded-2xl bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-amber-400"
              >
                Add First Listing
              </button>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-20 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">
            © 2026 SNITCH LUXURY • ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;