import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/ui/PageHeader";
import paths from "../path/path";
import Button1 from "../components/ui/Button1";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCheckoutDetails } from "../api/Cart-api";
import { placeOrderApi } from "../api/Order-api";
import { addUserAddressApi, getUserAddressApi } from "../api/Address-api";
import Input from "../components/ui/Input";
import AddressForm from "../components/address/AddressForm";

const mapApiCartItem = (item) => ({
  id: item?.productId?._id || item?.productId || item?.product?._id || item?.product,
  title: item?.productName || item?.productId?.name || item?.product?.name || "Product",
  price: Number(item?.sellingPrice || item?.productId?.sellingPrice || item?.product?.sellingPrice || 0),
  mrp: Number(item?.mrp || item?.productId?.mrp || item?.product?.mrp || 0),
  quantity: Number(item?.quantity || 1),
});

const Checkout = () => {
  // Get role from Redux auth state
  const user = useSelector((state) => state.auth?.user);
  const role = user?.role;
  const userHasFranchiseRole = () => role === "franchise";
  const navigate = useNavigate();

  const [cartId, setCartId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartMeta, setCartMeta] = useState({
    subtotal: 0,
    totalMrp: 0,
    totalDiscount: 0,
    shippingCharge: 0,
    grandTotal: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [courierMethod, setCourierMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [billingForm, setBillingForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const loadCheckoutCart = useCallback(async () => {
    try {
      const response = await getCheckoutDetails();
      const cart = response?.cart || response?.data?.cart || response?.data;
      if (cart) {
        setCartId(cart?._id || "");
        setCartItems((cart.items || []).map(mapApiCartItem));
        setCartMeta({
          subtotal: Number(cart.subtotalAfterDiscount || cart.subtotal || 0),
          totalMrp: Number(cart.totalMrp || 0),
          totalDiscount: Number(cart.totalDiscount || 0),
          shippingCharge: Number(cart.shippingCharge || 0),
          grandTotal: Number(cart.grandTotal || 0),
        });
      }
    } catch {
      toast.error("Failed to fetch cart for checkout");
    }
  }, []);

  useEffect(() => {
    loadCheckoutCart();
  }, [loadCheckoutCart]);

  const applyAddressToForm = useCallback((addressObj) => {
    const shippingData = addressObj?.shipping || addressObj || {};
    setBillingForm((prev) => ({
      ...prev,
      fullName: shippingData.fullName || "",
      addressLine1: shippingData.addressLine1 || "",
      addressLine2: shippingData.addressLine2 || "",
      city: shippingData.city || "",
      state: shippingData.state || "",
      postalCode: shippingData.postalCode || "",
      phone: shippingData.phone || "",
    }));
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await getUserAddressApi();
      const addressList = res?.data?.addresses || res?.addresses || (Array.isArray(res?.data) ? res.data : []);
      setAddresses(addressList);
      if (addressList.length > 0) {
        const defaultAddress = addressList[0];
        setSelectedAddress(defaultAddress._id);
        applyAddressToForm(defaultAddress);
        setAddressType(defaultAddress?.type || "home");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch saved addresses");
    }
  }, [applyAddressToForm]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    const selected = addresses.find((addr) => addr._id === addressId);
    if (selected) {
      applyAddressToForm(selected);
    }
  };

  const handleSaveAddressSuccess = async () => {
    setIsAddingNewAddress(false);
    await fetchAddresses();
  };

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }
    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const payload = {
        addressId: selectedAddress,
        paymentMethod: paymentMethod === 'cash_on_delivery' ? 'cod' : paymentMethod,
        // Add courier info if franchise
        ...(userHasFranchiseRole()
          ? { courier: { isOnline: courierMethod === "online", isOffline: courierMethod === "offline" } }
          : {}),
      };

      const res = await placeOrderApi(payload);
      toast.success(res?.message || "Order placed successfully");
      navigate(paths.home); // Or to a success page if it exists
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-gray-soft)] pb-20">
      <PageHeader title="Checkout" />

      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Details */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Shipping Address</h2>
                {!isAddingNewAddress && (
                  <button
                    onClick={() => {
                      setIsAddingNewAddress(true);
                    }}
                    className="text-sm font-bold text-[var(--primary-color)] hover:text-[var(--primary-dark)] uppercase"
                  >
                    + Add New
                  </button>
                )}
              </div>

              {addresses.length > 0 && !isAddingNewAddress ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => handleAddressSelect(addr._id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr._id
                        ? "border-[var(--primary-color)] bg-green-50/30"
                        : "border-gray-100 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase px-2 py-1 bg-gray-100 rounded text-gray-600">{addr.type}</span>
                        {selectedAddress === addr._id && (
                          <div className="w-5 h-5 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="font-bold text-gray-900 mb-1">{addr?.shipping?.fullName}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {addr?.shipping?.addressLine1}, {addr?.shipping?.city}, {addr?.shipping?.state} - {addr?.shipping?.postalCode}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 font-medium">{addr?.shipping?.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <AddressForm 
                  onSuccess={handleSaveAddressSuccess} 
                  onCancel={() => setIsAddingNewAddress(false)}
                  showCancel={addresses.length > 0}
                />
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight mb-8 border-b border-gray-50 pb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash_on_delivery' ? 'border-[var(--primary-color)] bg-green-50/30' : 'border-gray-100'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-[var(--primary-color)]"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order is delivered.</p>
                  </div>
                </label>
                {/* <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[var(--primary-color)] bg-green-50/30' : 'border-gray-100'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-[var(--primary-color)]"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Online Payment</p>
                    <p className="text-sm text-gray-500">Pay securely via Cards, UPI or NetBanking.</p>
                  </div>
                </label> */}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Items ({cartItems.length})</span>
                  <span className="font-bold text-gray-900">₹{cartMeta.totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-bold text-red-500">-₹{cartMeta.totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{cartMeta.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold text-gray-900">₹{cartMeta.shippingCharge.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-[var(--primary-color)]">₹{cartMeta.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button1
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !selectedAddress}
                className="w-full !py-4 !rounded-xl !font-bold !text-lg shadow-lg shadow-green-100 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </Button1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;