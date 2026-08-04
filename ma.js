/* ═══════════════════════════════════════════════════════════════════
   $1M ADVISOR — LESSON REGISTRY + RENDERERS
   Paste into  Page Settings ▸ Custom Code ▸ Head  is NOT where this goes.
   This file is hosted: https://benswee.github.io/1madvisor/ma.js
   Pages load it via the one <script> tag in page-head-snippet.txt.

   ┌───────────────────────────────────────────────────────────────┐
   │  THIS IS THE ONLY PLACE LESSONS ARE DEFINED.                  │
   │  Source of truth for content status is the Google Sheet:      │
   │  "$1M Advisor Course Material" (Topic / Assigned To / ...).   │
   │  This array must mirror its Topic + Assigned To columns.      │
   │                                                               │
   │  To add a lesson: add one line below, re-upload ma.js.        │
   │  Every page's index, prev/next and the home roadmap update.   │
   └───────────────────────────────────────────────────────────────┘

   Pages need NO per-page wiring: the current lesson is detected from the
   URL. A page at /training/prospecting is matched to slug 'prospecting'
   automatically, which fills its kicker (group name) and byline (teacher).
   `data-current="slug"` is still honoured as an override if ever needed.
   ═══════════════════════════════════════════════════════════════════ */

/* ---------- 1. CONFIG ---------- */

/* URL prefix for lesson pages. Trailing slash required. */
var MA_BASE = '/training/';


/* ---------- 2. THE REGISTRY ---------- */
/* Entries with `group` are non-clickable section headings.
   Entries with `slug` are lesson pages.
     slug    → URL segment, must match the GHL page slug exactly
     label   → shown in the index, roadmap and (as fallback) the page H1
     teacher → the "Assigned To" name from the sheet; shown everywhere */

var MA_STAGES = [
  { slug: 'start', label: 'Start Here' },

  { group: 'Marketing — Getting Clients' },
  { slug: 'prospecting',        label: 'Prospecting',                          teacher: 'Gord' },
  { slug: 'client-conferences', label: 'Client Conferences',                   teacher: 'Ace' },
  { slug: 'networking',         label: 'Strategic Networking',                 teacher: 'Clement' },
  { slug: 'accountants',        label: 'Working With Client Accountants',      teacher: 'Tim' },

  { group: 'Sales — Closing Bigger Cases' },
  { slug: 'discovery',          label: 'The Discovery Process',                teacher: 'Tim' },
  { slug: 'rrsp-trap',          label: 'Fixing The RRSP Trap',                 teacher: 'Tim' },
  { slug: 'irp',                label: 'Insured Retirement Plan (IRP)',        teacher: 'Tim' },
  { slug: 'personal-ifa',       label: 'Personal IFA',                         teacher: 'Tim' },
  { slug: 'corp-insurance',     label: 'Corporate Insurance Sales',            teacher: 'Thomas' },

  { group: 'Investments — Building AUM' },
  { slug: 'aum-engine',         label: 'Building A Predictable AUM Engine',    teacher: 'Harry' },
  { slug: 'growth-framework',   label: 'The 3-Step Investment Growth Framework', teacher: 'Harry' },

  { group: 'Practice Growth — Mindset & Team' },
  { slug: 'mindset',            label: 'Mindset',                              teacher: 'Tim' },
  { slug: 'top-20',             label: 'The Top-20 Wealth Blueprint',          teacher: 'Tim' },
  { slug: 'delegation',         label: 'Delegation',                           teacher: 'Gord' },
  { slug: 'scaling',            label: 'Scaling Beyond You',                   teacher: 'Harry' }
];


/* ═══════════════════════════════════════════════════════════════════
   3. RENDERERS — nothing below needs editing.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function slugFromPath() {
    var p = location.pathname.replace(/\/+$/, '');
    return p.slice(p.lastIndexOf('/') + 1);
  }

  function currentSlug(el) {
    return (el && el.getAttribute('data-current')) || slugFromPath();
  }

  /* Clickable entries only — group headings are skipped. */
  function lessons() {
    var out = [];
    for (var i = 0; i < MA_STAGES.length; i++) {
      if (MA_STAGES[i].slug) out.push(MA_STAGES[i]);
    }
    return out;
  }

  function findStage(slug) {
    for (var i = 0; i < MA_STAGES.length; i++) {
      if (MA_STAGES[i].slug === slug) return MA_STAGES[i];
    }
    return null;
  }

  /* The group heading a lesson sits under (null for Start Here). */
  function groupOf(slug) {
    var g = null;
    for (var i = 0; i < MA_STAGES.length; i++) {
      if (MA_STAGES[i].group) g = MA_STAGES[i].group;
      if (MA_STAGES[i].slug === slug) return g;
    }
    return null;
  }


  /* ---------- LEFT RAIL INDEX ---------- */
  function renderNav(el) {
    /* GHL re-renders Custom HTML blocks on every builder edit, which would
       otherwise append a second copy of the whole index. */
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var cur = currentSlug(el), html = '';

    for (var i = 0; i < MA_STAGES.length; i++) {
      var s = MA_STAGES[i];

      if (s.group) {
        html += '<p class="ma-nav-group">' + esc(s.group) + '</p>';
        continue;
      }

      html += '<a href="' + MA_BASE + s.slug + '"'
            + (s.slug === cur ? ' class="is-active"' : '') + '>'
            + '<span class="ma-nav-label">' + esc(s.label) + '</span>'
            + (s.teacher ? '<span class="ma-nav-teacher">' + esc(s.teacher) + '</span>' : '')
            + '</a>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }


  /* ---------- PREV / NEXT ---------- */
  function renderPager(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var list = lessons(), cur = currentSlug(el), i = -1;
    for (var n = 0; n < list.length; n++) if (list[n].slug === cur) i = n;

    var prev = i > 0 ? list[i - 1] : null;
    var next = (i > -1 && i < list.length - 1) ? list[i + 1] : null;

    /* Empty slots stay in the DOM as invisible placeholders so a lone
       "Next" button keeps its half of the row instead of stretching. */
    el.innerHTML =
      (prev ? '<a href="' + MA_BASE + prev.slug + '">← ' + esc(prev.label) + '</a>'
            : '<a class="is-empty" aria-hidden="true"></a>') +
      (next ? '<a href="' + MA_BASE + next.slug + '">' + esc(next.label) + ' →</a>'
            : '<a class="is-empty" aria-hidden="true"></a>');

    el.setAttribute('data-ma-rendered', '1');
  }


  /* ---------- HOME PAGE ROADMAP ---------- */
  /* Same registry, so adding a lesson updates the home page too. */
  function renderLadder(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var html = '', n = 0;

    for (var i = 0; i < MA_STAGES.length; i++) {
      var s = MA_STAGES[i];

      if (s.group) {
        html += '<p class="ma-ladder-group">' + esc(s.group) + '</p>';
        continue;
      }
      if (s.slug === 'start') continue;   /* the roadmap lists lessons only */

      n++;
      html += '<a href="' + MA_BASE + s.slug + '">'
            + '<span class="ma-ladder-n">' + n + '</span>'
            + '<span class="ma-ladder-body">'
            + '<span class="ma-ladder-label">' + esc(s.label) + '</span>'
            + (s.teacher ? '<span class="ma-ladder-teacher">' + esc(s.teacher) + '</span>' : '')
            + '</span></a>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }


  /* ---------- PAGE META (kicker + byline + H1 fallback) ---------- */
  /* Lets a cloned lesson page work with zero hand-editing of the title
     block: the URL identifies the lesson, and the group name and teacher
     are filled from the registry. */
  function renderMeta() {
    var slug = slugFromPath();
    var st = findStage(slug);
    if (!st) return;

    var kicker = document.querySelector('[data-ma-kicker]');
    if (kicker && kicker.getAttribute('data-ma-rendered') !== '1') {
      kicker.textContent = groupOf(slug) || 'Free Training For Canadian Advisors';
      kicker.setAttribute('data-ma-rendered', '1');
    }

    var byline = document.querySelector('[data-ma-byline]');
    if (byline && byline.getAttribute('data-ma-rendered') !== '1') {
      byline.innerHTML = st.teacher
        ? 'Taught by <strong>' + esc(st.teacher) + '</strong>'
        : '';
      byline.setAttribute('data-ma-rendered', '1');
    }

    /* Only fills an EMPTY h1 — a hand-written headline always wins, and
       keeping it in the HTML avoids an empty flash before this runs. */
    var title = document.querySelector('[data-ma-title]');
    if (title && !title.textContent.trim()) title.textContent = st.label;
  }


  /* ---------- MOBILE ACCORDION ---------- */
  /* <details> is closed by default and CSS cannot toggle the `open`
     attribute, so it is managed here: open on desktop, closed on mobile —
     unless the visitor has opened it themselves. */
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

    renderMeta();

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
