import { motion, AnimatePresence } from "motion/react";
import { Utensils, Phone, Clock, MapPin, Instagram, Facebook, ChevronRight, ArrowLeft, MessageCircle, Star, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";

interface PlasticCardProps {
  children: React.ReactNode;
  variant?: "black" | "pink" | "yellow";
  className?: string;
}

const PlasticCard: React.FC<PlasticCardProps> = ({ children, variant = "black", className = "" }) => {
  const variants = {
    black: "plastic-black",
    pink: "plastic-pink",
    yellow: "plastic-yellow",
  };
  return (
    <div className={`${variants[variant]} rounded-[32px] md:rounded-[40px] p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
};

interface NavbarProps {
  activePage: string;
  setActivePage: (p: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
      <div className="plastic-black rounded-full px-8 py-3 flex justify-between items-center border border-white/10">
        <button 
          onClick={() => setActivePage("accueil")}
          className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activePage === "accueil" ? "text-gold scale-110" : "text-white/40 hover:text-white"}`}
        >
          Accueil
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-black tracking-tighter text-white">AUREL</span>
        </div>
        <button 
          onClick={() => setActivePage("carte")}
          className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activePage === "carte" ? "text-gold scale-110" : "text-white/40 hover:text-white"}`}
        >
          La Carte
        </button>
      </div>
    </nav>
  );
};

const BackgroundGlows: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0], 
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-[#6D1B2D]/10 blur-[100px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-gold/5 blur-[150px] rounded-full"
      />
    </div>
  );
};

const AnimatedSection: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#6D1B2D] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gold uppercase tracking-[0.6em] text-[10px] mb-4 block font-black opacity-80">Restaurant</span>
          <h1 className="text-7xl md:text-9xl font-serif font-black text-white leading-none tracking-tighter uppercase relative">
            Aurel
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gold origin-left"
            />
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 text-gold italic font-serif text-xl md:text-2xl tracking-widest"
          >
            Signature
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20"
        >
          <div className="absolute inset-0 border border-gold/20 rounded-full scale-75" />
          <div className="absolute inset-0 border border-gold/10 rounded-full scale-100" />
        </motion.div>
      </div>

      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-black/40 pointer-events-none"
      />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </motion.div>
  );
};

interface HomePageProps {
  onNavigate: () => void;
}

const VideoHero: React.FC = () => {
  const [error, setError] = useState(false);
  
  const sources = [
    "./Explosion_of_savour_20260500818.mp4",
    "https://v1.pexels.com/video-files/3769033/3769033-sd_640_360_25fps.mp4",
    "https://v1.pexels.com/video-files/4252684/4252684-sd_640_360_25fps.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-delicious-burger-being-assembled-4654-large.mp4"
  ];

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="aspect-[4/5] rounded-[70px] overflow-hidden border-2 border-white/10 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black group"
    >
      <video 
        key="main-hero-video"
        className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1] brightness-[1.1]"
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800"
        onCanPlay={(e) => {
          setError(false);
          e.currentTarget.play().catch(() => {});
        }}
        onError={() => setError(true)}
      >
        {sources.map((src, i) => (
          <source key={i} src={src} type="video/mp4" />
        ))}
      </video>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Floating Elements for "Explosion" Vibe */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold/10 blur-[60px] rounded-full"
      />

      <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
         <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#C5A059]" />
         <span className="text-[10px] uppercase tracking-[0.3em] text-white font-black">Gastronomie 4K</span>
      </div>
    </motion.div>
  );
};

const FloatingCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3"
    >
      <motion.div
        className="absolute -inset-4 bg-gold/20 blur-3xl rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.a
        href="https://wa.me/2280123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-gold text-black px-6 py-4 rounded-full shadow-[0_20px_50px_rgba(197,160,89,0.3)] border border-white/20 hover:bg-white hover:scale-105 transition-all relative group overflow-hidden"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">WhatsApp Delivery</span>
        
        <span className="absolute right-2 top-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </motion.a>

      <motion.a
        href="tel:0123456789"
        className="flex items-center gap-3 bg-black/40 backdrop-blur-xl text-white px-5 py-3 rounded-full border border-white/10 hover:bg-white/60 hover:text-black transition-all shadow-xl"
        whileHover={{ x: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="w-4 h-4" />
        <span className="text-[9px] font-bold uppercase tracking-widest">Réserver</span>
      </motion.a>
    </motion.div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <section id="accueil" className="relative min-h-[calc(100vh-80px)] md:min-h-screen pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 overflow-hidden bg-metallic-pink">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <AnimatedSection>
          <div className="order-2 lg:order-1">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gold uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold"
              >
                Luxe & Street-Food Gastronomique
              </motion.span>
              
              <motion.h1 
                className="text-7xl md:text-8xl font-serif font-black mb-12 text-white leading-none tracking-tighter uppercase cursor-pointer select-none"
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ["drop-shadow(0 0 0px #C5A059)", "drop-shadow(0 0 15px #C5A059)", "drop-shadow(0 0 0px #C5A059)"]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.1, 
                    color: "#FFD700",
                    textShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  whileTap={{ scale: 0.9, rotate: -2 }}
                >
                  Aurel
                </motion.span> 
                <br /> 
                <motion.span 
                  className="block mt-4 text-[0.35em] md:text-[0.4em] italic tracking-[0.3em] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#FFF5E1] to-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.3)] filter contrast-125"
                  animate={{ 
                    opacity: [0.8, 1, 0.8],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ backgroundSize: '200% auto' }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Signature
                </motion.span>
              </motion.h1>
              
              <PlasticCard variant="pink" className="mb-10 max-w-md hover:scale-[1.02] transition-transform duration-500">
                <p className="text-2xl text-[#6D1B2D] leading-tight mb-8 font-black tracking-tighter italic">
                  "Plus qu'un restaurant, une escale sensorielle au cœur de Lomé."
                </p>
                <button 
                  onClick={onNavigate}
                  className="group flex items-center gap-3 text-[#6D1B2D] font-black uppercase tracking-widest text-[10px] bg-white/40 px-6 py-3 rounded-full hover:bg-white hover:shadow-2xl transition-all"
                >
                  La Carte <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </PlasticCard>
            </div>
          </div>
        </AnimatedSection>

        <div className="order-1 lg:order-2 relative">
          <VideoHero />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
            className="absolute -top-6 -right-4 md:-top-10 md:-right-10 z-30 group"
          >
            <div className="plastic-yellow p-6 md:p-8 rounded-[35px] md:rounded-[50px] border-2 border-white/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#6D1B2D] mb-4" />
              <p className="text-lg md:text-xl font-black leading-none uppercase tracking-tighter text-[#6D1B2D]">
                Ouvert <br/> <span className="text-sm md:text-base opacity-90">7j/7</span>
              </p>
              <div className="mt-2 md:mt-3">
                <span className="text-[10px] md:text-[12px] font-black bg-black/10 px-3 py-1 rounded-full text-[#6D1B2D] tracking-widest inline-block text-center whitespace-nowrap">
                  07:00 — 00:00
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuPage: React.FC<{ onGoBack: () => void }> = ({ onGoBack }) => {
  const sections = [
    {
      title: "Petit Déjeuner",
      variant: "pink" as const,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
      items: [
        { name: "Thé", price: "500f", desc: "Sélection de thés fins ou infusion locale" },
        { name: "Café", price: "500f", desc: "Robusta local fraîchement moulu" },
        { name: "Croissant", price: "1000f", desc: "Pur beurre, croustillant et doré" }
      ]
    },
    {
      title: "Fast Food",
      variant: "yellow" as const,
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=800",
      items: [
        { name: "Chawarma", price: "1500f", desc: "Viande marinée, sauce blanche maison" },
        { name: "Hamburger", price: "1500f", desc: "Bœuf grillé, cheddar, oignons caramélisés" },
        { name: "Pizza", price: "4500f", desc: "La Reine d'Aurel : Tomate, mozza, jambon" }
      ]
    },
    {
      title: "Cuisine d'Aurel",
      variant: "black" as const,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      items: [
        { name: "Salade Fraîcheur", price: "2500f", desc: "Mixte de saison, vinaigrette passion" },
        { name: "Riz au Gras", price: "3000f", desc: "Spécialité togolaise, riz parfumé à la tomate" },
        { name: "Pâtes", price: "3500f", desc: "Bolognaise ou Carbonara façon chef" }
      ]
    }
  ];

  return (
    <section id="carte" className="min-h-[auto] md:min-h-screen pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 relative bg-bordeaux-mesh">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      <BackgroundGlows />
      <div className="fixed top-24 left-4 z-[60] lg:left-12">
        <motion.button
          onClick={onGoBack}
          className="luxury-glass p-4 md:p-5 rounded-full text-gold border border-gold/30 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.15, x: -10 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
        </motion.button>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="mb-10 md:mb-16">
            <h2 className="text-5xl md:text-7xl font-serif font-black text-white italic tracking-tighter leading-none">La Carte.</h2>
            <p className="text-gold font-bold mt-3 uppercase tracking-widest text-[10px] md:text-xs">Restaurant Aurel — Lomé</p>
          </div>
        </AnimatedSection>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <PlasticCard variant={sec.variant} className="flex flex-col group overflow-hidden h-full hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-700">
                <div className="h-32 md:h-40 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 md:mb-8 overflow-hidden relative">
                  <img 
                    src={sec.image} 
                    alt={sec.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className={`text-2xl md:text-3xl font-serif font-black mb-6 md:mb-8 ${sec.variant === 'yellow' ? 'text-black' : (sec.variant === 'pink' ? 'text-[#6D1B2D]' : 'text-gold')}`}>
                  {sec.title}
                </h3>
                
                <div className="space-y-4 md:space-y-6 flex-grow">
                  {sec.items.map((item, j) => (
                    <motion.div 
                      key={j} 
                      className="flex flex-col gap-1 p-2 md:p-3 -m-2 md:-m-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group/item"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="text-[12px] md:text-sm font-black uppercase leading-tight tracking-tight group-hover/item:text-gold transition-colors">{item.name}</h4>
                        <span className="font-serif italic font-black text-base md:text-lg whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] font-bold opacity-60 leading-none group-hover/item:opacity-100 transition-opacity">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </PlasticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Jean D.",
      role: "Critique Culinaire",
      quote: "L'excellence à chaque bouchée. Le Chawarma est simplement révolutionnaire. Une texture et un goût inégalés à Lomé.",
      stars: 5
    },
    {
      name: "Marie-Laure K.",
      role: "Influenceuse Lifestyle",
      quote: "Une ambiance tamisée et un service impeccable. C'est l'endroit parfait pour allier gastronomie et élégance.",
      stars: 5
    },
    {
      name: "Marc A.",
      role: "Guide Local Google",
      quote: "La fusion parfaite entre le luxe et la gourmandise. Chaque plat raconte une histoire de passion. Incontournable.",
      stars: 5
    }
  ];

  return (
    <section id="avis" className="py-20 md:py-32 px-4 md:px-6 bg-luxury-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-24">
             <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold italic">Expériences</span>
             <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter mb-4 leading-none text-black">Ce qu'ils <br className="md:hidden"/> en disent.</h2>
             <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review, i) => (
            <AnimatedSection key={i} delay={i * 0.2}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[40px]" />
                <PlasticCard variant="black" className="relative !p-10 h-full flex flex-col justify-between border border-white/5 hover:border-gold/30 transition-all duration-500">
                  <div>
                    <div className="flex gap-1 mb-8">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    
                    <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed mb-8">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#6D1B2D] flex items-center justify-center text-black font-black uppercase shadow-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-gold leading-none mb-1">{review.name}</h4>
                      <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider">{review.role}</p>
                    </div>
                  </div>
                </PlasticCard>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};

const GallerySection: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?autofmt=avif&q=80&w=800",
      title: "Chawarma Signature",
      category: "Signature"
    },
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?autofmt=avif&q=80&w=800",
      title: "Pizza Artisanale",
      category: "Four à Bois"
    },
    {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?autofmt=avif&q=80&w=800",
      title: "Le Burger Aurel",
      category: "Gourmet"
    },
    {
      url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?autofmt=avif&q=80&w=800",
      title: "Frites Maison",
      category: "Accompagnement"
    },
    {
      url: "https://images.unsplash.com/photo-1550547660-d9450f859349?autofmt=avif&q=80&w=800",
      title: "Sandwich Royal",
      category: "Prestige"
    },
    {
      url: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?autofmt=avif&q=80&w=800",
      title: "Salade Fraîcheur",
      category: "Healthy"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-bordeaux-mesh relative overflow-hidden" id="galerie">
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold italic">Galerie</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-white leading-none">L'Art de la <br /> Dégustation.</h2>
            </div>
            <p className="text-white/60 font-medium md:text-right max-w-sm">
              Découvrez nos créations culinaires à travers l'objectif. Une fusion visuelle de textures et de saveurs.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div 
                className={`relative group overflow-hidden rounded-[30px] md:rounded-[40px] cursor-pointer aspect-[4/5] ${
                  i === 1 || i === 4 ? 'md:translate-y-12' : ''
                }`}
                whileHover={{ y: -10 }}
              >
                <motion.img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-x-8 bottom-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <span className="text-gold text-[10px] uppercase tracking-widest font-black block mb-2">{img.category}</span>
                  <h3 className="text-white text-xl font-serif italic font-black">{img.title}</h3>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 plastic-yellow rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 shadow-2xl">
                  <ChevronRight className="w-6 h-6 text-[#6D1B2D]" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection: React.FC = () => {
  const position = { lat: 6.1725, lng: 1.2211 }; // Approximate location for Station Zener area
  const mapUrl = `https://maps.google.com/maps?q=${position.lat},${position.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="plan" className="py-16 md:py-24 px-4 md:px-6 bg-luxury-cream text-black relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="lg:w-1/3 w-full">
             <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold italic">Localisation</span>
             <h2 className="text-5xl md:text-6xl font-serif font-black italic tracking-tighter mb-8 leading-none">Nous <br/> trouver.</h2>
             
             <div className="space-y-4">
               <PlasticCard variant="black" className="text-white !p-6">
                  <div className="flex items-start gap-4 mb-6">
                     <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                     <div>
                        <p className="font-bold text-lg leading-tight">Route de 50 (Station Zener)</p>
                        <p className="opacity-60 text-xs mt-1 uppercase tracking-widest">Lomé, Togo</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                     <Clock className="w-5 h-5 text-gold" />
                     <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Heures de service</p>
                        <p className="text-sm font-bold">07:00 — 00:00</p>
                     </div>
                  </div>
               </PlasticCard>
               
               <a 
                 href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 w-full py-4 text-[10px] font-black uppercase tracking-widest border-2 border-black rounded-full hover:bg-black hover:text-white transition-all shadow-lg"
               >
                 Ouvrir dans Google Maps <ChevronRight className="w-4 h-4" />
               </a>
             </div>
          </div>
          
          <div className="lg:w-2/3 w-full h-[350px] md:h-[500px] rounded-[40px] md:rounded-[60px] overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl md:shadow-3xl relative">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Aurel Location"
              className="grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const AmbientAudio: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
        // Fade in
        let vol = 0;
        const interval = setInterval(() => {
          vol += 0.01;
          if (vol >= 0.15) { // Max volume 15%
            clearInterval(interval);
          }
          if (audioRef.current) audioRef.current.volume = vol;
        }, 200);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <div className="fixed bottom-32 right-6 md:right-12 z-[70]">
      <audio 
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/02/22/audio_d0c6ff216b.mp3" // Luxury Lounge Track
      />
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className="w-12 h-12 rounded-full plastic-black border border-white/10 flex items-center justify-center text-gold shadow-2xl hover:bg-gold/10 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <VolumeX className="w-5 h-5 opacity-60" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="relative"
            >
              <Volume2 className="w-5 h-5" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gold/20 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 px-3 py-1 rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-[9px] uppercase tracking-widest font-black text-gold">Ambiance Lounge</p>
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState("accueil");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-bordeaux min-h-screen relative overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <BackgroundGlows />
      <AmbientAudio />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <FloatingCTA />
      
      <main className={`transition-all duration-1000 ${loading ? 'opacity-0 scale-105 blur-lg' : 'opacity-100 scale-100 blur-0'}`}>
        <AnimatePresence mode="wait" initial={false}>
        {activePage === "accueil" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HomePage onNavigate={() => setActivePage("carte")} />
            <GallerySection />
            <TestimonialsSection />
            <AnimatedSection>
              <MapSection />
            </AnimatedSection>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MenuPage onGoBack={() => setActivePage("accueil")} />
          </motion.div>
        )}
      </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 mx-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex gap-8">
            <Instagram className="w-5 h-5 text-white/30 hover:text-gold transition-colors cursor-pointer" />
            <Facebook className="w-5 h-5 text-white/30 hover:text-gold transition-colors cursor-pointer" />
          </div>
          <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] text-center">
            © 2026 Restaurant Aurel • Lomé, Togo — Route de 50 (Station Zener)
          </p>
          <div className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
            Ouvert Mercredi — Dimanche
          </div>
        </div>
      </footer>
    </div>
  );
}
