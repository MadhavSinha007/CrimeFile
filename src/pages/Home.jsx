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

    const scrollWidth = scrollContainer.scrollWidth / 2;
    const duration = 20; // Faster scroll speed

    const animateScroll = async () => {
      await controls.set({ x: 0 });
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

  // Card data - unchanged
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
    <div className="min-h-screen bg-black text-white font-sans leading-relaxed tracking-wide overflow-x-hidden">
      {/* Modern Hero Section - Enhanced dimensions */}
      <section 
        ref={heroRef}
        className="min-h-[110vh] flex items-center justify-center px-6 pt-24 text-center relative overflow-hidden"
      >
        {/* Enhanced 3D Grid Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={`horizontal-${i}`}
                className="absolute left-0 right-0 h-[0.5px] bg-blue-500/15"
                style={{ top: `${(i + 1) * 4}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: isHeroInView ? 1 : 0,
                  opacity: isHeroInView ? 0.8 : 0,
                }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={`vertical-${i}`}
                className="absolute top-0 bottom-0 w-[0.5px] bg-blue-500/15"
                style={{ left: `${(i + 1) * 4}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: isHeroInView ? 1 : 0,
                  opacity: isHeroInView ? 0.8 : 0,
                }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* More pronounced ambient glow */}
        <motion.div 
          className="absolute pointer-events-none inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle 500px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(100, 200, 255, 0.4), transparent 70%)`,
          }}
          animate={{
            opacity: hasInteracted ? 0.8 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* More dynamic title animation */}
          <div className="overflow-hidden mb-8">
            <motion.div
              className="flex justify-center flex-wrap"
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  className="text-7xl md:text-8xl font-bold uppercase tracking-tighter inline-block relative mx-1 md:mx-2"
                  whileHover={{ 
                    scale: 1.3,
                    y: -10,
                    color: "#ffffff",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500,
                    damping: 15
                  }}
                >
                  {char}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          {/* Enhanced text animation */}
          <motion.p
            className="text-2xl text-gray-300 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
          >
            A Place to view and analyze crime data in real-time.
          </motion.p>
          
          {/* Buttons with enhanced animations */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/search"
                className="px-10 py-5 border-2 border-gray-600 hover:border-white rounded-sm hover:bg-white/5 transition-all uppercase text-sm tracking-widest flex items-center justify-center min-w-[200px]"
              >
                Launch Scan
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to="/login"
                className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-sm transition-all uppercase text-sm tracking-widest flex items-center justify-center min-w-[200px] font-medium"
              >
                Agent Access
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Enhanced decorative elements */}
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className="w-8 h-1 bg-white rounded-full"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scaleX: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tactical Features Section - Enhanced */}
      <section className="py-36 px-6 border-t border-gray-800 bg-black/60 relative overflow-hidden">
        {/* More refined grid background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[length:120px_120px] bg-[linear-gradient(to_right,gray_0.5px,transparent_0.5px),linear-gradient(to_bottom,gray_0.5px,transparent_0.5px)]">
            <motion.div
              className="absolute inset-0 bg-[length:120px_120px]"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl font-bold uppercase mb-6 text-white tracking-tight">
              TACTICAL OPERATIONS ON THIS PLATFORM
            </h2>
            <p className="text-gray-300 max-w-4xl mx-auto text-lg">
              Advanced tools designed for modern needs. From real-time monitoring to secure evidence management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: 'REAL-TIME DATA SEARCH',
                desc: 'Search and analyze data from the mysql database in real-time.',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
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
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
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
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
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
                  <svg viewBox="0 0 24 24" className="w-10 h-10">
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 15px 40px -10px rgba(255, 255, 255, 0.15)'
                }}
                className="group relative p-10 border-2 border-gray-800 hover:border-gray-600 bg-gradient-to-b from-black/70 to-black/30 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-700 pointer-events-none"></div>
                
                <motion.div 
                  className="text-gray-400 group-hover:text-white mb-8 transition-colors duration-500"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                
                <div className="relative inline-block mb-6">
                  <h3 className="text-2xl font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-white"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 text-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-40 px-6 border-t border-neutral-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl font-bold uppercase mb-10 hover:text-gray-300 transition-colors duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Identify the criminal based on their face.
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-16 hover:text-white transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get early access to the tactical toolkit redefining public safety—powered by advanced AI search with the Gemini API. Upload a criminal's face and receive a detailed report instantly"
          </motion.p>
          <motion.div 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              to="/aisearch"
              className="inline-block px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest font-medium"
            >
              Search Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scroll Section - Enhanced */}
      <section className="py-32 px-6 border-t border-neutral-800 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_10%,_rgba(0,0,0,0)_90%,_rgba(0,0,0,0.8)_100%)] z-10"></div>
        </div>
        
        <motion.div 
          ref={scrollContainerRef}
          animate={controls}
          className="flex gap-10 w-max py-5"
        >
          {featureCards.map((card, i) => (
            <FeatureCard key={`original-${i}`} card={card} />
          ))}
          
          {featureCards.map((card, i) => (
            <FeatureCard key={`duplicate-${i}`} card={card} />
          ))}
        </motion.div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-40 px-6 border-t border-neutral-800 bg-black/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[length:60px_60px] bg-[linear-gradient(to_right,gray_0.5px,transparent_0.5px),linear-gradient(to_bottom,gray_0.5px,transparent_0.5px)]">
            <motion.div
              className="absolute inset-0 bg-[length:60px_60px]"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-5xl font-bold uppercase mb-20 hover:text-gray-300 transition-colors duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What our developer says
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
            {[
              {
                quote: 'I loved working on this—creating the database, integrating AI, implementing authentication, and solving the challenges I faced along the way. It was a great experience.',
                name: 'Madhav Sinha',
                org: 'Computer Science Student ar SRM RAMAPURAM CHENNI',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="p-10 bg-black/80 border-2 border-neutral-700 hover:border-white transition-colors duration-500 text-left relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 15px 40px -10px rgba(255, 255, 255, 0.15)'
                }}
              >
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8 relative z-10 leading-relaxed"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-6xl absolute -left-4 -top-6 text-white/10 group-hover:text-white/20 transition-colors duration-500">"</span>
                  {t.quote}
                  <span className="text-6xl absolute -right-4 -bottom-6 text-white/10 group-hover:text-white/20 transition-colors duration-500">"</span>
                </motion.p>
                <motion.p 
                  className="text-sm uppercase text-gray-500 relative z-10 tracking-widest"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
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

// Enhanced Feature Card Component
const FeatureCard = ({ card }) => (
  <motion.div
    whileHover={{ 
      y: -20, 
      scale: 1.1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 12,
        mass: 0.7
      }
    }}
    className="relative w-[22rem] min-w-[22rem] p-8 bg-black border-2 border-neutral-700 hover:border-white transition-all duration-500 overflow-hidden group"
  >
    <motion.div
      className="absolute inset-0 opacity-40 pointer-events-none"
      initial={{ 
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
        x: '-50%',
        y: '-50%',
        scale: 1.5
      }}
      animate={{
        x: ['-50%', '150%', '150%', '-50%', '-50%'],
        y: ['-50%', '-50%', '150%', '150%', '-50%'],
        scale: [1.5, 2, 1.5, 1.2, 1.5]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 group-hover:animate-pulse pointer-events-none"></div>
    
    <h4 className="text-2xl font-bold mb-4 uppercase hover:text-white transition-colors duration-300 relative z-10">
      {card.title}
    </h4>
    <p className="text-gray-400 hover:text-gray-200 transition-colors duration-500 relative z-10 text-lg">
      {card.desc}
    </p>
  </motion.div>
);