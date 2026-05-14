import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const { handleGetItems } = useCart();

  useEffect(() => {
    handleGetItems();
  }, []);

  const getVariantDetails = (product, variantId) => {
    return product?.variants?.find(
      (variant) => variant._id?.toString() === variantId?.toString()
    );
  };

  const getItemImage = (item) => {
    const product = item?.product;
    const variant = getVariantDetails(product, item?.variant);

    return (
      variant?.images?.[0]?.url ||
      product?.images?.[0]?.url ||
      "https://via.placeholder.com/300"
    );
  };

  const getItemPrice = (item) => {
    return item?.price?.amount || item?.product?.price?.amount || 0;
  };

  const getCurrency = (item) => {
    return item?.price?.currency || item?.product?.price?.currency || "INR";
  };

  const subtotal = cartItems?.reduce((total, item) => {
    return total + getItemPrice(item) * item.quantity;
  }, 0);

  const deliveryCharge = subtotal > 0 ? 0 : 0;
  const total = subtotal + deliveryCharge;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
            <ShoppingBag size={34} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-3 max-w-md text-sm text-gray-500">
            Looks like you haven’t added anything to your cart yet. Start
            shopping and find something stylish.
          </p>

          <button className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Snitch Cart
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              You have {cartItems.length} item
              {cartItems.length > 1 ? "s" : ""} in your cart.
            </p>
          </div>

          <button className="w-fit rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-black hover:text-black">
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => {
              const product = item.product;
              const variant = getVariantDetails(product, item.variant);
              const itemPrice = getItemPrice(item);
              const currency = getCurrency(item);

              return (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">
                    {/* Product Image */}
                    <div className="h-52 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-40 sm:w-36">
                      <img
                        src={getItemImage(item)}
                        alt={product?.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="line-clamp-2 text-lg font-bold text-gray-950">
                              {product?.title}
                            </h2>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                              {product?.description}
                            </p>
                          </div>

                          <button className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Variant Info */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {variant?.attributes?.size && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                              Size: {variant.attributes.size}
                            </span>
                          )}

                          {variant?.attributes?.color && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                              Color: {variant.attributes.color}
                            </span>
                          )}

                          {variant?.stock !== undefined && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                variant.stock > 0
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {variant.stock > 0
                                ? `${variant.stock} in stock`
                                : "Out of stock"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Quantity */}
                        <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                          <button className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-200 hover:text-black">
                            <Minus size={15} />
                          </button>

                          <span className="min-w-10 text-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>

                          <button className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-200 hover:text-black">
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right">
                          <p className="text-xs font-medium text-gray-400">
                            Item total
                          </p>

                          <h3 className="text-xl font-bold text-gray-950">
                            {currency === "INR" ? "₹" : currency}{" "}
                            {itemPrice * item.quantity}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-gray-950">Order Summary</h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-900">₹ {subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className="font-semibold text-green-600">
                  {deliveryCharge === 0 ? "Free" : `₹ ${deliveryCharge}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold text-gray-900">₹ 0</span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-950">
                    Total
                  </span>
                  <span className="text-2xl font-black text-gray-950">
                    ₹ {total}
                  </span>
                </div>
              </div>
            </div>

            {/* Coupon Box */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Tag size={18} className="text-gray-600" />
                <p className="text-sm font-bold text-gray-800">
                  Apply Coupon
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-black"
                />

                <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gray-800">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            {/* Trust Info */}
            <div className="mt-5 grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <Truck size={20} className="text-gray-700" />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    On all prepaid orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <ShieldCheck size={20} className="text-gray-700" />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Secure Checkout
                  </p>
                  <p className="text-xs text-gray-500">
                    Safe and protected payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;