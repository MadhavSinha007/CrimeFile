import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  // Infinite scroll setup
  const scrollContainerRef = useRef(null);
  const controls = useAnimation();
  
  // Hero section refs and state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track mouse position for the hero section effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPosition({ x, y });
      if (!hasInteracted) setHasInteracted(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasInteracted]);

  // Observer for hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2; // We're duplicating all cards
    const duration = 25; // Scroll speed

    const animateScroll = async () => {
      // Reset to start position
      await controls.set({ x: 0 });
      // Animate to the end
      await controls.start({
        x: -scrollWidth,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };

    animateScroll();
  }, [controls]);

  // Card data - moved outside to reuse
  const featureCards = [
    {
      title: 'Dynamic Data Insights',
      desc: 'Dive into real-time crime data with advanced search capabilities.',
    },
    {
      title: 'Administrative Control Hub',
      desc: 'Effortlessly manage and update records through secure access.',
    },
    {
      title: 'Enhanced Data Security',
      desc: 'Access crime data securely, with robust privacy measures in place.',
    },
    {
      title: 'AI-Powered Face Recognition',
      desc: 'Identify suspects instantly with cutting-edge facial recognition.',
    },
    {
      title: 'Secure Evidence Repository',
      desc: 'Store and manage critical evidence with advanced access controls.',
    },
    {
      title: 'Collaborative Intelligence',
      desc: 'Utilize community reports enhanced by AI for actionable insights.',
    },
    {
      title: 'Live Fleet Operations',
      desc: 'Track and coordinate field units in real-time with precision.',
    },
    {
      title: 'Smart Crime Forecasting',
      desc: 'Predict and prevent incidents with data-driven dispatch strategies.',
    },
  ];

  // Characters for the animated title
  const titleChars = "C R I M E W I S E".split(" ");
  
  return (
    <div className="min-h-screen bg-black text-white font-sans leading-relaxed tracking-wide">
      {/* Modern Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 pt-20 text-center relative overflow-hidden"
      >
        {/* 3D Grid Background */}
        <div className="absolute inset-0 bg-black">
          {/* Animated grid lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`horizontal-${i}`}
                className="absolute left-0 right-0 h-px bg-blue-500/10"
                style={{ top: `${(i + 1) * 5}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: isHeroInView ? 1 : 0,
                  opacity: isHeroInView ? 1 : 0,
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`vertical-${i}`}
                className="absolute top-0 bottom-0 w-px bg-blue-500/10"
                style={{ left: `${(i + 1) * 5}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: isHeroInView ? 1 : 0,
                  opacity: isHeroInView ? 1 : 0,
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Ambient glow based on cursor position */}
        <motion.div 
          className="absolute pointer-events-none inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle 400px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 255, 255, 0.34), transparent 80%)`,
          }}
          animate={{
            opacity: hasInteracted ? 0.6 : 0
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Animated title with hover effect on each character */}
          <div className="overflow-hidden mb-6">
            <motion.div
              className="flex justify-center"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  className="text-6xl md:text-7xl font-bold uppercase tracking-tight inline-block relative"
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#ffffff",
                    textShadow: "0 0 15px rgba(0, 0, 0, 0)"
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {char}
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          {/* Simplified text section */}
          <motion.p
            className="text-xl text-gray-400 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A Place to view and analyze crime data in real-time.
          </motion.p>
          
          {/* Buttons with original styling from the second code but with motion effects */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="px-8 py-4 border border-gray-700 rounded-none hover:border-white transition uppercase text-sm"
              >
                Launch Scan
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-black rounded-none hover:bg-gray-200 transition uppercase text-sm"
              >
                Agent Access
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Visual decorative elements */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className="w-6 h-1 bg-white rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

    {/* Enhanced Tactical Features Section */}
<section className="py-32 px-6 border-t border-gray-800 bg-black/50 relative overflow-hidden">
  {/* Animated grid background */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="absolute inset-0 bg-[length:100px_100px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]">
      <motion.div
        className="absolute inset-0 bg-[length:100px_100px]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mb-20 text-center"
    >
      <h2 className="text-4xl font-bold uppercase mb-4 text-white">
        TACTICAL OPERATIONS ON THIS PLATFORM
      </h2>
      <p className="text-gray-400 max-w-3xl mx-auto">
        Advanced tools designed for modern needs. From real-time monitoring to secure evidence management.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          title: 'REAL-TIME DATA SEARCH',
          desc: 'Search and analyze data from the mysql database in real-time.',
          icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path 
                fill="currentColor" 
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              />
            </svg>
          )
        },
        {
          title: 'REAL-TIME ADMINISTRATION',
          desc: 'Manage data and update data in real-time direcelty through a secure login for .',
          icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path 
                fill="currentColor" 
                d="M16 17v-3h-3v-2h3V9h2v3h3v2h-3v3h-2zM2 7h5v2H4v6h3v2H2V7zm14 0h5v10h-5v-2h3V9h-3V7z"
              />
            </svg>
          )
        },
        {
          title: 'PRIVACY AND SECURITY',
          desc: 'No login required to access the data. All data is stored in a secure mysql database.',
          icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path 
                fill="currentColor" 
                d="M12 4c1.93 0 3.68.78 4.95 2.05l-1.41 1.41a5.022 5.022 0 0 0-7.08 0L7.05 6.05A6.976 6.976 0 0 1 12 4zm7.78-.78l-1.41 1.41C19.86 5.85 21 8.17 21 10.8V12h-2v-1.2c0-1.68-.6-3.22-1.59-4.42l1.41-1.41-1.41-1.41 1.41-1.41 1.41 1.41 1.41-1.41-1.41 1.41zM19 17v4h2v-4h-2zm-7 3c-1.93 0-3.68-.78-4.95-2.05l1.41-1.41a5.022 5.022 0 0 0 7.08 0l1.41 1.41A6.976 6.976 0 0 1 12 20z"
              />
            </svg>
          )
        },
        {
          title: 'ADVANCED AI FACIAL RECOGNITION',
          desc: 'Seamless recoginition of criminal faces when uploded in AISearch.',
          icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path 
                fill="currentColor" 
                d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"
              />
            </svg>
          )
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ 
            y: -5,
            boxShadow: '0 10px 30px -10px rgba(255, 255, 255, 0.1)'
          }}
          className="group relative p-8 border border-gray-800 hover:border-gray-600 bg-gradient-to-b from-black/50 to-black/20 transition-all duration-300 overflow-hidden"
        >
          {/* Hover effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Animated border - changed to white */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none"></div>
          
          {/* Icon - changed hover to white */}
          <motion.div 
            className="text-gray-400 group-hover:text-white mb-6 transition-colors duration-00"
            whileHover={{ scale: 1.1 }}
          >
            {item.icon}
          </motion.div>
          
          {/* Title with animated underline - changed to white */}
          <div className="relative inline-block mb-4">
            <h3 className="text-2xl font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-100">
              {item.title}
            </h3>
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
              viewport={{ once: true }}
            />
          </div>
          
          {/* Description */}
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Call to Action */}
      <section className="py-32 px-6 border-t border-neutral-800 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold uppercase mb-8 hover:text-gray-300 transition">
          Identify the criminal based on their face.
          </h2>
          <p className="text-gray-400 mb-12 hover:text-white transition">
          Get early access to the tactical toolkit redefining public safety—powered by advanced AI search with the Gemini API. Upload a criminal's face and receive a detailed report instantly"
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/aisearch"
              className="inline-block px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition uppercase text-sm"
            >
              Search Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scroll Section with Perfect Infinite Scroll */}
      <section className="py-24 px-6 border-t border-neutral-800 overflow-hidden relative">
        {/* Glow effect for the scroll section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20"></div>
        </div>
        
        <motion.div 
          ref={scrollContainerRef}
          animate={controls}
          className="flex gap-8 w-max"
        >
          {/* Original Cards */}
          {featureCards.map((card, i) => (
            <FeatureCard key={`original-${i}`} card={card} />
          ))}
          
          {/* Duplicate Cards - Exact copies for seamless looping */}
          {featureCards.map((card, i) => (
            <FeatureCard key={`duplicate-${i}`} card={card} />
          ))}
        </motion.div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 px-6 border-t border-neutral-800 bg-black/90 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]">
            <motion.div
              className="absolute inset-0 bg-[length:50px_50px]"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold uppercase mb-16 hover:text-gray-300 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What our developer says
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'CrimeWise transformed our situational response time. Absolutely game-changing.',
                name: 'Chief Alvarez',
                org: 'Metro PD',
              },
              {
                quote: 'The pattern recognition is uncannily accurate. Feels like science fiction.',
                name: 'Agent Lora',
                org: 'Interlinked Ops',
              },
              {
                quote: 'Secure, sleek, and surprisingly intuitive. Everything enforcement tech should be.',
                name: 'Lt. Bram',
                org: 'Coastal Surveillance Unit',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="p-8 bg-black/70 border-2 border-neutral-700 hover:border-white transition-colors duration-300 text-left relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Animated corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
                
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <motion.p 
                  className="text-lg text-gray-300 mb-6 relative z-10"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-5xl absolute -left-2 -top-4 text-white/10 group-hover:text-white/20 transition-colors">"</span>
                  {t.quote}
                  <span className="text-5xl absolute -right-2 -bottom-4 text-white/10 group-hover:text-white/20 transition-colors">"</span>
                </motion.p>
                <motion.p 
                  className="text-sm uppercase text-gray-500 relative z-10"
                  whileHover={{ x: 5 }}
                >
                  — {t.name}, <span className="text-gray-400">{t.org}</span>
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Extracted Feature Card Component for cleaner code
const FeatureCard = ({ card }) => (
  <motion.div
    whileHover={{ 
      y: -15, 
      scale: 1.08,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10,
        mass: 0.5
      }
    }}
    className="relative w-80 min-w-[20rem] p-6 bg-black border-2 border-neutral-700 hover:border-white transition-colors duration-300 overflow-hidden group"
  >
    {/* Enhanced radial gradient animation */}
    <motion.div
      className="absolute inset-0 opacity-30 pointer-events-none"
      initial={{ 
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
        x: '-50%',
        y: '-50%',
        scale: 1.5
      }}
      animate={{
        x: ['-50%', '150%', '150%', '-50%', '-50%'],
        y: ['-50%', '-50%', '150%', '150%', '-50%'],
        scale: [1.5, 1.8, 1.5, 1.2, 1.5]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    {/* Pulsing border effect on hover */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 group-hover:animate-pulse pointer-events-none"></div>
    
    <h4 className="text-xl font-bold mb-3 uppercase hover:text-gray-300 transition relative z-10">
      {card.title}
    </h4>
    <p className="text-gray-400 hover:text-white transition relative z-10">
      {card.desc}
    </p>
  </motion.div>
);