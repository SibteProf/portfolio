export const profile = {
  name: 'Sibte Hussain',
  title: 'Fullstack Product Engineer',
  location: 'Lahore, Pakistan',
  email: 'sibte566@gmail.com',
  intro:
    'I help agencies and product teams ship web and mobile software that is reliable in production, clear to maintain, and fast to iterate on.',
  summary:
    'My work usually sits at the seam between product requirements, frontend UX, backend integrations, and release quality. I build interfaces, wire up APIs, handle real-time and payment workflows, and leave teams with code they can keep shipping on.',
  availability: 'Available for freelance and contract work',
}

export const credibilityItems = [
  'React, Next.js, TypeScript, React Native',
  'Auth, RBAC, payments, real-time features',
  'Production apps for sports, fintech, and property workflows',
  'Agile collaboration with product, design, and engineering teams',
]

export const workingPrinciples = [
  {
    title: 'Product-minded implementation',
    description: 'I translate vague feature requests into clear workflows, practical edge cases, and code that teams can extend without friction.',
  },
  {
    title: 'Frontend and integration ownership',
    description: 'I am comfortable moving from interface work into APIs, auth flows, third-party services, and release-ready behavior.',
  },
  {
    title: 'Performance and maintainability',
    description: 'I care about bundle weight, state complexity, loading behavior, and keeping the codebase understandable after handoff.',
  },
  {
    title: 'Fast collaboration',
    description: 'I work well with designers, PMs, backend teams, and agency stakeholders who need clear progress and dependable delivery.',
  },
]

export const services = [
  {
    title: 'Web app delivery',
    description: 'Building responsive product surfaces in React and Next.js with maintainable state, routing, and real user workflows.',
  },
  {
    title: 'Mobile app delivery',
    description: 'Shipping React Native apps with shared logic, stable release behavior, and thoughtful performance on iOS and Android.',
  },
  {
    title: 'API and third-party integrations',
    description: 'Connecting product features to auth providers, payment systems, Plaid, real-time services, and internal APIs.',
  },
  {
    title: 'Refactors and performance work',
    description: 'Untangling brittle code, improving state architecture, and reducing the friction of shipping new features.',
  },
]

export const processSteps = [
  {
    title: 'Clarify the product constraint',
    description: 'I start by mapping the user flow, technical dependencies, and the tradeoffs that actually matter to the release.',
  },
  {
    title: 'Build the critical path first',
    description: 'I prioritize the behavior that proves the feature works end to end before polishing lower-value edges.',
  },
  {
    title: 'Leave a codebase people can reuse',
    description: 'Reusable patterns, predictable state, and cleaner interfaces matter because projects rarely end with one release.',
  },
]

export const timeline = [
  {
    period: 'Oct 2024 - Present',
    role: 'Software Engineer',
    company: 'PlanLab Solutions',
    summary:
      'Delivering production React, Next.js, and React Native features with a focus on maintainability, performance, and cross-team delivery.',
  },
  {
    period: 'Jan 2022 - Oct 2024',
    role: 'Associate Software Developer',
    company: 'Agile District',
    summary:
      'Built web and mobile products across multiple client engagements, integrating APIs, improving UX quality, and supporting releases.',
  },
  {
    period: '2018 - 2022',
    role: 'BS Computer Science',
    company: 'University of Management and Technology',
    summary:
      'Developed the engineering foundation that led into production work with JavaScript, React, and software delivery practices.',
  },
]

export const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Backend and integrations',
    items: ['REST APIs', 'GraphQL', 'WebSockets', 'OAuth', 'Stripe', 'Plaid'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Expo', 'React Navigation', 'Shared state patterns'],
  },
  {
    title: 'Tooling and quality',
    items: ['Vitest', 'React Testing Library', 'GitHub', 'CI/CD', 'Vite'],
  },
]

export const comfortStack = [
  'Redux',
  'React Query',
  'Zustand',
  'Jest',
  'Firebase',
  'Appium',
  'Docker',
]

export const projects = [
  {
    title: 'NowVPlay',
    type: 'Sports streaming and collaboration platform',
    role: 'Frontend and product delivery across authentication, permissions, and application workflows',
    problem:
      'The platform needed to support multiple user roles, authenticated access, and a smoother experience for complex sports-media workflows.',
    highlights: [
      'Implemented frontend product flows in Next.js and React for account access, protected surfaces, and day-to-day user actions.',
      'Integrated OAuth-based authentication and role-aware behavior so teams could expose the right tools to the right users.',
      'Improved state organization with Redux patterns that made data-heavy screens easier to reason about and extend.',
    ],
    outcome:
      'The result was a more maintainable product surface with clearer permissions, steadier user flows, and a frontend foundation that was easier to ship on.',
    stack: ['Next.js', 'React', 'Redux', 'Material UI', 'OAuth'],
    link: 'https://www.nowvplay.com',
  },
  {
    title: 'RealWealtdy',
    type: 'Real estate transaction and listing application',
    role: 'Fullstack-facing frontend ownership across transactions, integrations, and real-time customer workflows',
    problem:
      'The product needed to combine property discovery, payment-related flows, bank connectivity, and live communication without turning the UI brittle.',
    highlights: [
      'Built transaction and listing interfaces that coordinated with backend APIs, secure payment behavior, and user-specific workflow states.',
      'Integrated Plaid and Stripe-related flows while keeping edge cases understandable for users and manageable in code.',
      'Supported real-time chat behavior and data updates so the product could handle more collaborative transaction flows.',
    ],
    outcome:
      'The app became easier to navigate through multi-step property workflows while keeping integrations and state changes more predictable.',
    stack: ['React', 'TypeScript', 'Socket.IO', 'Plaid API', 'Stripe'],
    link: 'https://sbx.realwealtdy.net',
  },
  {
    title: 'GoodFynd',
    type: 'Fintech SaaS mobile application for food vendors',
    role: 'Mobile product delivery with API coordination, real-time communication, and performance-focused state management',
    problem:
      'The app needed to handle vendor-facing workflows, real-time communication, and frequent API interactions on mobile without becoming sluggish.',
    highlights: [
      'Built React Native screens and flows that balanced product complexity with responsiveness on mobile devices.',
      'Managed data and network behavior with Redux and React Query patterns that made high-traffic screens more stable.',
      'Integrated chat and API-heavy workflows while paying close attention to loading states, interaction quality, and release readiness.',
    ],
    outcome:
      'The mobile experience handled operational vendor workflows more smoothly and gave the team a steadier base for ongoing feature work.',
    stack: ['React Native', 'Expo', 'Redux', 'React Query', 'Socket.IO'],
    link: 'https://www.goodfynd.com',
  },
]

export const projectInquiryChecklist = [
  'what you are building',
  'timeline or delivery pressure',
  'team setup and who I would work with',
  'any APIs, mobile apps, or third-party services involved',
  'budget range if you already have one',
]
