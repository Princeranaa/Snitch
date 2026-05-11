import React, { useState } from "react";
import { Mail, Lock, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import bgImage from "../../assets/Snitch.png";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] font-['Inter'] selection:bg-amber-200 selection:text-black">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt="Luxury Background"
          className="h-full w-full object-cover  "
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

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8 lg:p-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full max-w-6xl gap-8 lg:grid-cols-2"
        >
          {/* Left Column: Brand & Info */}
          <div className="hidden flex-col justify-center space-y-8 lg:flex select-none">
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
                  Fashion Store
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-['Playfair_Display'] text-6xl font-bold leading-tight text-white xl:text-7xl">
                Welcome Back to{" "}
                <span className="italic text-amber-400">Elegance</span>.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-400">
                Log in to continue your journey through the world's most curated
                fashion collections. Your style, redefined.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-sm text-gray-500 font-medium"
            >
              <div className="h-1 w-12 bg-amber-400" />
              <span>EXPERIENCE LUXURY SHOPPING</span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2.5rem] bg-white/5 p-8 shadow-2xl backdrop-blur-2xl border border-white/10 sm:p-12 select-none"
          >
            <div className="mb-10">
              <div className="lg:hidden mb-6 flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-amber-400" />
                <h1 className="text-xl font-black uppercase tracking-widest text-white">
                  Snitch
                </h1>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                Login
              </h3>
              <h2 className="mt-2 font-['Playfair_Display'] text-4xl font-bold text-white">
                Welcome Back
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full rounded-2xl bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[10px] font-bold text-amber-400 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors group-focus-within:text-amber-400" />
                  <input
                    required
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center px-1">
                <label className="flex cursor-pointer items-center gap-2 group">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded bg-white/5 border-white/10 accent-amber-400"
                  />
                  <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    Keep me signed in
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-amber-400 font-bold text-black transition-all hover:bg-amber-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <div className="flex items-center gap-2">
                    Enter Dashboard
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              New to Snitch?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-bold text-amber-400 transition-colors hover:text-white"
              >
                Create Account
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
