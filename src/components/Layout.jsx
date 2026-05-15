import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../redux/slices/cartSlice'
import Header from './layout/Header'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import CartSidebar from './layout/CartSidebar'

const Layout = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.cart.isSidebarOpen);

  return (
    <div>
        <Header/>
        <Navbar onCartClick={() => dispatch(toggleSidebar(true))} />
        <CartSidebar isOpen={isSidebarOpen} onClose={() => dispatch(toggleSidebar(false))} />
        <main className=''>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default Layout