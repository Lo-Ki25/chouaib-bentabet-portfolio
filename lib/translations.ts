import type { Lang } from "@/types";

/**
 * Forme explicite du dictionnaire — garantit que les branches fr/en
 * restent strictement identiques en structure (TypeScript refusera
 * de compiler si une clé manque dans l'une des deux langues).
 */
export type Dictionary = {
  nav: {
    home: string;
    about: string;
    services: string;
    transformation: string;
    cybersecurity: string;
    skills: string;
    marketDesign: string;
    experience: string;
    projects: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    available: string;
  };
  impact: {
    eyebrow: string;
    title: string;
    body: string;
  };
  chapters: {
    transformation: {
      eyebrow: string;
      title: string;
      body: string;
      pills: string[];
    };
    cybersecurity: {
      eyebrow: string;
      title: string;
      body: string;
      pills: string[];
    };
    marketDesign: {
      eyebrow: string;
      title: string;
      body: string;
      pills: string[];
    };
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    body2: string;
    valuesTitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      digitalPresence: { title: string; description: string };
      brandIdentity: { title: string; description: string };
      platforms: { title: string; description: string };
      automation: { title: string; description: string };
      socialImpact: { title: string; description: string };
    };
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    educationTitle: string;
    languagesTitle: string;
    certificationsTitle: string;
    associationsTitle: string;
    present: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    viewProject: string;
    close: string;
    challenge: string;
    solution: string;
    impact: string;
    tech: string;
    client: string;
    year: string;
    viewDemo: string;
    viewCode: string;
    viewFullPage: string;
    featured: string;
    personal: string;
    backToProjects: string;
    recognitions: string;
    emptyFilter: string;
  };
  partners: {
    eyebrow: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    direct: string;
    errorName: string;
    errorEmail: string;
    errorMessage: string;
    errorSend: string;
    serviceUnavailable: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    privacyNote: string;
    agencyBlurb: string;
    bookingIntro: string;
    errorNeedType: string;
    errorPreferredTime: string;
    needType: string;
    selectPlaceholder: string;
    needTypes: {
      digitalPresence: string;
      cybersecurity: string;
      projectDev: string;
      marketAnalysis: string;
      design: string;
    };
    preferredTime: string;
    preferredTimes: {
      morning: string;
      afternoon: string;
      anytime: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    backToTop: string;
  };
};

export const translations: Record<Lang, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      transformation: "Transformation",
      cybersecurity: "Cybersécurité",
      skills: "Compétences",
      marketDesign: "Marché & design",
      experience: "Parcours",
      projects: "Projets",
      contact: "Contact",
      cta: "Discutons",
    },
    hero: {
      eyebrow: "Chouaib Bentabet · Transformation digitale",
      title1: "IMPACT",
      title2: "",
      title3: "",
      subtitle:
        "Basé au Maroc, j'accompagne PME, associations et institutions dans leur transformation digitale — stratégie, identité de marque, plateformes web et cybersécurité, du premier échange au lancement.",
      ctaPrimary: "Voir mes projets",
      ctaSecondary: "Me contacter",
      scroll: "Défiler",
      available: "Disponible pour missions freelance",
    },
    impact: {
      eyebrow: "Impact",
      title: "Quelques chiffres",
      body: "Des indicateurs issus du travail déjà livré — années d'expérience, projets, personnes concernées et gains d'efficacité observés.",
    },
    chapters: {
      transformation: {
        eyebrow: "Transformation digitale",
        title: "Votre activité, une vraie présence digitale",
        body: "J'accompagne PME, associations et institutions pour structurer leur stratégie, leur identité et leurs plateformes web — du premier échange au lancement.",
        pills: ["Stratégie digitale", "Plateformes web", "Du premier échange au lancement"],
      },
      cybersecurity: {
        eyebrow: "Cybersécurité",
        title: "Sécurisé par conception",
        body: "Audits, protection des données et sécurisation applicative intégrés dès la conception — pas ajoutés à la fin.",
        pills: ["Protocoles validés", "Audit & conformité", "Sécurisation de bout en bout"],
      },
      marketDesign: {
        eyebrow: "Marché & design",
        title: "Comprendre le marché, avant de designer",
        body: "Identité de marque, positionnement et design system : une présence claire, avant même la première ligne de code.",
        pills: ["Identités de marque", "Positionnement", "Design system"],
      },
    },
    about: {
      eyebrow: "À propos",
      title: "Simplifier la transformation digitale, pour de vrai",
      body:
        "Je suis Chouaib Bentabet — j'aide les organisations à exister, se structurer et grandir sur le digital, basé à Salé, au Maroc. J'ai accompagné plus de 10 000 utilisateurs à travers l'Afrique, fait gagner jusqu'à 50 % de temps à des équipes entières, et construit l'identité de marque d'institutions comme UIB Innovation, AFRIC EDUC ou ECOP Morocco — avec, derrière chaque résultat, une exécution technique solide en Next.js, TypeScript et un écosystème moderne. Je porte une partie de ce travail à travers Netnook, l'agence que j'ai fondée.",
      body2:
        "Chaque mission part d'un vrai problème d'activité, jamais d'une simple envie technique : je clarifie l'objectif, je construis la solution — plateforme, identité, automatisation — et je reste impliqué jusqu'au lancement, et après.",
      valuesTitle: "Ce qui guide mon travail",
    },
    services: {
      eyebrow: "Offre",
      title: "Cinq leviers, chacun déjà prouvé",
      subtitle:
        "Ce que je mets en place pour les organisations — et les missions déjà livrées qui le démontrent.",
      items: {
        digitalPresence: {
          title: "Présence digitale & sites web",
          description:
            "Sites et plateformes qui font exister une activité en ligne, de la vitrine à la marketplace.",
        },
        brandIdentity: {
          title: "Identité de marque",
          description:
            "Identités visuelles et systèmes de marque pour institutions et organisations, lisibles d'un coup d'œil.",
        },
        platforms: {
          title: "Plateformes & outils métier",
          description:
            "Applications internes et plateformes métier pour structurer le quotidien des équipes, pas seulement une vitrine.",
        },
        automation: {
          title: "Automatisation & efficacité",
          description:
            "Process digitaux et automatisations qui font gagner du temps aux équipes — 50 % de gain d'efficacité moyen.",
        },
        socialImpact: {
          title: "Impact éducatif & social",
          description:
            "Plateformes et sites au service de l'éducation, de la jeunesse et de l'intérêt général.",
        },
      },
    },
    skills: {
      eyebrow: "Compétences",
      title: "Une stack moderne, de bout en bout",
      subtitle: "Les technologies que j'utilise au quotidien pour livrer des produits fiables et rapides.",
    },
    experience: {
      eyebrow: "Parcours",
      title: "Mon parcours professionnel",
      subtitle: "De la création de Netnook au mentorat de jeunes entrepreneurs — les étapes clés de mon parcours.",
      educationTitle: "Formation",
      languagesTitle: "Langues",
      certificationsTitle: "Certifications",
      associationsTitle: "Engagement associatif",
      present: "Présent",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Projets sélectionnés",
      subtitle: "Une sélection de plateformes, produits et identités de marque conçus et développés de bout en bout.",
      all: "Tous",
      viewProject: "Voir le projet",
      close: "Fermer",
      challenge: "Le défi",
      solution: "La solution",
      impact: "Résultats & impact",
      tech: "Technologies utilisées",
      client: "Client",
      year: "Année",
      viewDemo: "Voir la démo",
      viewCode: "Voir le code",
      viewFullPage: "Voir la page complète du projet",
      featured: "À la une",
      personal: "Projet personnel",
      backToProjects: "Retour aux projets",
      recognitions: "Compétitions & reconnaissance",
      emptyFilter: "Aucun projet dans cette catégorie pour le moment.",
    },
    partners: {
      eyebrow: "Organisations",
      title: "Ils m'ont fait confiance",
    },
    contact: {
      eyebrow: "Contact",
      title: "Discutons de votre prochain projet",
      subtitle:
        "On vous a peut-être déjà parlé de mon travail. Discutons de ce qui vous amène — votre activité, votre équipe, votre marque.",
      name: "Nom complet",
      email: "Adresse email",
      message: "Votre message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé ! Je vous répondrai rapidement.",
      direct: "Ou contactez-moi directement",
      errorName: "Merci d'indiquer votre nom (2 caractères min.)",
      errorEmail: "Adresse email invalide",
      errorMessage: "Votre message doit contenir au moins 10 caractères",
      errorSend: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email.",
      serviceUnavailable:
        "Le formulaire n'est pas encore configuré. Écrivez-moi directement par email en attendant.",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "vous@exemple.com",
      messagePlaceholder: "Parlez-moi de votre projet...",
      privacyNote:
        "Votre message est envoyé de façon sécurisée via notre formulaire. Vos données ne servent qu'à vous répondre.",
      agencyBlurb:
        "Ce travail est porté par Netnook, l'agence que j'ai fondée — pour les engagements qui demandent une structure d'entreprise.",
      bookingIntro: "Décrivez votre besoin : je vous propose un créneau pour en parler.",
      errorNeedType: "Merci de choisir un type de besoin",
      errorPreferredTime: "Merci d'indiquer un créneau préféré",
      needType: "Type de besoin",
      selectPlaceholder: "Choisir…",
      needTypes: {
        digitalPresence: "Présence digitale",
        cybersecurity: "Cybersécurité",
        projectDev: "Développement de projet",
        marketAnalysis: "Analyse de marché",
        design: "Design",
      },
      preferredTime: "Créneau préféré",
      preferredTimes: {
        morning: "Matin",
        afternoon: "Après-midi",
        anytime: "Peu importe",
      },
    },
    footer: {
      tagline:
        "Transformation digitale, cybersécurité, marque — un partenaire, pas un prestataire de plus.",
      rights: "Tous droits réservés.",
      backToTop: "Retour en haut",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      transformation: "Transformation",
      cybersecurity: "Cybersecurity",
      skills: "Skills",
      marketDesign: "Market & design",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      eyebrow: "Chouaib Bentabet · Digital Transformation",
      title1: "IMPACT",
      title2: "",
      title3: "",
      subtitle:
        "Based in Morocco, I help SMEs, nonprofits and institutions through digital transformation — strategy, brand identity, web platforms and cybersecurity, from first conversation to launch.",
      ctaPrimary: "View my work",
      ctaSecondary: "Get in touch",
      scroll: "Scroll",
      available: "Available for freelance work",
    },
    impact: {
      eyebrow: "Impact",
      title: "Key figures",
      body: "Indicators from work already delivered — years of practice, projects shipped, people reached, and efficiency gains observed.",
    },
    chapters: {
      transformation: {
        eyebrow: "Digital transformation",
        title: "Your activity, a real digital presence",
        body: "I help SMEs, nonprofits and institutions structure their strategy, brand identity and web platforms — from first conversation to launch.",
        pills: ["Digital strategy", "Web platforms", "From first talk to launch"],
      },
      cybersecurity: {
        eyebrow: "Cybersecurity",
        title: "Secure by design",
        body: "Audits, data protection and application security built in from the start — not bolted on at the end.",
        pills: ["Validated protocols", "Audit & compliance", "End-to-end security"],
      },
      marketDesign: {
        eyebrow: "Market & design",
        title: "Understand the market, then design",
        body: "Brand identity, positioning and design system: a clear presence, before the first line of code.",
        pills: ["Brand identities", "Positioning", "Design system"],
      },
    },
    about: {
      eyebrow: "About",
      title: "Making digital transformation genuinely simple",
      body:
        "I'm Chouaib Bentabet — I help organizations exist, structure themselves and grow digitally, based in Salé, Morocco. I have supported 10,000+ users across Africa, helped entire teams save up to 50% of their time, and built brand identities for institutions such as UIB Innovation, AFRIC EDUC and ECOP Morocco — with solid technical execution in Next.js, TypeScript and a modern stack behind every result. I run part of this work through Netnook, the agency I founded.",
      body2:
        "Every engagement starts from a real business problem, never from a technical whim: I clarify the goal, I build the solution — platform, identity, automation — and I stay involved through launch, and after.",
      valuesTitle: "What guides my work",
    },
    services: {
      eyebrow: "Services",
      title: "Five levers, each already proven",
      subtitle: "What I put in place for organizations — and the engagements already shipped that prove it.",
      items: {
        digitalPresence: {
          title: "Digital presence & websites",
          description:
            "Websites and platforms that give an activity a real online presence, from a showcase site to a marketplace.",
        },
        brandIdentity: {
          title: "Brand identity",
          description:
            "Visual identities and brand systems for institutions and organizations, readable at a glance.",
        },
        platforms: {
          title: "Platforms & business tools",
          description:
            "Internal applications and business platforms that structure teams' day-to-day work, not just a showcase.",
        },
        automation: {
          title: "Automation & efficiency",
          description:
            "Digital processes and automations that save teams time — 50% average efficiency gain.",
        },
        socialImpact: {
          title: "Educational & social impact",
          description:
            "Platforms and sites in service of education, youth and the public interest.",
        },
      },
    },
    skills: {
      eyebrow: "Skills",
      title: "A modern stack, end to end",
      subtitle: "The technologies I use every day to ship reliable, high-performance products.",
    },
    experience: {
      eyebrow: "Experience",
      title: "My professional journey",
      subtitle: "From founding Netnook to mentoring young entrepreneurs — the key milestones of my journey so far.",
      educationTitle: "Education",
      languagesTitle: "Languages",
      certificationsTitle: "Certifications",
      associationsTitle: "Community Involvement",
      present: "Present",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Selected projects",
      subtitle: "A selection of platforms, products and brand identities designed and built end to end.",
      all: "All",
      viewProject: "View project",
      close: "Close",
      challenge: "The challenge",
      solution: "The solution",
      impact: "Results & impact",
      tech: "Technologies used",
      client: "Client",
      year: "Year",
      viewDemo: "View demo",
      viewCode: "View code",
      viewFullPage: "View full project page",
      featured: "Featured",
      personal: "Personal project",
      backToProjects: "Back to projects",
      recognitions: "Competitions & recognition",
      emptyFilter: "No projects in this category yet.",
    },
    partners: {
      eyebrow: "Organizations",
      title: "Organizations I've worked with",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your next project",
      subtitle:
        "You may have already heard about my work from someone. Let's talk about what brings you here — your business, your team, your brand.",
      name: "Full name",
      email: "Email address",
      message: "Your message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      direct: "Or reach me directly",
      errorName: "Please enter your name (min. 2 characters)",
      errorEmail: "Invalid email address",
      errorMessage: "Your message should be at least 10 characters",
      errorSend: "Sending failed. Please try again or email me directly.",
      serviceUnavailable:
        "The contact form is not configured yet. Please email me directly in the meantime.",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "Tell me about your project...",
      privacyNote:
        "Your message will be sent securely through this form. Your details are only used to reply.",
      agencyBlurb:
        "This work runs through Netnook, the agency I founded — for engagements that call for a company structure.",
      bookingIntro: "Tell me what you need — I will suggest a time to talk it through.",
      errorNeedType: "Please select a type of need",
      errorPreferredTime: "Please select a preferred time",
      needType: "Type of need",
      selectPlaceholder: "Select…",
      needTypes: {
        digitalPresence: "Digital presence",
        cybersecurity: "Cybersecurity",
        projectDev: "Project development",
        marketAnalysis: "Market analysis",
        design: "Design",
      },
      preferredTime: "Preferred time",
      preferredTimes: {
        morning: "Morning",
        afternoon: "Afternoon",
        anytime: "No preference",
      },
    },
    footer: {
      tagline:
        "Digital transformation, cybersecurity, brand — a partner, not just another vendor.",
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
};

export function t(lang: Lang) {
  return translations[lang];
}
