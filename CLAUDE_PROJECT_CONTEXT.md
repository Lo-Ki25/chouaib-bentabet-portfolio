# Contexte du projet — Portfolio Chouaib Bentabet

> Document de passation généré par Claude pour reprendre ce projet dans une nouvelle discussion (ou un nouveau Projet Claude) sans perdre le contexte accumulé. Dernière mise à jour : 15 août 2026.

## 1. C'est quoi

Portfolio personnel de **Chouaib Bentabet** (développeur full-stack, fondateur de **Netnook**), bilingue FR/EN, construit avec **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

- Déployé en production : https://chouaib-bentabet-portfolio.vercel.app/
- Développé/édité avec **Cursor**, en local sur ce PC.

## 2. ⚠️ Emplacement réel du projet — important

**Le projet que tu utilises réellement (celui ouvert dans Cursor, celui de `npm run dev` sur `localhost:3000`) est ici :**

```
D:\chouaib bentabet
```

Une deuxième copie a été créée par erreur plus tôt dans un dossier de travail temporaire de Claude (Cowork) — **elle est obsolète, à ignorer**. Si une nouvelle discussion Claude te propose de retravailler sur "chouaib-portfolio" dans un dossier `outputs`, corrige-la : le bon dossier est `D:\chouaib bentabet`.

## 3. Stack & architecture

- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, lucide-react
- **Lenis** (smooth scroll) via `components/SmoothScrollProvider.tsx`
- `react-hook-form` + `zod` pour le formulaire de contact, avec un vrai backend : `app/api/contact/route.ts`
- Pages dynamiques par projet : `app/projects/[slug]/page.tsx` + `components/ProjectDetailContent.tsx`
- SEO : `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/icon.tsx`
- Data séparée en plusieurs fichiers dans `lib/` : `data.ts`, `projects.ts`, `site.ts`, `socials.ts`, `contactSchema.ts`, `escapeHtml.ts`, `truncateText.ts`
- Composants clés créés par Cursor (au-delà de ce que Claude avait fourni au départ) :
  - `components/MotionProvider.tsx` — wrapper `MotionConfig`/`LayoutGroup`
  - `components/SmoothScrollProvider.tsx` — Lenis + expose `useLenisInstance()`
  - `components/BrandIntro.tsx` — intro de marque au chargement, expose `useIntro()` (`{ showIntro }`)
  - `components/GridSpotlight.tsx` — effet spotlight curseur sur la grille de fond
  - `components/VisibilityPause.tsx` — met en pause les animations quand l'onglet est masqué
  - `hooks/useFinePointer.ts`, `hooks/useTabVisible.ts`
  - `components/ui/MagneticButton.tsx` — boutons magnétiques
- Bonne gestion de l'accessibilité partout (`useReducedMotion`, `aria-*`, `touch-target`, `safe-area-inset`) et du responsive mobile.

## 4. Design system

- Couleurs (`tailwind.config.ts`) : base `#05070D`, surface `#0B0F1E`, accent `#3B6BFF`, violet `#8B5CF6`, cyan `#22D3EE`
- Polices : Sora (display), Inter (body), JetBrains Mono (code)
- Style : dark premium, glassmorphism, grille de fond, blobs animés

## 5. Visuels générés (Higgsfield)

Deux visuels sur-mesure générés via l'outil Higgsfield (modèle `recraft_v4_1`, palette exacte du site), intégrés en `next/image` :

- `public/images/hero-network.png` — réseau lumineux abstrait (fond du Hero)
- `public/images/about-glass.png` — sculpture de verre fluide abstraite (section About)

Compte Higgsfield : plan gratuit, **10 crédits au départ, ~7,5 restants** après ces 2 générations (1,25 crédit/image en 1k). Pas d'historique de générations ni de site Higgsfield existant avant cette session.

## 6. Bugs corrigés récemment (15 août 2026)

1. **Mismatch d'hydratation Navbar** — `motion.header` avec animation d'entrée : corrigé avec un pattern `mounted` (rendu statique tant que non monté, puis bascule vers la version animée).
2. **Contenu invisible si "réduire les animations" est actif (OS)** — géré via `useReducedMotion()` de Framer Motion, utilisé de façon cohérente dans tous les composants (pas juste un `MotionConfig` global).
3. **Compteurs de stats du Hero bloqués à "0+"** — `components/ui/Counter.tsx` a maintenant un filet de sécurité : démarrage forcé après 800 ms, et un timeout de secours qui force l'affichage de la valeur finale si l'animation n'a jamais démarré.
4. **Mismatch d'hydratation sur les 2 visuels générés** (`Hero.tsx` et `About.tsx`) — `next/image` avec `fill` calculait un style inline légèrement différent entre serveur et client (`inset: 0px` vs `left/top/right/bottom`, présence de `filter: invert(0)`). Corrigé en ne rendant le composant `Image` qu'après montage (`{mounted ? <Image .../> : null}`), puisque ces images sont purement décoratives (`alt=""`). Même correctif appliqué préventivement dans `Projects.tsx` (cas actuellement dormant, `project.image` n'est pas encore renseigné).

Après ces correctifs, le site a été vérifié en direct sur `localhost:3000` : Hero (visuel réseau + stats correctes), About (visuel verre flottant), Skills — tout s'affiche correctement, console propre (seul bruit restant : attributs injectés par une extension de navigateur, sans rapport avec le site).

## 7. Historique de la session (résumé)

1. Création du portfolio à partir du CV (envoyé en screenshots) + des projets réels listés sur https://netnook.solutions/ — contenu 100% réel, bilingue FR/EN.
2. Plan de conception + suite de prompts Cursor fournis (voir `PLAN_ET_PROMPTS.md` et `PROMPTS_FROM_SCRATCH.md`, présents dans l'ancienne copie du dossier de travail Claude — pas forcément copiés ici).
3. Audit du site en local (localhost:3000 puis :3001) → prompts de correction (infos manquantes, bugs de rendu).
4. Demande de "redesign créatif total" avec Higgsfield → constat que l'outil website-builder de Higgsfield ne convenait pas (stack différente, abandon du site réel) → décision : générer seulement 2 visuels avec Higgsfield + tout le reste codé à la main (animations, effets).
5. Prompt consolidé livré à Cursor (intro de marque, Lenis, spotlight curseur, boutons magnétiques, transition partagée carte→modale projets, parallax, etc.) → **Cursor l'a exécuté avec succès**, avec un niveau de finition supérieur à la demande initiale.
6. Découverte que Claude travaillait sur une copie obsolète du projet (dossier de travail temporaire) pendant que le vrai projet vivait dans `D:\chouaib bentabet` → dossier connecté directement, 2 bugs d'hydratation identifiés et corrigés directement dans le vrai projet.

## 8. Pistes / suite possible

- Réviser `lib/data.ts` si les chiffres changent (années d'expérience calculées automatiquement depuis `CAREER_START_YEAR = 2020`).
- `project.image` n'est pas encore renseigné dans les données — le rendu `next/image` correspondant est prêt (avec le correctif d'hydratation) dès qu'une image de projet sera ajoutée.
- Vérifier si `ProjectDetailContent.tsx` (page dédiée par projet) a le même type de garde `mounted` autour de son `<Image fill>` — non vérifié dans cette session (le champ `project.image` étant vide, aucun bug ne s'est encore manifesté là).
- Il reste ~7,5 crédits Higgsfield si d'autres visuels sont souhaités.

## 9. Comment reprendre le travail

Dans une nouvelle discussion Claude/Cowork :
1. Reconnecter le dossier **`D:\chouaib bentabet`** (pas une copie) comme dossier de travail.
2. Mentionner ce fichier (`CLAUDE_PROJECT_CONTEXT.md`, à la racine du projet) pour que Claude ait tout le contexte sans avoir à tout redécouvrir.
