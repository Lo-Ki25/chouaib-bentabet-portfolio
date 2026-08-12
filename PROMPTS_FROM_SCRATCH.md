# Créer le portfolio à zéro sur Cursor — suite complète de prompts

Cette suite part d'un **dossier vide** et reconstruit tout le projet, prompt par prompt, dans Cursor (Cmd/Ctrl+L pour le chat, ou Cmd/Ctrl+K pour l'édition inline). Colle-les **dans l'ordre**, laisse Cursor exécuter/écrire, vérifie que ça compile avant de passer au suivant.

---

## PHASE A — Initialisation

### Prompt 1 — Créer le projet
```
Crée un nouveau projet Next.js 14 avec : TypeScript, Tailwind CSS, ESLint, App Router, pas de dossier src/, alias d'import "@/*". Utilise create-next-app avec ces options. Une fois créé, montre-moi l'arborescence générée.
```

### Prompt 2 — Dépendances additionnelles
```
Installe ces dépendances dans le projet : framer-motion, lucide-react, clsx, tailwind-merge, react-hook-form, zod, @hookform/resolvers. Vérifie qu'elles apparaissent bien dans package.json.
```

---

## PHASE B — Design system

### Prompt 3 — Palette et thème Tailwind
```
Configure tailwind.config.ts pour un design sombre premium :
- darkMode: "class"
- content couvrant ./app, ./components, ./context, ./lib
- colors.base : { DEFAULT: "#05070D", 50: "#F5F7FF", 900: "#05070D", 950: "#020306" }
- colors.surface : { DEFAULT: "#0B0F1E", light: "#111830" }
- colors.accent : une échelle bleu électrique de 50 à 900 avec DEFAULT "#3B6BFF" (50:#EEF2FF, 100:#DCE4FF, 200:#B7C6FF, 300:#8FA4FF, 400:#6483FF, 500:#3B6BFF, 600:#2450E0, 700:#1A3CB8, 800:#152F8F, 900:#101F5C)
- colors.violet DEFAULT "#8B5CF6", colors.cyan DEFAULT "#22D3EE", colors.muted "#94A3B8"
- fontFamily.display = var(--font-sora), fontFamily.body = var(--font-inter), fontFamily.mono = var(--font-mono)
- backgroundImage.radial-fade = un radial-gradient bleu qui s'estompe, pour un halo derrière le hero
- keyframes + animation : "marquee" (translateX 0 → -50%, 28s linear infinite, pour un bandeau de logos qui défile), "blob" (translate/scale organique, 14s ease-in-out infinite, pour des formes de fond flottantes), "pulse-glow" (opacity 0.6↔1, 3s), "fade-in-up"
- boxShadow : "glow" (halo bleu large), "glow-sm" (halo bleu resserré), "card" (ombre de carte discrète)
```

### Prompt 4 — Styles globaux
```
Crée app/globals.css avec les directives Tailwind (@tailwind base/components/utilities) puis, dans un @layer utilities, ajoute :
- .text-gradient : texte en dégradé bleu → cyan (bg-clip-text text-transparent bg-gradient-to-r from-accent-300 via-accent-500 to-cyan)
- .glass : fond semi-transparent (rgba(13,19,38,0.55)) + backdrop-filter: blur(16px)
- .card-border : bordure 1px rgba(255,255,255,0.08)
- .bg-grid : fond en grille de lignes très fines (rgba(255,255,255,0.045), 44px x 44px) avec un mask-image radial pour l'estomper vers le bas
- .balance : text-wrap: balance
Ajoute aussi : scroll-behavior smooth sur html, une couleur de sélection de texte bleutée, une scrollbar personnalisée fine et sombre, un style focus-visible accessible (outline bleu), et une classe html.has-custom-cursor qui force cursor: none partout (sauf sur les écrans tactiles via une media query hover:none).
```

### Prompt 5 — Layout racine
```
Crée app/layout.tsx : charge les polices Google via next/font (Sora en variable --font-sora pour les titres avec les poids 400-800, Inter en variable --font-inter pour le texte courant, JetBrains_Mono en variable --font-mono pour les extraits de code). Ajoute des metadata SEO complètes (title "Chouaib Bentabet — Full-Stack Developer", description en français sur le développement Next.js/TypeScript et Netnook, openGraph, twitter card). Le body doit englober toute la page dans un LanguageProvider (à créer plus tard), afficher 3 calques de fond fixes en -z-10/-z-20 (couleur de base, grille bg-grid, halo bg-radial-fade) et monter un composant SmoothCursor (à créer plus tard) avant le contenu.
```

---

## PHASE C — Types et contenu (le plus important : contenu 100% réel, à ne pas inventer)

### Prompt 6 — Types partagés
```
Crée types/index.ts avec ces types TypeScript exportés :
- Lang = "fr" | "en"
- LocalizedText = { fr: string; en: string }
- ProjectCategory = "EdTech" | "Platforms" | "Branding" | "Innovation"
- ProjectMetric = { value: string; label: LocalizedText }
- Project = { slug: string; title: string; category: ProjectCategory; year: string; client?: string; personal?: boolean; summary: LocalizedText; challenge?: LocalizedText; solution?: LocalizedText; impact?: LocalizedText; metrics?: ProjectMetric[]; recognitions?: string[]; tech: string[]; tags: string[]; featured?: boolean }
- SkillGroup = { title: LocalizedText; icon: string; skills: string[] }
- ExperienceItem = { role: LocalizedText; org: string; period: LocalizedText; location: string; description: LocalizedText; bullets?: LocalizedText[]; tech?: string[]; current?: boolean }
- EducationItem = { degree: LocalizedText; school: string; period: LocalizedText; details: LocalizedText[] }
- LanguageItem = { name: LocalizedText; level: LocalizedText; fluency: number }
- StatItem = { value: number; suffix?: string; label: LocalizedText }
```

### Prompt 7 — Contenu réel (le fichier le plus important du projet)
```
Crée lib/data.ts (importe les types depuis "@/types") avec exactement ce contenu réel — n'invente rien, n'ajoute aucune donnée fictive :

PROFIL :
- name: "Chouaib Bentabet", initials: "CB"
- title: { en: "Entrepreneur, Full-Stack Developer & Founder of Netnook", fr: "Entrepreneur, Développeur Full-Stack & Fondateur de Netnook" }
- email: "bentabet.chouaib25@gmail.com", phone: "+212 601 381 005", location: "Salé, Maroc"
- agency: "Netnook", agencyUrl: "https://netnook.solutions"
- socials: { github: "#", linkedin: "#", twitter: "https://twitter.com/netnook", facebook: "https://www.facebook.com/netnook" } (github/linkedin en placeholder "#" à compléter plus tard)

Exporte CAREER_START_YEAR = 2020 et calcule experienceYears = année actuelle - 2020 (Math.max(..., 1)).

Citation personnelle (missionStatement, LocalizedText) : "I believe digital innovation can be a powerful lever for positive transformation — especially across Morocco and the Global South. I build technology that serves people and the planet." / "Je crois que l'innovation digitale peut être un levier puissant de transformation positive pour les sociétés, en particulier au Maroc et dans le Sud global. Je conçois des technologies au service des personnes et de la planète."

Valeurs (values, LocalizedText[]) : Ethical Innovation/Innovation éthique, Digital Inclusion/Inclusion numérique, Environmental Sustainability/Durabilité environnementale, Social Equity/Équité sociale, Knowledge Transfer/Transfert de connaissances.

PROJETS (projects: Project[]) — 8 projets, tous réels :

1. IRIS Software (slug: iris-software, category: Platforms, year: 2026, client: FICRA CONSEIL, featured: true) — app interne qui génère/valide/diffuse rapports de visite, comptes-rendus et fiches de revue documentaire. Challenge : rapports manuels Word/Excel = erreurs et perte de temps, besoin d'un système centralisé sécurisé. Solution : Next.js 14+, TypeScript, Tailwind, Shadcn/UI, MongoDB via Prisma ORM, formulaires React Hook Form + Zod, auth individuelle via NextAuth. Impact : -50% temps de production, conformité renforcée, 100+ rapports générés. Metrics : 100% collaborateurs équipés, 50% gain de temps, 100+ rapports générés, 95% satisfaction interne. Tech : Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI, Prisma ORM, MongoDB, NextAuth, React Hook Form. Tags : audit, reporting, digital transformation, web application.

2. ECOP Morocco (slug: ecop-morocco, category: EdTech, year: 2025, client: Early Career Ocean Professionals, featured: true) — plateforme de gestion des événements/publications/conférences d'ECOP Morocco (réseau océanique jeunesse, Décennie des Nations Unies pour les sciences océaniques). Challenge : outils dispersés (Google Forms, WhatsApp, Docs), aucune présence digitale unifiée. Solution : 2 phases — prototype Webflow + Notion CMS, puis plateforme sur mesure Next.js + Supabase + Tailwind CSS avec dashboard événementiel, profils d'intervenants, vérification participants, design multilingue AR-FR-EN à thème océanique. Impact : forte hausse de visibilité, trafic partenaire international, présence renforcée à l'UNOC-3 et COP30. Metrics : 4 événements majeurs, 600+ participants inscrits, 12+ organisations partenaires, 900+ téléchargements de rapports. Tech : Next.js, Tailwind CSS, Supabase, PostgreSQL, Notion API, Airtable, Figma. Tags : Responsive Design, Youth-Driven, Multilingual, Ocean Science.

3. AfricEduc Learning Platform (slug: africeduc, category: EdTech, year: 2025, featured: true) — plateforme e-learning connectant des étudiants africains à du contenu éducatif de qualité. Challenge : gérer des milliers d'utilisateurs simultanés sur connexions instables. Solution : React + Next.js (frontend), Node.js + PostgreSQL (backend), cache avancé, médias optimisés. Impact : 50 000+ étudiants, 85% engagement, 4.8/5 satisfaction. Metrics : 50K+ étudiants, 85% engagement, 4.8/5 satisfaction. Tech : React, Next.js, Node.js, PostgreSQL. Tags : Education, E-Learning, Africa.

4. Digital LN Marketplace (slug: digital-ln-marketplace, category: Platforms, year: 2025) — marketplace digitale pour transactions sécurisées acheteurs/vendeurs. Challenge : fiabilité à fort volume de transactions. Solution : Vue.js + TypeScript (frontend typé), Firebase (temps réel + auth), Stripe (paiements). Impact : 10 000+ transactions, +150% croissance an 1, 4.9/5. Metrics : 10K+ transactions, 150% croissance, 4.9/5 note utilisateur. Tech : Vue.js, TypeScript, Firebase, Stripe. Tags : Marketplace, E-Commerce, Transactions.

5. SolarAgroBot (slug: solaragrobot, category: Innovation, year: "2023 – 2024", personal: true, featured: true) — robot solaire pour l'agriculture intelligente combinant IA, IoT et modèles prédictifs pour optimiser l'irrigation, détecter précocement les maladies des plantes, réduire eau et pesticides. Solution : IA + capteurs IoT + modèles prédictifs d'agriculture de précision, alimenté à l'énergie solaire. Impact : réduction significative eau/pesticides, présenté en compétitions nationales/internationales, soutenu par 2 programmes d'incubation. Metrics : 6 compétitions & événements, 2 programmes d'incubation. Recognitions (string[]) : "AgriYoungInnovate (2nd edition)", "ICAMES", "One Young World Summit", "FinTech Hackathon V2.0", "AgriFood Tech", "UM5 Startupeur Challenge", "Mitsandbox Explorer", "AgriEdge". Tech : Artificial Intelligence, IoT, Python, Automation. Tags : AgriTech, Sustainability, Robotics.

6. UIB Innovation — Branding (slug: uib-innovation-branding, category: Branding, year: 2025) — identité visuelle complète pour UIB Innovation. Tech : Adobe Illustrator, Figma, UI/UX. Tags : Branding, Innovation, Tech.

7. AFRIC EDUC — Branding (slug: afric-educ-branding, category: Branding, year: 2025) — identité visuelle complète pour AFRIC EDUC (secteur éducatif). Tech : Figma, Adobe Illustrator. Tags : Branding, Design System, Education.

8. Ma Thèse en 180 Secondes — Maroc (slug: mt180-maroc, category: Innovation, year: 2025) — contenus graphiques/digitaux pour la compétition scientifique MT180. Tech : Figma, Adobe Illustrator. Tags : Science, EdTech, Communication.

Chaque "summary"/"challenge"/"solution"/"impact" doit être un LocalizedText { en, fr } — rédige la version manquante dans l'autre langue en gardant le même sens.

COMPÉTENCES (skillGroups: SkillGroup[], 6 groupes) :
- Development (icon "LayoutTemplate") : JavaScript, React, Next.js, Node.js, TypeScript, Python, Django, HTML5 / CSS3, Mobile Development
- AI & Data (icon "BrainCircuit") : Machine Learning, Data Analysis, Automation, Predictive Models
- Cybersecurity (icon "ShieldCheck") : Security Audit, Data Protection, Application Security, Regulatory Compliance
- Backend & Infra (icon "Database") : MongoDB, PostgreSQL, Prisma ORM, Supabase, Firebase, NextAuth
- Design & Tools (icon "Palette") : Figma, Adobe Illustrator, Tailwind CSS, Shadcn/UI, Framer Motion
- Leadership (icon "Users") : Project Management, Technical Communication, Mentoring & Training, Innovation & Creativity

Exporte aussi marqueeSkills (string[], pour un bandeau défilant) : Next.js, TypeScript, React, Node.js, Python, Tailwind CSS, PostgreSQL, MongoDB, Prisma, Supabase, Firebase, Machine Learning, Cybersecurity, Figma.

EXPÉRIENCE (experience: ExperienceItem[], 5 entrées, toutes current: true) :
1. Founder & CEO / Fondateur & CEO — Netnook — 2024–Présent — Salé, Maroc. Fondation et direction de Netnook (plateformes digitales propulsées par IA, audits cybersécurité, partenariats stratégiques Maroc/Afrique). Bullets : accompagnement clients/startups en stratégie digitale ; création/gestion d'une entreprise spécialisée digitalisation/IA/cybersécurité ; audits de cybersécurité et protocoles de protection des données conformes aux standards internationaux. Tech : Next.js, TypeScript, AI, Cybersecurity.
2. Technical Support Lead / Responsable Support Technique — ECOP Morocco — 2023–Présent — Maroc. Responsable technique de la plateforme d'ECOP Morocco. Bullets : développement/maintenance de plateformes pour professionnels de l'océan ; infrastructures sécurisées pour connaissances océaniques/environnementales ; formation du réseau à la cybersécurité et protection des données. Tech : Next.js, Supabase, Cybersecurity.
3. Full-Stack Developer & Programming / Développeur Full-Stack & Programmation — Freelance — 2020–Présent — Maroc. Développeur indépendant, produits web/mobiles sur mesure, IA/ML intégrée. Bullets : conception/développement de plateformes web et applications mobiles sur mesure ; intégration IA & Machine Learning pour analyse de données et automatisation ; optimisation performance et expérience utilisateur. Tech : React, Node.js, Python, Machine Learning.
4. Mentor & Trainer, Cybersecurity and Digitalization / Mentor & Formateur, Cybersécurité et Digitalisation — Freelance — 2024–Présent — Maroc. Formation de jeunes entrepreneurs et étudiants à la cybersécurité et transformation digitale. Bullets : formation aux risques numériques/cybersécurité/digitalisation ; organisation de bootcamps et hackathons ; mentorat personnalisé, notamment en régions défavorisées. (pas de champ tech)
5. Student Entrepreneur / Étudiant-Entrepreneur — Mohammed V University — 2023–Présent — Rabat, Maroc. Étudiant-entrepreneur officiel, projets d'innovation en parallèle des études. Bullets : accès réseau d'experts/investisseurs/entrepreneurs ; cadre structuré pour développer des compétences entrepreneuriales. (pas de champ tech)

FORMATION (education: EducationItem[], 2 entrées) :
1. Bachelor's Degree in Mathematical and Computer Sciences / Licence en Sciences Mathématiques et Informatique — Mohammed V University of Rabat — 2020–Présent. Détails : spécialisation algorithmique avancée/IA/sécurité informatique ; projets académiques en développement logiciel, analyse de données, modélisation mathématique.
2. Baccalaureate in Mathematical Sciences / Baccalauréat Sciences Mathématiques — Mohammed Jamal Dorra High School, Salé — 2020. Détails : obtenu avec mention, spécialisation mathématiques et sciences physiques.

LANGUES (languages: LanguageItem[]) : Arabic/Arabe — Native/Langue maternelle — fluency 100 ; French/Français — Fluent/Courant — fluency 90 ; English/Anglais — Professional/Professionnel — fluency 80.

CERTIFICATIONS (certifications: string[]) : Artificial Intelligence, Machine Learning, UI/UX Design, Cybersecurity, Full-Stack Web Development.

STATS (stats: StatItem[], 4 entrées) : { value: experienceYears, suffix: "+", label: "Years of experience"/"Ans d'expérience" }, { value: 7, suffix: "+", label: "Projects delivered"/"Projets livrés" }, { value: 60, suffix: "K+", label: "Users impacted"/"Utilisateurs impactés" }, { value: 50, suffix: "%", label: "Avg. efficiency gain"/"Gain d'efficacité moyen" }.
```

### Prompt 8 — Traductions / dictionnaire i18n
```
Crée lib/translations.ts : exporte un type Dictionary strict (nav, hero, about, skills, experience, projects, contact, footer — avec toutes leurs clés en string) puis translations: Record<Lang, Dictionary> avec fr et en STRICTEMENT symétriques (mêmes clés dans les deux langues). Contenu clé :

- nav : Accueil/Home, À propos/About, Compétences/Skills, Parcours/Experience, Projets/Projects, Contact/Contact, Discutons/Let's talk
- hero.title1/2/3 : "Je conçois des produits web" / "rapides, élégants" / "et pensés pour durer." (FR) — "I build web products that are" / "fast, elegant" / "and built to last." (EN). subtitle : présente Chouaib comme développeur full-stack basé au Maroc, fondateur de Netnook, qui transforme des idées en plateformes performantes.
- about.body : bio complète — développeur full-stack et fondateur de Netnook (agence digitale basée à Salé, Maroc), plateformes rapides/sécurisées/animées en Next.js/TypeScript, exemples chiffrés (50% de temps gagné, 50 000+ étudiants).
- experience : sous-titre orienté "de la création de Netnook au mentorat de jeunes entrepreneurs", + clés educationTitle/languagesTitle/certificationsTitle/present.
- contact : champs de formulaire (nom, email, message), messages d'erreur de validation (nom min 2 caractères, email invalide, message min 10 caractères), message de succès.
- footer.tagline : "Développeur full-stack — je construis des produits web rapides, élégants et bien pensés." / équivalent EN.

N'invente pas de nouvelles sections ; garde exactement la même liste de clés que le type Dictionary que tu viens de définir.
```

### Prompt 9 — Contexte de langue
```
Crée context/LanguageContext.tsx ("use client") : un React Context avec { lang, toggleLang, setLang, dict }. Au montage, lit un lang sauvegardé dans localStorage (clé "portfolio-lang"), sinon détecte navigator.language (fr si ça commence par "fr", sinon en). setLang met à jour le state ET localStorage. Exporte un hook useLanguage() qui throw une erreur explicite s'il est utilisé hors du Provider. dict doit être typé Dictionary (importé depuis lib/translations) et valoir translations[lang].
```

---

## PHASE D — Primitives UI

### Prompt 10 — Utilitaire de classes + primitives d'animation
```
Crée lib/utils.ts avec une fonction cn(...inputs) qui combine clsx et tailwind-merge.

Crée ensuite trois composants dans components/ui/ :
1. AnimatedSection.tsx ("use client") : wrapper motion.div/motion.section générique avec props children, className, delay, duration, direction ("up"|"down"|"left"|"right"|"none"), distance, once, as. Anime opacity 0→1 + un léger déplacement (translateY ou translateX selon la direction) au scroll via whileInView (viewport once, margin "-80px"), easing [0.22,1,0.36,1].
2. Counter.tsx ("use client") : anime un nombre de 0 jusqu'à value quand il entre dans le viewport (useInView de framer-motion), via requestAnimationFrame avec easing cubic-out, props value/suffix/duration/className.
3. SectionHeading.tsx ("use client") : affiche un badge "eyebrow" (pastille avec petit point pulsant), un h2 en font-display avec dégradé de texte optionnel, et un sous-titre. Props eyebrow/title/subtitle/align("left"|"center")/className. Utilise AnimatedSection en interne.
```

### Prompt 11 — Curseur personnalisé et styles de catégories
```
Crée components/SmoothCursor.tsx ("use client") : un curseur personnalisé desktop uniquement (détecte via matchMedia "(hover: hover) and (pointer: fine)"), composé d'un petit point qui suit la souris instantanément (useMotionValue) et d'un anneau qui suit avec un effet ressort (useSpring, damping ~30, stiffness ~320). L'anneau grossit (scale 1.6) et se remplit légèrement quand la souris survole un élément avec data-cursor-hover, a ou button. Ajoute/retire la classe "has-custom-cursor" sur <html> selon qu'on est sur desktop ou non. Se cache si la souris quitte la fenêtre.

Crée components/categoryStyles.ts : un Record<ProjectCategory, {gradient: string; badge: string}> avec un dégradé Tailwind distinct par catégorie (EdTech: cyan→bleu, Platforms: bleu→violet, Branding: fuchsia→violet, Innovation: ambre→orange→fuchsia) et une classe de badge assortie (fond/texte/bordure teintés à 10-30% d'opacité).
```

---

## PHASE E — Sections de la page

### Prompt 12 — Navigation
```
Crée components/Navbar.tsx ("use client") : barre fixe en haut, transparente en haut de page puis devient "glass" (fond flouté + bordure) au scroll (> 24px, écouteur scroll). Contient : logo (cercle dégradé avec initiales "CB" + "Chouaib."), liens de nav qui scrollent en douceur vers les sections (home/about/skills/experience/projects/contact) via scrollIntoView, un bouton de bascule de langue (icône + "FR"/"EN"), un bouton CTA "Discutons" qui scrolle vers #contact, et un menu burger responsive (drawer animé) sous le breakpoint lg. Utilise useLanguage() pour tous les textes.
```

### Prompt 13 — Hero
```
Crée components/Hero.tsx ("use client"), section id="home", plein écran. Fond : 3 formes floues animées (animate-blob) en dégradé bleu/violet/cyan à faible opacité. Colonne de gauche : badge eyebrow, titre H1 en 3 morceaux (le morceau du milieu en dégradé de texte), sous-titre, localisation avec icône MapPin, deux CTA (bouton principal dégradé "Voir mes projets" → scroll vers #projects, bouton secondaire outline "Me contacter" → #contact), puis une rangée de 4 statistiques animées (le composant Counter) tirées de lib/data.ts (stats). Colonne de droite (cachée en dessous de lg) : un panneau "glass" façon éditeur de code qui flotte doucement (animation y en boucle), affichant un faux extrait TypeScript présentant Chouaib (nom, rôle, stack, localisation), avec deux badges flottants superposés (un avec le premier stat animé, un avec un indicateur "Next.js · TypeScript" et un point vert pulsant). Indicateur de scroll animé en bas de section.
```

### Prompt 14 — À propos
```
Crée components/About.tsx ("use client"), section id="about", deux colonnes. Gauche : SectionHeading, bio (2 paragraphes depuis dict.about), un encadré citation (icône Quote) avec missionStatement, une liste de pastilles "values", un bouton "Télécharger mon CV" qui pointe vers /cv-chouaib-bentabet.pdf (download). Droite : une carte "glass" avec un avatar en dégradé affichant les initiales "CB", le nom et le titre du profil, puis une grille 2x2 de "quick facts" (basé à Salé/Maroc, freelance depuis 2020, fondateur depuis 2024, langues AR·FR·EN).
```

### Prompt 15 — Compétences
```
Crée components/Skills.tsx ("use client"), section id="skills". SectionHeading, puis un bandeau horizontal en défilement infini (classe animate-marquee, liste marqueeSkills dupliquée pour boucler, mask-image en dégradé sur les bords pour un fondu). En dessous, une grille de cartes (une par SkillGroup de lib/data.ts) avec icône (mappe le champ "icon" du groupe vers un composant lucide-react réel : LayoutTemplate, BrainCircuit, ShieldCheck, Database, Palette, Users), titre et badges de compétences.
```

### Prompt 16 — Parcours
```
Crée components/Experience.tsx ("use client"), section id="experience", deux colonnes. Gauche (2/3) : timeline verticale (bordure gauche + point sur chaque item) listant experience de lib/data.ts — rôle, badge "Présent" si current, organisation + lieu, période, description, liste à puces (bullets), badges tech. Droite (1/3), 3 cartes empilées : Formation (education, avec diplôme/école/période/détails), Langues (languages, avec une barre de progression basée sur "fluency"), Certifications (certifications, en badges). Tout est traduit via dict.experience.
```

### Prompt 17 — Projets + modale
```
Crée components/categoryStyles.ts si pas déjà fait, puis :

1. components/ProjectModal.tsx ("use client") : modale plein écran (AnimatePresence + fond flouté cliquable pour fermer, Escape pour fermer, scroll du body bloqué pendant l'ouverture). Affiche un bandeau dégradé (couleur selon la catégorie), le titre, année + client (ou badge "Projet personnel" si personal:true), le résumé, une grille de métriques si présentes, puis les blocs Challenge/Solution/Impact/Reconnaissances (Trophy icon) si présents, et enfin les badges de technologies.

2. components/Projects.tsx ("use client") : section id="projects". SectionHeading, boutons de filtre par catégorie (dérivés dynamiquement de la liste des projets + "All"/"Tous"), grille de cartes projet animée (AnimatePresence mode="popLayout", motion layout) — chaque carte a une vignette en dégradé de catégorie avec les initiales du titre en filigrane, badge "Featured" si featured:true, année en overlay, catégorie, titre, résumé tronqué (line-clamp-3), 3 premières technologies + "+N", lien "Voir le projet" qui ouvre ProjectModal au clic.
```

### Prompt 18 — Contact et pied de page
```
Crée components/Contact.tsx ("use client"), section id="contact", deux colonnes. Gauche : carte avec email/téléphone/localisation cliquables (icônes Mail/Phone/MapPin), réseaux sociaux (n'affiche que ceux dont l'URL n'est pas "#"), et un encadré secondaire qui renvoie vers netnook.solutions. Droite : formulaire (react-hook-form + zod, schéma recalculé via useMemo selon la langue pour des messages d'erreur localisés) avec champs nom/email/message, validation inline, bouton d'envoi qui construit un lien mailto: pré-rempli vers bentabet.chouaib25@gmail.com et affiche une confirmation de succès.

Crée components/Footer.tsx ("use client") : nom + tagline à gauche, copyright avec année dynamique + bouton "retour en haut" à droite.
```

---

## PHASE F — Assemblage, tests, finition

### Prompt 19 — Page d'accueil
```
Crée app/page.tsx (server component) qui importe et assemble, dans l'ordre : Navbar, puis dans un <main> : Hero, About, Skills, Experience, Projects, Contact, puis Footer en dehors du <main>.
```

### Prompt 20 — Build et corrections
```
Lance npm run dev, ouvre le site, corrige toute erreur TypeScript/ESLint/runtime. Vérifie particulièrement : que translations.fr et translations.en respectent exactement le même type Dictionary (pas de "as const" qui casserait l'assignabilité), que tous les imports "@/..." résolvent bien, et que les classes Tailwind dynamiques (dégradés par catégorie) sont des chaînes complètes et non construites par concaténation (sinon le JIT de Tailwind ne les génère pas).
```

### Prompt 21 — Personnalisation finale
```
1. Remplace le cercle d'initiales dans About.tsx par ma vraie photo (public/avatar.jpg, next/image, rounded-full).
2. Ajoute mon CV réel dans public/cv-chouaib-bentabet.pdf.
3. Mets à jour profile.socials.github et .linkedin dans lib/data.ts avec mes vrais liens.
4. Remplace le mailto: du formulaire de contact par un vrai envoi (API route app/api/contact/route.ts avec Resend), comme détaillé dans PLAN_ET_PROMPTS.md.
```

### Prompt 22 — Déploiement
```
Prépare le projet pour Vercel : vérifie que npm run build passe sans erreur, liste les variables d'environnement nécessaires (ex: clé API Resend), et donne-moi les étapes pour connecter ce repo GitHub à Vercel.
```

---

Une fois les 22 prompts exécutés, le résultat est identique au projet déjà livré dans ce dossier (`chouaib-portfolio/`) — tu peux à tout moment comparer ou repartir directement de celui-ci au lieu de tout refaire à zéro.
