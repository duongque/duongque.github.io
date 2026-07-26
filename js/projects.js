/* ============================================================
   PROJECTS DATA $-$ edit this file to update the Projects section.
   No HTML touching needed; cards are rendered automatically.

   Structure of a project:
   {
     tech:  ['FLUKA', 'Python'],         // array of tags
     link:  'https://...',               // optional, becomes "Read more"
     svg:   '<svg>...</svg>',            // optional visual (featured only)
     icon:  '<svg>...</svg>',            // optional icon (other only)
     en: {
       title: '...', subtitle: '...', desc: '...',
       detail: {                         // shown in the click-through modal
         methodology: '...',             // paragraph(s), \n\n = new paragraph
         results: [                      // figures, notes and tables, in order
           { src: '...png', caption: '...' },              // figure alone
           { src: '...png', caption: '...', text: '...' }, // figure + its analysis
           { text: '...', heading: '...' },                // text alone, between
           { table: { head: [...], rows: [[...], [...]],   // two figures
                      caption: '...', align: [...] } },    // table alone

           // To chain SEVERAL texts/tables in one logical block (a key like
           // `text` can't be repeated in one object), use `blocks: [...]`.
           // Each block has the same figure/text/table keys; they render in
           // array order, grouped tightly together:
           { blocks: [
               { heading: '...', text: 'first paragraph' },
               { table: { rows: [[...]] } },
               { text: 'paragraph after the table' }
           ] }
         ]                             // within one block: figure, then text,
                                       // then table. \n\n = new paragraph,
                                       // heading optional. See examples below.
       }
     },
     fr: { ...same shape... }
   }
   ============================================================ */

window.PROJECTS = {
  // Up to 4 large alternating cards on desktop
  featured: [
    {
      tech: ['FLUKA', 'Python', 'HPC'],
      link: '',
      svg: '<img src="assets/projects/ntof_geometry.png" alt="A FLUKA model of the n_TOF EAR2 neutron beam line" style="width:100%;height:auto;display:block;background:#0a192f;">',
      //svg: '<img src="assets/projects/transmutex_geometry.png" alt="ADS-Target Activation" style="width:100%;height:auto;display:block;background:#0a192f;">',
      en: {
        title: 'A FLUKA model of the n_TOF EAR2 neutron beam line',
        //title: 'ADS-Target Activation',
        subtitle: 'Published-dimension geometry, a custom FORTRAN source routine, and what the beam profile reveals about the effective neutron source',
        //subtitle: 'A Python-Driven FLUKA Pipeline for Inventory and Residual-Dose Assessment of a MEGAPIE-Class LBE Spallation Target under 800 MeV Proton Irradiation (TRANSMUTEX)',
        desc: 'n_TOF EAR2 is the vertical neutron time-of-flight beam line at CERN, where a 20 m flight path and a two-stage collimation system deliver a white neutron beam from the lead spallation target to the experimental area. I rebuilt this beam line in FLUKA 2025 from its published dimensions, wrote a custom FORTRAN source routine to inject a realistic composite neutron spectrum, and ran the model to the point where its predictions can be put side by side with measured values from the literature.\n\n' +
          'The purpose is not to re-derive results the n_TOF collaboration already has. It is to demonstrate the full working chain $-$ building a non-trivial geometry from primary references, extending FLUKA with user code, designing a scoring suite, and then confronting the output with published data honestly enough that the disagreements are as informative as the agreements. As it turned out, the most interesting result came from a disagreement.',
        //desc: 'ADS-Target Activation models the nuclear inventory and residual radiation field of a MEGAPIE-class lead-bismuth eutectic (LBE) spallation target driven by an 800 MeV, 5 mA proton beam, in a context directly inspired by the TRANSMUTEX accelerator-driven system. The geometry reproduces the reference design: a T91 hemispherical beam window, the LBE target volume, a liquid-lead region acting as the reactor coolant, a T91 vessel and a concrete biological shield. A generic, YAML-driven Python pipeline orchestrates FLUKA end to end. It renders the input from Jinja2 templates, runs the activation simulation, and uses FLUKA\'s native radioactive-decay transport (semi-analogue RADDECAY) to follow the real decay products and build the time-resolved isotopic inventory and residual dose field at several cooling times (end-of-irradiation, 1 h, 1 d, 1 week, 30 days). Particular attention is given to Po-210 production and its radiological implications, including residual dose maps and maintenance-access scenarios, with results benchmarked against MEGAPIE post-test analyses, HINDAS/n_TOF spallation data and NEA/OECD technical reports on LBE-cooled ADS systems. The framework is campaign-agnostic and fully reproducible: geometry, beam, scoring and post-processing (isotope rankings, Z-A maps, Po-210 time evolution, USRBIN dose heatmaps, schematic cross-section) are regenerated automatically from a single configuration file.',
        detail: {
          methodology:
            'Geometry. Every dimension comes from Weiß et al., Nucl. Instr. Meth. A 799 (2015) 90-98, Tables 1-2 and sections 2.1-2.4. The origin is placed at the spallation target centre so that each Z coordinate in the input file is directly the distance quoted in the paper. The model includes the Pb target and water moderator, the 317 mm beam pipe, the first collimator (1 m of steel, 200 mm bore), the second collimator $-$ 3 m long and layered axially: 2 m of steel, 0.6 m of borated polyethylene, then 0.4 m with a B₄C core, its bore tapering from 70 mm to 21.8 mm $-$ the lead disks that extend the collimation downstream, the concrete shaft, the 4 t stainless-steel sphere fill, and the beam dump. Where the reference gives no value (outer radii, wall thicknesses), the assumption is stated explicitly in the input file header rather than buried. The steel sphere fill is homogenised at a density that conserves the published 4 t mass rather than a packing fraction, because the modelled annulus is thicker than the real one and mass conservation is what preserves the shielding areal density.\n\n' +
            'Source. A user source.f routine emits neutrons from an extended disk on the moderator face, each aimed at a uniformly sampled point of the first collimator aperture and carrying the exact solid-angle weight $w = R^2·Δz/(4d^3)$, so that scored quantities normalise to an isotropic $4π$ source. The energy spectrum is a four-component composite $-$ thermal Maxwellian, rising epithermal power law, and two log-normal peaks $-$ shaped to match the published isolethargic flux. This spectrum is an input assumption, not a prediction: comparing it back to the figure it was tuned against would be circular, and the piece says so.\n\n' +
            'Scoring and processing. Neutron fluence spectrum at the measurement plane (19.95 m) normalised over the 100 mm diameter surface used in the reference; a 1 mm-resolution radial beam profile; an ambient dose-equivalent H*(10) map with the ICRP-74 conversion set; and residual nuclide inventories plus residual dose maps in the collimator steel at six cooling times after a 180-day irradiation. Per-cycle binary output is merged with the standard FLUKA tools (usxsuw, usbsuw, ustsuw, usrsuw), converted to ASCII, and analysed in Python. A shell driver recompiles the source routine only when it changed, runs the cycles, merges the units and regenerates the figures in one command.',
          /*
          methodology:
            'The reference geometry reproduces a MEGAPIE-class target: a T91 hemispherical beam window, the lead-bismuth eutectic (LBE) target volume, a surrounding liquid-lead coolant region, a T91 structural vessel and a concrete biological shield. All dimensions, materials and beam parameters live in a single YAML configuration file.\n\n' +
            'A generic Python pipeline orchestrates FLUKA end to end: it renders the FLUKA input from Jinja2 templates, launches the irradiation run (800 MeV, 5 mA proton beam), then uses FLUKA\'s native semi-analogue radioactive-decay transport (RADDECAY) to follow the real decay chains and reconstruct the time-resolved isotopic inventory.\n\n' +
            'Residual dose fields are scored with USRBIN at several cooling times (end-of-irradiation, 1 h, 1 d, 1 week, 30 days). Post-processing $-$ isotope rankings, Z–A maps, Po-210 time evolution, USRBIN dose heatmaps and the schematic cross-section $-$ is regenerated automatically from the same configuration, so the whole campaign is reproducible from one file.',
          */
          results: [
            {
              blocks: [
                { heading: 'The geometry' },
                {
                  src: 'assets/projects/ntof_geometry.png',
                  caption: 'Figure 1 $-$ R-Z cross-section of the n_TOF EAR2 beam line as modelled in FLUKA. Top: the full 25 m line from the lead spallation target to the beam dump, with the horizontal axis compressed (Z and R are not to the same scale); the dashed line marks the measurement plane at a flight path of 19.95 m. Bottom: the second collimator to scale, showing its axial layering $-$ 2 m of steel, then 0.6 m of borated polyethylene, then 0.4 m with a B₄C core $-$ and the conical bore narrowing from 70 mm to 21.8 mm. All body coordinates are parsed directly from the FLUKA input, so the drawing cannot drift from the simulated geometry. Dimensions follow Weiß et al., Nucl. Instr. Meth. A 799 (2015) 90-98, Tables 1-2.'
                },
                {
                  text: 'The axial layering in the lower panel is worth a note: an early version of this work had the steel and the polyethylene as concentric shells rather than consecutive sections, which changes the attenuation completely. It was caught by going back to the primary reference rather than to a summary of it.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'The emitted spectrum' },
                {
                  src: 'assets/projects/ntof_flux_lethargy.png',
                  caption: 'Figure 2 $-$ Emitted neutron source spectrum in isolethargic units.'
                },
                {
                  text: 'The composite source spectrum: thermal peak, rising epithermal region, fast peak near 1 MeV and a high-energy component. Shown as documentation of the source model, not as a validation.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'The beam profile $-$ and what it constrains' },
                {
                  src: 'assets/projects/ntof_beam_fwhm.png',
                  caption: 'Figure 3 $-$ Radial beam profile at the sample position, simulated vs published FWHM.'
                },
                {
                  text: 'The published beam width at the sample position is 21 mm FWHM. This is the one quantity in the model that is genuinely independent of the tuned spectrum: it is fixed by the collimator geometry and by the size of the emitting region.'
                },
                {
                  text: 'The first model, with a 15.85 cm emitting disk, gave 29.5 mm $-$ 40 % too wide. Rather than tune parameters until the number fell into place, I built an analytic model of the profile as the convolution of the geometric image of the collimator exit with the demagnified source, which showed something the simulation alone would have hidden:'
                },
                {
                  table: {
                    head: ['Effective source radius', 'Analytic FWHM', 'FLUKA'],
                    align: ['center', 'center', 'center'],
                    rows: [
                      ['0 (point source)', '23.9 mm', '$-$'],
                      ['5 cm', '23.2 mm', '$-$'],
                      ['10 cm', '21.0 mm', '20.2 mm'],
                      ['15.85 cm', '27.0 mm', '29.5 mm'],
                    ]
                  }
                },
                {
                  text: 'The analytic model was built first and used to choose where to look; the FLUKA runs then confirmed it. Tightening the downstream lead disks $-$ the hypothesis I had started from $-$ was also tested and moves the width by only 1.4 mm, so it is not the governing parameter.'
                },
                {
                  text: 'The beam width is not monotonic in source size. Convolving a flat-topped aperture image with a blur of comparable size produces a peaked profile whose half-maximum width is narrower than the flat top $-$ until the blur dominates and broadens it again. A point source therefore cannot reproduce 21 mm either; its 23.9 mm is a hard geometric floor.'
                },
                {
                  text: 'The published width corresponds to an effective emitting radius of about 10 cm, well inside the 30 cm moderator. That is a physically sensible outcome: neutron production is concentrated near the beam axis, so a uniformly emitting disk over-weights the periphery. The honest reading is therefore not "the model predicts the beam width" but "the measured beam width constrains the effective source radius to ≈10 cm" $-$ a weaker claim, and the correct one.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'Radiation protection: activation of the collimator' },
                {
                  src: 'assets/projects/ntof_activation.png',
                  caption: 'Figure 4 $-$ Induced activity and residual dose rate in the C2 steel section as a function of cooling time, after a nominal 180-day irradiation at 10¹³ n/s. The dominant nuclide, labelled at each point, shifts from short-lived to long-lived as the material cools $-$ the textbook signature of an activation inventory relaxing over time.'
                },
                {
                  text: 'The scoring uses FLUKA\'s RADDECAY chain: a RESNUCLEI inventory and a residual dose map are evaluated at six cooling times from end-of-irradiation to one year. At shutdown the activity is dominated by manganese-56 (2.58 h half-life); within a day it has decayed away and chromium-51 (27.7 d) takes over; after a year the residual is mostly iron-55 (2.74 yr). Total activity falls by a factor ≈18 over the year and the peak residual dose rate by ≈74.'
                },
                {
                  table: {
                    head: ['Nuclide', 'Half-life', 'Activity at shutdown (Bq)', 'Share'],
                    align: ['left', 'right', 'right', 'right'],
                    rows: [
                      ['Mn-56', '2.58 h',  '2.7 × 10¹¹', '52 %'],
                      ['Cr-51', '27.7 d',  '1.0 × 10¹¹', '20 %'],
                      ['Mo-99', '66 h',    '2.0 × 10¹⁰', '4 %'],
                      ['Co-58', '70.9 d',  '2.0 × 10¹⁰', '4 %'],
                      ['Mn-54', '312 d',   '1.8 × 10¹⁰', '3 %'],
                      ['Fe-55', '2.74 yr', '1.8 × 10¹⁰', '3 %'],
                    ],
                    caption: '190 nuclides in total, 5.2 × 10¹¹ Bq at shutdown.'
                  }
                },
                {
                  text: 'These are the expected activation products of stainless steel under a neutron field (Mn and Cr from iron and chromium, Co from nickel), which is the main reassurance that the inventory is being built correctly. The absolute scale depends on the assumed 10¹³ n/s beam intensity, a stated nominal figure rather than a measured one; the relative decay and the nuclide ranking do not.'
                }
              ]
            }
          ]
        }
      },
      fr: {
        title: 'Un modèle FLUKA de la ligne de faisceau neutronique n_TOF EAR2',
        //title: 'ADS-Target Activation',
        subtitle: 'Géométrie aux cotes publiées, routine source FORTRAN personnalisée, et ce que le profil de faisceau révèle sur la source effective',
        //subtitle: 'Un pipeline FLUKA piloté par Python pour l\'évaluation de l\'inventaire et de la dose résiduelle d\'une cible de spallation LBE de classe MEGAPIE sous irradiation de protons de 800 MeV (TRANSMUTEX)',
        desc: 'n_TOF EAR2 est la ligne verticale de temps de vol neutronique du CERN, où un parcours de 20 m et un système de collimation à deux étages acheminent un faisceau de neutrons blancs depuis la cible de spallation en plomb jusqu\'à la zone expérimentale. J\'ai reconstruit cette ligne dans FLUKA 2025 à partir de ses cotes publiées, écrit une routine source FORTRAN pour y injecter un spectre neutronique composite réaliste, et mené le modèle jusqu\'au point où ses prédictions peuvent être confrontées aux valeurs mesurées de la littérature.\n\n' +
          'L\'objectif n\'est pas de retrouver des résultats que la collaboration n_TOF possède déjà. Il est de démontrer la chaîne de travail complète $-$ construire une géométrie non triviale à partir de sources primaires, étendre FLUKA par du code utilisateur, concevoir une suite de scorings, puis confronter les sorties aux données publiées avec assez de rigueur pour que les désaccords soient aussi instructifs que les accords. En l\'occurrence, c\'est un désaccord qui a produit le résultat le plus intéressant.',
        //desc: 'ADS-Target Activation modélise l\'inventaire nucléaire et le champ de rayonnement résiduel d\'une cible de spallation en eutectique plomb-bismuth (LBE) de classe MEGAPIE, alimentée par un faisceau de protons de 800 MeV et 5 mA, dans un contexte directement inspiré du système piloté par accélérateur TRANSMUTEX. La géométrie reproduit le design de référence : une fenêtre faisceau hémisphérique en T91, le volume de cible LBE, une région de plomb liquide jouant le rôle de caloporteur du réacteur, une cuve en T91 et un blindage biologique en béton. Un pipeline Python générique, piloté par fichier YAML, orchestre FLUKA de bout en bout. Il génère l\'entrée à partir de templates Jinja2, lance la simulation d\'activation, et utilise le transport natif de décroissance radioactive de FLUKA (RADDECAY semi-analogique) pour suivre les véritables produits de désintégration et construire l\'inventaire isotopique résolu en temps ainsi que le champ de dose résiduelle à plusieurs temps de refroidissement (fin d\'irradiation, 1 h, 1 j, 1 semaine, 30 jours). Une attention particulière est portée à la production de Po-210 et à ses implications radiologiques, incluant les cartes de dose résiduelle et les scénarios d\'accès en maintenance, avec des résultats confrontés aux analyses post-test de MEGAPIE, aux données de spallation HINDAS/n_TOF et aux rapports techniques NEA/AEN sur les systèmes ADS refroidis au LBE. Le cadre est indépendant de la campagne et entièrement reproductible : géométrie, faisceau, scoring et post-traitement (classements isotopiques, cartes Z-A, évolution temporelle du Po-210, cartes de dose USRBIN, coupe schématique) sont régénérés automatiquement à partir d\'un unique fichier de configuration.',
        detail: {
          /*
          methodology:
            'La géométrie de référence reproduit une cible de classe MEGAPIE : une fenêtre faisceau hémisphérique en T91, le volume de cible en eutectique plomb-bismuth (LBE), une région de plomb liquide caloporteur, une cuve structurelle en T91 et un blindage biologique en béton. Toutes les dimensions, matériaux et paramètres faisceau résident dans un unique fichier de configuration YAML.\n\n' +
            'Un pipeline Python générique orchestre FLUKA de bout en bout : il génère l\'entrée FLUKA à partir de templates Jinja2, lance la phase d\'irradiation (faisceau de protons 800 MeV, 5 mA), puis utilise le transport natif semi-analogique de décroissance radioactive de FLUKA (RADDECAY) pour suivre les vraies chaînes de désintégration et reconstruire l\'inventaire isotopique résolu en temps.\n\n' +
            'Les champs de dose résiduelle sont scorés avec USRBIN à plusieurs temps de refroidissement (fin d\'irradiation, 1 h, 1 j, 1 semaine, 30 jours). Le post-traitement $-$ classements isotopiques, cartes Z–A, évolution temporelle du Po-210, cartes de dose USRBIN et coupe schématique $-$ est régénéré automatiquement depuis la même configuration : toute la campagne est reproductible à partir d\'un seul fichier.',
          */
          methodology:
            'Géométrie. Toutes les cotes viennent de Weiß et al., NIM A 799 (2015), Tab. 1-2 et §2.1-2.4. Origine au centre de la cible pour que chaque Z du fichier soit directement la distance citée. Contenu : cible Pb + modérateur, tuyau 317 mm, C1 (1 m acier, alésage 200 mm), C2 (3 m, couches axiales 2 m acier / 0.6 m B-PE / 0.4 m à cœur B₄C, alésage 70 → 21.8 mm), disques Pb, puits béton, 4 t de billes d\'acier, beam dump. Les valeurs absentes de la référence sont déclarées en tête du fichier. Les billes sont homogénéisées à densité conservant la masse publiée, pas le taux d\'empilement.\n\n' +
            'Source. Routine source.f, émission depuis un disque étendu, chaque neutron dirigé vers un point tiré uniformément sur l\'ouverture de C1 avec le poids exact $w = R^2·Δz/(4d^3)$, normalisation 4π. Spectre composite à quatre composantes. Le texte dit explicitement que ce spectre est une hypothèse d\'entrée, pas une prédiction.\n\n' +
            'Scoring et dépouillement. Spectre au plan de mesure (19.95 m, convention Ø 100 mm), profil radial à 1 mm, carte H*(10) (ICRP-74), inventaires de nucléides résiduels et cartes de dose à six temps de refroidissement après 180 j. Fusion par usxsuw/usbsuw/ustsuw/usrsuw, analyse Python, script shell qui enchaîne recompilation conditionnelle → cycles → fusion → figures.',
          results: [
            {
              blocks: [
                { heading: 'La géométrie' },
                {
                  src: 'assets/projects/ntof_geometry.png',
                  caption: 'Figure 1 $-$ Coupe R-Z de la ligne n_TOF EAR2 telle que modélisée dans FLUKA. En haut : la ligne complète sur 25 m, de la cible de spallation en plomb au beam dump, l\'axe horizontal étant comprimé (Z et R ne sont pas à la même échelle) ; le trait tireté marque le plan de mesure à 19.95 m de parcours. En bas : le second collimateur à l\'échelle, montrant son empilement axial $-$ 2 m d\'acier, puis 0.6 m de polyéthylène boré, puis 0.4 m à cœur de B₄C $-$ et l\'alésage conique se resserrant de 70 mm à 21.8 mm. Les coordonnées de tous les corps sont lues directement dans le fichier d\'entrée FLUKA : le tracé ne peut donc pas diverger de la géométrie simulée. Cotes d\'après Weiß et al., Nucl. Instr. Meth. A 799 (2015) 90-98, Tableaux 1-2.'
                },
                {
                  text: 'L\'empilement axial du panneau inférieur mérite une note : une première version de ce travail modélisait l\'acier et le polyéthylène en coquilles concentriques plutôt qu\'en sections consécutives, ce qui change complètement l\'atténuation. L\'erreur a été détectée en remontant à la source primaire plutôt qu\'à un résumé de celle-ci.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'Le spectre émis' },
                {
                  src: 'assets/projects/ntof_flux_lethargy.png',
                  caption: 'Figure 2 $-$ Spectre neutronique source émis, en unités isoléthargiques.'
                },
                {
                  text: 'Le spectre source composite : pic thermique, zone épithermique croissante, pic rapide vers 1 MeV et composante haute énergie. Présenté comme documentation du modèle de source, non comme une validation.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'Le profil de faisceau $-$ et ce qu\'il contraint' },
                {
                  src: 'assets/projects/ntof_beam_fwhm.png',
                  caption: 'Figure 3 $-$ Profil radial du faisceau à la position échantillon, FWHM simulée vs publiée.'
                },
                {
                  text: 'La largeur de faisceau publiée à la position échantillon est de 21 mm FWHM. C\'est la seule grandeur du modèle réellement indépendante du spectre ajusté : elle est fixée par la géométrie de collimation et par la taille de la région émettrice.'
                },
                {
                  text: 'Le premier modèle, avec un disque émetteur de 15.85 cm, donnait 29.5 mm $-$ 40 % trop large. Plutôt que d\'ajuster des paramètres jusqu\'à retomber sur la bonne valeur, j\'ai construit un modèle analytique du profil comme convolution de l\'image géométrique de la sortie du collimateur par la source démagnifiée. Il révèle ce que la simulation seule aurait masqué :'
                },
                {
                  table: {
                    head: ['Rayon de source effectif', 'FWHM analytique', 'FLUKA'],
                    align: ['center', 'center', 'center'],
                    rows: [
                      ['0 (source ponctuelle)', '23.9 mm', '$-$'],
                      ['5 cm', '23.2 mm', '$-$'],
                      ['10 cm', '21.0 mm', '20.2 mm'],
                      ['15.85 cm', '27.0 mm', '29.5 mm'],
                    ]
                  }
                },
                {
                  text: 'Le modèle analytique a été construit en premier et a servi à savoir où chercher ; les runs FLUKA l\'ont ensuite confirmé. Resserrer les disques de plomb en aval $-$ l\'hypothèse dont j\'étais parti $-$ a également été testé et ne déplace la largeur que de 1.4 mm : ce n\'est donc pas le paramètre gouvernant.'
                },
                {
                  text: 'La largeur du faisceau n\'est pas monotone en taille de source. Convoluer l\'image en créneau de l\'ouverture par un flou de taille comparable produit un profil piqué dont la largeur à mi-hauteur est plus étroite que le créneau $-$ jusqu\'à ce que le flou domine et l\'élargisse à nouveau. Une source ponctuelle ne peut donc pas non plus reproduire 21 mm : ses 23.9 mm constituent un plancher géométrique infranchissable.'
                },
                {
                  text: 'La largeur publiée correspond à un rayon émetteur effectif d\'environ 10 cm, bien à l\'intérieur du modérateur de 30 cm. C\'est physiquement cohérent : la production de neutrons est concentrée près de l\'axe du faisceau, si bien qu\'un disque émettant uniformément surpondère la périphérie. La lecture honnête n\'est donc pas « le modèle prédit la largeur du faisceau » mais « la largeur mesurée contraint le rayon de source effectif à ≈10 cm » $-$ affirmation plus faible, et correcte.'
                }
              ]
            },
            {
              blocks: [
                { heading: 'Radioprotection : activation du collimateur' },
                {
                  src: 'assets/projects/ntof_activation.png',
                  caption: 'Figure 4 $-$ Activité induite et débit de dose résiduel dans la section acier de C2 en fonction du temps de refroidissement, après une irradiation nominale de 180 jours à 10¹³ n/s. Le nucléide dominant, annoté à chaque point, glisse du court vers le long à mesure que le matériau refroidit $-$ la signature classique d\'un inventaire d\'activation qui se relaxe dans le temps.'
                },
                {
                  text: 'Le scoring s\'appuie sur la chaîne RADDECAY de FLUKA : un inventaire RESNUCLEI et une carte de dose résiduelle sont évalués à six temps de refroidissement, de la fin d\'irradiation à un an. À l\'arrêt, l\'activité est dominée par le manganèse-56 (période 2.58 h) ; en un jour il a décru et le chrome-51 (27.7 j) prend le relais ; après un an le résiduel est essentiellement du fer-55 (2.74 ans). L\'activité totale chute d\'un facteur ≈18 sur l\'année et le pic de débit de dose résiduel d\'un facteur ≈74.'
                },
                {
                  table: {
                    head: ['Nucléide', 'Période', 'Activité à l\'arrêt (Bq)', 'Part'],
                    align: ['left', 'right', 'right', 'right'],
                    rows: [
                      ['Mn-56', '2.58 h',  '2.7 × 10¹¹', '52 %'],
                      ['Cr-51', '27.7 j',  '1.0 × 10¹¹', '20 %'],
                      ['Mo-99', '66 h',    '2.0 × 10¹⁰', '4 %'],
                      ['Co-58', '70.9 j',  '2.0 × 10¹⁰', '4 %'],
                      ['Mn-54', '312 j',   '1.8 × 10¹⁰', '3 %'],
                      ['Fe-55', '2.74 ans', '1.8 × 10¹⁰', '3 %'],
                    ],
                    caption: '190 nucléides au total, 5.2 × 10¹¹ Bq à l\'arrêt.'
                  }
                },
                {
                  text: 'Ce sont les produits d\'activation attendus de l\'acier inox sous flux neutronique (Mn et Cr issus du fer et du chrome, Co du nickel), ce qui constitue la principale assurance que l\'inventaire est correctement construit. L\'échelle absolue dépend de l\'intensité supposée de 10¹³ n/s, valeur nominale déclarée et non mesurée ; la décroissance relative et le classement des nucléides, eux, n\'en dépendent pas.'
                }
              ]
            }
          ]
        }
      }
    }
  ],
};

/* ---------- Renderer (no edit needed below) ---------- */
window.renderProjects = function (lang) {
  const data = window.PROJECTS;
  if (!data) return;
  const L = (data && data.featured && data.featured[0] && data.featured[0][lang]) ? lang : 'en';

  // i18n labels for the card hint + modal section titles (fallback to EN)
  const i18n = (window.I18N && window.I18N[L] && window.I18N[L].projects) ||
    (window.I18N && window.I18N.en && window.I18N.en.projects) || {};
  const labels = {
    open: i18n.open_hint || 'View project',
    overview: i18n.sec_overview || 'Overview',
    method: i18n.sec_method || 'Methodology & pipeline',
    results: i18n.sec_results || 'Results & figures',
    close: i18n.close || 'Close',
    overline: L === 'fr' ? 'Projets en Cours...' : 'Work in Progress...'
  };

  // FEATURED
  const featuredHost = document.getElementById('featured-list');
  if (featuredHost) {
    featuredHost.innerHTML = data.featured.map((p, i) => {
      const reverse = i % 2 === 1 ? ' featured__item--reverse' : '';
      const tech = (p.tech || []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
      const t = p[L];
      const linkBtn = p.link
        ? `<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener" class="featured__cta" aria-label="${escapeAttr(t.title)}">↗</a>`
        : '';
      return `
        <li class="featured__item${reverse}" data-pidx="${i}" role="button" tabindex="0"
            aria-haspopup="dialog" aria-label="${escapeAttr(t.title)} $-$ ${escapeAttr(labels.open)}">
          <div class="featured__content">
            <p class="featured__overline">${labels.overline}</p>
            <h3 class="featured__title">${escapeHtml(t.title)}</h3>
            <h3 class="featured__subtitle">${escapeHtml(t.subtitle)}</h3>
            <div class="featured__visual" aria-hidden="true">${p.svg || ''}</div>
            <div class="featured__body"><p>${escapeHtml(t.desc)}</p></div>
            <ul class="featured__tech">${tech}</ul>
            <p class="featured__open" aria-hidden="true">${escapeHtml(labels.open)} <span class="featured__open-arrow">→</span></p>
            ${linkBtn}
          </div>
        </li>`;
    }).join('');

    // Make each card open the detail modal (click + keyboard)
    featuredHost.querySelectorAll('.featured__item').forEach(item => {
      const idx = parseInt(item.getAttribute('data-pidx'), 10);
      const open = (e) => {
        // let real links inside the card behave normally
        if (e.target.closest('a')) return;
        openProjectModal(idx, L);
      };
      item.addEventListener('click', open);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); }
      });
    });
  }

  // OTHER
  const otherHost = document.getElementById('other-grid');
  if (otherHost && data.other) {
    otherHost.innerHTML = data.other.map((p) => {
      const tech = (p.tech || []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
      const t = p[L];
      const link = p.link
        ? `<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener" class="mini__link" aria-label="Open project">↗</a>`
        : `<span class="mini__link" aria-hidden="true">↗</span>`;
      return `
        <li class="mini">
          <header class="mini__head">
            ${p.icon || ''}
            ${link}
          </header>
          <h4>${escapeHtml(t.title)}</h4>
          <p>${escapeHtml(t.desc)}</p>
          <ul class="mini__tech">${tech}</ul>
        </li>`;
    }).join('');
  }

  // If the modal is already open (e.g. user switched language), refresh it
  if (modalState.openIndex !== null) {
    fillProjectModal(modalState.openIndex, L, labels);
  }

  /* ---------- Detail modal ---------- */

  // Render the blocks carried by a single result entry, in order. An entry may
  // hold one figure/text/table via flat keys, OR a `blocks` array to chain as
  // many of them as needed (several texts, several tables, mixed order). Each
  // block is itself an object with figure (src + caption), text (+ heading)
  // and/or table keys; within one block those render figure → text → table.
  function buildBlock(b) {
    if (!b) return [];
    const pieces = [];

    if (b.src) {
      pieces.push(`
      <figure class="pmodal__figure">
        <img src="${escapeAttr(b.src)}" alt="${escapeAttr(b.caption || '')}" loading="lazy"
             onerror="this.closest('.pmodal__figure').style.display='none'">
        ${b.caption ? `<figcaption>${escapeHtml(b.caption)}</figcaption>` : ''}
      </figure>`);
    }

    if (b.text || b.heading) {
      pieces.push(`
      <div class="pmodal__note">
        ${b.heading ? `<h4 class="pmodal__note-title">${escapeHtml(b.heading)}</h4>` : ''}
        ${b.text ? paragraphs(b.text) : ''}
      </div>`);
    }

    const table = buildTable(b.table);
    if (table) pieces.push(table);

    return pieces;
  }

  function buildFigures(results, lbl) {
    if (!results || !results.length) return '';
    // Everything stacks vertically at the width of the text column.
    const figs = results.map(r => {
      const blocks = Array.isArray(r.blocks) ? r.blocks : [r];
      const pieces = blocks.reduce((acc, b) => acc.concat(buildBlock(b)), []);
      if (!pieces.length) return '';
      // Grouped when an entry produces more than one piece, so they sit closer
      // to each other than to the neighbouring entries
      return pieces.length > 1
        ? `<div class="pmodal__result">${pieces.join('')}</div>`
        : pieces[0];
    }).join('');
    return `
      <section class="pmodal__section">
        <h3 class="pmodal__section-title">${escapeHtml(lbl.results)}</h3>
        <div class="pmodal__figures">${figs}</div>
      </section>`;
  }

  /* Table: { head: ['A','B'], rows: [['1','2'], ...], caption: '...',
              align: ['left','right'] }  — head, caption and align optional.
     Cells accept $...$ math like the rest of the modal. */
  function buildTable(t) {
    if (!t || !t.rows || !t.rows.length) return '';
    const align = t.align || [];
    const cls = i => align[i] ? ` class="is-${escapeAttr(align[i])}"` : '';
    const cells = (row, tag) => row
      .map((c, i) => `<${tag}${cls(i)}>${escapeHtml(c)}</${tag}>`).join('');

    const head = (t.head && t.head.length)
      ? `<thead><tr>${cells(t.head, 'th')}</tr></thead>` : '';
    const body = `<tbody>${t.rows.map(row => `<tr>${cells(row, 'td')}</tr>`).join('')}</tbody>`;

    return `
      <div class="pmodal__table-wrap">
        <table class="pmodal__table">
          ${t.caption ? `<caption>${escapeHtml(t.caption)}</caption>` : ''}
          ${head}${body}
        </table>
      </div>`;
  }

  function paragraphs(text) {
    return String(text || '').split(/\n\n+/).map(p =>
      `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
  }

  window.fillProjectModal = function (idx, lng, lbl) {
    const modal = ensureModal();
    const proj = data.featured[idx];
    if (!proj) return;
    const tt = proj[lng] || proj.en;
    const det = tt.detail || {};
    const tech = (proj.tech || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');

    modal.querySelector('.pmodal__overline').textContent = lbl.overline;
    modal.querySelector('.pmodal__title').textContent = tt.title;
    modal.querySelector('.pmodal__subtitle').textContent = tt.subtitle || '';

    const body = modal.querySelector('.pmodal__sections');
    body.innerHTML =
      `<section class="pmodal__section">
         <h3 class="pmodal__section-title">${escapeHtml(lbl.overview)}</h3>
         ${paragraphs(tt.desc)}
       </section>` +
      (det.methodology
        ? `<section class="pmodal__section">
             <h3 class="pmodal__section-title">${escapeHtml(lbl.method)}</h3>
             ${paragraphs(det.methodology)}
           </section>`
        : '') +
      buildFigures(det.results, lbl) +
      (tech ? `<ul class="pmodal__tech">${tech}</ul>` : '');

    modal.querySelector('.pmodal__close').setAttribute('aria-label', lbl.close);

    // Re-typeset math if MathJax is present (some descriptions use $...$)
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([modal]).catch(() => { });
    }
  };

  function fillProjectModal(idx, lng, lbl) { window.fillProjectModal(idx, lng, lbl); }

  window.openProjectModal = function (idx, lng) {
    const modal = ensureModal();
    fillProjectModal(idx, lng || L, labels);
    modalState.openIndex = idx;
    modalState.lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
    document.body.classList.add('is-modal-open');
    const closeBtn = modal.querySelector('.pmodal__close');
    if (closeBtn) closeBtn.focus();
  };

  function openProjectModal(idx, lng) { window.openProjectModal(idx, lng); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }
};

/* ---------- Modal scaffold + global wiring (built once) ---------- */
var modalState = { openIndex: null, lastFocus: null };

function ensureModal() {
  let modal = document.getElementById('project-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'project-modal';
  modal.className = 'pmodal';
  modal.setAttribute('hidden', '');
  modal.innerHTML = `
    <div class="pmodal__backdrop" data-close></div>
    <div class="pmodal__dialog" role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
      <button type="button" class="pmodal__close" data-close aria-label="Close">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <p class="pmodal__overline"></p>
      <h2 class="pmodal__title" id="pmodal-title"></h2>
      <p class="pmodal__subtitle"></p>
      <div class="pmodal__sections"></div>
    </div>`;
  document.body.appendChild(modal);

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('is-modal-open');
    modalState.openIndex = null;
    if (modalState.lastFocus && modalState.lastFocus.focus) {
      modalState.lastFocus.focus();
    }
  }
  window.closeProjectModal = close;

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    // Simple focus trap inside the dialog
    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const f = modal.querySelectorAll('button, a[href], img[tabindex], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  return modal;
}
