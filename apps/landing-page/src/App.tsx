import { motion } from 'framer-motion'
import { Button } from '@mono/ui'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Portfolio
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <a href="/">Home</a>
            </Button>
            <Button asChild>
              <a href="#contact">Contact</a>
            </Button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="animate-float mb-8"
          >
            <span className="text-8xl">👋</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
          >
            Welcome to My Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-10"
          >
            I build beautiful, functional web applications with modern technologies.
            Explore my projects below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <a href="/">View All Projects</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/dashboard">Dashboard Demo</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What I Do
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: '🎨',
              title: 'Frontend Development',
              description: 'Building responsive and interactive user interfaces',
            },
            {
              icon: '⚡',
              title: 'Performance',
              description: 'Optimizing for speed and excellent user experience',
            },
            {
              icon: '🎯',
              title: 'Clean Code',
              description: 'Writing maintainable and scalable code',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur border border-white/20 hover:border-purple-400/50 transition-colors"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-10 text-center text-muted-foreground">
        <p>Built with Vite, React, Framer Motion, and Tailwind CSS</p>
      </footer>
    </div>
  )
}
