import { motion } from 'framer-motion';

export default function MethodsIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <h2 className="text-5xl font-light text-white/90">
              Four Distinct Approaches
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Our research employs multiple methods to capture Kerala&apos;s cultural landscape,
              each offering a unique lens into tradition and transformation.
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>

          {/* Right Column - Method Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                mode: "Form",
                desc: "Tangible expressions through artifacts and installations",
                icon: "🎨",
                color: "from-purple-500/20"
              },
              {
                mode: "Photo",
                desc: "Visual narratives of culture and community",
                icon: "📷",
                color: "from-blue-500/20"
              },
              {
                mode: "Audio",
                desc: "Sonic landscapes of tradition",
                icon: "🎵",
                color: "from-green-500/20"
              },
              {
                mode: "Video",
                desc: "Dynamic documentation of living heritage",
                icon: "🎥",
                color: "from-red-500/20"
              }
            ].map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${method.color} to-black/50 
                           backdrop-blur-sm border border-white/10 p-6 group hover:border-white/30 
                           transition-all duration-300`}
              >
                <span className="text-3xl mb-4 block">{method.icon}</span>
                <h3 className="text-lg font-light text-white/90 mb-2">{method.mode}</h3>
                <p className="text-sm text-white/60">{method.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
