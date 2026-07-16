/* ============================================================
   PROJECTS DATA — edit this file to update the Projects section.
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
         results: [                      // figure gallery (add as many as you want)
           { src: 'assets/projects/xxx.png', caption: '...' }
         ]
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
      svg: '<img src="assets/projects/transmutex_geometry.png" alt="ADS-Target Activation" style="width:100%;height:100%;object-fit:contain;display:block;background:#0a192f;">',
      en: {
        title: 'ADS-Target Activation',
        subtitle: 'A Python-Driven FLUKA Pipeline for Inventory and Residual-Dose Assessment of a MEGAPIE-Class LBE Spallation Target under 800 MeV Proton Irradiation (TRANSMUTEX)',
        desc: 'ADS-Target Activation models the nuclear inventory and residual radiation field of a MEGAPIE-class lead-bismuth eutectic (LBE) spallation target driven by an 800 MeV, 5 mA proton beam, in a context directly inspired by the TRANSMUTEX accelerator-driven system. The geometry reproduces the reference design: a T91 hemispherical beam window, the LBE target volume, a liquid-lead region acting as the reactor coolant, a T91 vessel and a concrete biological shield. A generic, YAML-driven Python pipeline orchestrates FLUKA end to end. It renders the input from Jinja2 templates, runs the activation simulation, and uses FLUKA\'s native radioactive-decay transport (semi-analogue RADDECAY) to follow the real decay products and build the time-resolved isotopic inventory and residual dose field at several cooling times (end-of-irradiation, 1 h, 1 d, 1 week, 30 days). Particular attention is given to Po-210 production and its radiological implications, including residual dose maps and maintenance-access scenarios, with results benchmarked against MEGAPIE post-test analyses, HINDAS/n_TOF spallation data and NEA/OECD technical reports on LBE-cooled ADS systems. The framework is campaign-agnostic and fully reproducible: geometry, beam, scoring and post-processing (isotope rankings, Z-A maps, Po-210 time evolution, USRBIN dose heatmaps, schematic cross-section) are regenerated automatically from a single configuration file.',
        detail: {
          methodology:
            'The reference geometry reproduces a MEGAPIE-class target: a T91 hemispherical beam window, the lead-bismuth eutectic (LBE) target volume, a surrounding liquid-lead coolant region, a T91 structural vessel and a concrete biological shield. All dimensions, materials and beam parameters live in a single YAML configuration file.\n\n' +
            'A generic Python pipeline orchestrates FLUKA end to end: it renders the FLUKA input from Jinja2 templates, launches the irradiation run (800 MeV, 5 mA proton beam), then uses FLUKA\'s native semi-analogue radioactive-decay transport (RADDECAY) to follow the real decay chains and reconstruct the time-resolved isotopic inventory.\n\n' +
            'Residual dose fields are scored with USRBIN at several cooling times (end-of-irradiation, 1 h, 1 d, 1 week, 30 days). Post-processing — isotope rankings, Z–A maps, Po-210 time evolution, USRBIN dose heatmaps and the schematic cross-section — is regenerated automatically from the same configuration, so the whole campaign is reproducible from one file.',
          results: [
            {
              src: 'assets/projects/transmutex_geometry.png',
              caption: 'Reference MEGAPIE-class geometry: T91 beam window, LBE target, liquid-lead coolant, T91 vessel and concrete shield, generated from the YAML configuration.'
            }
            /* Add more result figures here, e.g.:
            { src: 'assets/projects/transmutex_dose_map.png', caption: 'USRBIN residual dose map 30 days after end-of-irradiation.' },
            { src: 'assets/projects/transmutex_po210.png',   caption: 'Po-210 activity time evolution during cooling.' }
            */
          ]
        }
      },
      fr: {
        title: 'ADS-Target Activation',
        subtitle: 'Un pipeline FLUKA piloté par Python pour l\'évaluation de l\'inventaire et de la dose résiduelle d\'une cible de spallation LBE de classe MEGAPIE sous irradiation de protons de 800 MeV (TRANSMUTEX)',
        desc: 'ADS-Target Activation modélise l\'inventaire nucléaire et le champ de rayonnement résiduel d\'une cible de spallation en eutectique plomb-bismuth (LBE) de classe MEGAPIE, alimentée par un faisceau de protons de 800 MeV et 5 mA, dans un contexte directement inspiré du système piloté par accélérateur TRANSMUTEX. La géométrie reproduit le design de référence : une fenêtre faisceau hémisphérique en T91, le volume de cible LBE, une région de plomb liquide jouant le rôle de caloporteur du réacteur, une cuve en T91 et un blindage biologique en béton. Un pipeline Python générique, piloté par fichier YAML, orchestre FLUKA de bout en bout. Il génère l\'entrée à partir de templates Jinja2, lance la simulation d\'activation, et utilise le transport natif de décroissance radioactive de FLUKA (RADDECAY semi-analogique) pour suivre les véritables produits de désintégration et construire l\'inventaire isotopique résolu en temps ainsi que le champ de dose résiduelle à plusieurs temps de refroidissement (fin d\'irradiation, 1 h, 1 j, 1 semaine, 30 jours). Une attention particulière est portée à la production de Po-210 et à ses implications radiologiques, incluant les cartes de dose résiduelle et les scénarios d\'accès en maintenance, avec des résultats confrontés aux analyses post-test de MEGAPIE, aux données de spallation HINDAS/n_TOF et aux rapports techniques NEA/AEN sur les systèmes ADS refroidis au LBE. Le cadre est indépendant de la campagne et entièrement reproductible : géométrie, faisceau, scoring et post-traitement (classements isotopiques, cartes Z-A, évolution temporelle du Po-210, cartes de dose USRBIN, coupe schématique) sont régénérés automatiquement à partir d\'un unique fichier de configuration.',
        detail: {
          methodology:
            'La géométrie de référence reproduit une cible de classe MEGAPIE : une fenêtre faisceau hémisphérique en T91, le volume de cible en eutectique plomb-bismuth (LBE), une région de plomb liquide caloporteur, une cuve structurelle en T91 et un blindage biologique en béton. Toutes les dimensions, matériaux et paramètres faisceau résident dans un unique fichier de configuration YAML.\n\n' +
            'Un pipeline Python générique orchestre FLUKA de bout en bout : il génère l\'entrée FLUKA à partir de templates Jinja2, lance la phase d\'irradiation (faisceau de protons 800 MeV, 5 mA), puis utilise le transport natif semi-analogique de décroissance radioactive de FLUKA (RADDECAY) pour suivre les vraies chaînes de désintégration et reconstruire l\'inventaire isotopique résolu en temps.\n\n' +
            'Les champs de dose résiduelle sont scorés avec USRBIN à plusieurs temps de refroidissement (fin d\'irradiation, 1 h, 1 j, 1 semaine, 30 jours). Le post-traitement — classements isotopiques, cartes Z–A, évolution temporelle du Po-210, cartes de dose USRBIN et coupe schématique — est régénéré automatiquement depuis la même configuration : toute la campagne est reproductible à partir d\'un seul fichier.',
          results: [
            {
              src: 'assets/projects/transmutex_geometry.png',
              caption: 'Géométrie de référence de classe MEGAPIE : fenêtre faisceau T91, cible LBE, caloporteur plomb liquide, cuve T91 et blindage béton, générée depuis la configuration YAML.'
            }
            /* Ajouter d\'autres figures de résultats ici, ex. :
            { src: 'assets/projects/transmutex_dose_map.png', caption: 'Carte de dose résiduelle USRBIN 30 jours après fin d\'irradiation.' },
            { src: 'assets/projects/transmutex_po210.png',   caption: 'Évolution temporelle de l\'activité du Po-210 pendant le refroidissement.' }
            */
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
            aria-haspopup="dialog" aria-label="${escapeAttr(t.title)} — ${escapeAttr(labels.open)}">
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

  function buildFigures(results, lbl) {
    if (!results || !results.length) return '';
    const figs = results.map(r => `
      <figure class="pmodal__figure">
        <img src="${escapeAttr(r.src)}" alt="${escapeAttr(r.caption || '')}" loading="lazy"
             onerror="this.closest('.pmodal__figure').style.display='none'">
        ${r.caption ? `<figcaption>${escapeHtml(r.caption)}</figcaption>` : ''}
      </figure>`).join('');
    return `
      <section class="pmodal__section">
        <h3 class="pmodal__section-title">${escapeHtml(lbl.results)}</h3>
        <div class="pmodal__figures">${figs}</div>
      </section>`;
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
