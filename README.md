# Chouaib Bentabet — Portfolio

Portfolio personnel Next.js 14 (App Router) — développeur full-stack & fondateur de Netnook.

## Prérequis

- Node.js 18+
- Compte [Resend](https://resend.com) pour le formulaire de contact

## Installation locale

```bash
npm install
cp .env.example .env.local
# Renseigner les variables (voir ci-dessous)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env.example` vers `.env.local` (ignoré par git).

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `RESEND_API_KEY` | Oui (prod) | Clé API Resend pour l'envoi d'e-mails |
| `CONTACT_FROM_EMAIL` | Oui (prod) | Expéditeur vérifié dans Resend (ex. `Portfolio <contact@votredomaine.com>`) |
| `CONTACT_TO_EMAIL` | Non | Destinataire (défaut : `bentabet.chouaib25@gmail.com`) |
| `NEXT_PUBLIC_SITE_URL` | Recommandé | URL publique sans slash final (SEO, sitemap, Open Graph) |

En développement sans clé Resend, le formulaire affiche un message localisé invitant à écrire par e-mail (HTTP 503).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |

## Assets publics

Placer dans `public/` (voir aussi `public/README.md`) :

- `avatar.jpg` — photo de profil (About ; fallback : initiales CB)
- `cv-chouaib-bentabet.pdf` — CV téléchargeable (bouton masqué tant que le fichier est absent)

## Contenu à personnaliser

Dans `lib/data.ts` :

1. **`profile.socials.github` / `linkedin`** — URLs `https://…` (laisser `""` pour masquer)
2. **Nouveau projet** — ajouter un objet dans `projects[]` avec un `slug` unique (FR + EN pour `summary` et éventuellement `challenge` / `solution` / `impact`)

## Prochaines étapes (checklist)

1. [ ] Déposer `public/avatar.jpg` et `public/cv-chouaib-bentabet.pdf`
2. [ ] Remplir GitHub / LinkedIn dans `lib/data.ts`
3. [ ] Créer `.env.local` avec `RESEND_API_KEY` (+ `CONTACT_FROM_EMAIL`)
4. [ ] (Optionnel) Ajouter un nouveau projet dans `lib/data.ts`
5. [ ] Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final
6. [ ] Déployer sur Vercel et tester `/`, `/projects/iris-software`, le formulaire, `/sitemap.xml`

## Déploiement sur Vercel

1. **Pousser le dépôt** sur GitHub / GitLab / Bitbucket.

2. **Importer le projet** sur [vercel.com/new](https://vercel.com/new) et sélectionner le repo.

3. **Framework** : Vercel détecte Next.js automatiquement (build : `next build`, output par défaut).

4. **Variables d'environnement** (Settings → Environment Variables) :

   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_FROM_EMAIL=Portfolio <contact@votredomaine.com>
   CONTACT_TO_EMAIL=bentabet.chouaib25@gmail.com
   NEXT_PUBLIC_SITE_URL=https://votredomaine.com
   ```

   - `NEXT_PUBLIC_*` doit être défini pour **Production** (et Preview si vous testez les métadonnées).
   - Dans Resend, vérifier le domaine d'envoi avant d'utiliser un `CONTACT_FROM_EMAIL` personnalisé.

5. **Domaine** : ajouter votre domaine dans Vercel → Domains, puis mettre à jour `NEXT_PUBLIC_SITE_URL`.

6. **Déployer** : chaque push sur la branche principale déclenche un déploiement.

7. **Vérifications post-déploiement** :
   - `/` — page d'accueil
   - `/projects/iris-software` — page projet (SSG)
   - `/sitemap.xml` et `/robots.txt`
   - `/opengraph-image` — image OG 1200×630
   - Formulaire de contact (avec clé Resend active)
   - Navigation depuis une page projet vers `#contact` / `#projects`
