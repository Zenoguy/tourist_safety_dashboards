import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Smartphone, Brain, Eye, Globe, Lock, Wifi, ChevronRight, Star, Users, Clock, Mountain } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="w-8 h-8 text-emerald-600" />,
      title: "Digital Tourist ID",
      description: "Secure blockchain-based digital identity generation with KYC verification for safe travel",
      details: ["Blockchain security", "Aadhaar/Passport integration", "Trip-based validity"],
      image: "/src/data/img1.png",
      bgColor: "from-emerald-50 to-teal-50",
      accentColor: "emerald-600"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-violet-600" />,
      title: "Smart Mobile App",
      description: "AI-powered safety scoring, geo-fencing alerts, and emergency panic button functionality",
      details: ["Tourist Safety Score", "Geo-fencing alerts", "Panic button with GPS"],
      image: "/src/data/img3.png",
      bgColor: "from-violet-50 to-purple-50",
      accentColor: "violet-600"
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-600" />,
      title: "AI Anomaly Detection",
      description: "Intelligent monitoring for unusual patterns, route deviations, and emergency situations",
      details: ["Route deviation alerts", "Inactivity detection", "Behavioral analysis"],
      image: "/src/data/img2.png",
      bgColor: "from-pink-50 to-rose-50",
      accentColor: "pink-600"
    },
    {
      icon: <Eye className="w-8 h-8 text-indigo-600" />,
      title: "Real-time Dashboard",
      description: "Comprehensive monitoring for tourism departments and law enforcement agencies",
      details: ["Tourist heat maps", "Risk zone visualization", "Automated E-FIR"],
      image: "/src/data/img4.png",
      bgColor: "from-indigo-50 to-blue-50",
      accentColor: "indigo-600"
    },
    {
      icon: <Wifi className="w-8 h-8 text-amber-600" />,
      title: "IoT Integration",
      description: "Smart bands and tags for enhanced safety in high-risk areas like caves and forests",
      details: ["Continuous monitoring", "Health signals", "Manual SOS feature"],
      image: "/src/data/img5.png",
      bgColor: "from-amber-50 to-orange-50",
      accentColor: "amber-600"
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-600" />,
      title: "Multilingual Support",
      description: "Available in 10+ Indian languages with voice and text emergency access",
      details: ["10+ Indian languages", "Voice emergency", "Accessibility features"],
      bgColor: "from-cyan-50 to-sky-50",
      accentColor: "cyan-600"
    }
  ];

  const stats = [
    { number: "24/7", label: "Monitoring", icon: <Clock className="w-6 h-6" />, color: "text-emerald-600" },
    { number: "10+", label: "Languages", icon: <Globe className="w-6 h-6" />, color: "text-violet-600" },
    { number: "100%", label: "Secure", icon: <Lock className="w-6 h-6" />, color: "text-pink-600" },
    { number: "∞", label: "Coverage", icon: <MapPin className="w-6 h-6" />, color: "text-cyan-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gradient-to-r from-violet-200 to-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Mountain className="w-8 h-8 text-gradient bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Yatra Saathi</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Features</a>
              <a href="#solution" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Solution</a>
              <a href="#technology" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Technology</a>
              <button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-left lg:text-left relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-pulse">Smart Tourist Safety</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent">Monitoring System</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Revolutionary AI-powered platform leveraging Blockchain, Geo-Fencing, and IoT technologies 
                to ensure tourist safety with real-time monitoring and incident response capabilities.
              </p>
              
              {/* Enhanced Stats with animations */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className={`flex justify-center mb-2 ${stat.color} transform group-hover:scale-125 transition-all duration-300`}>
                      <div className="relative">
                        {stat.icon}
                        <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="relative bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Access Dashboard</span>
                  <ChevronRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="relative border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-violet-50 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <span className="relative z-10">Learn More</span>
                </button>
              </div>
            </div>

            {/* Right side - Enhanced Video with particles */}
            <div className="relative">
              {/* Floating particles around video */}
              <div className="absolute -inset-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
                <div className="absolute top-10 right-10 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s', animationDuration: '2.5s'}}></div>
                <div className="absolute top-20 left-5 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-70" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-0 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-10 left-20 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
                <div className="absolute top-5 right-20 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2.5s'}}></div>
                <div className="absolute bottom-5 right-15 w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-15 left-0 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '3.5s', animationDuration: '2s'}}></div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 p-4 transform hover:scale-105 transition-all duration-500">
                {/* Animated border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 blur-md animate-pulse"></div>
                
                <div className="relative">
                  <video 
                    className="w-full h-auto rounded-xl shadow-lg"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="/src/data/Cinematic_Video_Generation_Yatra_Sathi.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Enhanced video overlay elements */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Live Monitoring</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6">
                  <div className="bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg px-3 py-2 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </div>

                {/* Additional floating status indicators */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-spin" style={{animationDuration: '10s'}}>
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg px-2 py-1 shadow-lg animate-pulse">
                    <span className="text-xs font-medium">24/7 Active</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating decorative elements with animations */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 animate-ping" style={{animationDuration: '4s'}}></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
              <div className="absolute top-1/2 -right-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Super enhanced background decoration with moving particles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          
          {/* Additional moving background particles */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-2xl animate-bounce" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-3/4 left-3/4 w-36 h-36 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-2xl animate-ping" style={{animationDuration: '10s'}}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 w-8 h-8 border-2 border-violet-400 rotate-45 animate-spin opacity-30" style={{animationDuration: '15s'}}></div>
          <div className="absolute top-40 right-32 w-6 h-6 border-2 border-pink-400 rotate-12 animate-pulse opacity-40"></div>
          <div className="absolute bottom-32 left-40 w-10 h-10 border-2 border-cyan-400 rotate-45 animate-bounce opacity-35" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 bg-amber-400 rotate-45 animate-ping opacity-50"></div>
          <div className="absolute top-60 left-60 w-12 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rotate-12 animate-pulse opacity-30"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Safety Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated platform combines cutting-edge technologies to provide unparalleled tourist safety and monitoring capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.bgColor} p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50`}>
                {/* Feature Image */}
                {feature.image && (
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-24 h-24 object-cover rounded-xl shadow-lg"
                      />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-${feature.accentColor} rounded-full flex items-center justify-center shadow-lg`}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Icon for features without images */}
                {!feature.image && (
                  <div className={`mb-4 w-12 h-12 bg-${feature.accentColor} bg-opacity-20 rounded-xl flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <div className={`w-1.5 h-1.5 bg-${feature.accentColor} rounded-full mr-2`}></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
              <h2 className="text-4xl font-bold mb-6">The Challenge</h2>
              <p className="text-lg mb-6 opacity-90">
                In regions like Northeast India, where tourism is a key economic driver, ensuring visitor safety is paramount. 
                Traditional policing and manual tracking methods are insufficient in remote and high-risk areas.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                  Limited real-time monitoring capabilities
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  Inadequate emergency response systems
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Lack of secure identity verification
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  Communication barriers in remote areas
                </li>
              </ul>
            </div>
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
              <h2 className="text-4xl font-bold mb-6">Our Solution</h2>
              <p className="text-lg mb-6 opacity-90">
                Yatra Saathi provides a comprehensive digital ecosystem that leverages AI, Blockchain, and IoT 
                technologies to create a robust safety net for tourists.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                  <h4 className="font-semibold mb-2">AI-Powered</h4>
                  <p className="text-sm opacity-80">Smart anomaly detection and predictive alerts</p>
                </div>
                <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                  <h4 className="font-semibold mb-2">Blockchain Secure</h4>
                  <p className="text-sm opacity-80">Tamper-proof digital identity system</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                  <h4 className="font-semibold mb-2">Real-time Monitoring</h4>
                  <p className="text-sm opacity-80">24/7 surveillance and rapid response</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                  <h4 className="font-semibold mb-2">Multilingual</h4>
                  <p className="text-sm opacity-80">Support for 10+ Indian languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-gray-600">
              Built on a foundation of cutting-edge technologies for maximum security and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Artificial Intelligence</h3>
              <p className="text-gray-600">Advanced ML algorithms for pattern recognition, anomaly detection, and predictive analysis</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Lock className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Blockchain Technology</h3>
              <p className="text-gray-600">Immutable digital identity records with end-to-end encryption and data privacy compliance</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Wifi className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">IoT Integration</h3>
              <p className="text-gray-600">Smart wearables and sensors for continuous monitoring in challenging environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Tourist Safety?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the revolution in smart tourism safety monitoring. Access our comprehensive dashboard system today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Access System
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-4 h-4 bg-violet-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-5 h-5 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Mountain className="w-6 h-6 text-violet-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Yatra Saathi</span>
              </div>
              <p className="text-gray-400">
                Smart Tourist Safety Monitoring & Incident Response System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-400">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Digital Tourist ID</li>
                <li className="hover:text-violet-400 transition-colors cursor-pointer">AI Anomaly Detection</li>
                <li className="hover:text-pink-400 transition-colors cursor-pointer">Real-time Monitoring</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">IoT Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-violet-400">Technology</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-violet-400 transition-colors cursor-pointer">Blockchain Security</li>
                <li className="hover:text-pink-400 transition-colors cursor-pointer">Geo-fencing Alerts</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Multilingual Support</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Emergency Response</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-pink-400">Access</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-pink-400 transition-colors cursor-pointer">Tourist Dashboard</li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">Admin Portal</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Agency Management</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Emergency Services</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Yatra Saathi. All rights reserved. Built for tourist safety and security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;