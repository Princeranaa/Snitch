import React from 'react'
import { useSelector } from 'react-redux'
import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router'

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.items || []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-black border-b border-yellow-500/30 py-4 px-6 md:px-12 flex justify-between items-center shadow-[0_4px_20px_rgba(234,179,8,0.1)]">
      {/* Brand Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl md:text-3xl font-black tracking-widest text-yellow-400 hover:text-yellow-300 transition-all duration-300">
          SNITCH
        </Link>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* User Name */}
            <div className="flex items-center space-x-2 text-yellow-400 group cursor-default">
              <User size={18} className="text-yellow-500" />
              <span className="font-bold text-xs md:text-sm uppercase tracking-widest">
                {user.fullname || user.name || "User"}
              </span>
            </div>


            {/* Cart Icon */}
            <Link to="/cart" className="relative group flex items-center">
              <div className="p-2 rounded-xl bg-yellow-400/5 group-hover:bg-yellow-400/10 transition-all duration-300">
                <ShoppingCart size={22} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ) : (
          /* "otherwise not show anything" - as per user request */
          null
        )}
      </div>
    </nav>
  )
}

export default Navbar