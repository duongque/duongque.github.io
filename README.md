# Quentin DUONG — Portfolio

Site statique bilingue (EN par défaut, FR optionnel) destiné à GitHub Pages.

## Structure

```
portfolio/
├── index.html           # À propos
├── experience.html      # Parcours professionnel
├── education.html       # Formation + Événements
├── projects.html        # Projets + Publications
├── css/
│   └── styles.css
├── js/
│   ├── i18n.js          # dictionnaire EN/FR
│   ├── logos.js         # injection des logos (chips/icônes)
│   ├── projects.js      # données projets + modale détaillée
│   ├── spotlight.js     # halo curseur
│   └── main.js          # toggle langue, menu mobile, liens config
├── assets/
│   ├── cv/              # CV_Quentin_DUONG_EN.pdf / _FR.pdf
│   ├── events/          # visuels de la section Événements
│   ├── logos/           # logos technos / organisations
│   ├── projects/        # visuels des projets
│   └── publications/    # couvertures des publications
├── robots.txt
├── .nojekyll            # désactive Jekyll sur GitHub Pages
└── README.md
```

---

## 1. Tester en local

Aucune dépendance, c'est du HTML/CSS/JS pur. Deux options :

**Option A — ouvrir directement** : double-clic sur `index.html` dans l'explorateur. Fonctionne, mais certains navigateurs bloquent le `fetch` si tu ajoutes plus tard des ressources externes.

**Option B — serveur local Python** (recommandé) :

```powershell
cd portfolio
python -m http.server 8000
# puis ouvre http://localhost:8000
```

---

## 2. Personnaliser le contenu

Tous les éléments à compléter sont centralisés. Ouvre `js/main.js` et modifie l'objet `CONFIG` en haut du fichier :

```js
const CONFIG = {
  orcidId:        '0000-0000-0000-0000',  // ton ORCID iD
  scholarId:      'XXXXXXXXAAJ',          // user= dans l'URL Scholar
  githubHandle:   'qduong',               // ton pseudo GitHub
  thesisUrl:      'https://hal.science/tel-...',
  defaultLang:    'en'
};
```

### Projets FLUKA

Édite directement les cartes dans `index.html` (section `id="projects"`) ou ajoute les traductions dans `js/i18n.js` (clés `projects.p1_title`, `projects.p1_desc`, etc.).

### Textes EN/FR

Tout est dans `js/i18n.js`. Les clés HTML sont liées via l'attribut `data-i18n="section.cle"`.

---

## 3. Déployer sur GitHub Pages

### Prérequis

Un compte GitHub. Si tu n'en as pas : https://github.com/signup

### Étape 1 — Créer le dépôt

Le dépôt doit s'appeler **exactement** `<ton-pseudo>.github.io` pour devenir le site principal de ton profil (URL finale : `https://<ton-pseudo>.github.io`).

Exemple : si ton pseudo est `qduong`, créer le repo `qduong.github.io`.

### Étape 2 — Pousser le code

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin git@github.com:<ton-pseudo>/<ton-pseudo>.github.io.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages

1. Sur GitHub, ouvre ton dépôt → **Settings** → **Pages**
2. **Source** : `Deploy from a branch`
3. **Branch** : `main` / `/ (root)` → **Save**
4. Attends 1–2 minutes. Ton site est en ligne sur `https://<ton-pseudo>.github.io`

> Le fichier `.nojekyll` (déjà présent) empêche GitHub d'appliquer Jekyll, ce qui éviterait des soucis avec les dossiers commençant par `_`.

### Étape 4 (optionnelle) — Domaine personnalisé

`quentin.duong.com` n'est pas réalisable sans posséder le domaine `duong.com`. Alternatives gratuites/payantes :

| Solution                    | Coût         | URL exemple                |
|-----------------------------|--------------|----------------------------|
| GitHub Pages par défaut     | gratuit      | `qduong.github.io`         |
| `.com` acheté chez OVH/Gandi/Namecheap | ~10–15 €/an  | `quentin-duong.com`        |
| `.dev` ou `.science`        | ~12–25 €/an  | `qduong.dev`               |
| `js.org` (gratuit, dev only)| gratuit      | `qduong.js.org`            |

Si tu achètes un domaine :

1. Dans GitHub : **Settings → Pages → Custom domain** → entre `quentin-duong.com` (par exemple) → **Save**
2. Chez ton registrar, configure les DNS :
   - `A` records pointant vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `<ton-pseudo>.github.io`
3. Coche **Enforce HTTPS** sur GitHub (après vérification DNS, ~30 min).
4. Un fichier `CNAME` sera créé automatiquement à la racine — ne le supprime pas.

---

## 4. Référencement Google & visibilité publique / privée

### Est-ce que ma page apparaîtra sur Google si on tape « Quentin DUONG » ?

**Oui, à terme.** GitHub Pages est crawlable par Google par défaut (aucun blocage technique). La page sera indexée automatiquement, mais **2 à 6 semaines** sont généralement nécessaires avant la première apparition dans les résultats de recherche.

**Pour accélérer l'indexation** :

1. **Google Search Console** (gratuit, ~5 min) : https://search.google.com/search-console
   - Ajoute ton site (méthode "Préfixe d'URL" : `https://<ton-pseudo>.github.io`)
   - Vérifie la propriété (le plus simple : balise HTML — copie-colle dans le `<head>` d'`index.html`, je peux te l'ajouter sur demande)
   - Soumets l'URL d'accueil pour une indexation rapide
2. **Bing Webmaster Tools** : équivalent pour Bing, optionnel.
3. **Renforcer le SEO** :
   - Le `<title>` est déjà `Dr Quentin DUONG` (excellent — "Dr" + nom complet = match parfait pour la recherche nominale).
   - La meta-description est en place (`<meta name="description" content="..." />`).
   - Le H1 dans la sidebar contient ton nom.
   - Pour gagner en autorité : assure-toi que ton LinkedIn, ORCID, HAL et Google Scholar pointent vers `https://<ton-pseudo>.github.io` (champ "site web").

### Visibilité : public / caché

Le repo et le site GitHub Pages sont **publics par défaut**. Si tu veux contrôler la visibilité :

| Niveau | Effet | Comment faire |
|---|---|---|
| **Public + indexé** (défaut) | Tout le monde peut accéder + apparait sur Google | Rien à faire |
| **Public mais non indexé** | URL accessible, mais Google/Bing ne l'affichent pas dans les résultats | Édite `robots.txt` (voir ci-dessous) |
| **Privé** (toi seulement) | Seul un compte GitHub authentifié avec accès au repo peut voir | Nécessite **GitHub Pro/Team** payant ($4/mois) — voir Étape A |

#### Bascule rapide « public » ↔ « caché des moteurs de recherche »

Le fichier `robots.txt` à la racine du repo contrôle ça en 2 lignes. Pour **cacher** la page des résultats Google :

1. Ouvre `robots.txt`
2. Commente les 2 premières lignes actives, dé-commente les 2 dernières :

```txt
# User-agent: *
# Allow: /

User-agent: *
Disallow: /
```

3. `git commit -m "Hide from search engines" && git push`
4. Ça prendra **quelques jours à quelques semaines** pour que Google retire la page de son index. Pour accélérer : Google Search Console → "Suppressions" → demander la suppression temporaire.

Pour **revenir au mode public+indexé** : inverse les commentaires et push.

> ⚠️ Important : `robots.txt` ne **cache pas** la page — il demande aux moteurs de ne pas l'indexer. L'URL reste accessible à quiconque la connait. Pour une vraie privacy, il faut un repo privé + GitHub Pro.

#### Étape A — Repo privé (vrai mode privé)

1. Settings → General → Danger Zone → **Change visibility** → Private
2. Tant que tu es sur un compte gratuit, GitHub désactive automatiquement Pages pour les repos privés. Pour réactiver :
   - Souscris à **GitHub Pro** ($4/mois) ou **Team** ($4/utilisateur/mois)
   - Settings → Pages → Visibility → **Private**
3. Le site reste accessible uniquement aux personnes invitées au repo.

#### Étape B — Désactiver totalement le site (zéro accès)

Settings → Pages → Source → **None** → Save. Le site est offline en ~1 minute. Réactive en remettant `Deploy from a branch`.

---

## 5. Mises à jour

À chaque modification :

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages redéploie automatiquement en ~30 secondes.

---

## 6. Notes techniques

- **Pas de framework** : zéro build, zéro `node_modules`. Les seules dépendances externes sont les fonts Google.
- **Accessibilité** : contrastes vérifiés, animations désactivées si `prefers-reduced-motion`.
- **Responsive** : breakpoints à 860px (menu mobile) et 520px (typo hero).
- **Pas de tracking** : aucun cookie, aucun script tiers d'analytics.
- **Spotlight curseur** : halo qui suit la souris ; désactivé sur écran tactile ou si `prefers-reduced-motion`, masqué quand l'onglet est en arrière-plan.

---

## 7. Évolutions possibles

- Page dédiée `/projects/<slug>.html` par projet (meilleur SEO / partage de lien) — actuellement géré par une modale détaillée pilotée par `js/projects.js`
- Galerie d'images Flair / SimpleGeo
- Section "Talks & Posters"
- RSS / Atom feed pour les news
- Court CV imprimable PDF généré depuis les mêmes données
- Mode clair (currently dark only)

Bon déploiement !
