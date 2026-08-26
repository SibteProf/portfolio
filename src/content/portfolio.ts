export const profile = {
  name: 'Sibte Hussain',
  title: 'Full-Stack Engineer',
  location: 'Lahore, Pakistan',
  email: 'sibte566@gmail.com',
  phone: '+92-300-6346998',
  linkedin: 'https://www.linkedin.com/in/sibtehussain',
  github: 'https://github.com/SibteProf',
  intro:
    'I build stuff people actually use: web apps, mobile apps, the occasional weird side project. React, Next.js, Django, and React Native are the usual tools.',
  summary:
    "I like owning a feature start to finish: front end, backend, database, the annoying edge cases nobody wants to touch. If it needs to talk to an API, hold a login, or run in real time, I've probably already broken it once in a way that taught me something.",
  availability: 'Available for full-stack web and mobile work',
}

export const interests = [
  {
    key: 'gaming',
    label: 'Gaming',
    value:
      "Mostly single-player, story-first stuff: Cyberpunk 2077, the GTA series, The Last of Us. I'll jump into Valorant or Apex with friends when someone drags me into a lobby.",
    short:
      'Story-mode gamer (Cyberpunk 2077, GTA, TLOU), occasional Valorant/Apex with friends.',
  },
  {
    key: 'pc-building',
    label: 'PC Building',
    value:
      "I'm the unofficial IT department of my friend group, building and speccing PCs for whoever asks nicely (or brings snacks).",
    short: 'Builds and specs PCs for friends. Unofficial group IT guy.',
  },
  {
    key: 'phones',
    label: 'Phone Tinkering',
    value:
      'I root phones and flash custom ROMs for fun, mostly just to squeeze out a bit more performance or battery life. Not always necessary. Always fun.',
    short: 'Roots phones, flashes custom ROMs, chases performance for fun.',
  },
  {
    key: 'music',
    label: 'Music',
    value: 'Pop and upbeat, mostly. I am not a lo-fi-while-coding person.',
    short: 'Pop / upbeat music, not the lo-fi coding-playlist type.',
  },
]

export const credibilityItems = [
  '3+ years building Full-Stack and React Native products',
  'SSR/SSG, ISR, Core Web Vitals, and rendering performance',
  'OAuth 2.0, JWT rotation, RBAC, REST, GraphQL, and Socket.IO',
  'SQL/NoSQL databases, Docker, CI/CD, AWS, and local LLM tools',
]

export const workingPrinciples = [
  {
    title: 'I own the whole feature',
    description:
      'UI, API, database, auth, deployment: I move through all of it instead of throwing work over a wall and hoping it lands right.',
  },
  {
    title: 'I sweat the boring stuff',
    description:
      'Slow pages, janky loading states, API calls that block the UI for no reason. That is where I actually spend my time.',
  },
  {
    title: 'I write code for the next person',
    description:
      'Usually that person is me, six months later, with no memory of why any of this works. I try not to make that guy angry.',
  },
]

export const services = [
  {
    title: 'Full-stack web apps',
    description:
      'React and Next.js on the front end, Node/Nest/Express behind it, with auth and data flows that actually hold up in production.',
  },
  {
    title: 'Mobile apps',
    description:
      'React Native and Expo apps with real-time updates, caching, and UX that does not feel like a web page wearing a costume.',
  },
  {
    title: 'APIs, databases, and integrations',
    description:
      'REST, GraphQL, Socket.IO, Postgres/MySQL/Mongo, Stripe, webhooks: wiring the pieces together so they stay wired together.',
  },
]

export const timeline = [
  {
    period: 'Oct 2024 - Present',
    role: 'Software Engineer',
    company: 'PlanLab Solutions',
    summary:
      'Building and maintaining the core product across web and mobile, mostly Next.js and React Native, with Django doing the heavy lifting on the backend.',
  },
  {
    period: 'Sep 2023 - Oct 2024',
    role: 'Associate Software Developer',
    company: 'Agile District',
    summary:
      'Built out React and Next.js platforms, migrated a chunk of legacy JavaScript to TypeScript, and got the local dev environment Dockerized so it stopped only working on one laptop.',
  },
  {
    period: '2018 - 2022',
    role: 'BS Computer Science',
    company: 'University of Management and Technology',
    summary:
      'Where I learned the fundamentals, and where "it works on my machine" stopped being an acceptable final answer.',
  },
]

export const stackGroups = [
  {
    title: 'Frontend',
    items: [
      'React.js',
      'Next.js',
      'JavaScript ES6+',
      'TypeScript',
      'Tailwind CSS',
      'Material UI',
      'ShadCN',
    ],
  },
  {
    title: 'Backend and databases',
    items: [
      'Node.js',
      'Express.js',
      'NestJS',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'FastAPI',
      'Django',
    ],
  },
  {
    title: 'APIs and real-time',
    items: [
      'REST APIs',
      'GraphQL',
      'Socket.IO',
      'OAuth 2.0',
      'JWT',
      'RBAC',
      'Stripe',
      'NextAuth',
    ],
  },
  {
    title: 'Mobile, tooling, and quality',
    items: [
      'React Native',
      'Expo',
      'Redux Toolkit',
      'React Query',
      'Jest',
      'React Testing Library',
      'Appium',
    ],
  },
]

export const comfortStack = [
  'Docker',
  'Git',
  'GitHub',
  'CI/CD',
  'Vercel',
  'AWS S3',
  'AWS EC2',
  'Ollama',
  'Qwen',
  'Scalable system design',
  'Agile Scrum',
]

export const projects = [
  {
    title: 'NowVPlay',
    type: 'Sports technology platform connecting players, venues, and academies',
    role: 'Full-stack sports-tech delivery across client management, live data, routing, and role-aware dashboards',
    problem:
      'The platform needed to connect players, venues, academies, and other members of the sports community, with each group seeing a different dashboard and live tournament data that actually stayed live.',
    highlights: [
      'Built the core Next.js app: dynamic routing and role-based dashboards so players, venues, and academies each see what they need.',
      'Wired up OAuth so access control was not just a checkbox. The right people got the right tools.',
      'Built the Redux Toolkit state layer that keeps live tournament data from turning into a stale-data mess.',
    ],
    outcome:
      'A dashboard system that scales by role instead of by special-casing everything, and a frontend that is easier to extend than it was on day one.',
    stack: ['Next.js', 'Django', 'Redux Toolkit', 'OAuth', 'Material UI'],
    link: 'https://www.nowvplay.com',
  },
  {
    title: 'Pecunia and Custom Dev Integrations',
    type: 'Compliance, payments, and internal AI workflow integrations',
    role: 'Full-stack integration work across validation layers, webhooks, payments, authentication, and local LLM tooling',
    problem:
      'Onboarding needed to be automated without cutting corners on validation, government webhooks had to behave, and an internal AI tool needed to exist without sending anything sensitive off-site.',
    highlights: [
      'Automated compliance onboarding with strict validation and official UK government webhook integrations.',
      'Wired up Stripe and NextAuth without turning the security-sensitive parts into a black box.',
      'Set up local AI endpoints with Ollama and Qwen so internal tooling never had to leave the building.',
    ],
    outcome:
      'Less manual onboarding work, tighter security, and an internal AI setup that stays inside infrastructure we actually control.',
    stack: ['Next.js', 'Stripe', 'NextAuth', 'Ollama', 'Qwen'],
    link: 'https://www.myukaccountant.co.uk/',
  },
  {
    title: 'Kunji',
    type: 'Society management and collaboration platform',
    role: 'React Native mobile development for a residential-community platform covering visitor access, complaints, billing, and community features',
    problem:
      'A residential community needed one app to replace a pile of paperwork: visitor approval and entry logs, complaints, billing, deliveries, polls, parking, and a panic button for emergencies.',
    highlights: [
      'Built the resident-facing React Native screens: visitor management, complaint tracking, billing, all in one place.',
      'Used Redux Toolkit for state and OAuth for access, so residents and staff each saw the right version of the app.',
      'Added real-time updates over sockets for visitor entries, delivery pings, and emergency alerts.',
      'Worked across a multi-app system: admin dashboard, resident app, and a separate security-staff app.',
    ],
    outcome:
      'Residents got one app instead of a folder of forms, and complaints and visitor entries started moving faster because nobody was waiting on a security guard with a clipboard.',
    stack: ['React Native', 'Redux Toolkit', 'Socket.IO', 'OAuth'],
    link: 'https://kunji.pk',
  },
  {
    title: 'GoodFynd',
    type: 'POS and operations platform for food trucks and mobile vendors',
    role: 'Full-stack delivery across POS and order-management workflows, real-time order tracking, payment integrations, and server-state management',
    problem:
      'Food trucks needed a POS that could take a hit of orders during a lunch rush without turning laggy, work offline when a signal dropped, and still sync up cleanly after.',
    highlights: [
      'Built React Native and Expo screens for POS, order tracking, and in-app chat.',
      'Hooked up payment systems and the third-party services vendor checkout actually needs.',
      'Split global state from server state with Redux Toolkit and React Query so busy screens stayed responsive.',
      'Added Socket.IO live updates plus offline ordering, caching, and background sync.',
    ],
    outcome:
      'Smoother day-to-day vendor operations, and roughly 15-18% faster responsiveness from the caching and sync work.',
    stack: [
      'React Native',
      'Expo',
      'Redux Toolkit',
      'React Query',
      'Socket.IO',
    ],
    link: 'https://www.goodfynd.com',
  },
  {
    title: 'VueCent',
    type: 'Personal finance tracker and expense-logging app',
    role: 'React Native development on a self-directed personal project, including AI-powered invoice scanning and insights',
    problem:
      'I wanted a finance tracker that could log expenses without me typing in every purchase by hand, and that actually told me something useful about my spending instead of just listing it.',
    highlights: [
      'Built the whole thing in React Native with Expo: expense logging, categorization, the works.',
      'Used the Gemini API to scan receipts and invoices and pull out the expense data automatically.',
      'Redux Toolkit for state, React Query for fetching and caching.',
    ],
    outcome:
      'Manual expense entry turned into "point phone at receipt": the app extracts and categorizes it, and Gemini generates the spending insights I actually read.',
    stack: [
      'React Native',
      'Expo',
      'Redux Toolkit',
      'React Query',
      'Gemini API',
    ],
    link: 'https://play.google.com/store/apps/details?id=com.metafusion.pocketplan&hl=en',
  },
]

const stackBreadthCount =
  stackGroups.reduce((total, group) => total + group.items.length, 0) +
  comfortStack.length

export const impactStats = [
  { value: 3, suffix: '+', label: 'Years shipping full-stack products' },
  {
    value: projects.length,
    suffix: '',
    label: 'Production apps shipped end to end',
  },
  { value: 18, suffix: '%', label: 'Faster mobile responsiveness on GoodFynd' },
  { value: stackBreadthCount, suffix: '+', label: 'Technologies in daily use' },
]

export const projectInquiryChecklist = [
  'what you are trying to build',
  'your timeline',
  'who else is on the team',
  'the tricky parts: real-time features, payments, auth, whatever it is',
  'a rough budget, if you have one',
]
