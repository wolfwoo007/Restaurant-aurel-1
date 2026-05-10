import { motion, AnimatePresence } from "motion/react";
import { Utensils, Phone, Clock, MapPin, Instagram, Facebook, ChevronRight, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidMapsKey = Boolean(GOOGLE_MAPS_API_KEY) && GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY';

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
    <div className={`${variants[variant]} rounded-[40px] p-8 ${className}`}>
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

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <section id="accueil" className="relative min-h-screen pt-32 pb-16 px-6 overflow-hidden bg-metallic-pink">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold">
              Luxe & Street-Food Gastronomique
            </span>
            
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
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileTap={{ scale: 0.9, rotate: -2 }}
              >
                Aurel
              </motion.span> 
              <br /> 
              <motion.span 
                className="text-gold block mt-4 text-[0.4em] italic tracking-[0.2em]"
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  x: [-2, 2, -2]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, x: 10, color: "#FFF" }}
                whileTap={{ scale: 0.95 }}
              >
                Signature
              </motion.span>
            </motion.h1>
            
            <PlasticCard variant="pink" className="mb-10 max-w-md">
              <p className="text-2xl text-[#6D1B2D] leading-tight mb-8 font-black tracking-tighter italic">
                "Plus qu'un restaurant, une escale sensorielle au cœur de Lomé."
              </p>
              <button 
                onClick={onNavigate}
                className="group flex items-center gap-3 text-[#6D1B2D] font-black uppercase tracking-widest text-[10px] bg-white/40 px-6 py-3 rounded-full hover:bg-white/60 transition-all"
              >
                La Carte <ChevronRight className="w-4 h-4" />
              </button>
            </PlasticCard>

            <div className="flex gap-4">
              <PlasticCard variant="yellow" className="!p-5 flex items-center gap-4">
                <Phone className="w-6 h-6" />
                <p className="text-sm font-bold tracking-tighter">01 23 45 67 89</p>
              </PlasticCard>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <VideoHero />
          
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 plastic-yellow p-10 rounded-[50px] hidden md:block z-20 border-2 border-white/20 shadow-2xl"
          >
            <Clock className="w-10 h-10 mb-4" />
            <p className="text-xl font-black leading-none uppercase tracking-tighter">Service <br/> Continu</p>
            <p className="text-[12px] font-bold opacity-80 mt-2 tracking-widest text-[#6D1B2D]">12:00 — 23:00</p>
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
    <section id="carte" className="min-h-screen pt-32 pb-16 px-6 relative bg-[#6D1B2D]">
      <div className="fixed top-24 left-6 z-[60] lg:left-12">
        <motion.button
          onClick={onGoBack}
          className="luxury-glass p-5 rounded-full text-gold border border-gold/30 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.15, x: -10 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ArrowLeft className="w-6 h-6 transition-transform group-hover:scale-110" />
        </motion.button>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-7xl font-serif font-black text-white italic tracking-tighter">La Carte.</h2>
          <p className="text-gold font-bold mt-2 uppercase tracking-widest text-xs">Restaurant Aurel — Lomé</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((sec, i) => (
            <PlasticCard key={i} variant={sec.variant} className="flex flex-col group overflow-hidden">
              <div className="h-40 -mx-8 -mt-8 mb-8 overflow-hidden relative">
                <img 
                  src={sec.image} 
                  alt={sec.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              <h3 className={`text-3xl font-serif font-black mb-8 ${sec.variant === 'yellow' ? 'text-black' : (sec.variant === 'pink' ? 'text-[#6D1B2D]' : 'text-gold')}`}>
                {sec.title}
              </h3>
              
              <div className="space-y-6 flex-grow">
                {sec.items.map((item, j) => (
                  <motion.div 
                    key={j} 
                    className="flex flex-col gap-1 p-3 -m-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group/item"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="text-sm font-black uppercase leading-tight tracking-tight group-hover/item:text-gold transition-colors">{item.name}</h4>
                      <span className="font-serif italic font-black text-lg whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-[10px] font-bold opacity-60 leading-none group-hover/item:opacity-100 transition-opacity">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </PlasticCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection: React.FC = () => {
  const position = { lat: 6.1725, lng: 1.2211 }; // Approximate location for Station Zener area
  
  if (!hasValidMapsKey) {
    return (
      <section className="py-24 px-6 bg-paper text-black">
        <div className="max-w-6xl mx-auto plastic-black p-12 rounded-[50px] text-white text-center">
          <MapPin className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-black mb-4">Google Maps API Key Required</h2>
          <p className="mb-6 opacity-70">Pour afficher la carte interactive, veuillez configurer votre clé API Google Maps.</p>
          <div className="text-left max-w-sm mx-auto space-y-4 text-sm bg-white/5 p-6 rounded-2xl border border-white/10">
            <p><strong>Étape 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-gold underline">Obtenir une clé API</a></p>
            <p><strong>Étape 2:</strong> Ajouter la clé en tant que secret :</p>
            <ul className="list-disc pl-5 space-y-1 opacity-70">
              <li>Ouvrez les Paramètres (⚙️)</li>
              <li>Secrets → Ajouter <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
              <li>Collez votre clé et validez</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plan" className="py-24 px-6 bg-paper text-black relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
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
                        <p className="text-sm font-bold">12:00 — 23:00</p>
                     </div>
                  </div>
               </PlasticCard>
               
               <a 
                 href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 w-full py-4 text-[10px] font-black uppercase tracking-widest border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
               >
                 Ouvrir dans Google Maps <ChevronRight className="w-4 h-4" />
               </a>
             </div>
          </div>
          
          <div className="lg:w-2/3 w-full h-[500px] rounded-[60px] overflow-hidden border-[12px] border-white shadow-3xl relative">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY} version="weekly">
              <Map
                defaultCenter={position}
                defaultZoom={15}
                mapId="AUREL_RES_MAP"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
              >
                <AdvancedMarker position={position} title="Restaurant Aurel">
                  <Pin background="#C5A059" borderColor="#000" glyphColor="#000" />
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState("accueil");

  return (
    <div className="bg-bordeaux min-h-screen">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <AnimatePresence mode="wait" initial={false}>
        {activePage === "accueil" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HomePage onNavigate={() => setActivePage("carte")} />
            <MapSection />
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

      <footer className="py-12 border-t border-white/5 mx-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <Instagram className="w-5 h-5 text-white/30 hover:text-gold transition-colors cursor-pointer" />
            <Facebook className="w-5 h-5 text-white/30 hover:text-gold transition-colors cursor-pointer" />
          </div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
            © 2026 Restaurant Aurel • Lomé, Togo — Route de 50 (Station Zener)
          </p>
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
            Ouvert Mercredi — Dimanche
          </div>
        </div>
      </footer>
    </div>
  );
}
