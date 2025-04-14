import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Home() {
  // Infinite scroll setup
  const scrollContainerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const duration = 25; // Faster scroll (reduced from 40)

    const animateScroll = async () => {
      await controls.start({
        x: [0, -scrollWidth / 2],
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

  return (
    <div className="min-h-screen bg-black text-white font-sans leading-relaxed tracking-wide">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 uppercase tracking-tight hover:text-gray-300 transition-colors duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            CrimeWise
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 mb-12 hover:text-white transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Precision intelligence for predictive safety. Built for scale, designed with purpose.
          </motion.p>
          <div className="flex justify-center gap-4">
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
          </div>
        </div>
      </section>

      {/* Brutalist Info Section */}
      <section className="py-32 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto space-y-16">
          {[
            {
              title: 'Real-Time Monitoring',
              desc: 'Live data streams integrated with field operations to maintain immediate situational awareness.',
            },
            {
              title: 'Pattern Detection',
              desc: 'Identify behavior-based anomalies before events unfold. Trained on global datasets.',
            },
            {
              title: 'Secure Evidence Ledger',
              desc: 'Immutable audit trails. Military-grade encryption. Zero tolerance for tampering.',
            },
            {
              title: 'Multi-Agency Collaboration',
              desc: 'Seamless syncing of jurisdictional intelligence, permissions, and alerts.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <h3 className="text-3xl font-bold uppercase mb-2 group-hover:text-gray-300 transition duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white max-w-4xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 border-t border-neutral-800 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold uppercase mb-8 hover:text-gray-300 transition">
            Ready to deploy CrimeWise?
          </h2>
          <p className="text-gray-400 mb-12 hover:text-white transition">
            Get early access to the tactical toolkit redefining public safety ops.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition uppercase text-sm"
            >
              Request Access
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scroll Section with Enhanced Radial Animation */}
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
          {[
            {
              title: 'Geo Crime Heatmaps',
              desc: 'Visualize high-risk zones based on historical and real-time data feeds.',
            },
            {
              title: 'Suspect Behavior Tracker',
              desc: 'Tracks anomalies in behavior patterns and flags repeat offenders.',
            },
            {
              title: 'Facial Recognition Logs',
              desc: 'Aggregates recognition hits across surveillance networks.',
            },
            {
              title: 'Live Case Sync',
              desc: 'Collaborate across departments on active investigations in real-time.',
            },
            {
              title: 'Secure Evidence Vault',
              desc: 'Blockchain-based evidence storage with access audit trails.',
            },
            {
              title: 'Crowdsourced Intel',
              desc: 'Tap into community-submitted reports with AI-powered filtering.',
            },
            {
              title: 'Fleet Monitoring',
              desc: 'Live updates from field drones, body cams, and patrol vehicles.',
            },
            {
              title: 'Predictive Dispatch',
              desc: 'Sends patrols preemptively to likely future crime zones.',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
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
                  duration: 6, // Faster animation
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
          ))}
          
          {/* Duplicate cards for seamless looping */}
          {[
            {
              title: 'Geo Crime Heatmaps',
              desc: 'Visualize high-risk zones based on historical and real-time data feeds.',
            },
            {
              title: 'Suspect Behavior Tracker',
              desc: 'Tracks anomalies in behavior patterns and flags repeat offenders.',
            },
            {
              title: 'Facial Recognition Logs',
              desc: 'Aggregates recognition hits across surveillance networks.',
            },
            {
              title: 'Live Case Sync',
              desc: 'Collaborate across departments on active investigations in real-time.',
            },
          ].map((card, i) => (
            <motion.div
              key={`duplicate-${i}`}
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
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 group-hover:animate-pulse pointer-events-none"></div>
              
              <h4 className="text-xl font-bold mb-3 uppercase hover:text-gray-300 transition relative z-10">
                {card.title}
              </h4>
              <p className="text-gray-400 hover:text-white transition relative z-10">
                {card.desc}
              </p>
            </motion.div>
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
            What agencies are saying
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