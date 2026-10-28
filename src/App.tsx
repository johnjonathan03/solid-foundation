import { useState } from 'react'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import type { Product } from './HomePage'
import ProductPage from './ProductPage'
import type { ConfirmedOrder } from './ProductPage'
import OrdersPage from './OrdersPage'
import VendorOnboarding from './VendorOnboarding'
import RiderSignup from './RiderSignup'
import SellerDashboard from './SellerDashboard'

type Page = 'login' | 'home' | 'product' | 'orders' | 'vendor-onboarding' | 'rider-signup' | 'seller'

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [orders, setOrders] = useState<ConfirmedOrder[]>([])

  const handleEnter = (role: 'customer' | 'vendor' | 'rider') => {
    if (role === 'vendor') setPage('vendor-onboarding')
    else if (role === 'rider') setPage('rider-signup')
    else setPage('home')
  }

  if (page === 'home') {
    return (
      <HomePage
        onLogout={() => setPage('login')}
        onSelectProduct={(product) => {
          setSelectedProduct(product)
          setPage('product')
        }}
        cartItems={cartItems}
        onAddToCart={(product) => setCartItems((items) => [...items, product])}
        onOpenOrders={() => setPage('orders')}
        onOpenSeller={() => setPage('seller')}
      />
    )
  }

  if (page === 'product' && selectedProduct) {
    return (
      <ProductPage
        key={selectedProduct.id}
        product={selectedProduct}
        onBack={() => setPage('home')}
        onSelectProduct={setSelectedProduct}
        onPlaceOrder={(order) => setOrders((current) => [order, ...current])}
        onConfirmPayment={(code) => setOrders((current) => current.map((order) => order.code === code ? { ...order, paymentStatus: 'client-confirmed' } : order))}
        onOpenOrders={() => setPage('orders')}
      />
    )
  }

  if (page === 'orders') {
    return (
      <OrdersPage
        orders={orders}
        cartItems={cartItems}
        onBack={() => setPage('home')}
        onSelectProduct={(product) => {
          setSelectedProduct(product)
          setPage('product')
        }}
        onRemoveCartItem={(index) => setCartItems((items) => items.filter((_, itemIndex) => itemIndex !== index))}
        onConfirmPayment={(code) => setOrders((current) => current.map((order) => order.code === code ? { ...order, paymentStatus: 'client-confirmed' } : order))}
      />
    )
  }

  if (page === 'vendor-onboarding') {
    return <VendorOnboarding onFinish={() => setPage('seller')} onBack={() => setPage('login')} />
  }

  if (page === 'rider-signup') {
    return <RiderSignup onFinish={() => setPage('home')} onBack={() => setPage('login')} />
  }

  if (page === 'seller') {
    return <SellerDashboard orders={orders} onBack={() => setPage('home')} onLogout={() => setPage('login')} />
  }

  return <LoginPage onEnter={handleEnter} />
}
