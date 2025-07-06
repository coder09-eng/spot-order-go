
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableId, setTableId] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedTableId = localStorage.getItem('tableId');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedTableId) {
      setTableId(savedTableId);
    }
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to place the order.",
        variant: "destructive",
      });
      return;
    }

    // Store order data
    const orderData = {
      tableId,
      customerName,
      items: cart,
      specialInstructions,
      totalAmount: getTotalPrice(),
      orderTime: new Date().toISOString(),
      orderId: `ORD-${Date.now()}-${tableId}`
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    navigate('/payment');
  };

  const goBackToMenu = () => {
    navigate(`/table/${tableId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items from our menu!</p>
          <Button onClick={goBackToMenu} className="bg-orange-600 hover:bg-orange-700">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={goBackToMenu}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Order</h1>
            <p className="text-gray-600">Table {tableId}</p>
          </div>
        </div>

        {/* Customer Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <Textarea
                id="instructions"
                placeholder="Any special requests or dietary requirements..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items ({getTotalItems()} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-lg font-semibold text-orange-600 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3 py-1 bg-gray-100 rounded-md font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-orange-600">
                    ${(getTotalPrice() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <Button 
          onClick={handlePlaceOrder}
          size="lg"
          className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
        >
          Place Order • ${(getTotalPrice() * 1.08).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
