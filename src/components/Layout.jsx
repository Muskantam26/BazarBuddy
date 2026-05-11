import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './layout/Header'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import CartSidebar from './layout/CartSidebar'

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
        <Header/>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main className=''>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default Layout