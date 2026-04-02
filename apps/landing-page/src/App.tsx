import { motion } from 'framer-motion'
import { Button, IDELayout } from '@mono/ui'

export default function LandingPage() {
  return (
    <IDELayout appName="Landing Page" activePath="/landing-page">
      <div className="flex flex-col min-h-full py-8 text-foreground font-mono">


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
            className="text-4xl font-bold mb-6 text-primary"
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
              <a href="https://vian-project.pages.dev">View All Projects</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://mono-repo-dashboard.pages.dev">Dashboard Demo</a>
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
              className="p-6 border border-border bg-card rounded-none"
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
    </IDELayout>
  )
}
