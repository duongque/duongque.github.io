/* ============================================================
   LOGOS — references images stored in assets/logos/.
   You provide the official files (SVG preferred, PNG OK).

   File naming convention: assets/logos/<key>.<ext>
   The default extension is .svg. Override per-key in FILES below
   if you only have a PNG (e.g. fluka: 'fluka.png').

   If a file is missing, the chip falls back to a text-only label
   (no broken image icon visible).

   Usage in HTML:
     <span data-logo="python"></span>          -> chip with logo + label
     <span data-logo-icon="cern"></span>       -> just the logo icon
     <span data-logo-mark="paris-saclay"></span> -> compact wordmark
   ============================================================ */

(function () {
  // ---------------------------------------------------------
  // Per-key file overrides (otherwise: <key>.svg).
  // Adjust to .png if that's what you downloaded for that key.
  // ---------------------------------------------------------
  const FILES = {
    // Languages & scripting
    python: 'python.svg',
    cpp: 'cpp.svg',
    vba: 'vba.svg',
    latex: 'latex.svg',
    bash: 'bash.svg',
    powershell: 'powershell.svg',
    fortran: 'fortran.svg',
    html: 'html.svg',

    // Simulation & modelling
    pyecloud: 'pyecloud.svg',
    fluka: 'fluka.svg',
    comsol: 'comsol.svg',
    madx: 'madx.svg',
    mcnp: 'mcnp.svg',

    // Data analysis & scientific computing
    numpy: 'numpy.svg',
    root: 'root.svg',
    timber: 'timber.svg',
    jupyter: 'jupyter.svg',
    sklearn: 'sklearn.svg',
    sql: 'sql.svg',

    // Instrumentation & acquisition
    labview: 'labview.svg',
    gpib: 'gpib.svg',

    // Dev, automation & AI
    git: 'git.svg',
    vscode: 'vscode.svg',
    llmapi: 'llmapi.svg',

    // Organisations (Experience tabs / Education)
    cern: 'cern.svg',
    kek: 'kek.svg',
    edf: 'edf.svg',
    thales: 'thales.svg',
    jparc: 'jparc.svg',
    ifast: 'ifast.svg',
    juas: 'juas.svg',

    // Schools
    'cas': 'cas.svg',
    'paris-saclay': 'paris-saclay.svg',
    'grenoble-inp': 'grenoble-inp.svg',
    'phelma': 'phelma.svg',
    'grenoble-alpes': 'grenoble-alpes.svg',

    // Generic fallbacks
    building: 'building.svg',
    school: 'school.svg',
    atom: 'atom.svg'
  };

  // Human-readable labels (used in chips when chip mode is invoked)
  const LABEL = {
    python: 'Python',
    cpp: 'C / C++',
    vba: 'VBA',
    latex: 'LaTeX',
    bash: 'Bash',
    powershell: 'PowerShell',
    fortran: 'Fortran',
    html: 'HTML',

    pyecloud: 'PyECLOUD',
    fluka: 'FLUKA',
    comsol: 'COMSOL',
    madx: 'MAD-X',
    mcnp: 'MCNP',

    numpy: 'NumPy / SciPy / Pandas',
    root: 'ROOT',
    timber: 'TIMBER / NXCALS',
    jupyter: 'Jupyter',
    sklearn: 'scikit-learn',
    sql: 'SQL / SQLite',

    labview: 'LabVIEW',
    gpib: 'GPIB / VISA',

    git: 'Git / GitHub',
    vscode: 'VS Code',
    llmapi: 'LLM API',

    cern: 'CERN',
    kek: 'KEK / J-PARC',
    edf: 'EDF',
    thales: 'Thales',
    jparc: 'J-PARC',
    ifast: 'i-FAST',
    juas: 'JUAS',

    'cas': 'CERN Accelerator School',
    'paris-saclay': 'Université Paris-Saclay',
    'grenoble-inp': 'Grenoble INP',
    'phelma': 'Grenoble INP – PHELMA',
    'grenoble-alpes': 'Université Grenoble Alpes'
  };

  const BASE = 'assets/logos/';

  // ---------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------
  function fileFor(key) {
    return FILES[key] || (key + '.svg');
  }
  function labelFor(key) {
    return LABEL[key] || key;
  }

  // <img> element with two-step onerror chain:
  //  1. tries the declared file (e.g. python.svg)
  //  2. if that 404s, retries with the alternate extension (.png ↔ .svg)
  //  3. if that also 404s, replaces the <img> with an empty span (chip shows wordmark only).
  function imgTag(key, cssClass) {
    const file = fileFor(key);
    const altExt = file.endsWith('.svg') ? '.png' : '.svg';
    const altFile = file.replace(/\.(svg|png)$/i, altExt);
    const label = labelFor(key);

    return '<img src="' + BASE + file +
      '" data-alt-src="' + BASE + altFile +
      '" alt="' + escapeAttr(label) +
      '" class="' + cssClass +
      '" loading="lazy"' +
      ' onerror="(function(i){if(i.dataset.altSrc){i.src=i.dataset.altSrc;i.removeAttribute(\'data-alt-src\');}else{i.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'lg-fallback\'}));}})(this)" />';
  }

  function chip(key) {
    return '<span class="lg-chip">' + imgTag(key, 'lg-chip__icon') + '<span>' + escapeHtml(labelFor(key)) + '</span></span>';
  }
  function iconOnly(key) {
    return imgTag(key, 'lg-icon');
  }
  function mark(key) {
    return '<span class="lg-mark">' + imgTag(key, 'lg-mark__icon') +
      '<span class="lg-mark__text">' + escapeHtml(labelFor(key)) + '</span></span>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // Public API
  window.getLogo = function (key, mode) {
    if (mode === 'icon') return iconOnly(key);
    if (mode === 'mark') return mark(key);
    return chip(key);
  };

  window.injectLogos = function () {
    document.querySelectorAll('[data-logo]').forEach(el => {
      el.innerHTML = chip(el.getAttribute('data-logo'));
    });
    document.querySelectorAll('[data-logo-icon]').forEach(el => {
      el.innerHTML = iconOnly(el.getAttribute('data-logo-icon'));
    });
    document.querySelectorAll('[data-logo-mark]').forEach(el => {
      el.innerHTML = mark(el.getAttribute('data-logo-mark'));
    });
  };
})();
