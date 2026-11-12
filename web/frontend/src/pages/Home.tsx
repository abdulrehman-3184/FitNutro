import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import heroPhone from '../assets/hero-phone.png'
import modulesPhones from '../assets/modules-phones.png'
import productPhones from '../assets/product-phones.png'

const NAV = [
  ['Features', '#features'],
  ['Product', '#product'],
  ['Users', '#users'],
] as const

const STATS = [
  ['3', 'AI features'],
  ['1', 'Connected platform'],
  ['2', 'Platforms · web & mobile'],
] as const

const PROBLEMS = [
  ['activity', 'Fitness beginners often lack immediate feedback while performing exercises.'],
  ['clipboard', 'Users may struggle to choose workouts suited to their goals, experience, and available equipment.'],
  ['utensils', 'Manual food logging and nutritional tracking can be time-consuming.'],
] as const

const FEATURES = [
  {
    icon: 'scan',
    name: 'RepWise AI',
    tag: 'Computer vision',
    role: 'Exercise Form Analysis',
    points: [
      'Human body pose detection through camera footage.',
      'Automatic repetition counting.',
      'Limited form feedback for supported exercises.',
    ],
  },
  {
    icon: 'sparkles',
    name: 'GymIQ',
    tag: 'Recommendation',
    role: 'Personalized Workout Planning',
    points: [
      'Workout recommendations based on fitness goals, experience, and equipment.',
      'Personalized workout schedules and exercise selections.',
      'Workout adjustments based on user feedback and recorded progress.',
    ],
  },
  {
    icon: 'camera',
    name: 'MacroLens',
    tag: 'Deep learning',
    role: 'AI Food Recognition',
    points: [
      'Food identification through uploaded images.',
      'User confirmation of food items and portions.',
      'Estimated calories and macronutrients using nutrition data.',
    ],
  },
] as const

const OUTCOMES = [
  'An integrated fitness application with a user-friendly interface.',
  'AI-assisted repetition counting and basic exercise-form analysis.',
  'Personalized workout recommendations and schedules.',
  'Food recognition with nutrition estimation and logging.',
  'Workout history, progress reports, and fitness dashboards.',
  'Secure user profiles and fitness data management.',
]

const USERS = [
  ['user', 'Fitness beginners', 'Seeking basic exercise guidance.'],
  ['dumbbell', 'Gym users', 'Want to record and manage their fitness progress.'],
  ['home', 'Home-workout users', 'Training with limited equipment.'],
  ['chart', 'Structured trackers', 'Interested in structured workout and nutrition tracking.'],
] as const

const ICONS: Record<string, ReactNode> = {
  activity: <path d="M22 12h-2.5a2 2 0 0 0-1.9 1.5l-2.4 8.3a.25.25 0 0 1-.5 0L9.2 2.2a.25.25 0 0 0-.5 0l-2.3 8.3A2 2 0 0 1 4.5 12H2" />,
  clipboard: (
    <>
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </>
  ),
  utensils: (
    <>
      <path d="M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3Zm0 0v7" />
    </>
  ),
  scan: (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.9 15.5a2 2 0 0 0-1.4-1.4L2.4 12.5a.5.5 0 0 1 0-1l6.1-1.6a2 2 0 0 0 1.4-1.4l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z" />
      <path d="M20 3v4M22 5h-4" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  dumbbell: <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />,
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </>
  ),
  chart: <path d="M12 20V10M18 20V4M6 20v-4" />,
  check: <path d="M20 6 9 17l-5-5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowUp: <path d="m5 12 7-7 7 7M12 19V5" />,
}

function Icon({ name, className = 'size-5' }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  )
}

const YEAR = new Date().getFullYear()
const EASE = [0.16, 1, 0.3, 1] as const
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

const eyebrow = 'text-xs font-medium uppercase tracking-[0.24em] text-fog'
const h2 = 'font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[0.98] tracking-tight text-pretty'
const container = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8'
const pill =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors duration-200'
const pillLime = `${pill} bg-lime text-ink hover:bg-paper`
const pillGhost = `${pill} border border-paper/20 text-paper hover:border-lime hover:text-lime`

function SectionHeader({ eyebrow: label, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-[640px]">
      <motion.p variants={fadeUp} className={`${eyebrow} mb-4`}>
        {label}
      </motion.p>
      <motion.h2 variants={fadeUp} className={h2}>
        {title}
      </motion.h2>
      {lead && (
        <motion.p variants={fadeUp} className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-fog">
          {lead}
        </motion.p>
      )}
    </div>
  )
}

function Wordmark() {
  return (
    <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="FitNutro, back to top">
      <span className="size-7 rounded-[7px] bg-lime" aria-hidden="true" />
      <span className="font-display text-xl font-bold uppercase tracking-[0.12em]">FitNutro</span>
    </a>
  )
}

function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 border-b transition-[background-color,border-color] duration-300 ${
        solid ? 'border-line bg-ink/85 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <div className={`${container} flex items-center justify-between gap-6 py-3.5`}>
        <Wordmark />
        <nav aria-label="Sections" className="hidden items-center gap-2 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center px-3 text-[13px] font-medium uppercase tracking-[0.14em] text-fog transition-colors duration-200 hover:text-paper"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#features" className="hidden min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-lime px-5 text-[13px] font-semibold tracking-[0.06em] text-ink transition-colors duration-200 hover:bg-paper sm:inline-flex">
            Explore features
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-paper transition-colors duration-200 hover:border-lime hover:text-lime lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`${container} border-t border-line pb-5 pt-2 lg:hidden`}
          >
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line text-base font-medium text-paper transition-colors duration-200 hover:text-lime"
              >
                {label}
              </a>
            ))}
            <a href="#features" onClick={() => setOpen(false)} className={`${pillLime} mt-5 w-full sm:hidden`}>
              Explore features
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])

  return (
    <section ref={ref} className="relative pt-28 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(216_217_210/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(216_217_210/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        <motion.div
          style={{ y: glowY }}
          className="absolute -right-[10%] top-[10%] h-[70%] w-[55%] rounded-full bg-lime opacity-[0.14] blur-[140px]"
        />
      </div>

      <div className={`${container} relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8`}>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className={`${eyebrow} mb-8 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-lime`}>
            AI fitness training · planning · nutrition
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-[clamp(4rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
            FitNutro
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-[48ch] text-pretty text-[clamp(1.125rem,1.8vw,1.375rem)] leading-snug text-mist">
            An AI-Powered Fitness Training, Workout Planning &amp; Nutrition Management Platform
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#features" className={pillLime}>
              Explore the features
            </a>
            <a href="#product" className={pillGhost}>
              See the product
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          className="relative lg:-mr-[12%]"
        >
          <motion.img
            style={{ y: phoneY }}
            src={heroPhone}
            alt="FitNutro dashboard on a phone"
            width={959}
            height={1079}
            fetchPriority="high"
            className="mx-auto block w-full max-w-[560px] [mask-image:radial-gradient(ellipse_62%_66%_at_50%_46%,black_58%,transparent_100%)] lg:max-w-none"
          />
        </motion.div>
      </div>

      <div className={container}>
        <motion.dl
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-4 grid grid-cols-3 border-y border-line lg:mt-0"
        >
          {STATS.map(([value, label]) => (
            <motion.div key={label} variants={fadeUp} className="border-l border-line py-6 pl-5 first:border-l-0 first:pl-0 sm:pl-8">
              <dd className="font-display text-4xl font-bold leading-none">{value}</dd>
              <dt className={`${eyebrow} mt-2 text-[11px] tracking-[0.18em]`}>{label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="band py-20 lg:py-28">
      <Reveal className={`${container} grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="Problem statement"
            title="Managing exercise, workout planning, and nutrition through different tools creates a fragmented experience."
          />
        </div>
        <ol className="border-t border-line">
          {PROBLEMS.map(([icon, text], i) => (
            <motion.li
              key={text}
              variants={fadeUp}
              className="group grid grid-cols-[2.5rem_2rem_1fr] items-start gap-4 border-b border-line border-l-2 border-l-transparent py-7 pl-4 transition-colors duration-200 hover:border-l-lime sm:grid-cols-[3rem_2.5rem_1fr]"
            >
              <span className="pt-1 font-display text-sm tracking-[0.1em] text-lime">0{i + 1}</span>
              <Icon name={icon} className="size-5 text-fog transition-colors duration-200 group-hover:text-paper" />
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-mist">{text}</p>
            </motion.li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}

function FeatureRow({ feature: m }: { feature: (typeof FEATURES)[number] }) {
  const ref = useRef<HTMLLIElement>(null)
  const active = useInView(ref, { margin: '-40% 0px -40% 0px' })
  return (
    <motion.li
      ref={ref}
      variants={fadeUp}
      className={`relative p-7 transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-lime before:transition-opacity before:duration-300 lg:p-8 ${
        active ? 'bg-surface-2 before:opacity-100' : 'before:opacity-0'
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-line bg-ink text-lime">
          <Icon name={m.icon} />
        </span>
        <h3 className="font-display text-3xl font-bold">{m.name}</h3>
        <span className={`${eyebrow} ml-auto rounded-full border border-line px-2.5 py-1 text-[10px] text-lime`}>{m.tag}</span>
      </div>
      <p className="mb-4 text-sm text-fog">{m.role}</p>
      <ul className="grid gap-2 text-[15px] leading-relaxed text-mist sm:grid-cols-2 sm:gap-x-6">
        {m.points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <Icon name="check" className="mt-1 size-4 shrink-0 text-lime" />
            {p}
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

function Features() {
  return (
    <section id="features" className={`${container} scroll-mt-24 py-20 lg:py-28`}>
      <Reveal>
        <SectionHeader eyebrow="What's inside" title="Three AI features. One connected platform." />
      </Reveal>
      <Reveal className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface/50 lg:grid lg:grid-cols-[5fr_7fr]">
        <motion.figure variants={fadeUp} className="relative min-h-[320px] border-b border-line lg:min-h-0 lg:border-b-0 lg:border-r">
          <img
            src={modulesPhones}
            alt="RepWise AI, GymIQ and MacroLens screens on three phones"
            width={883}
            height={850}
            loading="lazy"
            className="block aspect-[883/850] w-full object-cover lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
          />
        </motion.figure>
        <ul className="divide-y divide-line">
          {FEATURES.map((m) => (
            <FeatureRow key={m.name} feature={m} />
          ))}
        </ul>
      </Reveal>
      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
        <motion.p variants={fadeUp} className="max-w-[52ch] text-[17px] leading-relaxed text-fog">
          Form analysis, workout planning and food recognition, working together in one account.
        </motion.p>
        <motion.a variants={fadeUp} href="#product" className={pillLime}>
          See the product
        </motion.a>
      </Reveal>
    </section>
  )
}

function Product() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 48, reduce ? 0 : -48])

  return (
    <section id="product" className={`${container} scroll-mt-24 py-20 lg:py-28`}>
      <Reveal>
        <motion.div
          ref={ref}
          variants={fadeUp}
          className="grid items-center gap-10 rounded-3xl bg-lime p-8 text-ink sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-16"
        >
          <div>
            <p className={`${eyebrow} mb-4 text-ink/70`}>The product</p>
            <h2 className={`${h2} mb-8 text-[clamp(1.875rem,3.6vw,3rem)]`}>
              One app where AI supports your training, your nutrition and your progress tracking.
            </h2>
            <ul className="grid gap-3 text-[15px] leading-snug sm:grid-cols-2">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink/10">
                    <Icon name="check" className="size-3" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <motion.img
              style={{ y: imgY }}
              src={productPhones}
              alt="FitNutro app screens on three phones"
              width={899}
              height={681}
              loading="lazy"
              className="block aspect-[899/681] w-full scale-[1.12] object-cover"
            />
          </div>
        </motion.div>
      </Reveal>
    </section>
  )
}

function Audience() {
  return (
    <section id="users" className="band scroll-mt-24 py-20 lg:py-28">
      <Reveal className={container}>
        <SectionHeader eyebrow="Target users" title="Built for people starting out, not just athletes." />
        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {USERS.map(([icon, title, body], i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="border-b border-line py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-b-0 lg:px-8 lg:[&:not(:first-child)]:border-l lg:first:pl-0 lg:last:pr-0"
            >
              <div className="mb-6 flex items-center justify-between">
                <Icon name={icon} className="size-5 text-lime" />
                <span className="font-display text-sm tracking-[0.16em] text-fog">0{i + 1}</span>
              </div>
              <h3 className="mb-2 font-display text-2xl font-bold">{title}</h3>
              <p className="text-[15px] leading-relaxed text-fog">{body}</p>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:py-20`}>
        <div>
          <Wordmark />
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-fog">
            An AI-powered fitness training, workout planning and nutrition management platform.
          </p>
        </div>
        <nav aria-label="Footer sections">
          <p className={`${eyebrow} mb-4`}>Explore</p>
          <ul>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-10 items-center text-[15px] text-mist transition-colors duration-200 hover:text-lime">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Features">
          <p className={`${eyebrow} mb-4`}>Features</p>
          <ul>
            {FEATURES.map((m) => (
              <li key={m.name}>
                <a href="#features" className="inline-flex min-h-10 items-center text-[15px] text-mist transition-colors duration-200 hover:text-lime">
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-5`}>
          <p className="text-[13px] text-fog">© {YEAR} FitNutro. All rights reserved.</p>
          <a href="#top" className={`${pillGhost} min-h-10 px-4 text-[13px]`}>
            Back to top
            <Icon name="arrowUp" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="overflow-x-clip bg-ink text-paper">
        <Header />
        <main>
          <Hero />
          <Problem />
          <Features />
          <Product />
          <Audience />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
