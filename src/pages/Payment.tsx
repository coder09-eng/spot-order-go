
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QrCode, CreditCard, Smartphone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  tableId: string;
  customerName: string;
  items: any[];
  specialInstructions: string;
  totalAmount: number;
  orderTime: string;
  orderId: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!orderData) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Save order to "database" (localStorage for demo)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        ...orderData,
        paymentMethod,
        status: 'paid',
        paymentTime: new Date().toISOString()
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart and current order
      localStorage.removeItem('cart');
      localStorage.removeItem('currentOrder');

      toast({
        title: "Payment successful!",
        description: "Your order has been placed and payment confirmed.",
      });

      navigate('/order-confirmation', { 
        state: { orderId: orderData.orderId }
      });
    }, 2000);
  };

  if (!orderData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  const totalWithTax = orderData.totalAmount * 1.08;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your order for Table {orderData.tableId}</p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-mono text-sm">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer</span>
                <span>{orderData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Items ({orderData.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>${orderData.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${(orderData.totalAmount * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-orange-600">${totalWithTax.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {orderData.specialInstructions && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Special Instructions:</p>
                <p className="text-sm text-yellow-700">{orderData.specialInstructions}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="qr" id="qr" />
                  <label htmlFor="qr" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <QrCode className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-medium">QR Code Payment</p>
                      <p className="text-sm text-gray-600">Scan QR code with your banking app</p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay with your card securely</p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <label htmlFor="mobile" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">Mobile Payment</p>
                      <p className="text-sm text-gray-600">Apple Pay, Google Pay, etc.</p>
                    </div>
                  </label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment QR Code (shown when QR payment is selected) */}
        {paymentMethod === 'qr' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Scan to Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-dashed border-gray-300 mb-4">
                  <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">Payment QR Code</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Amount: <span className="font-semibold">${totalWithTax.toFixed(2)}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Scan this QR code with your banking app to complete payment
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Payment */}
        {isProcessing ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment...</h3>
                <p className="text-gray-600">Please wait while we confirm your payment</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button 
            onClick={handlePayment}
            size="lg"
            className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
          >
            Confirm Payment • ${totalWithTax.toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Payment;
