# Assets publics

Déposer les fichiers suivants dans ce dossier (`public/`), **puis activer les chemins dans `lib/data.ts`** :

| Fichier | Champ dans `profile` | Usage | Conseils |
|---------|----------------------|--------|----------|
| `avatar.jpg` | `avatar: "/avatar.jpg"` | Photo de profil (section About) | Carré, ≥ 224×224 px (affiché en 112×112) |
| `cv-chouaib-bentabet.pdf` | `cvUrl: "/cv-chouaib-bentabet.pdf"` | Bouton « Télécharger mon CV » | PDF léger |

Exemple dans `lib/data.ts` :

```ts
avatar: "/avatar.jpg",
cvUrl: "/cv-chouaib-bentabet.pdf",
```

Tant que `avatar` / `cvUrl` restent à `null`, le site n’interroge pas le réseau : initiales **CB** et message « CV bientôt disponible ». Aucun faux fichier n’est requis.

Ne pas committer de documents sensibles hors CV volontairement public.
