import type {
  EducationItem,
  ExperienceItem,
  LanguageItem,
  LocalizedText,
  Project,
  SkillGroup,
  StatItem,
} from "@/types";

/**
 * PROFILE
 * Coordonnées vérifiées via le CV de Chouaib Bentabet.
 */
export const profile = {
  name: "Chouaib Bentabet",
  initials: "CB",
  title: {
    en: "Entrepreneur, Full-Stack Developer & Founder of Netnook",
    fr: "Entrepreneur, Développeur Full-Stack & Fondateur de Netnook",
  } satisfies LocalizedText,
  email: "bentabet.chouaib25@gmail.com",
  phone: "+212 601 381 005",
  location: "Salé, Maroc",
  agency: "Netnook",
  agencyUrl: "https://netnook.solutions",
  /**
   * Assets optionnels — laisser `null` tant que les fichiers ne sont pas dans `public/`.
   * Après dépôt : avatar → "/avatar.jpg", cvUrl → "/cv-chouaib-bentabet.pdf"
   * (voir public/README.md). Évite les requêtes HEAD 404 sur des fichiers absents.
   */
  avatar: null as string | null,
  // PDF présent dans public/ — activer le bouton CV sans HEAD fetch.
  cvUrl: "/cv-chouaib-bentabet.pdf" as string | null,
  // Remplir github / linkedin avec tes URLs perso (http/https). Laisser "" pour masquer.
  socials: {
    github: "https://github.com/Lo-Ki25",
    linkedin: "https://www.linkedin.com/in/chouaib-bentabet-130182232",
    twitter: "https://twitter.com/netnook",
    facebook: "https://www.facebook.com/netnook",
  },
};

/** Année de départ de l'activité freelance — sert à calculer l'ancienneté automatiquement */
export const CAREER_START_YEAR = 2020;
const experienceYears = Math.max(new Date().getFullYear() - CAREER_START_YEAR, 1);

/** Citation personnelle — reprise du CV (section "Commitments & Values") */
export const missionStatement: LocalizedText = {
  en: "I believe digital innovation can be a powerful lever for positive transformation — especially across Morocco and the Global South. I build technology that serves people and the planet.",
  fr: "Je crois que l'innovation digitale peut être un levier puissant de transformation positive pour les sociétés, en particulier au Maroc et dans le Sud global. Je conçois des technologies au service des personnes et de la planète.",
};

export const values: LocalizedText[] = [
  { en: "Ethical Innovation", fr: "Innovation éthique" },
  { en: "Digital Inclusion", fr: "Inclusion numérique" },
  { en: "Environmental Sustainability", fr: "Durabilité environnementale" },
  { en: "Social Equity", fr: "Équité sociale" },
  { en: "Knowledge Transfer", fr: "Transfert de connaissances" },
];

/**
 * PROJECTS
 * Les 7 premiers sont des projets clients réels (netnook.solutions/projects).
 * SolarAgroBot est un projet personnel / académique (CV, section "Innovative Projects & Competitions").
 */
export const projects: Project[] = [
  {
    slug: "iris-software",
    image: "/images/projects/iris-software.png",
    title: "IRIS Software",
    category: "Platforms",
    year: "2026",
    client: "FICRA CONSEIL",
    featured: true,
    summary: {
      en: "A web-based internal application that generates, validates and distributes visit reports, meeting minutes and document review sheets, with dynamic management of themes and observations.",
      fr: "Une application interne web qui génère, valide et diffuse les rapports de visite, comptes-rendus de réunion et fiches de revue documentaire, avec une gestion dynamique des thématiques et observations.",
    },
    challenge: {
      en: "Before IRIS, reports were prepared manually (Word, Excel), causing errors, poor archiving and wasted time. A centralized, secure system was needed to meet regulatory requirements.",
      fr: "Avant IRIS, les rapports étaient produits manuellement (Word, Excel), entraînant erreurs, archivage médiocre et perte de temps. Un système centralisé et sécurisé était nécessaire pour répondre aux exigences réglementaires.",
    },
    solution: {
      en: "Built on a modern architecture — Next.js 14+, TypeScript, Tailwind CSS and Shadcn/UI — backed by MongoDB via Prisma ORM. Complex forms are handled with React Hook Form and validated with Zod. NextAuth powers individual, secure logins for every collaborator.",
      fr: "Architecture moderne — Next.js 14+, TypeScript, Tailwind CSS et Shadcn/UI — avec une base MongoDB pilotée par Prisma ORM. Les formulaires complexes sont gérés avec React Hook Form et validés par Zod. NextAuth assure une connexion individuelle et sécurisée pour chaque collaborateur.",
    },
    impact: {
      en: "IRIS cut report production time by 50%, improved document quality and strengthened compliance by locking validated reports. More than 100 reports have already been issued through the platform.",
      fr: "IRIS a réduit de 50 % le temps de production des rapports, amélioré la qualité documentaire et renforcé la conformité en verrouillant les rapports validés. Plus de 100 rapports ont déjà été générés via la plateforme.",
    },
    metrics: [
      { value: "100%", label: { en: "Collaborators onboarded", fr: "Collaborateurs équipés" } },
      { value: "50%", label: { en: "Time reduction", fr: "Gain de temps" } },
      { value: "100+", label: { en: "Reports generated", fr: "Rapports générés" } },
      { value: "95%", label: { en: "Internal satisfaction", fr: "Satisfaction interne" } },
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Prisma ORM", "MongoDB", "NextAuth", "React Hook Form"],
    tags: ["audit", "reporting", "digital transformation", "web application"],
  },
  {
    slug: "ecop-morocco",
    image: "/images/projects/ecop-morocco.png",
    title: "ECOP Morocco",
    category: "EdTech",
    year: "2025",
    client: "Early Career Ocean Professionals",
    featured: true,
    summary: {
      en: "A digital platform managing the events, publications, conferences and community activities of ECOP Morocco, supporting youth-led ocean advocacy across Morocco and North Africa under the UN Decade of Ocean Science.",
      fr: "Une plateforme digitale pour gérer les événements, publications, conférences et activités communautaires d'ECOP Morocco, au service du plaidoyer océanique porté par la jeunesse, dans le cadre de la Décennie des Nations Unies pour les sciences océaniques.",
    },
    challenge: {
      en: "ECOP Morocco relied on scattered tools (Google Forms, WhatsApp, Google Docs) with no unified digital presence — making event registration, speaker management and multi-partner coordination hard to scale.",
      fr: "ECOP Morocco s'appuyait sur des outils dispersés (Google Forms, WhatsApp, Google Docs) sans présence digitale unifiée, ce qui rendait difficile la montée en charge des inscriptions, la gestion des intervenants et la coordination multi-partenaires.",
    },
    solution: {
      en: "Delivered in two phases — a rapid Webflow + Notion CMS prototype, then a custom platform built with Next.js, Supabase and Tailwind CSS featuring an event management dashboard, dynamic speaker profiles, participant verification and a multilingual-ready (AR–FR–EN), ocean-inspired design system.",
      fr: "Livrée en deux phases : un prototype rapide sous Webflow + Notion CMS, puis une plateforme sur mesure en Next.js, Supabase et Tailwind CSS avec tableau de bord événementiel, profils d'intervenants dynamiques, vérification des participants et un design system multilingue (AR–FR–EN) à thématique océanique.",
    },
    impact: {
      en: "The platform significantly elevated ECOP Morocco's visibility and operational capacity, drawing international partner traffic and reinforcing Morocco's presence in UNOC-3 and COP30 preparations.",
      fr: "La plateforme a considérablement renforcé la visibilité et la capacité opérationnelle d'ECOP Morocco, générant un trafic partenaire international et consolidant la présence marocaine dans les préparatifs de l'UNOC-3 et de la COP30.",
    },
    metrics: [
      { value: "4", label: { en: "Major events hosted", fr: "Événements majeurs" } },
      { value: "600+", label: { en: "Registered participants", fr: "Participants inscrits" } },
      { value: "12+", label: { en: "Partner organizations", fr: "Organisations partenaires" } },
      { value: "900+", label: { en: "Report downloads", fr: "Téléchargements de rapports" } },
    ],
    tech: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL", "Notion API", "Airtable", "Figma"],
    tags: ["Responsive Design", "Youth-Driven", "Multilingual", "Ocean Science"],
  },
  {
    slug: "africeduc",
    image: "/images/projects/africeduc.png",
    title: "AfricEduc Learning Platform",
    category: "EdTech",
    year: "2025",
    client: "Ed Manar",
    featured: true,
    summary: {
      en: "A comprehensive e-learning platform connecting students across Africa with quality educational content, interactive courses and expert instructors.",
      fr: "Une plateforme e-learning complète connectant des étudiants à travers l'Afrique à des contenus pédagogiques de qualité, des cours interactifs et des formateurs experts.",
    },
    challenge: {
      en: "Building a platform able to handle thousands of concurrent users with a seamless experience across devices and unstable network conditions.",
      fr: "Concevoir une plateforme capable de supporter des milliers d'utilisateurs simultanés, avec une expérience fluide sur tous les appareils et des connexions parfois instables.",
    },
    solution: {
      en: "Built with React and Next.js on the frontend, Node.js and PostgreSQL on the backend, with advanced caching strategies and optimized media delivery for fast loading even on slow connections.",
      fr: "Développée avec React et Next.js côté frontend, Node.js et PostgreSQL côté backend, avec des stratégies de cache avancées et une diffusion média optimisée pour un chargement rapide même sur des connexions lentes.",
    },
    impact: {
      en: "Onboarded 10,000+ users with an 85% engagement rate and a 4.8/5 satisfaction score — becoming a leading educational resource across several African countries.",
      fr: "Plus de 10 000 utilisateurs inscrits, un taux d'engagement de 85 % et une note de satisfaction de 4,8/5 : devenue une ressource éducative de référence dans plusieurs pays africains.",
    },
    metrics: [
      { value: "10K+", label: { en: "Users onboarded", fr: "Utilisateurs inscrits" } },
      { value: "85%", label: { en: "Engagement rate", fr: "Taux d'engagement" } },
      { value: "4.8/5", label: { en: "Satisfaction score", fr: "Score de satisfaction" } },
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL"],
    tags: ["Education", "E-Learning", "Africa"],
  },
  {
    slug: "digital-ln-marketplace",
    image: "/images/projects/digital-ln-marketplace.png",
    title: "Digital LN Marketplace",
    category: "Platforms",
    year: "2025",
    summary: {
      en: "An innovative digital marketplace enabling seamless, secure transactions and connections between buyers and sellers.",
      fr: "Une marketplace digitale innovante permettant des transactions sécurisées et fluides entre acheteurs et vendeurs.",
    },
    challenge: {
      en: "Creating a trustworthy marketplace able to handle high transaction volumes while guaranteeing security and user satisfaction.",
      fr: "Créer une marketplace fiable, capable d'absorber un volume élevé de transactions tout en garantissant sécurité et satisfaction utilisateur.",
    },
    solution: {
      en: "Built with Vue.js and TypeScript for a modern, type-safe frontend; Firebase for real-time data and authentication; Stripe for secure payment processing.",
      fr: "Construite avec Vue.js et TypeScript pour un frontend moderne et typé, Firebase pour le temps réel et l'authentification, et Stripe pour des paiements sécurisés.",
    },
    impact: {
      en: "Processed 10,000+ transactions with 150% growth in the first year and a 4.9/5 user rating.",
      fr: "Plus de 10 000 transactions traitées, une croissance de 150 % la première année et une note utilisateur de 4,9/5.",
    },
    metrics: [
      { value: "10K+", label: { en: "Transactions", fr: "Transactions" } },
      { value: "150%", label: { en: "First-year growth", fr: "Croissance an 1" } },
      { value: "4.9/5", label: { en: "User rating", fr: "Note utilisateur" } },
    ],
    tech: ["Vue.js", "TypeScript", "Firebase", "Stripe"],
    tags: ["Marketplace", "E-Commerce", "Transactions"],
  },
  {
    slug: "solaragrobot",
    image: "/images/projects/solaragrobot.png",
    title: "SolarAgroBot",
    category: "Innovation",
    year: "2023 – 2024",
    personal: true,
    featured: true,
    summary: {
      en: "A solar-powered robotic solution for smart agriculture — combining AI, IoT and predictive models to optimize irrigation, detect plant disease early, and cut water and pesticide use.",
      fr: "Une solution robotique solaire pour l'agriculture intelligente — combinant IA, IoT et modèles prédictifs pour optimiser l'irrigation, détecter précocement les maladies des plantes et réduire l'usage d'eau et de pesticides.",
    },
    solution: {
      en: "Integrates artificial intelligence, IoT sensors and predictive precision-agriculture models to read soil and weather conditions in real time, recommend irrigation adjustments and flag plant disease early — powered entirely by solar energy.",
      fr: "Combine intelligence artificielle, capteurs IoT et modèles prédictifs d'agriculture de précision pour analyser en temps réel les conditions du sol et de la météo, recommander des ajustements d'irrigation et détecter précocement les maladies des plantes — le tout alimenté par l'énergie solaire.",
    },
    impact: {
      en: "Significant reduction in water consumption and pesticide use, with energy needs fully covered by solar power. Presented at national and international competitions and supported by two incubation programs.",
      fr: "Réduction significative de la consommation d'eau et de l'usage de pesticides, avec des besoins énergétiques entièrement couverts par le solaire. Présenté lors de compétitions nationales et internationales et soutenu par deux programmes d'incubation.",
    },
    metrics: [
      { value: "6", label: { en: "Competitions & events", fr: "Compétitions & événements" } },
      { value: "2", label: { en: "Incubation programs", fr: "Programmes d'incubation" } },
    ],
    recognitions: [
      "AgriYoungInnovate (2nd edition)",
      "ICAMES",
      "One Young World Summit",
      "FinTech Hackathon V2.0",
      "AgriFood Tech",
      "UM5 Startupeur Challenge",
      "Mitsandbox Explorer",
      "AgriEdge",
    ],
    tech: ["Artificial Intelligence", "IoT", "Python", "Automation"],
    tags: ["AgriTech", "Sustainability", "Robotics"],
  },
  {
    slug: "uib-innovation-branding",
    image: "/images/projects/uib-innovation-branding.png",
    title: "UIB Innovation — Branding",
    category: "Branding",
    year: "2025",
    summary: {
      en: "Complete visual identity design for UIB Innovation — logo system, color palette and brand guidelines.",
      fr: "Création d'une identité visuelle complète pour UIB Innovation.",
    },
    tech: ["Adobe Illustrator", "Figma", "UI/UX"],
    tags: ["Branding", "Innovation", "Tech"],
  },
  {
    slug: "afric-educ-branding",
    image: "/images/projects/afric-educ-branding.png",
    title: "AFRIC EDUC — Branding",
    category: "Branding",
    year: "2025",
    summary: {
      en: "Full visual identity for AFRIC EDUC, including logo, design system and brand assets for the education sector.",
      fr: "Création complète de l'identité visuelle pour AFRIC EDUC.",
    },
    tech: ["Figma", "Adobe Illustrator"],
    tags: ["Branding", "Design System", "Education"],
  },
  {
    slug: "mt180-maroc",
    image: "/images/projects/mt180-maroc.png",
    title: "Ma Thèse en 180 Secondes — Maroc",
    category: "Innovation",
    year: "2022",
    summary: {
      en: "Graphic and digital content creation for the MT180 scientific communication competition in Morocco.",
      fr: "Création de contenus graphiques et digitaux pour la compétition scientifique Ma Thèse en 180 Secondes (MT180) au Maroc.",
    },
    tech: ["Figma", "Adobe Illustrator"],
    tags: ["Science", "EdTech", "Communication"],
  },
  {
    slug: "yedart",
    image: "/images/projects/yedart.png",
    title: "YEDART",
    category: "Platforms",
    year: "2026",
    client: "RAMO CONSULTING SARL",
    featured: true,
    summary: {
      en: "An international e-commerce platform bringing Moroccan craftsmanship — rugs, zellige, pottery — to B2C and B2B buyers worldwide.",
      fr: "Une plateforme e-commerce internationale qui fait rayonner l'artisanat marocain — tapis, zellige, poterie — auprès d'acheteurs B2C et B2B à travers le monde.",
    },
    challenge: {
      en: "Moroccan artisans and workshops had strong craftsmanship but no direct channel to international buyers, and needed a platform handling both individual retail orders and larger B2B wholesale requests.",
      fr: "Les artisans et ateliers marocains disposaient d'un savoir-faire fort mais d'aucun canal direct vers les acheteurs internationaux, et avaient besoin d'une plateforme capable de gérer aussi bien les commandes de détail que les demandes B2B en gros volume.",
    },
    solution: {
      en: "Built on Next.js 16 and React 19, with a Prisma/MongoDB catalog, Stripe for secure international payments and Cloudinary for rich product imagery — covering both consumer checkout and dedicated B2B request flows.",
      fr: "Construite avec Next.js 16 et React 19, un catalogue Prisma/MongoDB, Stripe pour les paiements internationaux sécurisés et Cloudinary pour une imagerie produit riche — couvrant à la fois le paiement grand public et des parcours B2B dédiés.",
    },
    impact: {
      en: "Gave a Moroccan consulting firm's artisan network a direct, professional storefront to reach international markets — a first digital sales channel for several of the workshops involved.",
      fr: "A donné au réseau d'artisans d'un cabinet de conseil marocain une vitrine digitale professionnelle et directe vers les marchés internationaux — un premier canal de vente digital pour plusieurs des ateliers concernés.",
    },
    tech: ["Next.js 16", "React 19", "MongoDB", "Prisma ORM", "Stripe", "Cloudinary"],
    tags: ["E-Commerce", "Artisanat", "International", "B2B"],
  },
  {
    slug: "choufon",
    image: "/images/projects/choufon.png",
    title: "Choufon",
    category: "Innovation",
    year: "2025",
    summary: {
      en: "An augmented-reality menu SaaS for restaurants — diners preview dishes in 3D/AR and order by QR code, across multiple venues.",
      fr: "Un SaaS de menus en réalité augmentée pour restaurants — les clients visualisent les plats en 3D/AR et commandent par QR code, sur plusieurs établissements.",
    },
    solution: {
      en: "A multi-tenant platform letting restaurant groups manage 3D/AR dishes and QR-code ordering across every venue from one dashboard, built with Next.js and React.",
      fr: "Une plateforme multi-établissements permettant aux groupes de restaurants de gérer des plats en 3D/AR et la commande par QR code sur tous leurs points de vente depuis un seul tableau de bord, développée en Next.js et React.",
    },
    tech: ["Next.js", "React", "3D/AR"],
    tags: ["SaaS", "Restauration", "AR/3D"],
  },
  {
    slug: "butconsult",
    image: "/images/projects/butconsult.png",
    title: "ButConsult",
    category: "Platforms",
    year: "2025",
    summary: {
      en: "A B2B digital ecosystem for an Industry 4.0 consulting firm, structuring 18 solutions across 9 practice areas into one coherent platform.",
      fr: "Un écosystème digital B2B pour un cabinet de conseil Industrie 4.0, structurant 18 solutions réparties en 9 pôles au sein d'une plateforme cohérente.",
    },
    tech: ["Next.js", "React"],
    tags: ["B2B", "Consulting", "Industrie 4.0"],
  },
  {
    slug: "petits-debrouillards-maroc",
    image: "/images/projects/petits-debrouillards.png",
    title: "Les Petits Débrouillards Maroc",
    category: "EdTech",
    year: "2026",
    client: "Association Marocaine des Petits Débrouillards",
    summary: {
      en: "A cinematic showcase website for Morocco's science-outreach association — staging the association's 40 years of presence in Morocco, its activities, lab programs and news in a full-bleed, animated design.",
      fr: "Site vitrine cinématique pour l'association marocaine de médiation scientifique — mettant en scène 40 ans de présence de l'association au Maroc, ses activités, le programme du Labo et ses actualités, dans un design plein cadre et animé.",
    },
    tech: [],
    tags: ["EdTech", "Association", "Science", "Maroc"],
  },
];

/**
 * SKILLS — issues du CV (section "Skills") + stack confirmé sur les projets livrés.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Development", fr: "Développement" },
    icon: "LayoutTemplate",
    skills: ["JavaScript", "React", "Next.js", "Node.js", "TypeScript", "Python", "Django", "HTML5 / CSS3", "Mobile Development"],
  },
  {
    title: { en: "AI & Data", fr: "IA & Data" },
    icon: "BrainCircuit",
    skills: ["Machine Learning", "Data Analysis", "Automation", "Predictive Models"],
  },
  {
    title: { en: "Cybersecurity", fr: "Cybersécurité" },
    icon: "ShieldCheck",
    skills: ["Security Audit", "Data Protection", "Application Security", "Regulatory Compliance"],
  },
  {
    title: { en: "Backend & Infra", fr: "Backend & Infra" },
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "Prisma ORM", "Supabase", "Firebase", "NextAuth"],
  },
  {
    title: { en: "Design & Tools", fr: "Design & Outils" },
    icon: "Palette",
    skills: ["Figma", "Adobe Illustrator", "Tailwind CSS", "Shadcn/UI", "Framer Motion"],
  },
  {
    title: { en: "Leadership", fr: "Leadership" },
    icon: "Users",
    skills: ["Project Management", "Technical Communication", "Mentoring & Training", "Innovation & Creativity"],
  },
];

/** Liste plate utilisée pour le bandeau défilant (marquee) */
export const marqueeSkills = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Supabase",
  "Firebase",
  "Machine Learning",
  "Cybersecurity",
  "Figma",
];

/**
 * EXPERIENCE — parcours professionnel complet (CV, section "Professional Experience").
 */
export const experience: ExperienceItem[] = [
  {
    role: { en: "Founder & CEO", fr: "Fondateur & CEO" },
    org: "Netnook",
    period: { en: "2023 — Present", fr: "2023 — Présent" },
    location: "Salé, Maroc",
    current: true,
    description: {
      en: "Founded and lead Netnook, building AI-powered digital platforms and leading cybersecurity audits and strategic partnerships for clients across Morocco and Africa.",
      fr: "Fondateur et dirigeant de Netnook : conception de plateformes digitales propulsées par l'IA, audits de cybersécurité et partenariats stratégiques pour des clients au Maroc et en Afrique.",
    },
    bullets: [
      {
        en: "Supporting clients and startups in designing their digital strategies.",
        fr: "Accompagnement de clients et startups dans la conception de leur stratégie digitale.",
      },
      {
        en: "Creating and managing a company specialized in digitalization, AI and cybersecurity.",
        fr: "Création et gestion d'une entreprise spécialisée en digitalisation, IA et cybersécurité.",
      },
      {
        en: "Conducting cybersecurity audits and implementing data protection protocols compliant with international standards.",
        fr: "Réalisation d'audits de cybersécurité et mise en place de protocoles de protection des données conformes aux standards internationaux.",
      },
    ],
    tech: ["Next.js", "TypeScript", "AI", "Cybersecurity"],
  },
  {
    role: { en: "Technical Support Lead", fr: "Responsable Support Technique" },
    org: "ECOP Morocco",
    period: { en: "2023 — 2025", fr: "2023 — 2025" },
    location: "Maroc",
    current: false,
    description: {
      en: "Lead the technical platform behind ECOP Morocco's ocean advocacy network, from secure infrastructure to cybersecurity training for young ocean professionals.",
      fr: "Responsable technique de la plateforme d'ECOP Morocco, du réseau océanique à la formation des jeunes professionnels de l'océan en cybersécurité.",
    },
    bullets: [
      {
        en: "Developing and maintaining digital platforms dedicated to ocean professionals.",
        fr: "Développement et maintenance de plateformes digitales dédiées aux professionnels de l'océan.",
      },
      {
        en: "Designing secure infrastructures for accessing and disseminating ocean and environmental knowledge.",
        fr: "Conception d'infrastructures sécurisées pour l'accès et la diffusion des connaissances océaniques et environnementales.",
      },
      {
        en: "Training network members on cybersecurity, data protection and effective use of digital tools.",
        fr: "Formation des membres du réseau à la cybersécurité, la protection des données et l'usage efficace des outils numériques.",
      },
    ],
    tech: ["Next.js", "Supabase", "Cybersecurity"],
  },
  {
    role: { en: "Full-Stack Developer & Programming", fr: "Développeur Full-Stack & Programmation" },
    org: "Freelance",
    period: { en: "2020 — Present", fr: "2020 — Présent" },
    location: "Maroc",
    current: true,
    description: {
      en: "Independent full-stack developer building custom web and mobile products, integrating AI/ML and robust security across every project.",
      fr: "Développeur full-stack indépendant : conception de produits web et mobiles sur mesure, intégration d'IA/ML et sécurité robuste sur chaque projet.",
    },
    bullets: [
      {
        en: "Designing and developing custom web platforms and mobile applications for various clients and industries.",
        fr: "Conception et développement de plateformes web et d'applications mobiles sur mesure pour des clients de divers secteurs.",
      },
      {
        en: "Integrating AI & Machine Learning solutions for data analysis and process automation.",
        fr: "Intégration de solutions IA & Machine Learning pour l'analyse de données et l'automatisation des processus.",
      },
      {
        en: "Optimizing performance and user experience to ensure fast and efficient applications.",
        fr: "Optimisation des performances et de l'expérience utilisateur pour des applications rapides et efficaces.",
      },
    ],
    tech: ["React", "Node.js", "Python", "Machine Learning"],
  },
  {
    role: { en: "Mentor & Trainer, Cybersecurity and Digitalization", fr: "Mentor & Formateur, Cybersécurité et Digitalisation" },
    org: "Freelance",
    period: { en: "2024 — Present", fr: "2024 — Présent" },
    location: "Maroc",
    current: true,
    description: {
      en: "Train young entrepreneurs and students in cybersecurity and digital transformation through bootcamps, hackathons and hands-on mentoring.",
      fr: "Formation de jeunes entrepreneurs et étudiants à la cybersécurité et à la transformation digitale à travers bootcamps, hackathons et mentorat de terrain.",
    },
    bullets: [
      {
        en: "Training young entrepreneurs on digital risks, cybersecurity and business digitalization.",
        fr: "Formation de jeunes entrepreneurs aux risques numériques, à la cybersécurité et à la digitalisation des entreprises.",
      },
      {
        en: "Organizing bootcamps and hackathons to encourage technological entrepreneurship and innovation.",
        fr: "Organisation de bootcamps et hackathons pour encourager l'entrepreneuriat technologique et l'innovation.",
      },
      {
        en: "Providing personalized mentoring to young innovators, particularly in disadvantaged regions.",
        fr: "Mentorat personnalisé de jeunes innovateurs, notamment dans les régions défavorisées.",
      },
    ],
  },
  {
    role: { en: "Student Entrepreneur", fr: "Étudiant-Entrepreneur" },
    org: "Mohammed V University",
    period: { en: "2022 — 2024", fr: "2022 — 2024" },
    location: "Rabat, Maroc",
    current: false,
    description: {
      en: "Official student-entrepreneur at Mohammed V University, developing innovation projects alongside academic studies with support from the university's entrepreneurship center.",
      fr: "Étudiant-entrepreneur officiel à l'Université Mohammed V, développement de projets innovants en parallèle des études avec le soutien du centre d'entrepreneuriat universitaire.",
    },
    bullets: [
      {
        en: "Access to a network of experts, investors and entrepreneurs to develop innovative projects.",
        fr: "Accès à un réseau d'experts, investisseurs et entrepreneurs pour développer des projets innovants.",
      },
      {
        en: "Structured framework for building entrepreneurial skills alongside the academic curriculum.",
        fr: "Cadre structuré pour développer des compétences entrepreneuriales en parallèle du cursus académique.",
      },
    ],
  },
];

/** EDUCATION — CV, section "Education" */
export const education: EducationItem[] = [
  {
    degree: {
      en: "Bachelor's Degree in Mathematical and Computer Sciences",
      fr: "Licence en Sciences Mathématiques et Informatique",
    },
    school: "Mohammed V University of Rabat",
    period: { en: "2020 — 2024", fr: "2020 — 2024" },
    details: [
      {
        en: "Specialization in advanced algorithms, artificial intelligence and computer security.",
        fr: "Spécialisation en algorithmique avancée, intelligence artificielle et sécurité informatique.",
      },
      {
        en: "Academic projects in software development, data analysis and mathematical modeling.",
        fr: "Projets académiques en développement logiciel, analyse de données et modélisation mathématique.",
      },
    ],
  },
  {
    degree: {
      en: "Baccalaureate in Mathematical Sciences",
      fr: "Baccalauréat Sciences Mathématiques",
    },
    school: "Mohammed Jamal Dorra High School, Salé",
    period: { en: "2019", fr: "2019" },
    details: [
      {
        en: "Obtained with honors, specialization in mathematics and physical sciences.",
        fr: "Obtenu avec mention, spécialisation en mathématiques et sciences physiques.",
      },
    ],
  },
];

/** LANGUAGES — CV, section "Languages & Certifications" */
export const languages: LanguageItem[] = [
  { name: { en: "Arabic", fr: "Arabe" }, level: { en: "Native", fr: "Langue maternelle" }, fluency: 100 },
  { name: { en: "French", fr: "Français" }, level: { en: "Fluent", fr: "Courant" }, fluency: 90 },
  { name: { en: "English", fr: "Anglais" }, level: { en: "Professional", fr: "Professionnel" }, fluency: 80 },
];

/** CERTIFICATIONS — CV, section "Languages & Certifications" */
export const certifications: string[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "UI/UX Design",
  "Cybersecurity",
  "Full-Stack Web Development",
];

/** ENGAGEMENT ASSOCIATIF — réseaux entrepreneuriaux et bénévolat */
export const associations: string[] = [
  "Enactus",
  "STARTGATE (UM6P)",
  "Climate Fresk — Facilitateur",
];

/** Stats bar — chiffres vérifiés (CV + projets livrés) */
export const stats: StatItem[] = [
  { value: experienceYears, suffix: "+", label: { en: "Years of experience", fr: "Ans d'expérience" } },
  { value: 12, suffix: "+", label: { en: "Projects delivered", fr: "Projets livrés" } },
  { value: 20, suffix: "K+", label: { en: "Users impacted", fr: "Utilisateurs impactés" } },
  { value: 50, suffix: "%", label: { en: "Avg. efficiency gain", fr: "Gain d'efficacité moyen" } },
];
