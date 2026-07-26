# n_TOF EAR2 — portfolio piece (EN / FR)

Figures: `ntof_geometry.png` · `ntof_flux_lethargy.png` · `ntof_beam_fwhm.png` · `ntof_activation.png`

---

# ENGLISH

## Title

**A FLUKA model of the n_TOF EAR2 neutron beam line**

## Subtitle

*Published-dimension geometry, a custom FORTRAN source routine, and what the
beam profile reveals about the effective neutron source*

## Overview

n_TOF EAR2 is the vertical neutron time-of-flight beam line at CERN, where a
20 m flight path and a two-stage collimation system deliver a white neutron
beam from the lead spallation target to the experimental area. I rebuilt this
beam line in FLUKA 2025 from its published dimensions, wrote a custom FORTRAN
source routine to inject a realistic composite neutron spectrum, and ran the
model to the point where its predictions can be put side by side with measured
values from the literature.

The purpose is not to re-derive results the n_TOF collaboration already has. It
is to demonstrate the full working chain — building a non-trivial geometry from
primary references, extending FLUKA with user code, designing a scoring suite,
and then confronting the output with published data honestly enough that the
disagreements are as informative as the agreements. As it turned out, the most
interesting result came from a disagreement.

## Methodology and pipeline

**Geometry.** Every dimension comes from Weiß et al., *Nucl. Instr. Meth. A* 799
(2015) 90–98, Tables 1–2 and sections 2.1–2.4. The origin is placed at the
spallation target centre so that each Z coordinate in the input file is directly
the distance quoted in the paper. The model includes the Pb target and water
moderator, the 317 mm beam pipe, the first collimator (1 m of steel, 200 mm
bore), the second collimator — 3 m long and layered **axially**: 2 m of steel,
0.6 m of borated polyethylene, then 0.4 m with a B₄C core, its bore tapering
from 70 mm to 21.8 mm — the lead disks that extend the collimation downstream,
the concrete shaft, the 4 t stainless-steel sphere fill, and the beam dump.
Where the reference gives no value (outer radii, wall thicknesses), the
assumption is stated explicitly in the input file header rather than buried.
The steel sphere fill is homogenised at a density that conserves the published
4 t mass rather than a packing fraction, because the modelled annulus is thicker
than the real one and mass conservation is what preserves the shielding areal
density.

**Source.** A user `source.f` routine emits neutrons from an extended disk on
the moderator face, each aimed at a uniformly sampled point of the first
collimator aperture and carrying the exact solid-angle weight
w = R²·Δz/(4d³), so that scored quantities normalise to an isotropic 4π source.
The energy spectrum is a four-component composite — thermal Maxwellian, rising
epithermal power law, and two log-normal peaks — shaped to match the published
isolethargic flux. This spectrum is an **input assumption, not a prediction**:
comparing it back to the figure it was tuned against would be circular, and the
piece says so.

**Scoring and processing.** Neutron fluence spectrum at the measurement plane
(19.95 m) normalised over the 100 mm diameter surface used in the reference; a
1 mm-resolution radial beam profile; an ambient dose-equivalent H*(10) map with
the ICRP-74 conversion set; and residual nuclide inventories plus residual dose
maps in the collimator steel at six cooling times after a 180-day irradiation.
Per-cycle binary output is merged with the standard FLUKA tools (`usxsuw`,
`usbsuw`, `ustsuw`, `usrsuw`), converted to ASCII, and analysed in Python. A
shell driver recompiles the source routine only when it changed, runs the
cycles, merges the units and regenerates the figures in one command.

## Results

### The geometry

![Beam line geometry](ntof_geometry.png)

**Figure 1 — R–Z cross-section of the n_TOF EAR2 beam line as modelled in
FLUKA.** Top: the full 25 m line from the lead spallation target to the beam
dump, with the horizontal axis compressed (Z and R are not to the same scale);
the dashed line marks the measurement plane at a flight path of 19.95 m.
Bottom: the second collimator to scale, showing its axial layering — 2 m of
steel, then 0.6 m of borated polyethylene, then 0.4 m with a B₄C core — and the
conical bore narrowing from 70 mm to 21.8 mm. All body coordinates are parsed
directly from the FLUKA input, so the drawing cannot drift from the simulated
geometry. Dimensions follow Weiß et al., *Nucl. Instr. Meth. A* **799** (2015)
90–98, Tables 1–2.

The axial layering in the lower panel is worth a note: an early version of this
work had the steel and the polyethylene as concentric shells rather than
consecutive sections, which changes the attenuation completely. It was caught by
going back to the primary reference rather than to a summary of it.

### The emitted spectrum

![Isolethargic flux](ntof_flux_lethargy.png)

**Figure 2 — Emitted neutron source spectrum in isolethargic units.** The composite source spectrum: thermal peak, rising
epithermal region, fast peak near 1 MeV and a high-energy component. Shown as
documentation of the source model, not as a validation.

### The beam profile — and what it constrains

![Beam profile and FWHM](ntof_beam_fwhm.png)

**Figure 3 — Radial beam profile at the sample position, simulated vs published FWHM.**

The published beam width at the sample position is **21 mm FWHM**. This is the
one quantity in the model that is genuinely independent of the tuned spectrum:
it is fixed by the collimator geometry and by the size of the emitting region.

The first model, with a 15.85 cm emitting disk, gave 29.5 mm — 40 % too wide.
Rather than tune parameters until the number fell into place, I built an
analytic model of the profile as the convolution of the geometric image of the
collimator exit with the demagnified source, which showed something the
simulation alone would have hidden:

| Effective source radius | Analytic FWHM | FLUKA |
|---|---|---|
| 0 (point source) | 23.9 mm | — |
| 5 cm | 23.2 mm | — |
| **10 cm** | **21.0 mm** | **20.2 mm** |
| 15.85 cm | 27.0 mm | 29.5 mm |

The analytic model was built first and used to choose where to look; the FLUKA
runs then confirmed it. Tightening the downstream lead disks — the hypothesis I
had started from — was also tested and moves the width by only 1.4 mm, so it is
not the governing parameter.

**The beam width is not monotonic in source size.** Convolving a flat-topped
aperture image with a blur of comparable size produces a peaked profile whose
half-maximum width is *narrower* than the flat top — until the blur dominates
and broadens it again. A point source therefore cannot reproduce 21 mm either;
its 23.9 mm is a hard geometric floor.

The published width corresponds to an effective emitting radius of about 10 cm,
well inside the 30 cm moderator. That is a physically sensible outcome: neutron
production is concentrated near the beam axis, so a uniformly emitting disk
over-weights the periphery. The honest reading is therefore not "the model
predicts the beam width" but "the measured beam width constrains the effective
source radius to ≈10 cm" — a weaker claim, and the correct one.

### Radiation protection: activation of the collimator

![Activation vs cooling time](ntof_activation.png)

**Figure 4 — Induced activity and residual dose rate in the C2 steel section
as a function of cooling time**, after a nominal 180-day irradiation at
10¹³ n/s. The dominant nuclide, labelled at each point, shifts from short-lived
to long-lived as the material cools — the textbook signature of an activation
inventory relaxing over time.

The scoring uses FLUKA's `RADDECAY` chain: a `RESNUCLEI` inventory and a
residual dose map are evaluated at six cooling times from end-of-irradiation to
one year. At shutdown the activity is dominated by **manganese-56** (2.58 h
half-life); within a day it has decayed away and **chromium-51** (27.7 d) takes
over; after a year the residual is mostly **iron-55** (2.74 yr). Total activity
falls by a factor ≈18 over the year and the peak residual dose rate by ≈74.

| Nuclide | Half-life | Activity at shutdown (Bq) | Share |
|---|---|---|---|
| Mn-56 | 2.58 h | 2.7 × 10¹¹ | 52 % |
| Cr-51 | 27.7 d | 1.0 × 10¹¹ | 20 % |
| Mo-99 | 66 h | 2.0 × 10¹⁰ | 4 % |
| Co-58 | 70.9 d | 2.0 × 10¹⁰ | 4 % |
| Mn-54 | 312 d | 1.8 × 10¹⁰ | 3 % |
| Fe-55 | 2.74 yr | 1.8 × 10¹⁰ | 3 % |

*190 nuclides in total, 5.2 × 10¹¹ Bq at shutdown.* These are the expected
activation products of stainless steel under a neutron field (Mn and Cr from
iron and chromium, Co from nickel), which is the main reassurance that the
inventory is being built correctly. The absolute scale depends on the assumed
10¹³ n/s beam intensity, a stated nominal figure rather than a measured one; the
**relative** decay and the nuclide ranking do not.

---

# FRANÇAIS

## Titre

**Un modèle FLUKA de la ligne de faisceau neutronique n_TOF EAR2**

## Sous-titre

*Géométrie aux cotes publiées, routine source FORTRAN personnalisée, et ce que
le profil de faisceau révèle sur la source effective*

## Vue d'ensemble

n_TOF EAR2 est la ligne verticale de temps de vol neutronique du CERN, où un
parcours de 20 m et un système de collimation à deux étages acheminent un
faisceau de neutrons blancs depuis la cible de spallation en plomb jusqu'à la
zone expérimentale. J'ai reconstruit cette ligne dans FLUKA 2025 à partir de ses
cotes publiées, écrit une routine source FORTRAN pour y injecter un spectre
neutronique composite réaliste, et mené le modèle jusqu'au point où ses
prédictions peuvent être confrontées aux valeurs mesurées de la littérature.

L'objectif n'est pas de retrouver des résultats que la collaboration n_TOF
possède déjà. Il est de démontrer la chaîne de travail complète — construire une
géométrie non triviale à partir de sources primaires, étendre FLUKA par du code
utilisateur, concevoir une suite de scorings, puis confronter les sorties aux
données publiées avec assez de rigueur pour que les désaccords soient aussi
instructifs que les accords. En l'occurrence, c'est un désaccord qui a produit
le résultat le plus intéressant.

## Méthodologie et pipeline

**Géométrie.** Chaque cote provient de Weiß et al., *Nucl. Instr. Meth. A* 799
(2015) 90–98, Tableaux 1–2 et sections 2.1–2.4. L'origine est placée au centre
de la cible de spallation, de sorte que chaque coordonnée Z du fichier d'entrée
est directement la distance citée dans l'article. Le modèle comprend la cible Pb
et son modérateur, le tuyau de faisceau de 317 mm, le premier collimateur (1 m
d'acier, alésage 200 mm), le second collimateur — 3 m, en couches **axiales** :
2 m d'acier, 0.6 m de polyéthylène boré, puis 0.4 m à cœur de B₄C, son alésage
se resserrant de 70 mm à 21.8 mm —, les disques de plomb qui prolongent la
collimation en aval, le puits en béton, les 4 t de billes d'acier et le beam
dump. Là où la référence ne donne aucune valeur (rayons extérieurs, épaisseurs
de paroi), l'hypothèse est déclarée explicitement en tête du fichier d'entrée
plutôt que dissimulée. Les billes d'acier sont homogénéisées à une densité qui
conserve la **masse publiée de 4 t** plutôt qu'un taux d'empilement : l'anneau
modélisé étant plus épais que le réel, c'est la conservation de la masse qui
préserve la densité surfacique de blindage.

**Source.** Une routine `source.f` émet les neutrons depuis un disque étendu sur
la face du modérateur, chacun dirigé vers un point tiré uniformément sur
l'ouverture du premier collimateur et portant le poids d'angle solide exact
w = R²·Δz/(4d³), de sorte que les grandeurs scorées se normalisent à une source
isotrope 4π. Le spectre en énergie est un composite à quatre composantes —
maxwellienne thermique, loi de puissance épithermique croissante et deux pics
log-normaux — ajusté sur le flux isoléthargique publié. Ce spectre est une
**hypothèse d'entrée, pas une prédiction** : le comparer à la figure sur
laquelle il a été calé serait circulaire, et ce document le dit.

**Scoring et dépouillement.** Spectre de fluence neutronique au plan de mesure
(19.95 m), normalisé sur la surface de 100 mm de diamètre utilisée dans la
référence ; profil radial du faisceau résolu à 1 mm ; carte d'équivalent de dose
ambiant H*(10) avec le jeu de conversion ICRP-74 ; enfin inventaires de nucléides
résiduels et cartes de dose résiduelle dans l'acier du collimateur à six temps de
refroidissement après 180 jours d'irradiation. Les binaires par cycle sont
fusionnés avec les outils FLUKA standard (`usxsuw`, `usbsuw`, `ustsuw`,
`usrsuw`), convertis en ASCII, puis analysés en Python. Un script shell
recompile la routine source uniquement si elle a changé, enchaîne les cycles,
fusionne les unités et régénère les figures en une commande.

## Résultats

### La géométrie

![Géométrie de la ligne](ntof_geometry.png)

**Figure 1 — Coupe R–Z de la ligne n_TOF EAR2 telle que modélisée dans FLUKA.**
En haut : la ligne complète sur 25 m, de la cible de spallation en plomb au beam
dump, l'axe horizontal étant comprimé (Z et R ne sont pas à la même échelle) ;
le trait tireté marque le plan de mesure à 19.95 m de parcours. En bas : le
second collimateur à l'échelle, montrant son empilement axial — 2 m d'acier,
puis 0.6 m de polyéthylène boré, puis 0.4 m à cœur de B₄C — et l'alésage conique
se resserrant de 70 mm à 21.8 mm. Les coordonnées de tous les corps sont lues
directement dans le fichier d'entrée FLUKA : le tracé ne peut donc pas diverger
de la géométrie simulée. Cotes d'après Weiß et al., *Nucl. Instr. Meth. A*
**799** (2015) 90–98, Tableaux 1–2.

L'empilement axial du panneau inférieur mérite une note : une première version
de ce travail modélisait l'acier et le polyéthylène en coquilles concentriques
plutôt qu'en sections consécutives, ce qui change complètement l'atténuation.
L'erreur a été détectée en remontant à la source primaire plutôt qu'à un résumé
de celle-ci.

### Le spectre émis

![Flux isoléthargique](ntof_flux_lethargy.png)

**Figure 2 — Spectre neutronique source émis, en unités isoléthargiques.** Le spectre source composite : pic thermique, zone
épithermique croissante, pic rapide vers 1 MeV et composante haute énergie.
Présenté comme documentation du modèle de source, non comme une validation.

### Le profil de faisceau — et ce qu'il contraint

![Profil de faisceau et FWHM](ntof_beam_fwhm.png)

**Figure 3 — Profil radial du faisceau à la position échantillon, FWHM simulée vs publiée.**

La largeur de faisceau publiée à la position échantillon est de **21 mm FWHM**.
C'est la seule grandeur du modèle réellement indépendante du spectre ajusté :
elle est fixée par la géométrie de collimation et par la taille de la région
émettrice.

Le premier modèle, avec un disque émetteur de 15.85 cm, donnait 29.5 mm — 40 %
trop large. Plutôt que d'ajuster des paramètres jusqu'à retomber sur la bonne
valeur, j'ai construit un modèle analytique du profil comme convolution de
l'image géométrique de la sortie du collimateur par la source démagnifiée. Il
révèle ce que la simulation seule aurait masqué :

| Rayon de source effectif | FWHM analytique | FLUKA |
|---|---|---|
| 0 (source ponctuelle) | 23.9 mm | — |
| 5 cm | 23.2 mm | — |
| **10 cm** | **21.0 mm** | **20.2 mm** |
| 15.85 cm | 27.0 mm | 29.5 mm |

Le modèle analytique a été construit en premier et a servi à savoir où chercher ;
les runs FLUKA l'ont ensuite confirmé. Resserrer les disques de plomb en aval —
l'hypothèse dont j'étais parti — a également été testé et ne déplace la largeur
que de 1.4 mm : ce n'est donc pas le paramètre gouvernant.

**La largeur du faisceau n'est pas monotone en taille de source.** Convoluer
l'image en créneau de l'ouverture par un flou de taille comparable produit un
profil piqué dont la largeur à mi-hauteur est *plus étroite* que le créneau —
jusqu'à ce que le flou domine et l'élargisse à nouveau. Une source ponctuelle ne
peut donc pas non plus reproduire 21 mm : ses 23.9 mm constituent un plancher
géométrique infranchissable.

La largeur publiée correspond à un rayon émetteur effectif d'environ 10 cm, bien
à l'intérieur du modérateur de 30 cm. C'est physiquement cohérent : la production
de neutrons est concentrée près de l'axe du faisceau, si bien qu'un disque
émettant uniformément surpondère la périphérie. La lecture honnête n'est donc pas
« le modèle prédit la largeur du faisceau » mais « la largeur mesurée contraint
le rayon de source effectif à ≈10 cm » — affirmation plus faible, et correcte.

### Radioprotection : activation du collimateur

![Activation vs temps de refroidissement](ntof_activation.png)

**Figure 4 — Activité induite et débit de dose résiduel dans la section acier de
C2 en fonction du temps de refroidissement**, après une irradiation nominale de
180 jours à 10¹³ n/s. Le nucléide dominant, annoté à chaque point, glisse du
court vers le long à mesure que le matériau refroidit — la signature classique
d'un inventaire d'activation qui se relaxe dans le temps.

Le scoring s'appuie sur la chaîne `RADDECAY` de FLUKA : un inventaire
`RESNUCLEI` et une carte de dose résiduelle sont évalués à six temps de
refroidissement, de la fin d'irradiation à un an. À l'arrêt, l'activité est
dominée par le **manganèse-56** (période 2.58 h) ; en un jour il a décru et le
**chrome-51** (27.7 j) prend le relais ; après un an le résiduel est
essentiellement du **fer-55** (2.74 ans). L'activité totale chute d'un facteur
≈18 sur l'année et le pic de débit de dose résiduel d'un facteur ≈74.

| Nucléide | Période | Activité à l'arrêt (Bq) | Part |
|---|---|---|---|
| Mn-56 | 2.58 h | 2.7 × 10¹¹ | 52 % |
| Cr-51 | 27.7 j | 1.0 × 10¹¹ | 20 % |
| Mo-99 | 66 h | 2.0 × 10¹⁰ | 4 % |
| Co-58 | 70.9 j | 2.0 × 10¹⁰ | 4 % |
| Mn-54 | 312 j | 1.8 × 10¹⁰ | 3 % |
| Fe-55 | 2.74 ans | 1.8 × 10¹⁰ | 3 % |

*190 nucléides au total, 5.2 × 10¹¹ Bq à l'arrêt.* Ce sont les produits
d'activation attendus de l'acier inox sous flux neutronique (Mn et Cr issus du
fer et du chrome, Co du nickel), ce qui constitue la principale assurance que
l'inventaire est correctement construit. L'échelle absolue dépend de l'intensité
supposée de 10¹³ n/s, valeur nominale déclarée et non mesurée ; la décroissance
**relative** et le classement des nucléides, eux, n'en dépendent pas.
