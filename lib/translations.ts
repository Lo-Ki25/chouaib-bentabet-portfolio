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
    skills: string;
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
  about: {
    eyebrow: string;
    title: string;
    body: string;
    body2: string;
    cta: string;
    valuesTitle: string;
    cvUnavailable: string;
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
      skills: "Compétences",
      experience: "Parcours",
      projects: "Projets",
      contact: "Contact",
      cta: "Discutons",
    },
    hero: {
      eyebrow: "Full-Stack Developer · Next.js & TypeScript",
      title1: "Je conçois des produits web",
      title2: "rapides, élégants",
      title3: "et pensés pour durer.",
      subtitle:
        "Développeur full-stack basé au Maroc, fondateur de Netnook. Je transforme des idées en plateformes digitales performantes — du prototype à la mise en production.",
      ctaPrimary: "Voir mes projets",
      ctaSecondary: "Me contacter",
      scroll: "Défiler",
      available: "Disponible pour missions freelance",
    },
    about: {
      eyebrow: "À propos",
      title: "Construire des expériences digitales qui comptent",
      body:
        "Je suis Chouaib Bentabet, développeur full-stack et fondateur de Netnook, une agence digitale basée à Salé, au Maroc. Je conçois des plateformes rapides, sécurisées et magnifiquement animées avec Next.js, TypeScript et un écosystème d'outils modernes — des outils internes qui font gagner 50 % de temps aux équipes, jusqu'aux plateformes EdTech utilisées par plus de 50 000 étudiants à travers l'Afrique.",
      body2:
        "Chaque projet part d'un vrai problème métier : je conçois l'architecture, je code l'interface et le backend, et je reste impliqué jusqu'au lancement — et après.",
      cta: "Télécharger mon CV",
      valuesTitle: "Ce qui guide mon travail",
      cvUnavailable: "CV bientôt disponible — contactez-moi en attendant.",
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
    contact: {
      eyebrow: "Contact",
      title: "Discutons de votre prochain projet",
      subtitle:
        "Une idée, une plateforme à construire, ou simplement envie d'échanger ? Écrivez-moi, je réponds rapidement.",
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
        "Également fondateur de Netnook, agence digitale — pour des projets d'entreprise plus larges.",
    },
    footer: {
      tagline: "Développeur full-stack — je construis des produits web rapides, élégants et bien pensés.",
      rights: "Tous droits réservés.",
      backToTop: "Retour en haut",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      eyebrow: "Full-Stack Developer · Next.js & TypeScript",
      title1: "I build web products that are",
      title2: "fast, elegant",
      title3: "and built to last.",
      subtitle:
        "Full-stack developer based in Morocco, founder of Netnook. I turn ideas into high-performing digital platforms — from first prototype to production.",
      ctaPrimary: "View my work",
      ctaSecondary: "Get in touch",
      scroll: "Scroll",
      available: "Available for freelance work",
    },
    about: {
      eyebrow: "About",
      title: "Building digital experiences that matter",
      body:
        "I'm Chouaib Bentabet, a full-stack developer and founder of Netnook, a digital agency based in Salé, Morocco. I design fast, secure and beautifully animated platforms with Next.js, TypeScript and a modern tooling ecosystem — from internal tools that save teams 50% of their time, to EdTech platforms used by 50,000+ students across Africa.",
      body2:
        "Every project starts with a real business problem: I design the architecture, build the interface and backend, and stay involved through launch — and beyond.",
      cta: "Download my CV",
      valuesTitle: "What guides my work",
      cvUnavailable: "CV coming soon — feel free to reach out in the meantime.",
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
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your next project",
      subtitle: "Got an idea, a platform to build, or just want to say hi? Send me a message, I reply quickly.",
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
        "Also founder of Netnook, a digital agency — for larger business engagements.",
    },
    footer: {
      tagline: "Full-stack developer — building fast, elegant, thoughtfully engineered web products.",
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
};

export function t(lang: Lang) {
  return translations[lang];
}
