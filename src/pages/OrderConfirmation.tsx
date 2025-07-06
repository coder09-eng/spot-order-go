
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ChefHat, Home, QrCode } from "lucide-react";

interface Order {
  orderId: string;
  tableId: string;
  customerName: string;
  items: any[];
  totalAmount: number;
  status: string;
  orderTime: string;
  paymentTime: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(25);

  useEffect(() => {
    const orderId = location.state?.orderId;
    if (!orderId) {
      navigate('/');
      return;
    }

    // Find the order in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.orderId === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/');
    }

    // Simulate countdown timer
    const timer = setInterval(() => {
      setEstimatedTime(prev => prev > 0 ? prev - 1 : 0);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [location.state, navigate]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'preparing':
        return <ChefHat className="h-6 w-6 text-orange-600" />;
      case 'ready':
        return <CheckCircle className="h-6 w-6 text-blue-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Order Confirmed';
      case 'preparing':
        return 'Being Prepared';
      case 'ready':
        return 'Ready for Pickup';
      default:
        return 'Processing';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const totalWithTax = order.totalAmount * 1.08;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order, {order.customerName}</p>
        </div>

        {/* Order Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Status</span>
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-2">{getStatusText(order.status)}</span>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Order ID</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {order.orderId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Table Number</span>
                <span className="font-semibold">{order.tableId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estimated Time</span>
                <span className="font-semibold text-orange-600">
                  {estimatedTime} minutes
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">What happens next?</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your order is being prepared by our kitchen staff. You'll be notified when it's ready. 
                    Please remain at your table and our staff will bring your order to you.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${(order.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Paid</span>
                  <span className="text-green-600">${totalWithTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Confirmation */}
        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Payment Confirmed</span>
            </div>
            <p className="text-center text-sm text-gray-600 mt-1">
              Paid on {new Date(order.paymentTime).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate(`/table/${order.tableId}`)}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <QrCode className="h-5 w-5 mr-2" />
            Order More Items
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help with your order? Please speak to our staff or call the restaurant directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
