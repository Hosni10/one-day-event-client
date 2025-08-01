import { CalendarDays, Users, Clock, Trophy, Shirt, Star } from "lucide-react";
import RegistrationForm from "@/components/registration-form";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    toast({
      title: "Registration Form",
      description: "Please fill out all required fields to register for the sports day event.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md shadow-md border-b border-teal-200 overflow-hidden">
        {/* Subtle Background Image for Depth */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img 
            src="/image1.jpg" 
            alt="Sports Day header background" 
            className="w-full h-full object-cover opacity-10" 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Trophy className="text-orange-500 text-3xl drop-shadow-md" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-900 tracking-tight drop-shadow-sm">DOF Sports & Family Day</h1>
                <p className="text-sm text-teal-700 font-medium drop-shadow-sm">August 17th, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Main Promotional Image */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 py-16 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/image1.jpg" 
            alt="Sports Day promotional poster" 
            className="w-full h-full object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-teal-800/40"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-400/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400/15 rounded-full blur-lg"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              SPORTS & FAMILY DAY
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <CalendarDays className="text-white text-xl drop-shadow-md" />
              <span className="text-xl lg:text-2xl text-white font-medium drop-shadow-md">
  17<sup className="text-sm lg:text-base">th</sup> AUG - 8AM TO 6PM
</span>
            </div>
            <p className="text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Get Active & Competitive! Join us for entertainment sports, competitive tournaments, and family-friendly activities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={scrollToRegistration}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm"
              >
                <Users className="inline mr-2" />
                Register Now
              </button>
  
            </div>
          </div>
        </div>
      </section>

      {/* Sports Activities Grid */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-900 mb-4">Available Sports & Activities</h2>
            <p className="text-lg text-teal-700 max-w-2xl mx-auto">From casual fun to competitive tournaments - there's something for everyone!</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/sports.jpeg"
              alt="Sports and activities collage"
              className="w-full max-w-3xl rounded-xl shadow-lg border border-teal-200 object-cover"
            />
            <p className="mt-6 text-teal-800 text-base text-center max-w-2xl">
              A wide variety of sports and activities will be available, including football, basketball, volleyball, tennis, padel, badminton, table tennis, running, chess, martial arts, and more!
            </p>
          </div>
        </div>
      </section>

      {/* Event Highlights with Sports Pattern Background */}
      <section className="relative py-16 bg-teal-600 overflow-hidden">
        {/* Sports Pattern Background */}
        <div className="absolute inset-0">
          <img 
            src="/image 3.jpg" 
            alt="Sports pattern background" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What to Expect</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">A full day of activities designed for everyone - from casual fun to competitive sports</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Entertainment Sports */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-orange-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Entertainment Sports</h3>
              <p className="text-teal-100 mb-4">Casual, fun activities for all skill levels</p>
              <div className="text-sm text-teal-200">
                Badminton • Table Tennis • Tennis • Volleyball • Padel • Football • Basketball
              </div>
            </div>

            {/* Competitive Sports */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-orange-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Competitive Sports</h3>
              <p className="text-teal-100 mb-4">Organized tournaments and competitions</p>
              <div className="text-sm text-teal-200">
                Football • Basketball • Padel • Running • Track & Field
              </div>
            </div>

            {/* Event Kits */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="text-orange-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Branded Event Kits</h3>
              <p className="text-teal-100 mb-4">Custom t-shirts and gear for all participants</p>
              <div className="text-sm text-teal-200">
                Sizes: XS, S, M, L, XL, XXL
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Registration Form Section */}
      <section id="registration" className="py-16 bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Call to Action */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join the Ultimate Sports Day Experience!</h2>
              <p className="text-xl text-teal-100 mb-6 max-w-2xl mx-auto">
                Don't miss out on this incredible opportunity to connect with colleagues, showcase your skills, and create lasting memories with your family.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <Trophy className="text-white text-3xl mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Competitive Sports</h3>
                  <p className="text-sm text-teal-100">Show your skills in tournaments</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <Users className="text-white text-3xl mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Family Fun</h3>
                  <p className="text-sm text-teal-100">Activities for all ages</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <Shirt className="text-white text-3xl mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Event Kits</h3>
                  <p className="text-sm text-teal-100">Custom t-shirts included</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-teal-900 mb-4">Register for Sports Day</h2>
            <p className="text-lg text-teal-700">Fill out the form below to secure your spot. Registration closes tomorrow at end of day!</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-teal-200">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Partners & Organizers Section */}
      <section className="py-12 bg-white border-t border-b border-teal-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 tracking-tight">Organized By & Official Partners</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img src="/logo-black.jpg" alt="Event Partners and Organizers" className="max-h-24 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-teal-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Event Information</h4>
              <div className="space-y-2 text-sm">
                <p><CalendarDays className="inline mr-2" />17th August, 2024</p>
                <p><Clock className="inline mr-2" />8AM to 6PM</p>
              </div>
            </div>
            {/* <div>
              <h4 className="text-lg font-semibold text-white mb-4">Need Help?</h4>
              <div className="space-y-2 text-sm">
                <p>📧 events@dof.gov.ae</p>
                <p>📞 +971 2 123 4567</p>
                <p>🏢 Department of Finance</p>
              </div>
            </div> */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Important</h4>
              <div className="space-y-2 text-sm">
                <p><Shirt className="inline mr-2" />Event kits for all participants</p>
                <p>👨‍👩‍👧‍👦 Family-friendly activities</p>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 DOF Sports & Family Day. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
