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

/* Where to send lessons marked `soon: true` (i.e. the GHL page doesn't
   exist yet). Leave null and they render greyed-out and NOT clickable —
   which is the safe default, because linking to a page that doesn't exist
   gives visitors a 404. Set it to a shared "coming soon" page URL if you
   ever want those lessons clickable instead. */
var MA_SOON_URL = null;


/* ---------- 2. THE REGISTRY ---------- */
/* Entries with `group` are non-clickable section headings.
   Entries with `slug` are lesson pages.
     slug    → URL segment, must match the GHL page slug exactly
     label   → shown in the index, roadmap and (as fallback) the page H1
     teacher → the "Assigned To" name from the sheet; shown everywhere
     video   → YouTube ID ('aB3xY9kLmNo') OR a full embed URL (Vimeo, VTurb…).
               Omit it and the page keeps its "Video Coming Soon" panel.
     optin   → headline above the form on that lesson's page. Omit it and
               the page keeps whatever headline is written in its HTML.
     soon    → the GHL page isn't built yet: renders greyed with a "Soon"
               tag and is not clickable. DELETE this flag the moment the
               page goes live, and the link switches itself on. */

var MA_STAGES = [
  { slug: 'start', label: 'Start Here' },

  { group: 'Marketing — Getting Clients' },
  { slug: 'prospecting',        label: 'Prospecting',                          teacher: 'Gord', soon: true },
  { slug: 'client-conferences', label: 'Client Conferences',                   teacher: 'Ace', soon: true },
  { slug: 'networking',         label: 'Strategic Networking',                 teacher: 'Clement', soon: true },
  { slug: 'accountants',        label: 'Working With Client Accountants',      teacher: 'Tim', soon: true },

  { group: 'Sales — Closing Bigger Cases' },
  { slug: 'discovery',          label: 'The Discovery Process',                teacher: 'Tim', soon: true },
  { slug: 'rrsp-trap',          label: 'Fixing The RRSP Trap',                 teacher: 'Tim', soon: true },
  { slug: 'irp',                label: 'Insured Retirement Plan (IRP)',        teacher: 'Tim', soon: true },
  { slug: 'personal-ifa',       label: 'Personal IFA',                         teacher: 'Tim', soon: true },
  { slug: 'corp-insurance',     label: 'Corporate Insurance Sales',            teacher: 'Thomas', soon: true },

  { group: 'Investments — Building AUM' },
  { slug: 'aum-engine',         label: 'Building A Predictable AUM Engine',    teacher: 'Harry', soon: true },
  { slug: 'growth-framework',   label: 'The 3-Step Investment Growth Framework', teacher: 'Harry', soon: true },

  { group: 'Practice Growth — Mindset & Team' },
  { slug: 'mindset',            label: 'Mindset',                              teacher: 'Tim', soon: true },
  { slug: 'top-20',             label: 'The Top-20 Wealth Blueprint',          teacher: 'Tim', soon: true },
  { slug: 'delegation',         label: 'Delegation',                           teacher: 'Gord', soon: true },
  { slug: 'scaling',            label: 'Scaling Beyond You',                   teacher: 'Harry', soon: true }
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

  /* Where a lesson links to — null means "render it as not clickable".
     Guarantees no link in the index, roadmap or pager can 404. */
  function hrefFor(s) {
    if (!s.soon) return MA_BASE + s.slug;
    return MA_SOON_URL || null;
  }

  /* Lessons whose page actually exists — used for prev/next so the pager
     never walks a visitor into a page that hasn't been built. */
  function builtLessons() {
    var out = [], all = lessons();
    for (var i = 0; i < all.length; i++) if (hrefFor(all[i])) out.push(all[i]);
    return out;
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

      var href = hrefFor(s);
      var inner = '<span class="ma-nav-label">' + esc(s.label) + '</span>'
                + (s.teacher ? '<span class="ma-nav-teacher">' + esc(s.teacher)
                    + (s.soon ? ' <em class="ma-soon">Soon</em>' : '') + '</span>' : '');

      html += href
        ? '<a href="' + href + '"' + (s.slug === cur ? ' class="is-active"' : '') + '>' + inner + '</a>'
        : '<span class="ma-nav-item is-soon">' + inner + '</span>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }


  /* ---------- PREV / NEXT ---------- */
  function renderPager(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var list = builtLessons(), cur = currentSlug(el), i = -1;
    for (var n = 0; n < list.length; n++) if (list[n].slug === cur) i = n;

    var prev = i > 0 ? list[i - 1] : null;
    var next = (i > -1 && i < list.length - 1) ? list[i + 1] : null;

    /* Empty slots stay in the DOM as invisible placeholders so a lone
       "Next" button keeps its half of the row instead of stretching. */
    el.innerHTML =
      (prev ? '<a href="' + hrefFor(prev) + '">← ' + esc(prev.label) + '</a>'
            : '<a class="is-empty" aria-hidden="true"></a>') +
      (next ? '<a href="' + hrefFor(next) + '">' + esc(next.label) + ' →</a>'
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
      var lhref = hrefFor(s);
      var lbody = '<span class="ma-ladder-n">' + n + '</span>'
                + '<span class="ma-ladder-body">'
                + '<span class="ma-ladder-label">' + esc(s.label) + '</span>'
                + (s.teacher ? '<span class="ma-ladder-teacher">' + esc(s.teacher)
                    + (s.soon ? ' <em class="ma-soon">Soon</em>' : '') + '</span>' : '')
                + '</span>';

      html += lhref
        ? '<a href="' + lhref + '">' + lbody + '</a>'
        : '<span class="is-soon">' + lbody + '</span>';
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
      kicker.textContent = groupOf(slug) || 'Complimentary Training For Canadian Advisors';
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

    /* ---- VIDEO ----
       The page ships with the "Video Coming Soon" panel already in place,
       so a lesson with no video (or a JS failure) shows something sensible
       rather than an empty hole. We only ever REPLACE it. */
    var vid = document.querySelector('[data-ma-video]');
    if (vid && st.video && vid.getAttribute('data-ma-rendered') !== '1') {
      var src = /^https?:\/\//.test(st.video)
        ? st.video
        : 'https://www.youtube.com/embed/' + encodeURIComponent(st.video) + '?rel=0';

      vid.classList.remove('ma-video--soon');
      vid.innerHTML =
        '<iframe src="' + esc(src) + '" title="' + esc(st.label) + '"'
        + ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"'
        + ' allowfullscreen></iframe>';
      vid.setAttribute('data-ma-rendered', '1');
    }

    /* ---- OPT-IN HEADLINE ----
       Per-lesson class offer. Same rule: only overwrite when the registry
       actually has one, so the HTML default survives otherwise. */
    var optin = document.querySelector('[data-ma-optin]');
    if (optin && st.optin && optin.getAttribute('data-ma-rendered') !== '1') {
      optin.textContent = st.optin;
      optin.setAttribute('data-ma-rendered', '1');
    }
  }


  /* ---------- MOBILE ACCORDION ---------- */
  /* <details> is closed by default and CSS cannot toggle the `open`
     attribute, so it is managed here: open on desktop, closed on mobile —
     unless the visitor has opened it themselves. */
  function syncAccordion() {
    /* The markup ships with `open`, so the index is visible even if this
       never runs. That matters: on desktop the <summary> is display:none,
       so a wrongly-closed <details> would hide the whole index with no way
       to reopen it. Fail open, always.
       innerWidth can read 0 while the page is still laying out — treat any
       non-positive width as "don't touch it". */
    var w = window.innerWidth;
    if (!w) return;

    var accs = document.querySelectorAll('.ma-nav-acc');
    for (var i = 0; i < accs.length; i++) {
      var a = accs[i];
      if (a.getAttribute('data-ma-touched') === '1') continue;
      if (w > 768) a.setAttribute('open', '');
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
  window.addEventListener('load', syncAccordion);

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(syncAccordion, 150);
  });
})();
