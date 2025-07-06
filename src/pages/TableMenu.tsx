
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const TableMenu = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sample menu data - in real app this would come from database
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, onion, and our special sauce',
      price: 12.99,
      category: 'Main Course',
      available: true
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      description: 'Fresh tomato sauce, mozzarella, and basil',
      price: 14.99,
      category: 'Main Course',
      available: true
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      price: 9.99,
      category: 'Appetizers',
      available: true
    },
    {
      id: '4',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with vanilla ice cream',
      price: 7.99,
      category: 'Desserts',
      available: true
    },
    {
      id: '5',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with seasonal vegetables',
      price: 18.99,
      category: 'Main Course',
      available: false
    },
    {
      id: '6',
      name: 'French Fries',
      description: 'Crispy golden fries with sea salt',
      price: 5.99,
      category: 'Sides',
      available: true
    }
  ];

  const categories = [...new Set(menuItems.map(item => item.category))];

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, cartItem) => {
        if (cartItem.id === itemId) {
          if (cartItem.quantity > 1) {
            acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
          }
        } else {
          acc.push(cartItem);
        }
        return acc;
      }, [] as CartItem[]);
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const goToCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('tableId', tableId || '');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <QrCode className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QRMenu</h1>
                <p className="text-sm text-gray-600">Table {tableId}</p>
              </div>
            </div>
            {cart.length > 0 && (
              <Button 
                onClick={goToCart}
                className="bg-orange-600 hover:bg-orange-700 relative"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                View Cart
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs">
                  {getTotalItems()}
                </Badge>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Menu</h2>
          <p className="text-gray-600">Browse our delicious offerings and add items to your cart</p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              {category}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <Card key={item.id} className={`${!item.available ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {item.description}
                          </CardDescription>
                        </div>
                        <div className="text-xl font-bold text-orange-600 ml-4">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {item.available ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getItemQuantity(item.id) > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            )}
                            {getItemQuantity(item.id) > 0 && (
                              <span className="px-3 py-1 bg-gray-100 rounded-md font-medium">
                                {getItemQuantity(item.id)}
                              </span>
                            )}
                            <Button
                              onClick={() => addToCart(item)}
                              className="bg-orange-600 hover:bg-orange-700"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Badge variant="destructive">Currently Unavailable</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4">
            <Button 
              onClick={goToCart}
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 shadow-lg relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              ${getTotalPrice().toFixed(2)} • {getTotalItems()} items
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs">
                {getTotalItems()}
              </Badge>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableMenu;
