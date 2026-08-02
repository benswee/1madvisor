/* ═══════════════════════════════════════════════════════════════════
   $1M ADVISOR — STAGE REGISTRY + NAV RENDERER
   Paste into  Website Settings ▸ Custom JS  (WITHOUT <script> tags).

   ┌───────────────────────────────────────────────────────────────┐
   │  THIS IS THE ONLY PLACE STAGES ARE DEFINED.                   │
   │  To add a new stage: add one line to MA_STAGES below.         │
   │  Every page's index and prev/next updates automatically.      │
   └───────────────────────────────────────────────────────────────┘

   Each page carries exactly ONE piece of per-page wiring:
       <div class="ma-nav" data-current="stage-1"></div>
   ...where data-current matches a slug below.

   IF YOUR GHL PLAN HAS NO FUNNEL-LEVEL CUSTOM JS: paste this into
   Page Settings ▸ Custom Code on each page instead. It still works —
   you just have to repeat the paste when you edit the registry.
   ═══════════════════════════════════════════════════════════════════ */

/* ---------- 1. CONFIG ---------- */

/* URL prefix for stage pages. Trailing slash required. */
var MA_BASE = '/training/';

/* ---------- 2. THE REGISTRY ---------- */
/* Order here = order in the index = prev/next order.
   `label` is what shows in the left rail. Keep it short — the rail is 25%.
   Add, remove or reorder freely; nothing else needs touching. */

var MA_STAGES = [
  { slug: 'start',      label: 'Start Here' },
  { slug: 'context',    label: 'Context' },
  { slug: 'survive',    label: 'Stage 0: Survive ($0–50K)' },
  { slug: 'prospect',   label: 'Stage 1: Prospect ($50–100K)' },
  { slug: 'qualify',    label: 'Stage 2: Qualify (MDRT)' },
  { slug: 'systemize',  label: 'Stage 3: Systemize ($100–150K)' },
  { slug: 'elevate',    label: 'Stage 4: Elevate ($150–250K)' },
  { slug: 'corporatize',label: 'Stage 5: Corporatize (COT)' },
  { slug: 'collaborate',label: 'Stage 6: Collaborate ($250–400K)' },
  { slug: 'convene',    label: 'Stage 7: Convene ($400–600K)' },
  { slug: 'delegate',   label: 'Stage 8: Delegate ($600K–1M)' },
  { slug: 'multiply',   label: 'Stage 9: Multiply (TOT)' },
  { slug: 'bonus',      label: 'Free Bonus' }
];


/* ═══════════════════════════════════════════════════════════════════
   3. RENDERER — nothing below needs editing.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function slugFromPath() {
    var p = location.pathname.replace(/\/+$/, '');
    return p.slice(p.lastIndexOf('/') + 1);
  }

  function indexOfSlug(slug) {
    for (var i = 0; i < MA_STAGES.length; i++) {
      if (MA_STAGES[i].slug === slug) return i;
    }
    return -1;
  }

  function renderNav(el) {
    /* GHL re-renders Custom HTML blocks on every builder edit, which would
       otherwise append a second copy of the whole index. */
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var current = el.getAttribute('data-current') || slugFromPath();
    var html = '';

    for (var i = 0; i < MA_STAGES.length; i++) {
      var s = MA_STAGES[i];
      html += '<a href="' + MA_BASE + s.slug + '"'
            + (s.slug === current ? ' class="is-active"' : '')
            + '>' + s.label + '</a>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }

  function renderPager(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var current = el.getAttribute('data-current') || slugFromPath();
    var i = indexOfSlug(current);
    var prev = i > 0 ? MA_STAGES[i - 1] : null;
    var next = (i > -1 && i < MA_STAGES.length - 1) ? MA_STAGES[i + 1] : null;

    /* Empty slots stay in the DOM as invisible placeholders so a lone
       "Next" button keeps its half of the row instead of stretching. */
    el.innerHTML =
      (prev ? '<a href="' + MA_BASE + prev.slug + '">← ' + prev.label + '</a>'
            : '<a class="is-empty" aria-hidden="true"></a>') +
      (next ? '<a href="' + MA_BASE + next.slug + '">' + next.label + ' →</a>'
            : '<a class="is-empty" aria-hidden="true"></a>');

    el.setAttribute('data-ma-rendered', '1');
  }

  /* Home page roadmap grid. Same registry, so adding a stage updates the
     home page as well as every stage page. Numbering skips the non-stage
     entries (Start Here, Context, Free Bonus) — they get a dash instead. */
  function renderLadder(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var html = '', n = 0;
    for (var i = 0; i < MA_STAGES.length; i++) {
      var s = MA_STAGES[i];
      var isStage = /^Stage\s/.test(s.label);
      var mark = isStage ? String(n++) : '·';
      html += '<a href="' + MA_BASE + s.slug + '">'
            + '<span class="ma-ladder-n">' + mark + '</span>'
            + '<span>' + s.label + '</span></a>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }

  /* The mobile accordion. <details> is closed by default and CSS cannot
     toggle the `open` attribute, so it is managed here: open on desktop,
     closed on mobile — unless the visitor has opened it themselves. */
  function syncAccordion() {
    var accs = document.querySelectorAll('.ma-nav-acc');
    for (var i = 0; i < accs.length; i++) {
      var a = accs[i];
      if (a.getAttribute('data-ma-touched') === '1') continue;
      if (window.innerWidth > 768) a.setAttribute('open', '');
      else a.removeAttribute('open');
    }
  }

  function init() {
    var navs = document.querySelectorAll('.ma-nav');
    for (var i = 0; i < navs.length; i++) renderNav(navs[i]);

    var pagers = document.querySelectorAll('.ma-pager');
    for (var j = 0; j < pagers.length; j++) renderPager(pagers[j]);

    var ladders = document.querySelectorAll('[data-ma-ladder]');
    for (var m = 0; m < ladders.length; m++) renderLadder(ladders[m]);

    var accs = document.querySelectorAll('.ma-nav-acc');
    for (var k = 0; k < accs.length; k++) {
      if (accs[k].getAttribute('data-ma-bound') === '1') continue;
      accs[k].setAttribute('data-ma-bound', '1');
      accs[k].addEventListener('toggle', function () {
        this.setAttribute('data-ma-touched', '1');
      });
    }
    syncAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* GHL sometimes mounts page blocks after DOMContentLoaded. One late
     retry costs nothing and covers that race. */
  setTimeout(init, 600);

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(syncAccordion, 150);
  });
})();
