# Plan de conception & prompts Cursor — Portfolio Chouaib Bentabet

## 1. Plan de conception (raffiné)

### Phase 0 — Fondations (déjà livré)
Stack : Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
Design system : fond sombre premium (navy #05070D), accent bleu électrique (#3B6BFF, cohérent avec la marque Netnook) → violet/cyan en dégradé, typographies Sora (titres) + Inter (texte) + JetBrains Mono (code), grille de fond subtile, glassmorphism sur les cartes.
Contenu : 100 % de données réelles — 8 projets (netnook.solutions + SolarAgroBot du CV), parcours professionnel complet, formation, langues, certifications.
Bilingue FR/EN avec bascule persistante (localStorage).

### Phase 1 — Personnalisation (30 min)
Remplacer les éléments placeholder : photo, CV PDF téléchargeable, liens GitHub/LinkedIn réels, nom de domaine dans les metadata.

### Phase 2 — Fonctionnalités avancées (1–3 h)
Formulaire de contact avec envoi réel (API route + Resend ou Nodemailer) au lieu du `mailto:` actuel.
Pages de détail dédiées par projet (`/projects/[slug]`) avec URL partageable, en plus (ou à la place) de la modale actuelle.
Image Open Graph dynamique pour un meilleur rendu au partage sur LinkedIn/Twitter.

### Phase 3 — Qualité (1 h)
Audit Lighthouse (perf/SEO/accessibilité), test responsive (mobile/tablette), vérification des contrastes et de la navigation clavier.

### Phase 4 — Déploiement
Vercel (gratuit, zero-config pour Next.js) + domaine personnalisé + variables d'environnement pour le formulaire de contact.

### Phase 5 — Vie du site
Ajouter un nouveau projet = un seul objet à ajouter dans `lib/data.ts`, rien d'autre à toucher.

---

## 2. Suite de prompts pour Cursor

Copie-colle ces prompts un par un dans le chat de Cursor (Cmd/Ctrl+L), dans l'ordre. Le projet est déjà fonctionnel : chaque prompt ajoute une couche.

**1. Prise en main**
```
Explore ce projet Next.js 14 / TypeScript / Tailwind / Framer Motion. Lis lib/data.ts, lib/translations.ts, types/index.ts et app/page.tsx pour comprendre l'architecture avant toute modification. Résume-moi en 5 lignes comment le contenu et les traductions sont organisés.
```

**2. Installer et lancer**
```
Installe les dépendances (npm install) et lance le serveur de dev (npm run dev). Corrige toute erreur de compilation ou de type que tu rencontres, en expliquant chaque correction.
```

**3. Photo / avatar réel**
```
Dans components/About.tsx, remplace le cercle d'initiales "CB" par ma vraie photo. Ajoute l'image dans public/avatar.jpg, utilise next/image avec un cercle recadré (object-cover, rounded-full) et garde les animations Framer Motion existantes.
```

**4. CV téléchargeable**
```
J'ai déposé mon CV dans public/cv-chouaib-bentabet.pdf. Vérifie que le bouton "Télécharger mon CV" dans components/About.tsx fonctionne correctement en local et en production (chemin absolu depuis /public).
```

**5. Réseaux sociaux réels**
```
Dans lib/data.ts, mets à jour profile.socials avec mes vrais liens GitHub et LinkedIn. Vérifie dans components/Contact.tsx que les icônes s'affichent correctement une fois les liens renseignés (le filtre qui masque les liens "#" doit laisser passer les vrais liens).
```

**6. Formulaire de contact réel**
```
Remplace l'envoi par mailto: dans components/Contact.tsx par un vrai envoi d'email. Crée une API route app/api/contact/route.ts qui utilise Resend (ou Nodemailer si je n'ai pas de compte Resend) pour envoyer le message vers bentabet.chouaib25@gmail.com. Garde la validation Zod existante côté client, ajoute une validation identique côté serveur, et gère les états de chargement/erreur dans le formulaire. Explique-moi où mettre ma clé API (.env.local) et ajoute .env.local à .gitignore si besoin.
```

**7. Pages de détail projet (optionnel)**
```
Crée une route dynamique app/projects/[slug]/page.tsx qui affiche le même contenu que ProjectModal.tsx mais en page complète et partageable, avec generateMetadata() pour un titre/description SEO par projet. Garde la modale actuelle sur la page d'accueil pour l'aperçu rapide, mais fais pointer "Voir le projet" vers cette nouvelle page si l'utilisateur vient d'un moteur de recherche ou d'un lien direct.
```

**8. Image Open Graph dynamique**
```
Ajoute app/opengraph-image.tsx avec next/og pour générer une image de partage (1200x630) reprenant mon nom, mon titre et le dégradé bleu/violet du site. Vérifie le rendu avec le simulateur Open Graph de Vercel.
```

**9. SEO technique**
```
Ajoute app/sitemap.ts et app/robots.ts pour le SEO. Vérifie que toutes les balises metadata dans app/layout.tsx pointent vers mon vrai nom de domaine une fois que je l'aurai choisi.
```

**10. Audit qualité**
```
Fais un audit Lighthouse mental du projet : vérifie les contrastes de couleurs (texte sur fond sombre), la navigation au clavier (focus visible sur tous les liens/boutons), les tailles de police responsive, et les temps de chargement des animations Framer Motion sur mobile. Corrige ce qui doit l'être.
```

**11. Déploiement**
```
Prépare ce projet pour un déploiement Vercel : vérifie qu'il n'y a pas de variables d'environnement manquantes, que le build (npm run build) passe sans erreur, et liste-moi les étapes exactes pour connecter ce repo à Vercel.
```

**12. Ajouter un futur projet**
```
Je veux ajouter un nouveau projet à mon portfolio : [décris le projet, l'année, le client, les technos, les résultats]. Ajoute-le dans lib/data.ts en suivant exactement la structure des projets existants (bilingue FR/EN), sans toucher aux composants.
```

---

**Astuce** : pour toute demande future ("change la couleur d'accent", "ajoute une section blog", "traduis en arabe"), commence toujours par demander à Cursor de lire `lib/data.ts` et `lib/translations.ts` — c'est là que vit 90 % du contenu modifiable.
