import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Package, ShoppingBag, IndianRupee } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import bgImage from "../../../assets/Snitch.png"; // change path
import { useNavigate } from "react-router";

function Home() {
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProduct } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] font-['Inter'] selection:bg-amber-200 selection:text-black">
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Background"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black/90 backdrop-blur-[2px]" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl">
              <Package className="h-5 w-5 text-amber-400" />
            </div>

            <h1 className="text-xl font-black uppercase tracking-widest text-white">
              Snitch
            </h1>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Premium Collection
          </h3>

          <h2 className="mt-2 font-['Playfair_Display'] text-4xl font-bold text-white md:text-5xl">
            Explore Our <span className="italic text-amber-400">Products</span>
          </h2>
        </div>

        {products?.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">
            <div>
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="text-2xl font-bold text-white">
                No products found
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Products will appear here once they are added.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => {
              const imageUrl = product?.images?.[0]?.url;

              return (
                <div
                  onClick={() => navigate(`/products/${product._id}`)}
                  key={product._id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/40 hover:bg-white/10"
                >
                  <div className="relative aspect-[4/4] overflow-hidden rounded-[1.5rem] bg-white/5">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-12 w-12 text-gray-600" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <h3 className="line-clamp-1 text-xl font-bold capitalize text-white">
                        {product.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Price
                        </p>

                        <div className="mt-1 flex items-center text-xl font-black text-amber-400">
                          {product?.price?.currency === "INR" && (
                            <IndianRupee className="h-5 w-5" />
                          )}
                          <span>{product?.price?.amount}</span>
                          <span className="ml-1 text-xs text-gray-500">
                            {product?.price?.currency}
                          </span>
                        </div>
                      </div>

                      <button className="rounded-2xl bg-amber-400 px-4 py-3 text-sm font-bold text-black transition-all hover:bg-amber-300">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
