import React from "react";
import {
  Mail,
  Lock,
  Phone,
  User,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/modern-register-bg.png";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleRegister({
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        contact: formData.contact,
        isSeller: formData.isSeller,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const users = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300",
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] font-['Inter'] selection:bg-amber-200 selection:text-black select-none">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Background"
          className="h-full w-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full max-w-6xl gap-8 lg:grid-cols-2"
        >
          {/* Left Column: Brand & Info */}
          <div className="hidden flex-col justify-center space-y-8 lg:flex">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-2xl backdrop-blur-xl border border-white/20">
                <ShoppingBag className="h-7 w-7 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white">
                  Snitch
                </h1>
                <p className="text-xs font-medium uppercase tracking-[0.4em] text-amber-400/80">
                  The Future of Fashion
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-['Playfair_Display'] text-6xl font-bold leading-tight text-white xl:text-7xl">
                Redefine Your <br />
                <span className="italic text-amber-400">Signature</span> Style.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-400">
                Join our exclusive community of trendsetters and fashion icons.
                Whether you're here to shop or showcase your creations, Velora
                is your gateway to global style.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-4">
                {users.map((image, index) => (
                  <div
                    key={index}
                    className="h-12 w-12 overflow-hidden rounded-full border-2 border-black"
                  >
                    <img
                      src={image}
                      alt="user"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-white">10k+</span> Fashionistas
                already joined
              </p>
            </motion.div>
          </div>

          {/* Right Column: Registration Card */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2.5rem] bg-white/5 p-7 sm:p-8 shadow-2xl backdrop-blur-2xl border border-white/10"
          >
            {/* Form Header */}
            <div className="mb-7">
              <div className="lg:hidden mb-6 flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-amber-400" />
                <h1 className="text-xl font-black uppercase tracking-widest text-white">
                  Velora
                </h1>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                Get Started
              </h3>
              <h2 className="mt-2 font-['Playfair_Display'] text-4xl font-bold text-white">
                Create Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="group relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />
                    <input
                      required
                      onChange={handleChange}
                      value={formData.fullname}
                      name="fullname"
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-2xl bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Contact
                  </label>
                  <div className="group relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />
                    <input
                      required
                      onChange={handleChange}
                      value={formData.contact}
                      name="contact"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-2xl bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />
                  <input
                    required
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full rounded-2xl bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />
                  <input
                    required
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              {/* Seller Switch */}
              <motion.label
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${formData.isSeller ? "bg-amber-400/20 text-amber-400" : "bg-white/10 text-gray-400"}`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Register as Seller
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      Grow your business
                    </p>
                  </div>
                </div>
                <input
                  onChange={handleChange}
                  checked={formData.isSeller}
                  name="isSeller"
                  type="checkbox"
                  className="h-5 w-5 accent-amber-400"
                />
              </motion.label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-amber-400 font-bold text-black transition-all hover:bg-amber-300 disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"
                    />
                  ) : (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Join Velora
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold text-amber-400 transition-colors hover:text-white"
              >
                Sign In
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
