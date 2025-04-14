import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          {/* Copyright */}
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4 md:mb-0">
            © {new Date().getFullYear()} CRIMEWISE ANALYTICS
          </p>

          {/* Legal links */}
          <div className="flex space-x-6">
            <motion.a 
              href="/privacy" 
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="/terms" 
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="/contact" 
              className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-600 text-xxs uppercase tracking-widest max-w-3xl mx-auto"
        >
          This system contains law enforcement sensitive information. Unauthorized access is prohibited.
        </motion.p>
      </div>
    </footer>
  );
}