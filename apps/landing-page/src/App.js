import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Button } from '@mono/ui';
export default function LandingPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950", children: [_jsx("nav", { className: "container mx-auto px-6 py-6", children: _jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "flex items-center justify-between", children: [_jsx("div", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600", children: "Portfolio" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { variant: "ghost", asChild: true, children: _jsx("a", { href: "https://vian-project.pages.dev", children: "Home" }) }), _jsx(Button, { asChild: true, children: _jsx("a", { href: "#contact", children: "Contact" }) })] })] }) }), _jsx("section", { className: "container mx-auto px-6 py-20", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "animate-float mb-8", children: _jsx("span", { className: "text-8xl", children: "\uD83D\uDC4B" }) }), _jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600", children: "Welcome to My Portfolio" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "text-xl text-muted-foreground mb-10", children: "I build beautiful, functional web applications with modern technologies. Explore my projects below." }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "flex gap-4 justify-center", children: [_jsx(Button, { size: "lg", asChild: true, children: _jsx("a", { href: "https://vian-project.pages.dev", children: "View All Projects" }) }), _jsx(Button, { size: "lg", variant: "outline", asChild: true, children: _jsx("a", { href: "https://mono-repo-dashboard.pages.dev", children: "Dashboard Demo" }) })] })] }) }), _jsxs("section", { className: "container mx-auto px-6 py-20", children: [_jsx(motion.h2, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, className: "text-3xl font-bold text-center mb-12", children: "What I Do" }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
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
                        ].map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, viewport: { once: true }, className: "p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur border border-white/20 hover:border-purple-400/50 transition-colors", children: [_jsx("div", { className: "text-5xl mb-4", children: feature.icon }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.title }), _jsx("p", { className: "text-muted-foreground", children: feature.description })] }, feature.title))) })] }), _jsx("footer", { className: "container mx-auto px-6 py-10 text-center text-muted-foreground", children: _jsx("p", { children: "Built with Vite, React, Framer Motion, and Tailwind CSS" }) })] }));
}
