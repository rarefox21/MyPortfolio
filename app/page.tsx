"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
const MotionButton = motion(Button)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Github,
  Mail,
  Phone,
  MapPin,
  Download,
  Code,
  Database,
  Brain,
  Briefcase,
  Star,
  ChevronDown,
  Moon,
  Sun,
  ArrowRight,
  Calendar,
  Users,
  Zap,
  Target,
  Globe,
  BookOpen,
  Trophy,
  Rocket,
  User,
} from "lucide-react"
import portfolioData from "@/data/portfolio-data.json"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    setIsClient(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen newspaper-bg ${isDarkMode ? "dark" : ""}`}>
      {/* Print Registration Marks */}
      <div className="registration-marks" />

      {/* Breaking News Ticker */}
      <div className="breaking-news fixed top-0 left-0 right-0 z-50 py-2">
        <div className="ticker-content byline-font">
          🔥 PORTFOLIO ALERT: Abrar Mubeen - Software Engineering Prodigy Available for Internship • 3.91 CGPA • 400+
          Users Served • 14 Kaggle Badges • Full-Stack Developer Extraordinaire 🔥
        </div>
      </div>

      {/* Navigation - Newspaper Masthead Style */}
      <motion.nav
        className="fixed top-10 left-0 right-0 z-40 masthead newspaper-card backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="headline-font text-4xl font-black text-black dark:text-white tracking-tight">
                ABRAR MUBEEN
              </div>
              <div className="byline-font text-xs text-black/70 dark:text-white/70 mt-1">
                EST. 2025 • PORTFOLIO EDITION • VOL. 1, NO. 1
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-sm font-bold byline-font transition-all duration-300 hover:text-black dark:hover:text-white ${
                    activeSection === item.toLowerCase()
                      ? "text-black dark:text-white"
                      : "text-black/70 dark:text-white/70"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -1 }}
                >
                  {item.toUpperCase()}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-black dark:bg-white"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div className="flex items-center space-x-4">
              <div className="edition-info px-3 py-1 text-xs byline-font">
                {isClient ? (
                  <>
                    <div className="text-black dark:text-white font-bold">{currentTime.toLocaleDateString()}</div>
                    <div className="text-black/70 dark:text-white/70">{currentTime.toLocaleTimeString()}</div>
                  </>
                ) : (
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                )}
              </div>
              <MotionButton
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="newspaper-card hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div initial={false} animate={{ rotate: isDarkMode ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </MotionButton>
              <MotionButton
                className="newspaper-card bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 byline-font"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="mr-2 h-4 w-4" />
                GET RESUME
              </MotionButton>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Front Page */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-40"
      >
        {/* Newspaper Background Pattern */}
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="absolute inset-0 print-lines opacity-10" />

        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Story - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-8 column-divider"
            >
              {/* Breaking News Badge */}
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Badge className="bg-red-600 text-white px-4 py-2 text-lg font-bold news-flash byline-font">
                  🚨 AVAILABLE FOR INTERNSHIP
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="headline-font text-6xl md:text-8xl font-black mb-6 leading-none text-black dark:text-white ink-bleed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span
                  className="typewriter inline-block"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 2 }}
                >
                  CODING PRODIGY
                </motion.span>
                <br />
                <motion.span
                  className="slide-in-right"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  TAKES TECH WORLD
                </motion.span>
                <br />
                <motion.span
                  className="zoom-in text-red-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                >
                  BY STORM
                </motion.span>
              </motion.h1>

              {/* Byline */}
              <motion.div
                className="byline-font text-black/70 dark:text-white/70 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <span>BY TECH REPORTER</span>
                  <span>•</span>
                  <span>{isClient ? currentTime.toLocaleDateString() : <Skeleton className="h-4 w-24 inline-block" />}</span>
                  <span>•</span>
                  <span>EXCLUSIVE</span>
                </div>
                <div className="byline-divider" />
              </motion.div>

              {/* Lead Paragraph with Drop Cap */}
              <motion.div
                className="body-font text-lg leading-relaxed text-black dark:text-white mb-8 article-box p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
              >
                <span className="drop-cap headline-font">A</span>
                <span className="fade-in-up">
                  brar Mubeen, a Software Engineering student at Islamic University of Technology, has emerged as one of
                  the most promising talents in the tech industry. With an outstanding CGPA of 3.91/4.00 and a portfolio
                  that spans full-stack development, data science, and competitive programming, this young developer is
                  making waves across multiple platforms.
                </span>
              </motion.div>

              {/* Key Stats - Newspaper Style */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 0.8 }}
              >
                {[
                  { label: "CGPA", value: "3.91/4.00", icon: "🎓" },
                  { label: "USERS SERVED", value: "400+", icon: "👥" },
                  { label: "KAGGLE BADGES", value: "14", icon: "🏆" },
                  { label: "PROBLEMS SOLVED", value: "215+", icon: "💻" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="newspaper-card p-4 text-center ink-drop"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 4.2 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="headline-font text-2xl font-black text-black dark:text-white">{stat.value}</div>
                    <div className="byline-font text-xs text-black/70 dark:text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.8, duration: 0.8 }}
              >
                <MotionButton
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="group newspaper-card bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white px-8 py-4 text-lg byline-font transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  READ FULL STORY
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </MotionButton>
                <MotionButton
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg newspaper-card border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black byline-font transition-all duration-300 bg-transparent"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  DOWNLOAD RESUME
                </MotionButton>
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.2, duration: 0.8 }}
              >
                {[
                  { icon: Github, href: portfolioData.personal.github, label: "GITHUB" },
                  { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "EMAIL" },
                  { icon: Phone, href: `tel:${portfolioData.personal.phone}`, label: "PHONE" },
                  { icon: Globe, href: "#", label: "WEBSITE" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="flex flex-col items-center p-3 newspaper-card hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.4 + index * 0.1 }}
                  >
                    <social.icon className="h-6 w-6 mb-1" />
                    <span className="text-xs byline-font">{social.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Sidebar - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Photo with Caption */}
              <motion.div
                className="newspaper-card p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative mb-4">
                  <motion.img
                    src="/images/abrar-photo.jpg"
                    alt="Abrar Mubeen - Professional Photo"
                    className="w-full h-80 object-cover newspaper-photo"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2">
                    <div className="byline-font text-xs">
                      {/* ABRAR MUBEEN poses with his latest project at IUT campus. Photo: Staff Photographer */}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Weather Box */}
              <motion.div
                className="weather-box p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <div className="headline-font text-lg font-bold mb-2">TODAY'S FORECAST</div>
                <div className="body-font text-sm">
                  <div className="flex justify-between items-center">
                    <span>Coding Weather:</span>
                    <span className="font-bold">☀️ PERFECT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Productivity:</span>
                    <span className="font-bold">📈 HIGH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bug Chance:</span>
                    <span className="font-bold">🐛 LOW</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Facts */}
              <motion.div
                className="classified-ad p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="headline-font text-lg font-bold mb-3">QUICK FACTS</div>
                <div className="space-y-2 body-font text-sm">
                  <div>📍 Location: {portfolioData.personal.location}</div>
                  <div>🎓 Institution: Islamic University of Technology</div>
                  <div>💼 Status: Available for Internship</div>
                  <div>🏆 Specialties: Full-Stack, Data Science, AI</div>
                  <div>⚡ Languages: Python, Java, JavaScript, PHP</div>
                </div>
              </motion.div>

              {/* Stock Ticker Style */}
              <motion.div
                className="stock-ticker p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="ticker-content text-sm">
                  ABRAR STOCK: ↗️ +400% • SKILLS: ↗️ +215% • PROJECTS: ↗️ +100% • REPUTATION: ↗️ +∞%
                </div>
              </motion.div>

              {/* Mini Comic Strip */}
              <motion.div
                className="comic-strip"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
              >
                <div className="comic-panel flex items-center justify-center text-2xl">💡</div>
                <div className="comic-panel flex items-center justify-center text-2xl">💻</div>
                <div className="comic-panel flex items-center justify-center text-2xl">🚀</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          style={{ opacity }}
        >
          <div className="flex flex-col items-center space-y-2 newspaper-card px-4 py-2">
            <span className="text-sm byline-font">CONTINUE READING</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section - Feature Article */}
      <section id="about" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <User className="w-4 h-4 mr-2" />
              FEATURE STORY
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              THE MAN BEHIND
              <br />
              <span className="pulse-text">THE CODE</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8 column-divider"
            >
              <div className="article-box p-8">
                <div className="body-font text-lg leading-relaxed text-black dark:text-white space-y-6">
                  <p>
                    <span className="drop-cap headline-font">I</span>n an exclusive interview, Abrar Mubeen reveals the
                    passion and dedication that drives his remarkable journey in software engineering. "Technology isn't
                    just my career path," he explains, "it's my way of solving real-world problems and making a
                    meaningful impact."
                  </p>
                  <p>
                    His impressive track record speaks volumes: applications serving over 400 users, 14 Kaggle badges
                    demonstrating his data science prowess, and 215+ competitive programming problems solved. But behind
                    these numbers lies a story of relentless pursuit of excellence.
                  </p>
                  <p>
                    "Every project teaches me something new," Mubeen reflects. "Whether it's building scalable web
                    applications with Laravel and React, diving deep into machine learning with TensorFlow, or
                    optimizing algorithms for competitive programming, I approach each challenge with curiosity and
                    determination."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-6 newspaper-card">
                    <div className="text-3xl font-black headline-font text-black dark:text-white"></div>
                    <div className="text-sm byline-font text-black/70 dark:text-white/70"></div>
                  </div>
                  <div className="text-center p-6 newspaper-card">
                    <div className="text-3xl font-black headline-font text-black dark:text-white">400+</div>
                    <div className="text-sm byline-font text-black/70 dark:text-white/70">USERS SERVED</div>
                  </div>
                  <div className="text-center p-6 newspaper-card">
                    <div className="text-3xl font-black headline-font text-black dark:text-white">14</div>
                    <div className="text-sm byline-font text-black/70 dark:text-white/70">KAGGLE BADGES</div>
                  </div>
                  <div className="text-center p-6 newspaper-card">
                    <div className="text-3xl font-black headline-font text-black dark:text-white">215+</div>
                    <div className="text-sm byline-font text-black/70 dark:text-white/70">PROBLEMS SOLVED</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              {[
                {
                  icon: Code,
                  title: "FULL-STACK MASTERY",
                  description: "Laravel, React, Django, Spring Boot",
                  emoji: "💻",
                },
                {
                  icon: Brain,
                  title: "AI & DATA SCIENCE",
                  description: "TensorFlow, Keras, 14 Kaggle Badges",
                  emoji: "🧠",
                },
                {
                  icon: Trophy,
                  title: "COMPETITIVE EDGE",
                  description: "215 Codeforces, 62 LeetCode",
                  emoji: "🏆",
                },
                {
                  icon: Users,
                  title: "LEADERSHIP SKILLS",
                  description: "Joint Secretary, Assistant Director",
                  emoji: "👥",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="newspaper-card p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{item.emoji}</div>
                    <div>
                      <h3 className="headline-font text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                  <p className="body-font text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Business News */}
      <section id="experience" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 print-lines opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <Briefcase className="w-4 h-4 mr-2" />
              BUSINESS SECTION
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              PROFESSIONAL
              <br />
              <span className="glitch">ACHIEVEMENTS</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto" />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-16 last:mb-0"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="newspaper-card p-6 text-center">
                      <Badge className="mb-4 bg-red-600 text-white byline-font">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </Badge>
                      <h3 className="headline-font text-2xl font-black text-black dark:text-white mb-2">{exp.title}</h3>
                      <p className="subheadline-font text-lg text-black dark:text-white font-bold mb-1">
                        {exp.company}
                      </p>
                      <p className="body-font text-black/70 dark:text-white/70">{exp.role}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-black/30 dark:bg-white/30"></div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <Card className="newspaper-card p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group">
                      <CardContent className="p-0">
                        <div className="space-y-6">
                          <ul className="space-y-4">
                            {exp.description.map((desc, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start body-font leading-relaxed"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <Zap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                {desc}
                              </motion.li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-3">
                            {exp.technologies.map((tech, i) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="px-3 py-1 newspaper-card border border-black dark:border-white byline-font"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>

                          {exp.liveUrl && (
                            <motion.a
                              href={`https://${exp.liveUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center font-bold group-hover:translate-x-1 transition-all duration-300 byline-font"
                              whileHover={{ x: 3 }}
                            >
                              <Globe className="h-5 w-5 mr-2" />
                              VIEW LIVE PROJECT
                              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Technology News */}
      <section id="projects" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <Rocket className="w-4 h-4 mr-2" />
              TECHNOLOGY SECTION
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              PROJECT
              <br />
              <span className="shake">PORTFOLIO</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8" />
            <p className="subheadline-font text-xl text-black dark:text-white max-w-3xl mx-auto">
              Revolutionary solutions transforming the digital landscape
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-16 newspaper-card p-2">
                {["all", "Web Development", "Data Science", "Library Development"].map((tab, index) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-6 py-3 text-sm font-bold byline-font transition-all duration-300 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
                  >
                    {tab === "all" ? "ALL" : tab.split(" ")[0].toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </TabsContent>

            {["Web Development", "Data Science", "Library Development"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.projects
                    .filter((project) => project.category === category)
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Skills Section - Sports Section Style */}
      <section id="skills" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 print-lines opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <Target className="w-4 h-4 mr-2" />
              SPORTS SECTION
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              TECHNICAL
              <br />
              <span className="rotate-news">SKILLS</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "LANGUAGES",
                icon: Code,
                skills: portfolioData.skills.languages,
                emoji: "💻",
              },
              {
                title: "FRAMEWORKS",
                icon: Zap,
                skills: portfolioData.skills.frameworks,
                emoji: "⚡",
              },
              {
                title: "DATABASES",
                icon: Database,
                skills: portfolioData.skills.databases,
                emoji: "🗄️",
              },
              {
                title: "DATA SCIENCE",
                icon: Brain,
                skills: portfolioData.skills.dataScience,
                emoji: "🧠",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full newspaper-card p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group-hover:scale-102">
                  <CardHeader className="pb-6">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{category.emoji}</div>
                      <div>
                        <CardTitle className="headline-font text-2xl font-black">{category.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-between p-3 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                        >
                          <span className="font-bold body-font">{skill}</span>
                          <div className="w-2 h-2 bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black"></div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section - Academic News */}
      <section id="education" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <BookOpen className="w-4 h-4 mr-2" />
              EDUCATION SECTION
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              ACADEMIC
              <br />
              <span className="paper-fold">EXCELLENCE</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="newspaper-card p-10">
                <CardHeader className="pb-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🎓</div>
                    <div>
                      <CardTitle className="headline-font text-2xl font-black text-black dark:text-white">
                        {portfolioData.education.degree}
                      </CardTitle>
                      <CardDescription className="subheadline-font text-lg text-black dark:text-white font-bold">
                        {portfolioData.education.institution}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 border-2 border-black dark:border-white">
                        <div className="headline-font text-3xl font-black text-black dark:text-white mb-2">
                          {portfolioData.education.cgpa}
                        </div>
                        <div className="byline-font text-sm text-black/70 dark:text-white/70">Current CGPA</div>
                      </div>
                      <div className="text-center p-6 border-2 border-black dark:border-white">
                        <div className="headline-font text-3xl font-black text-black dark:text-white mb-2">6th</div>
                        <div className="byline-font text-sm text-black/70 dark:text-white/70">SEMESTER</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="headline-font text-xl font-black text-black dark:text-white mb-4">
                        NOTABLE COURSES
                      </h4>
                      <div className="grid gap-3">
                        {portfolioData.education.notableCourses.map((course, index) => (
                          <motion.div
                            key={course}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="flex items-center p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                          >
                            <div className="w-3 h-3 bg-black dark:bg-white mr-4"></div>
                            <span className="body-font font-bold">{course}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="newspaper-card p-8">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center headline-font text-2xl font-black text-black dark:text-white">
                    <Trophy className="h-8 w-8 mr-3" />
                    ACHIEVEMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                      >
                        <Star className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="body-font">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="newspaper-card p-8">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center headline-font text-2xl font-black text-black dark:text-white">
                    <Users className="h-8 w-8 mr-3" />
                    LEADERSHIP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.extracurricular.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                      >
                        <div className="w-3 h-3 bg-black dark:bg-white mr-4 mt-2 flex-shrink-0"></div>
                        <span className="body-font">{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Classified Ads */}
      <section id="contact" className="py-32 newspaper-bg relative overflow-hidden">
        <div className="absolute inset-0 print-lines opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 px-4 py-2 bg-black text-white byline-font">
              <Mail className="w-4 h-4 mr-2" />
              CLASSIFIED ADS
            </Badge>
            <h2 className="headline-font text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
              GET IN
              <br />
              <span className="printing-effect">TOUCH</span>
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8" />
            <p className="subheadline-font text-xl text-black dark:text-white max-w-3xl mx-auto">
              Ready to make headlines together? Contact the newsroom for exclusive interviews and collaborations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: Mail,
                  title: "EMAIL",
                  value: portfolioData.personal.email,
                  href: `mailto:${portfolioData.personal.email}`,
                  emoji: "📧",
                },
                {
                  icon: Phone,
                  title: "PHONE",
                  value: portfolioData.personal.phone,
                  href: `tel:${portfolioData.personal.phone}`,
                  emoji: "📞",
                },
                {
                  icon: MapPin,
                  title: "LOCATION",
                  value: portfolioData.personal.location,
                  href: "#",
                  emoji: "📍",
                },
                {
                  icon: Github,
                  title: "GITHUB",
                  value: "github.com/rarefox21",
                  href: portfolioData.personal.github,
                  emoji: "💻",
                },
              ].map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center p-8 newspaper-card hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  <div className="text-4xl mr-6">{contact.emoji}</div>
                  <div className="flex-1">
                    <h3 className="headline-font text-xl font-black mb-2">{contact.title}</h3>
                    <p className="body-font group-hover:font-bold transition-all">{contact.value}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 ml-auto group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="newspaper-card p-10">
                <CardHeader className="pb-8">
                  <CardTitle className="headline-font text-3xl font-black text-black dark:text-white">
                    SEND MESSAGE
                  </CardTitle>
                  <CardDescription className="body-font text-lg text-black dark:text-white">
                    Submit your story pitch - responses within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Newspaper Footer */}
      <footer className="py-12 bg-black dark:bg-white text-white dark:text-black relative overflow-hidden">
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="headline-font text-2xl font-black mb-4">THE ABRAR TIMES</h3>
              <p className="body-font max-w-2xl mx-auto">
                "All the code that's fit to print" - Delivering exceptional software solutions since 2025
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-8 mb-8"
            >
              {[
                { icon: Github, href: portfolioData.personal.github, label: "GITHUB" },
                { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "EMAIL" },
                { icon: Phone, href: `tel:${portfolioData.personal.phone}`, label: "PHONE" },
                { icon: Globe, href: "#", label: "WEBSITE" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="flex flex-col items-center p-3 border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs byline-font">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="border-t border-white/30 dark:border-black/30 pt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm byline-font">
                <div>© 2025 THE ABRAR TIMES</div>
                <div>ALL RIGHTS RESERVED</div>
                <div>PORTFOLIO EDITION</div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Enhanced Project Card Component - Newspaper Style
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full newspaper-card hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group-hover:scale-102 overflow-hidden">
        <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💻</div>
              {project.featured && (
                <Badge className="bg-red-600 text-white border-0 byline-font">
                  <Star className="w-3 h-3 mr-1" />
                  FEATURED
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="border-black dark:border-white text-black dark:text-white byline-font">
              {project.category.split(" ")[0].toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="headline-font text-xl font-black text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <p className="body-font mb-6 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech: string, i: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="px-3 py-1 border border-black dark:border-white byline-font">
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="px-3 py-1 border border-black dark:border-white byline-font">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              {project.liveUrl && (
                <motion.a
                  href={`https://${project.liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-bold text-sm group-hover:translate-x-1 transition-all duration-300 byline-font"
                  whileHover={{ x: 2 }}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  LIVE DEMO
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-bold text-sm group-hover:translate-x-1 transition-all duration-300 byline-font"
                  whileHover={{ x: 2 }}
                >
                  <Github className="h-4 w-4 mr-2" />
                  CODE
                </motion.a>
              )}
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Contact Form Component - Newspaper Style
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold byline-font text-black dark:text-white mb-2">
            FULL NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-black dark:border-white focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-all duration-300 body-font"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold byline-font text-black dark:text-white mb-2">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-black dark:border-white focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-all duration-300 body-font"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold byline-font text-black dark:text-white mb-2">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border-2 border-black dark:border-white focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-all duration-300 resize-none body-font"
          placeholder="Tell me about your project or just say hello..."
        />
      </div>

      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border-2 border-green-600 bg-green-50 text-green-800 byline-font"
          >
            ✅ MESSAGE SENT SUCCESSFULLY! I'll get back to you soon.
          </motion.div>
        )}
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border-2 border-red-600 bg-red-50 text-red-800 byline-font"
          >
            ❌ SOMETHING WENT WRONG. Please try again or email me directly.
          </motion.div>
        )}
      </AnimatePresence>

      <MotionButton
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-lg newspaper-card bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed byline-font"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            SENDING...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            SEND MESSAGE
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </MotionButton>
    </form>
  )
}
