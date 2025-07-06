
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, ShoppingCart, CreditCard, BarChart3, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">QRMenu</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</Link>
            <Link to="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">Pricing</Link>
            <Link to="#demo" className="text-gray-600 hover:text-orange-600 transition-colors">Demo</Link>
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Sign In
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100">
            🚀 Revolutionary Restaurant Technology
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Restaurant with 
            <span className="text-orange-600 block mt-2">QR Code Ordering</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Enable contactless dining with our complete QR code ordering system. 
            Customers scan, order, and pay seamlessly while you manage everything from one powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Setup in 5 minutes
          </p>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-20 relative max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <QrCode className="h-32 w-32 mx-auto text-orange-600 mb-4" />
                  <p className="text-lg font-semibold text-gray-900">Table 5 QR Code</p>
                  <p className="text-gray-600">Scan to view menu & order</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="h-6 w-6 text-orange-600" />
                    <span className="font-semibold text-gray-900">Customer Experience</span>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Scan QR code at table</li>
                    <li>✓ Browse digital menu</li>
                    <li>✓ Place order instantly</li>
                    <li>✓ Pay contactlessly</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">Admin Dashboard</span>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Real-time order tracking</li>
                    <li>✓ Daily sales analytics</li>
                    <li>✓ Menu management</li>
                    <li>✓ Payment verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Dining
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform handles every aspect of the dining experience, 
              from QR code generation to payment processing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Unique QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Generate unique QR codes for each table that link directly to your digital menu. 
                  Customers can instantly access your offerings by scanning.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Mobile-First Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Fully responsive interface optimized for mobile devices. 
                  Customers enjoy a smooth experience on any screen size.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Real-Time Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Orders are instantly transmitted to your kitchen and admin panel. 
                  Track order status and manage fulfillment in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Integrated Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Secure payment processing with multiple payment options. 
                  Generate payment QR codes or redirect to payment gateways.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Monitor daily sales, track popular items, and analyze customer behavior. 
                  Make data-driven decisions to grow your business.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Kitchen Display</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Dedicated kitchen view for managing orders efficiently. 
                  Update order status and coordinate with front-of-house staff.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-orange-100">Customer Satisfaction</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">45%</div>
              <div className="text-orange-100">Faster Service</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-orange-100">Restaurants</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Restaurant Owners
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about QRMenu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "QRMenu transformed our restaurant operations. Orders are faster, 
                  more accurate, and our customers love the contactless experience."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-gray-600">Owner, Bistro Milano</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The analytics dashboard gives us incredible insights. 
                  We can see exactly what's popular and optimize our menu accordingly."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mike Chen</div>
                    <div className="text-gray-600">Manager, Fusion Kitchen</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Setup was incredibly easy. Within hours, all our tables had QR codes 
                  and customers were placing orders seamlessly."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lisa Rodriguez</div>
                    <div className="text-gray-600">Owner, Taco Libre</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Restaurant?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join thousands of restaurants already using QRMenu to provide exceptional dining experiences. 
            Start your free trial today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
          <p className="text-orange-100 mt-6">
            Free 14-day trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="h-8 w-8 text-orange-400" />
                <span className="text-2xl font-bold">QRMenu</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The complete QR code ordering solution for modern restaurants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Setup Guide</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Training</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 QRMenu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
