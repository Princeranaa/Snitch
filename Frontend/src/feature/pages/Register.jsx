import React from "react";
import { Mail, Lock, Phone, User, ShoppingBag } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    contact: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    navigate("/");
    
    setFormData({
      email: "",
      password: "",
      fullname: "",
      contact: "",
      isSeller: false,
    });
  };

  return (
    <section className="min-h-dvh w-full bg-[#f4eee7] text-[#19130f] lg:h-dvh lg:overflow-hidden">
      <div className="grid min-h-dvh w-full grid-cols-1 lg:h-full lg:grid-cols-[1.05fr_0.95fr]">
        {/* Image Section */}
        <div className="relative h-[270px] overflow-hidden sm:h-[340px] lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=90"
            alt="Fashion clothing"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#140b07]/85 via-[#2b160c]/35 to-black/10 lg:bg-gradient-to-r lg:from-[#140b07]/80 lg:via-[#2b160c]/40 lg:to-black/5" />

          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <ShoppingBag size={19} className="text-white" />
              </div>

              <div>
                <h1 className="font-['Inter'] text-lg font-extrabold uppercase tracking-[0.22em] text-white">
                  Velora
                </h1>
                <p className="mt-0.5 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.28em] text-[#ead8c6]/75">
                  Fashion Store
                </p>
              </div>
            </div>

            {/* Desktop Main Text */}
            <div className="hidden max-w-[560px] lg:block">
              <p className="mb-5 font-['Inter'] text-sm font-semibold uppercase tracking-[0.35em] text-[#ead8c6]/75">
                New Collection 2026
              </p>

              <h2 className="font-['Playfair_Display'] text-6xl font-bold leading-[0.95] tracking-[-0.045em] text-white xl:text-7xl">
                Style That
                <br />
                Speaks Before
                <br />
                You Do.
              </h2>

              <p className="mt-7 max-w-md font-['Inter'] text-sm leading-7 text-white/72">
                Discover premium clothing, trend-forward collections, and a
                fashion experience designed for modern shoppers and sellers.
              </p>
            </div>

            {/* Mobile Main Text */}
            <div className="lg:hidden">
              <p className="mb-2 font-['Inter'] text-xs font-semibold uppercase tracking-[0.28em] text-[#ead8c6]/75">
                New Collection
              </p>

              <h2 className="max-w-[330px] font-['Playfair_Display'] text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                Style That Speaks.
              </h2>
            </div>

            {/* Desktop Bottom Note */}
            <div className="hidden items-center gap-4 lg:flex">
              <div className="h-[1px] w-16 bg-[#ead8c6]/45" />
              <p className="font-['Inter'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ead8c6]/70">
                Wear confidence every day
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex w-full items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:h-full lg:px-12 lg:py-6 xl:px-16">
          <div className="w-full max-w-[465px]">
            <div>
              <p className="font-['Inter'] text-xs font-bold uppercase tracking-[0.3em] text-[#b0774f] lg:text-sm">
                Register Now
              </p>

              <h1 className="mt-3 font-['Playfair_Display'] text-4xl font-bold tracking-[-0.04em] text-[#19130f] lg:text-5xl">
                Create Account
              </h1>

              <p className="mt-4 font-['Inter'] text-sm leading-6 text-[#75665b]">
                Sign up to shop the latest clothing collections or register as a
                seller and grow your fashion business.
              </p>
            </div>

            {/* Form Selection */}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4 lg:mt-8">
              {/* Full Name */}
              <div>
                <label className="mb-2 block font-['Inter'] text-[13px] font-bold text-[#2a211b]">
                  Full Name
                </label>

                <div className="flex h-[52px] items-center gap-3 rounded-2xl border border-[#e2d3c3] bg-[#fffaf5] px-4 shadow-[0_10px_30px_rgba(60,35,20,0.06)] transition focus-within:border-[#b0774f] focus-within:bg-white focus-within:shadow-[0_12px_35px_rgba(176,119,79,0.14)] lg:h-14">
                  <User size={18} className="text-[#9a806e]" />

                  <input
                    onChange={handleChange}
                    value={formData.fullname}
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent font-['Inter'] text-sm font-medium text-[#1c1510] outline-none placeholder:font-normal placeholder:text-[#b8aa9e]"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="mb-2 block font-['Inter'] text-[13px] font-bold text-[#2a211b]">
                  Contact Number
                </label>

                <div className="flex h-[52px] items-center gap-3 rounded-2xl border border-[#e2d3c3] bg-[#fffaf5] px-4 shadow-[0_10px_30px_rgba(60,35,20,0.06)] transition focus-within:border-[#b0774f] focus-within:bg-white focus-within:shadow-[0_12px_35px_rgba(176,119,79,0.14)] lg:h-14">
                  <Phone size={18} className="text-[#9a806e]" />

                  <input
                    onChange={handleChange}
                    value={formData.contact}
                    name="contact"
                    type="tel"
                    placeholder="Enter your contact number"
                    className="w-full bg-transparent font-['Inter'] text-sm font-medium text-[#1c1510] outline-none placeholder:font-normal placeholder:text-[#b8aa9e]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-['Inter'] text-[13px] font-bold text-[#2a211b]">
                  Email Address
                </label>

                <div className="flex h-[52px] items-center gap-3 rounded-2xl border border-[#e2d3c3] bg-[#fffaf5] px-4 shadow-[0_10px_30px_rgba(60,35,20,0.06)] transition focus-within:border-[#b0774f] focus-within:bg-white focus-within:shadow-[0_12px_35px_rgba(176,119,79,0.14)] lg:h-14">
                  <Mail size={18} className="text-[#9a806e]" />

                  <input
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent font-['Inter'] text-sm font-medium text-[#1c1510] outline-none placeholder:font-normal placeholder:text-[#b8aa9e]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block font-['Inter'] text-[13px] font-bold text-[#2a211b]">
                  Password
                </label>

                <div className="flex h-[52px] items-center gap-3 rounded-2xl border border-[#e2d3c3] bg-[#fffaf5] px-4 shadow-[0_10px_30px_rgba(60,35,20,0.06)] transition focus-within:border-[#b0774f] focus-within:bg-white focus-within:shadow-[0_12px_35px_rgba(176,119,79,0.14)] lg:h-14">
                  <Lock size={18} className="text-[#9a806e]" />

                  <input
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    type="password"
                    placeholder="Create your password"
                    className="w-full bg-transparent font-['Inter'] text-sm font-medium text-[#1c1510] outline-none placeholder:font-normal placeholder:text-[#b8aa9e]"
                  />
                </div>
              </div>

              {/* Seller Checkbox */}
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e2d3c3] bg-[#fffaf5] px-4 py-3.5 shadow-[0_10px_30px_rgba(60,35,20,0.06)] transition hover:border-[#b0774f]/70 hover:bg-white lg:py-4">
                <input
                  onChange={handleChange}
                  checked={formData.isSeller}
                  name="isSeller"
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#b0774f]"
                />

                <div>
                  <p className="font-['Inter'] text-sm font-bold text-[#1c1510]">
                    Register as Seller
                  </p>

                  <p className="mt-1 font-['Inter'] text-xs leading-5 text-[#7d6d62]">
                    Enable this if you want to sell clothing products on the
                    platform.
                  </p>
                </div>
              </label>

              <button
                type="submit"
                className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-[#19130f] font-['Inter'] text-sm font-bold text-white shadow-[0_18px_40px_rgba(25,19,15,0.22)] transition hover:-translate-y-0.5 hover:bg-[#2b211a] active:translate-y-0 lg:h-14"
              >
                Create Account
              </button>
            </form>

            <p className="mt-5 text-center font-['Inter'] text-sm text-[#7d6d62]">
              Already have an account?{" "}
              <span className="cursor-pointer font-bold text-[#b0774f] transition hover:text-[#19130f]">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
