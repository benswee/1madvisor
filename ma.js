/* ═══════════════════════════════════════════════════════════════════
   $1M ADVISOR — CURRICULUM REGISTRY + RENDERERS + LESSON CONTENT
   Hosted: https://benswee.github.io/1madvisor/ma.js
   Loaded by every page via the site-level head snippet.

   ┌───────────────────────────────────────────────────────────────┐
   │  THIS FILE IS THE ENTIRE CURRICULUM.                          │
   │  One video per page. Lessons are expandable headings in the   │
   │  left rail; each part under them is its own page.             │
   │                                                               │
   │  ADD A PART:    one line in a lesson's parts[] below,         │
   │                 plus its copy in MA_CONTENT.                  │
   │  PAGE GOES LIVE: delete its `soon: true`.                     │
   │  VIDEO ARRIVES:  add `video: 'youtubeID'` to the part.        │
   │  Then push this file — every page updates itself.             │
   └───────────────────────────────────────────────────────────────┘

   Structure: entries are either
     { group: '…' }                                a category heading
     { lesson: '…', teacher, section, optin,      an expandable lesson
       parts: [ { slug, label, soon?, video? } ] }
   A lesson with ONE part renders as a direct link (no expander).
   `url` on a part overrides MA_BASE + slug (used by Start Here).
   ═══════════════════════════════════════════════════════════════════ */

var MA_BASE = '/training/';
var MA_SOON_URL = null;

/* Where "Request A Seat" buttons send people. The course name rides along
   as ?course=… so the apply form knows what they picked. */
var MA_APPLY_URL = '/training/apply';

/* ── Right rail on lesson pages ──────────────────────────────────────
   ma.js owns the rail: content AND styles, so it renders correctly on every
   lesson page regardless of which stylesheet that page was last pasted with.
   MA_NEXT_SESSION: the card every lesson links to. Set to null when the date
   has passed and the card disappears everywhere. MA_RAIL_FORM: false hides
   the GHL inquiry form + consent line (Ben, 2026-09-06: "the form could be
   just directly linked to the next live session"). Flip to true to bring it
   back — nothing is deleted from the pages. */
var MA_NEXT_SESSION = {
  eyebrow: 'Next Live Session',
  title:   'Attract HNW Clients. Close Larger Cases. Scale.',
  when:    'Thursday, September 10 · 11am PT / 2pm ET',
  cta:     'Save My Seat',
  url:     '/training/september'
};
/* ═══ SEPT 10 AGENDA — from the WAY Financial poster Ben supplied 2026-09-07
   (WAY_RBC_DI_Webinar_Sept10_2026 Poster.pdf). Rendered into [data-ma-agenda]
   on /training/september; styles ship with the registry, so the page needs
   one host element and no CSS paste. Names, roles, minutes and topic lines
   are the poster's own wording — do not embellish them. The Zoom join link
   is deliberately NOT here: registration is gated and reviewed, the link goes
   out by email. Set MA_AGENDA = null after the session. ═══ */
var MA_AGENDA = {
  eyebrow: 'Segregated Funds · Disability Insurance',
  title:   'Two Hidden Competitive Edges You <em>Cannot Afford</em> to Miss',   /* trusted HTML */
  topics:  ['The Trillion-Dollar Opportunity in Segregated Funds',
            'The Untapped Disability Insurance Opportunity with RBC Insurance'],
  tagline: 'Are you positioned to capture the wave?',
  meta:    ['Thursday, September 10, 2026', '11:00am – 1:00pm PT · 2:00pm – 4:00pm ET', 'Online · 2 hours'],
  series:  'Advisor Development Series · virtual session with WAY Financial',
  slots: [
    { name: 'Benjamin Swee', role: 'Director, $1M Advisor Club Mentorship',      min: 5,  lead: 'Opening & welcome.' },
    { name: 'Harry Lee',     role: '$1M Advisor Club Mentorship',                min: 40, lead: 'The Trillion-Dollar Opportunity in Segregated Funds.' },
    { name: 'Nathan Dong',   role: 'Life & Living Benefits, RBC Insurance',      min: 35, lead: 'Huge market demand on disability insurance', rest: ' that your market doesn’t know about.' },
    { name: 'Ling Lim',      role: 'Insurance Director, WAY Financial',          min: 5,  lead: 'Why WAY Financial’s partnership with RBC Insurance', rest: ' is a unique hidden opportunity for your business.' },
    { name: 'Tim Lau',       role: 'CEA, CLU, CFP, TOT · High Net Worth Planner', min: 20, lead: 'It’s not about perfect advice.', rest: ' It’s about comparison.' },
    { name: 'Benjamin Swee', role: 'Director, $1M Advisor Club Mentorship',      min: 15, lead: 'Closing remarks & next steps.', rest: ' Which courses are right for advisors — and are there promotional discounts?' }
  ]
};

var MA_RAIL_FORM   = false;
var MA_ALL_CLASSES = '/store-product-list';
var MA_JS_VERSION = 'b5e0ffe4';

var MA_STAGES = [
  { lesson: 'Start Here', parts: [ { slug: 'start', label: 'Start Here', url: '/training' } ] },

  { group: 'Marketing — Getting Clients' },

  { lesson: 'Strategic Networking', teacher: 'Clement', section: 'Strategic Networking',
    optin: 'Live Class: Networking With Intention — With Clement',
    parts: [
      { slug: 'networking-preparation', label: 'Networking Preparation', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9cdffbe29b3baf97de94df.mp4' },
      { slug: 'networking-follow-up',   label: 'Lead Follow-Up & Relationships', soon: true }
  ]},

  /* New 2026-09-05. NOT `advisor-referrals`, which is Ling's different topic.
     `referrals-01-referable.mp4` (Gord Berger) IS uploaded but stays UNPUBLISHED —
     it needs written publication consent, deferred by Ben. Do not add a video to
     the part below without that consent. */
  { lesson: 'Referrals', teacher: 'Harry', section: 'Referrals',
    optin: 'Live Class: Becoming The Advisor People Introduce Without Being Asked',
    parts: [
      { slug: 'referrals-referable', label: 'Being Referable', soon: true },
      { slug: 'referrals-you-make-me-look-good', label: 'You Make Me Look Good', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce0077614828d36ab8b64.mp4' }
  ]},

  { lesson: 'Prospecting', teacher: 'Gord', section: 'Prospecting',
    optin: 'Live Class: Building A Pipeline That Does Not Depend On Your Warm Market',
    parts: [
      { slug: 'prospecting-family-market', label: 'The Family Market' },
      { slug: 'prospecting-hnw',           label: 'The High-Net-Worth Market', open: true, course: 'The HNW Prospecting System', classes: 2, fee: '$2,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8a9ae7735bdf5b5b2bda' }
  ]},

  /* Restored 2026-09-03. The original 15-lesson structure carried
     "Accountants / Tim"; it was dropped in the v2 rebuild, which left the
     $10,000 CPA course with no lesson to hang its enrolment row on.
     No free video is planned yet, so the part stays `soon`. */
  { lesson: 'CPA & Client Best Interest', teacher: 'Tim', section: 'Accountants',
    optin: 'Live Class: Turning Accountants From Blockers Into Referral Partners',
    parts: [
      { slug: 'cpa-best-interest', label: 'CPA & Client Best Interest', soon: true, open: true, course: 'Client Best Interest and CPA Referrals', fee: '$10,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8bd8e7735bdf5b5b5790' }
  ]},

  { lesson: 'Becoming a Star Speaker', teacher: 'Tim', section: 'Running Conferences',
    optin: 'Live Class: Becoming The Speaker Rooms Remember',
    parts: [ { slug: 'star-speaker', label: 'Becoming a Star Speaker', soon: true } ]},

  /* hidden 2026-09-05 — the complete lesson was Naz's footage and she is out for good; no path without an Ace re-record.
     Data kept intact: delete `hidden` to bring it back. */
  { lesson: 'Client Conferences', hidden: true, teacher: 'Ace', section: 'Running Conferences',
    optin: 'Live Class: Run A Client Conference That Fills Your Pipeline',
    parts: [
      { slug: 'conferences-staging',   label: 'Staging & Guest Acquisition', soon: true },
      { slug: 'conferences-execution', label: 'Executing the Conference', soon: true },
      { slug: 'conferences-follow-up', label: 'Post-Conference Follow-Up', soon: true }
  ]},

  { group: 'Sales — Closing Bigger Cases' },

  { lesson: 'The Discovery Process', teacher: 'Ace & Mayank', section: 'Discovery Process',
    optin: 'Live Class: Discovery Questions That Open Bigger Cases',
    parts: [
      { slug: 'discovery-theory',    label: 'The Theory Behind Discovery', open: true, course: 'Why You\'re Pitching Too Soon', classes: 1, fee: '$500', buy: 'https://1madvisors.com/store-product-detail/product/6a9ba60970cdb64b9627fbe1', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce0139a2eb1d780afb9fc.mp4' },
      { slug: 'discovery-questions', label: 'The Actual Discovery Questions', open: true, course: 'Questions That Close Cases', classes: 2, fee: '$1,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8a42450e37726f005992', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce013e29b3baf97de96b9.mp4' },
      { slug: 'discovery-the-system-and-the-advice-memo', label: 'The System & the Advice Memo', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce0139a2eb1d780afb9f3.mp4' }
  ]},

  /* New 2026-09-05. */
  { lesson: 'Advising Clients Online', teacher: 'Tim', section: 'First Appointments',
    optin: 'Live Class: Running A First Appointment That Earns The Second',
    parts: [
      { slug: 'online-the-six-stages-of-a-first-appointment', label: 'The Six Stages of a First Appointment', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce0227614828d36ab8d6f.mp4' }
  ]},

  { lesson: 'Personal Insured Retirement Plan', teacher: 'Carmen', section: 'Insurance',
    optin: 'Live Class: Presenting The Personal IRP With Confidence',
    parts: [
      { slug: 'personal-irp',     label: 'The Personal IRP', soon: true, open: true, course: 'The Personal IRP Presentation', classes: 1, fee: '$1,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8a871e2f32ce566eaa76' },
      { slug: 'personal-irp-ifa', label: 'The IFA Version', soon: true, open: true, course: 'Personal Insured Retirement Plan — IFA', classes: 1, fee: '$2,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8aabe7735bdf5b5b2e37' }
  ]},

  { lesson: 'Advanced Case Study', teacher: 'Tim', section: 'Case Study',
    optin: 'Live Class: Work A Real Advanced Case With Carmen',
    parts: [ { slug: 'case-study', label: 'Advanced Case Study', soon: true, open: true, course: 'The Complex HNW Case: Discovery to Signed Policy', classes: 2, fee: '$10,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8ac0e7735bdf5b5b3116' } ]},

  { lesson: 'Objection Handling', teacher: 'Tim', section: 'Objection Handling',
    optin: 'Live Class: Objection Handling Role Play With The Coaches',
    parts: [
      { slug: 'objection-mid-affluent', label: 'Middle-to-Affluent Market', soon: true },
      { slug: 'objection-hnw',          label: 'High-Net-Worth', soon: true }
  ]},

  { lesson: 'Personal Estate Insurance', teacher: 'Tim', section: 'Insurance',
    optin: 'Live Class: Personal Estate Insurance With Tim',
    parts: [
      { slug: 'personal-estate',     label: 'Personal Estate Insurance', soon: true },
      { slug: 'personal-estate-ifa', label: 'The IFA Version', soon: true }
  ]},

  { lesson: 'Corporate Estate Insurance', teacher: 'Tim', section: 'Insurance',
    optin: 'Live Class: Corporate Estate Cases With Tim',
    parts: [
      { slug: 'corporate-estate',     label: 'Corporate Estate Insurance', soon: true },
      { slug: 'corporate-estate-ifa', label: 'The IFA Version', soon: true }
  ]},

  /* hidden 2026-09-05 — no coach at all since Thomas was removed — nobody is assigned to record it.
     Data kept intact: delete `hidden` to bring it back. */
  { lesson: 'Corporate Insured Retirement Plan', hidden: true, section: 'Insurance',   /* coach TBD */
    optin: 'Live Class: The Corporate IRP Conversation',
    parts: [
      { slug: 'corporate-irp',     label: 'The Corporate IRP', soon: true },
      { slug: 'corporate-irp-ifa', label: 'The IFA Version', soon: true }
  ]},

  { group: 'Investments — Building AUM' },

  { lesson: 'Building a Predictable AUM Engine', teacher: 'Harry', section: 'Investment',
    optin: 'Live Class: Build Your AUM Engine With Harry',
    parts: [
      { slug: 'aum-engine',   label: 'The AUM Engine', open: true, course: 'Stop Starting Every Month at Zero', classes: 2, fee: '$1,000', buy: 'https://1madvisors.com/store-product-detail/product/6a9c8a60e7735bdf5b5b22c5', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9cdfe8ff1a50b7322c4792.mp4' },
      { slug: 'aum-where-the-aum-comes-from', label: 'Where the AUM Comes From', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9cdfe8ff1a50b7322c479b.mp4' },
      { slug: 'aum-the-review-that-keeps-the-money', label: 'The Review That Keeps the Money', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9cdfe87614828d36ab8963.mp4' },
      { slug: 'aum-pac',      label: 'PAC Strategy', soon: true, open: true, course: 'PAC Strategy and the Ongoing Client Process', classes: 1, fee: '$500', buy: 'https://1madvisors.com/store-product-detail/product/6a9ba68543d1d76deaaacdd2' },
      { slug: 'aum-lump-sum', label: 'Lump-Sum Transfers', soon: true }
  ]},

  /* New 2026-09-05. Seven lessons against the single `aum-loans` stub that used
     to sit under the AUM lesson — folding them in would have taken that lesson
     to twelve parts, so leverage gets its own. The stub is gone. */
  { lesson: 'Leverage & Investment Loans', teacher: 'Harry', section: 'Investment',
    optin: 'Live Class: Presenting Leverage So The Client Understands The Risk',
    parts: [
      { slug: 'leverage-the-two-risks-clients-raise', label: 'The Two Risks Clients Raise', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03eff1a50b7322c4dce.mp4' },
      { slug: 'leverage-never-open-with-the-spreadsheet', label: 'Never Open With the Spreadsheet', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03e9fa5199bb34fcc58.mp4' },
      { slug: 'leverage-who-it-suits', label: 'Who It Suits', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03e9a2eb1d780afbd33.mp4' },
      { slug: 'leverage-what-qualifies-for-the-deduction', label: 'What Qualifies for the Deduction', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03e9a2eb1d780afbd2f.mp4' },
      { slug: 'leverage-heloc-and-the-smith-manoeuvre', label: 'HELOC & the Smith Manoeuvre', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03e9a2eb1d780afbd21.mp4' },
      { slug: 'leverage-guarantees-and-resets', label: 'Guarantees & Resets', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce0487614828d36ab902b.mp4' },
      { slug: 'leverage-getting-it-approved', label: 'Getting It Approved', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce03e9fa5199bb34fcc5c.mp4' }
  ]},

  /* New 2026-09-05. NOT `rrsp-meltdown`, which is Amanda's RRSP/RRIF interest
     meltdown — a different topic that only looks like a match. */
  { lesson: 'RRSP Season & the Client Book', teacher: 'Harry', section: 'Investment',
    optin: 'Live Class: Working An RRSP Season Across A Book You Cannot Meet One By One',
    parts: [
      { slug: 'rrsp-the-refund-is-the-product', label: 'The Refund Is the Product', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce034ff1a50b7322c4d70.mp4' },
      { slug: 'rrsp-servicing-a-book-you-cant-meet-one-by-one', label: 'Servicing a Book You Cannot Meet One by One', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce034ff1a50b7322c4d66.mp4' }
  ]},

  { lesson: 'RRSP/RRIF Interest Meltdown', teacher: 'Amanda', section: 'Investment',
    optin: 'Live Class: The RRSP/RRIF Interest Meltdown Strategy',
    parts: [ { slug: 'rrsp-meltdown', label: 'RRSP/RRIF Interest Meltdown', soon: true } ]},

  { group: 'Practice Growth — Building Beyond You' },

  /* New 2026-09-05. */
  { lesson: 'The Top-20 Client System', teacher: 'Tim', section: 'Top-20 System',
    optin: 'Live Class: The Top-20 Call That Reopens A Cold Book',
    parts: [
      { slug: 'top20-clients-prospects-suspects', label: 'Clients, Prospects & Suspects', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce02be29b3baf97de9978.mp4' },
      { slug: 'top20-why-its-worth-a-whole-day', label: 'Why It Is Worth a Whole Day', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce02b7614828d36ab8de7.mp4' },
      { slug: 'top20-call-or-text-both', label: 'Call or Text? Both', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce02bff1a50b7322c4c96.mp4' },
      { slug: 'top20-the-first-two-sentences', label: 'The First Two Sentences', video: 'https://assets.cdn.filesafe.space/OBppS1IbQ8RwJ06ElXKI/media/6a9ce02bff1a50b7322c4c9a.mp4' }
  ]},

  { lesson: 'Residual Income Through Advisor Referrals', teacher: 'Ling', section: 'Advisor Network',
    optin: 'Live Class: Residual Income From Advisor Referrals',
    parts: [ { slug: 'advisor-referrals', label: 'Residual Income Through Advisor Referrals', soon: true } ]},

  { lesson: 'Building a Team', teacher: 'Jed', section: 'Team Building',
    optin: 'Live Class: Building A Team That Produces',
    parts: [ { slug: 'team-building', label: 'Building a Team', soon: true } ]},

  { lesson: 'Effective Delegation', teacher: 'Gord', section: 'Delegation & Leverage',
    optin: 'Live Class: Delegation That Actually Sticks',
    parts: [ { slug: 'delegation', label: 'Effective Delegation', soon: true } ]}
];


/* ═══ MENTORS ═══
   Credentials for the four board mentors are from the vault roster note
   (verified, public on 1mclub.ca). The other coaches have NO bio on file —
   they render with name + what they teach only. NEVER invent credentials
   for a real person; leave `bio` absent until Ben supplies it.
   `photo:` is optional — omit it and the card draws an initials avatar in
   the brand palette, which reads as deliberate rather than broken. Add a
   URL later and it becomes a real portrait with no page edit. */
var MA_MENTORS = [
  { name: 'Tim Lau', featured: true, photo: 'https://benswee.github.io/1madvisor/mentors/tim.jpg', creds: 'CFP, CLU, CEA · 14 Consecutive Years Top of the Table',
    role: 'President, GT Wealth & Way Financial',
    bio: 'Twenty years at the top of high-net-worth planning — estate, corporate tax, trusts and wills — and coaches over 500 advisors a year.' },
  { name: 'Ace Liew', featured: true, photo: 'https://benswee.github.io/1madvisor/mentors/ace.jpg', creds: '2 Yrs TOT · 3 Yrs MDRT · CEA',
    role: 'Director, Seed Wealth',
    bio: 'Premier strategist for Canada\'s medical elite, using advanced corporate frameworks and trust strategies to protect capital from tax erosion.' },
  { name: 'Harry Lee', featured: true, photo: 'https://benswee.github.io/1madvisor/mentors/harry.jpg', creds: '$1.5B+ in Client Wealth',
    role: 'Wealth Development Director',
    bio: 'Over 20 years in life insurance, having coached more than 1,000 agents to build segregated-fund businesses and sustainable passive income.' },
  { name: 'Clement Lai', featured: true, photo: 'https://benswee.github.io/1madvisor/mentors/clement.jpg', creds: 'MDRT since 2006',
    role: 'President, UFinancial Group Inc.',
    bio: 'Coached over 200 insurance advisors and has specialised for a decade in high-net-worth individuals and corporations with sophisticated structures.' },
  /* Portrait and details from panfinancial.com, his firm; identity confirmed
     by Ben 2026-08-28 (the site's CMS alt-tags the same face under two names,
     so it was held back until he verified it). */
  { name: 'Gord Berger', featured: true,
    photo: 'https://benswee.github.io/1madvisor/mentors/gord.jpg',
    creds: '50+ Years · 50 Consecutive Years Top of the Table',
    role: 'Founding Partner & Managing Partner, PanFinancial' },
  { name: 'Carmen', featured: true },
  { name: 'Amanda', featured: true },
  { name: 'Mayank', featured: true },
  { name: 'Ling Lim', role: 'Insurance Director, WAY Financial' },   /* role: WAY poster, 2026-09-07 */
  { name: 'Jed' }
];


/* ═══ LESSON CONTENT — one entry per page; injected into [data-ma-content].
   Each entry carries its own pager slot directly under the video. ═══ */
var MA_CONTENT = {
  "start": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Every advisor is climbing the same ladder, and the skills are learnable\n    in order. The lessons on the left are the same topics our coaches teach in\n    the paid live classes — the concepts are complimentary, in full, one video\n    per page.</p>\n    <h3>How to use this training</h3>\n    <ul>\n      <li><strong>Pick your gap.</strong> Open a topic on the left and start with the part that matches where you're stuck.</li>\n      <li><strong>Watch, then do the work.</strong> Each page is one concept and one system — apply it before moving on.</li>\n      <li><strong>Go live when you're ready.</strong> Every topic has a live small-group class with the coach who teaches it. Register on the right.</li>\n    </ul>\n    <p><strong>Nothing here is gated. Watch everything, take what works, and\n    only talk to us if you want to.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "prospecting-family-market": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Everyday families — T4 earners, young households, $100K+ household income — are the foundation of a practice. The problem is that most advisors build this layer entirely on their warm market, and the warm market runs out.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Where the next appointments come from once friends and family are exhausted</li>\n      <li>What to say in the first five minutes with someone who has never heard of you</li>\n      <li>A referral rhythm that produces introductions without begging for them</li>\n      <li>How many family-market clients you actually need before moving upmarket</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "prospecting-hnw": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Incorporated professionals, doctors, lawyers, business owners. Most advisors get one or two of these clients a year through referral luck and plateau there for a decade. The skills aren't the barrier — the system for getting in the room is.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Getting past the gatekeeper to the actual decision-maker</li>\n      <li>Turning one-or-two-a-year referral luck into a repeatable system</li>\n      <li>Why golf-and-chambers networking doesn't convert, and what does</li>\n      <li>Being taken seriously by clients wealthier than you</li>\n    </ul>\n    <p><strong>Two markets, two games. Advisors who plateau are usually playing the next market with the last market's rules.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "conferences-staging": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A client conference is won or lost before anyone walks in. The room only works if the right twenty people are in it — and getting the right twenty is a system, not luck.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Who exactly to invite, and how to find twenty of the right incorporated professionals</li>\n      <li>The invitation that reads as exclusive instead of promotional</li>\n      <li>The confirmation process that makes invitees actually show up</li>\n      <li>What a dinner like this costs, and why it pays for itself</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "conferences-execution": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>On the night, your job isn't to sell — it's to host a room where high-calibre guests learn something they've never heard and leave wanting more time with you.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Where to sit, how to work the table, and how to hold the room</li>\n      <li>What to present so guests think “I've never heard that before”</li>\n      <li>Hosting with confidence around people wealthier than you</li>\n      <li>Reading the room and recovering when the energy dips</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "conferences-follow-up": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Attendance isn't the outcome — booked meetings are. The conversion happens at the table and in the first days after, and it follows a script most advisors have never been taught.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Completing a light fact-find at the table without breaking the mood</li>\n      <li>Booking the meeting before they leave — without being pushy</li>\n      <li>The same-day and next-day follow-up sequence</li>\n      <li>Tracking every guest so no relationship leaks away</li>\n    </ul>\n    <p><strong>The dinner is the easy part. The follow-up is where the pipeline gets built.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "star-speaker": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>One advisor in the audience is a guest. The advisor on stage is the authority — and authority compounds. Tim has spent two decades earning rooms, and this is the path from attendee to the speaker people remember.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why speaking collapses years of trust-building into an evening</li>\n      <li>Finding stages: your own events, industry rooms, partner audiences</li>\n      <li>Building a talk that positions you without pitching</li>\n      <li>Stage presence for advisors who don't feel like natural speakers</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "networking-preparation": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Networking fails when it's aimless. Walking into the right room with intention — knowing who you want to meet and what you want to learn — changes what comes out of it.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Choosing rooms where your future clients actually are</li>\n      <li>Preparing so conversations go somewhere on purpose</li>\n      <li>Opening conversations without leading with what you sell</li>\n      <li>Setting a concrete goal for every event you attend</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "networking-follow-up": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The fortune is in the week after. A stack of business cards becomes a pipeline only through disciplined, generous follow-up that builds the relationship before it asks for anything.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The follow-up cadence that turns a card into a relationship</li>\n      <li>Giving value first — introductions, ideas, invitations</li>\n      <li>Moving a networking contact toward a real first meeting</li>\n      <li>Keeping a network warm without it consuming your calendar</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "discovery-theory": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Case size is decided in discovery, not at the close. Clients reveal the real picture — the corporation, the second property, the family complexity — only when the conversation earns it. That's a method, and it can be learned.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why rushed discovery produces small cases from big clients</li>\n      <li>The trust mechanics behind questions that open people up</li>\n      <li>Structuring the conversation so control never feels like interrogation</li>\n      <li>How much you need to know before any recommendation is safe</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "discovery-questions": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The theory matters, but on the day you need the actual words. This is the working question set — what to ask, in what order, and what each answer tells you about the case behind the client.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The exact questions, sequenced from opening to full picture</li>\n      <li>Different tracks for individuals versus business owners</li>\n      <li>Follow-ups that go one level deeper than the surface answer</li>\n      <li>Capturing what you learn so the whole case stays visible</li>\n    </ul>\n    <p><strong>Advisors who ask better questions write bigger cases. It really is that direct.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-engine": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Commission income restarts at zero every January. A book of assets under management pays you again for work you did once — and building it is a system you can run alongside your insurance practice.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why recurring trailer income changes the economics of your practice</li>\n      <li>The realistic path to $10K+ per month of recurring revenue</li>\n      <li>Positioning investments with insurance clients you already serve</li>\n      <li>Where the AUM actually comes from, and the review rhythm that keeps it</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-pac": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The crawl stage: pre-authorized contributions. Small monthly amounts, set up once, growing quietly — the habit that builds your AUM base and deepens every client relationship it touches.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Making the PAC conversation natural in any client meeting</li>\n      <li>Amounts that clients sustain without feeling pinched</li>\n      <li>The review rhythm that grows contributions over time</li>\n      <li>Why PAC clients become your best transfer candidates later</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-lump-sum": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The walk stage: moving existing assets under your management. The money already exists — in RRSPs, TFSAs and non-registered accounts elsewhere — and the conversation for earning it is more natural than most advisors think.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Opening the transfer conversation without trashing the other advisor</li>\n      <li>The consolidation case from the client's side of the table</li>\n      <li>Tax triggers to flag on non-registered transfers before they bite</li>\n      <li>Handling the incumbent-advisor objection cleanly</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "rrsp-meltdown": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A large RRSP can be a tax bomb with a fuse — accounts that trigger more tax on death than they ever saved in life. The interest-meltdown strategy drains that liability deliberately, on the client's terms instead of the CRA's.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>How a $2.5M RRSP can produce a seven-figure tax bill</li>\n      <li>The meltdown mechanics: deductible interest offsetting taxable withdrawals</li>\n      <li>Which clients fit — and the ones who absolutely don't</li>\n      <li>Turning this single illustration into a prospecting conversation</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "personal-irp": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The Insured Retirement Plan uses permanent life insurance as a tax-advantaged wealth vehicle — protection now, and a tax-efficient retirement income stream later. It's a cornerstone concept for affluent personal clients.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Explaining an IRP so a client actually understands it</li>\n      <li>The ideal candidate profile — income, age, and horizon</li>\n      <li>Answering “why not just invest the difference?” honestly</li>\n      <li>The illustration that makes the case without overselling it</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "personal-irp-ifa": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The Immediate Financing Arrangement version: the client gets the coverage and keeps their capital working. Borrowing against the policy makes the IRP viable for clients whose money already has a job.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>How the IFA structure works, in plain language</li>\n      <li>Presenting the borrowing without it sounding exotic</li>\n      <li>Qualification: who lenders actually approve</li>\n      <li>The disclosure conversation that protects everyone</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "personal-estate": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Estates lose value at exactly the wrong moment — taxes, probate, and forced asset sales land together. Personal estate insurance guarantees the estate arrives intact, and it's one of the most natural conversations in the book.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The estate-erosion math that surprises wealthy families</li>\n      <li>Positioning coverage as estate preservation, not expense</li>\n      <li>Working with the client's will, executor and family</li>\n      <li>Why these cases anchor decades-long relationships</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "personal-estate-ifa": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>For clients whose capital is productive, financing the estate coverage keeps their money deployed while the protection compounds. The IFA structure turns a premium conversation into a capital-efficiency conversation.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>When financing estate coverage beats paying cash</li>\n      <li>The structure, collateral and lender mechanics</li>\n      <li>Modelling the net cost honestly across scenarios</li>\n      <li>The professional-advisor team these cases require</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "corporate-irp": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Retained earnings trapped in a corporation are taxed on the way out. The Corporate IRP extracts that wealth tax-efficiently through corporately-owned insurance — one of the most valuable conversations you can have with a business owner.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The trapped-earnings problem every incorporated client has</li>\n      <li>How corporate-owned coverage converts surplus into an asset</li>\n      <li>Bringing the client's accountant in without losing the case</li>\n      <li>What corporation size makes the strategy worthwhile</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "corporate-irp-ifa": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The corporate IFA keeps the corporation's capital working while the coverage builds — the structure behind many of the largest cases written in this market.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>How the corporate IFA differs from the personal version</li>\n      <li>The client and corporation profile that genuinely fits</li>\n      <li>Walking the owner and their accountant through it together</li>\n      <li>Presenting a six-figure premium with earned confidence</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "corporate-estate": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>When a business owner dies, the corporation's value and the family's tax bill collide. Corporate estate insurance — with the Capital Dividend Account at the centre — moves money out of the company tax-free exactly when it's needed most.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The double-tax problem on corporately-held wealth</li>\n      <li>How the CDA credit turns insurance into tax-free distribution</li>\n      <li>Succession and buy-sell situations the coverage solves</li>\n      <li>Why accountants respect advisors who know this ground</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "corporate-estate-ifa": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The financed version of the corporate estate case: top-end structure for owners whose capital earns more inside the business than the premium costs. These are the six- and seven-figure files.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>When financing the corporate estate case makes sense</li>\n      <li>Structuring collateral without constraining the business</li>\n      <li>The moving parts that must be right for it to hold up</li>\n      <li>Quarterbacking the client's whole professional team</li>\n    </ul>\n    <p><strong>At this level you're not selling a policy. You're engineering an outcome.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "case-study": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Concepts are clean; clients are not. This case study assembles everything — discovery, structure selection, the accountant, the presentation — on one real, messy, advanced file so you can see how the pieces actually fit.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>A full advanced case walked end to end</li>\n      <li>Choosing between competing structures on real numbers</li>\n      <li>The Advice Memo framework that organises the recommendation</li>\n      <li>Where cases like this wobble, and how to hold them</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "objection-mid-affluent": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>“Let me think about it.” “I need to talk to my spouse.” “I have a guy already.” Family and affluent-market objections are predictable — which means the responses can be practised until they're calm and natural.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The objections you'll hear this week, mapped and answered</li>\n      <li>Responding without pressure — and without folding</li>\n      <li>Separating a real concern from a polite exit</li>\n      <li>Why role-playing these until they're boring is the shortcut</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "objection-hnw": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>High-net-worth objections are quieter and heavier: the accountant who says stall, the fee scrutiny, the “send me something and we'll see.” Handling them is less about scripts and more about standing — and standing can be built.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The sophisticated stall, and what it's really testing</li>\n      <li>Holding your ground with clients wealthier than you</li>\n      <li>Turning the sceptical accountant from blocker to ally</li>\n      <li>When walking away wins the case</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "advisor-referrals": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Other advisors hold cases they can't close — outside their licence, outside their specialty, outside their comfort. A referral network among advisors turns those cases into residual income for everyone involved.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Building referral relationships with advisors, not just clients</li>\n      <li>Structuring referral splits so they're clean and durable</li>\n      <li>Becoming the specialist other advisors think of first</li>\n      <li>Turning one-off referrals into standing arrangements</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "team-building": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A team is how production stops depending on your personal hours. Built well, it also becomes residual income — overrides and shared production from people you developed.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>When you're actually ready for a first team member</li>\n      <li>Recruiting people who produce instead of consuming your time</li>\n      <li>Compensation structures that keep the team and protect you</li>\n      <li>The leadership habits that keep producers from leaving</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "delegation": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Every practice hits the ceiling of its founder's calendar. Delegation is how you get your hours back without dropping the standard of care your clients expect — and it's a skill, not a personality trait.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>What to hand off first — and what never to hand off</li>\n      <li>Documenting a task so someone else can own it</li>\n      <li>Delegating outcomes instead of chores</li>\n      <li>The weekly rhythm that keeps a delegated practice tight</li>\n    </ul>\n    <p><strong>You don't scale by working more. You scale by needing to be in fewer places.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  /* 2026-09-06: copy for the 18 uploaded lessons, written from the video transcripts. */
  "referrals-you-make-me-look-good": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A referral is a favour your client does for themselves. They put their name on you, and what they want back is to look good. Harry's answer is not more service or a longer presentation. It is three words.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why clients believe you on emotion but refer you on logic, and why the logic takes time to prove</li>\n      <li>Keep it simple, keep it short, keep it exciting: the three rules Harry's mentor gave him</li>\n      <li>Why a two-hour meeting that covers everything makes you harder to refer, not easier</li>\n      <li>The feedback loop: what the referrer needs to hear afterwards, and why it produces the next introduction</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "discovery-the-system-and-the-advice-memo": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Discovery is a fixed route, not a conversation you improvise. The coach runs the same order every time: corporate, personal, investments, insurance, then the will. By the end the client knows every question had a purpose, which is exactly when the sensitive ones get answered.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The five-stop order, and why corporate comes first and the family comes last</li>\n      <li>The estate questions that reveal how much wealth a family really has: wills, corporate wills, probate, family trusts, parents in Canada</li>\n      <li>Why you never let a client fill in the fact-find themselves, and never ask them to rank their goals</li>\n      <li>Closing the meeting on a booked next appointment, and why a 15-minute call beats a fancy online form</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "online-the-six-stages-of-a-first-appointment": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A first appointment online has no handshake, no office and no second chance. Tim runs it in six stages, in order, and the discovery in stage six only works because the first five earned it.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Stages one and two: warmth with authority, then proof you prepared, before a single question</li>\n      <li>Stages three and four: showing you know their industry, then getting the real goal rather than the data</li>\n      <li>Stage five: bringing up your credentials and the institutions behind you without it sounding like a pitch</li>\n      <li>Stage six: the one question that books the second meeting before discovery even starts</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-where-the-aum-comes-from": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Ask a room of advisors where their assets come from and most say new clients. Harry's book says otherwise. Half of it sits in registered accounts, and those accounts create new contribution room every January whether he prospects or not.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why the wealthy max out the TFSA and most families don't, and what that means for who you ask</li>\n      <li>The RRSP refund as leverage, not savings: whose money it really is, and how to present it</li>\n      <li>RESP grants: the three choices every parent has, and why only an advisor makes the third one happen</li>\n      <li>How registered money, investment loans and cash actually split across an $80M book</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-the-review-that-keeps-the-money": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The bank does not care if a TFSA sits in a savings account earning nothing. You should. The annual review is where Harry re-sets the goal for inflation, re-does the budget and reminds the client what each account is for. That is why the money stays.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why a TFSA that doesn't grow is worth nothing, and how most families are actually using theirs</li>\n      <li>“Why us?”: the answer that separates an advisor from a bank branch</li>\n      <li>Moving the goalposts: re-pricing the retirement target every year instead of trusting a 20-year-old number</li>\n      <li>Setting a time horizon on every account so a client never raids the long-term one</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-the-two-risks-clients-raise": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Every leverage conversation runs into the same two objections: what if rates go up, and what if the market goes down. Harry answers the first with five questions and a summary. He answers the second before the client asks, with a stress test.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The five questions that walk a client from “of course I'd borrow at 4%” to understanding why rates fall again</li>\n      <li>Who the bank's biggest borrowers really are, and why that sets the cost of borrowing</li>\n      <li>Short term versus long term: the one to three years when borrowing can cost more than it earns</li>\n      <li>The stress test Harry runs on every loan: today's rate plus 2%, and the client who should not borrow at all</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-never-open-with-the-spreadsheet": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The spreadsheet is the last thing Harry shows, never the first. A client who sees numbers before they understand why they would borrow gets lost in the numbers. Sell the why, handle the risk, then let the sheet confirm what they already want to do.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>The three-step order: benefits and risks, then objections, then the illustration</li>\n      <li>Building the sheet from the client's own tax bracket, borrowing cost and monthly payment, not a generic case</li>\n      <li>Why Harry illustrates at 8 to 9% and keeps the higher-return version in his back pocket</li>\n      <li>Turning the after-tax cost of the interest into the number the client actually feels each month</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-who-it-suits": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Leverage is usually pitched to the young professional with a long horizon. Harry's less obvious fit is the older client who can no longer qualify for estate insurance. Inside a segregated fund with a 100% death guarantee, a loan can do part of the job a policy would have done.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why a senior who is uninsurable can still build something for the next generation with borrowed money</li>\n      <li>The role of the 100% death guarantee when the market falls and the client dies in the same year</li>\n      <li>Working the numbers: interest paid, tax deducted, and the net cost of the downside</li>\n      <li>What happens on the upside, and how capital-gains treatment changes the tax bill</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-what-qualifies-for-the-deduction": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Interest on borrowed money is only deductible when the money buys something that can produce income. Put it into a TFSA or RRSP and the deduction disappears. Put it into a non-registered portfolio and, for a client in a high bracket, the break-even return drops to a number almost any fund clears.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Registered versus non-registered: the line that decides whether the interest is deductible</li>\n      <li>Using a life licence to arrange a loan built specifically for segregated funds</li>\n      <li>The break-even maths: a $1M loan, a 50% bracket, and why 3.5% is the number to beat</li>\n      <li>Funding your own PACs with home equity, and where that strategy stops being deductible</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-heloc-and-the-smith-manoeuvre": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>An investment loan is a concept, not a product. Harry's own version runs off his home equity line: a fixed draw on the second of every month, into chequing, out again as weekly PACs. The interest is deductible, but only on the portion that went into the portfolio.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why a HELOC can be a better source than a dedicated investment loan, and when it isn't</li>\n      <li>Running PACs on borrowed money: the monthly draw, the weekly buy, and the discipline it takes</li>\n      <li>Keeping the deductible and non-deductible interest separate at tax time</li>\n      <li>The regulatory clock on seg-fund lending, and why Harry says do it while it is still available</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-guarantees-and-resets": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>A segregated fund's guarantees are only worth what the contract actually says. Harry walks through each one: creditor protection the courts can still override, a maturity guarantee almost nobody uses, and the death guarantee with resets that pays a family the high-water mark instead of the crash price.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Creditor protection: what it covers, and the lump-sum pattern that invites a challenge</li>\n      <li>75/75 versus 75/100: why the death guarantee is the one worth paying for</li>\n      <li>Death-benefit resets: locking in gains at every anniversary</li>\n      <li>The age-71 check every advisor should run before recommending a contract</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "leverage-getting-it-approved": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Three lenders, three sets of rules. Manulife Bank and IA lend only into their own funds. B2B lends into almost anything, but every instruction afterwards has to route through B2B first. Knowing which one fits the client is the difference between an approval in days and a file that stalls.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Which lender funds which provider's segregated funds</li>\n      <li>The nominee-account trade-off: flexibility going in, two to three extra business days on every change</li>\n      <li>Quick loans: the credit profile that gets approved without a fight</li>\n      <li>Who actually answers when you need help, and how to reach them</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "rrsp-the-refund-is-the-product": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Clients ask one question about an RRSP: how big is the refund. Then they spend it. Harry's frame is different. The refund is not saved tax, it is borrowed tax, and the client who treats it as leverage ends up with an account instead of a holiday.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why the refund is not your client's money, and how to say so without killing the sale</li>\n      <li>Leverage as the one word that turns an RRSP from a tax trick into a plan</li>\n      <li>Nobody has spare cash flow: the mindset shift that makes the contribution happen anyway</li>\n      <li>Putting the refund back to work instead of letting it disappear</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "rrsp-servicing-a-book-you-cant-meet-one-by-one": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Up to a hundred clients, you can see everyone. Past that, the calendar does the work. Harry reviews each client on the anniversary of their first account, asks about the life changes rather than the statement, and runs January and February as pure investing season so the rest of the year is already lined up.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>What an annual review is actually for: on track or not, and what changed in their life</li>\n      <li>Why the investment PAC is the budget lever and the insurance premium is not</li>\n      <li>Anniversary reviews and unexpected appreciation: a service rhythm that scales past 100 clients</li>\n      <li>The twelve-month shape of the business, and why a strong RRSP season carries the year</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "top20-clients-prospects-suspects": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Not every name in your book deserves the same day. Tim splits the list into clients, prospects and suspects, and only the first two earn a place on the top-20 sheet. Beside each name goes the business you believe you can do, the referral potential, and the reason you believe it.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Clients, prospects, suspects: the definitions, and who is wasting your gift budget</li>\n      <li>What to write beside each name so the follow-up is specific, not hopeful</li>\n      <li>Why $10,000 on ten people beats $10,000 on a hundred, and what a memorable gift looks like</li>\n      <li>Taking the application at 80% certainty: why life insurance doesn't wait for 100%</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "top20-why-its-worth-a-whole-day": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>One day on twenty names sounds slow until you count what those twenty are worth. Tim spends it writing, beside each name, the specific personal reason and the specific professional reason for the call. “He trusts me” is not a reason. “He invited me to his housewarming” is.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Personal and professional: the two reasons every name needs before you pick up the phone</li>\n      <li>Why vague reasons produce vague calls, and how specific ones make the client feel singled out</li>\n      <li>Choosing the strategy for the person, not the person for the strategy</li>\n      <li>Transparency as a tool: letting clients see the work you do on their behalf</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "top20-call-or-text-both": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Calling works better. Texting reaches more people. Tim's answer is both, in the right ratio: text to reach a hundred or two hundred a week, and spend the phone time on the handful who matter. The advisor who called 17 people last week did not run out of contacts. They hesitated.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Effective versus efficient: what each channel is for</li>\n      <li>Why a two-minute phone call is worse than no call at all</li>\n      <li>Reaching 100 to 200 people a week without burning your calling hours</li>\n      <li>The honest question about the 17: hesitation, not capacity</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "top20-the-first-two-sentences": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The message is the same for two hundred people. The first two sentences are not. Tim opens with the thing only that client would recognise: the 15% they talked about, the money they want out of the corporation. “I heard you want to save some tax” could be sent to anyone, and the client knows it.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why the opening line decides whether a message reads as personal or as a broadcast</li>\n      <li>Pulling the hook from your last real conversation with them</li>\n      <li>The two openings that are too general to work, and what replaces them</li>\n      <li>Scaling personal: one strategy, two hundred clients, two hundred different first sentences</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>"
};


/* ═══════════════════════════════════════════════════════════════════
   RENDERERS — nothing below needs editing to add curriculum.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Every part-page, flattened in curriculum order, with its context. */
  function allParts() {
    var out = [], group = null;
    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (e.group) { group = e.group; continue; }
      if (!e.parts) continue;
      for (var j = 0; j < e.parts.length; j++) {
        out.push({ part: e.parts[j], lesson: e, group: group });
      }
    }
    return out;
  }

  function hrefFor(p) {
    if (p.url) return p.url;
    if (!p.soon) return MA_BASE + p.slug;
    return MA_SOON_URL || null;
  }

  function slugFromPath() {
    var p = location.pathname.replace(/\/+$/, '');
    var all = allParts();
    for (var i = 0; i < all.length; i++) {
      if (all[i].part.url && all[i].part.url.replace(/\/+$/, '') === p) return all[i].part.slug;
    }
    return p.slice(p.lastIndexOf('/') + 1);
  }

  function findPart(slug) {
    var all = allParts();
    for (var i = 0; i < all.length; i++) if (all[i].part.slug === slug) return all[i];
    return null;
  }

  /* ---------- LEFT RAIL: nested, expandable ---------- */
  function renderNav(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;

    var acc = el.closest('.ma-nav-acc');
    var sum = acc && acc.querySelector('summary');
    if (sum) sum.textContent = 'Select A Lesson ▾';

    var cur = slugFromPath(), html = '';

    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (e.group) { html += '<p class="ma-nav-group">' + esc(e.group) + '</p>'; continue; }
      if (!e.parts || e.hidden) continue;

      var teacher = e.teacher ? '<span class="ma-nav-teacher">' + esc(e.teacher) + '</span>' : '';
      var allSoon = e.parts.every(function (p) { return p.soon && !p.url; });

      if (e.parts.length === 1) {
        /* single video — direct link row, no expander */
        var p = e.parts[0], href = hrefFor(p);
        var inner = '<span class="ma-nav-label">' + esc(e.lesson) + '</span>' + teacher
                  + (p.soon ? '<em class="ma-soon">Soon</em>' : '');
        html += href
          ? '<a href="' + href + '"' + (p.slug === cur ? ' class="is-active"' : '') + '>' + inner + '</a>'
          : '<span class="ma-nav-item is-soon">' + inner + '</span>';
        continue;
      }

      /* multi-part — expandable lesson heading with nested part links.
         Collapsed by default; the current page's lesson ships open. */
      var isOpen = e.parts.some(function (p) { return p.slug === cur; });
      html += '<div class="ma-nav-item-group' + (isOpen ? ' open' : '') + (allSoon ? ' all-soon' : '') + '">'
            + '<div class="ma-nav-lesson" data-ma-toggle>'
            + '<span class="ma-nav-label">' + esc(e.lesson) + '</span>' + teacher
            + '<span class="ma-caret">▸</span></div>'
            + '<div class="ma-nav-parts">';
      for (var j = 0; j < e.parts.length; j++) {
        var pt = e.parts[j], ph = hrefFor(pt);
        var pin = esc(pt.label) + (pt.soon ? ' <em class="ma-soon">Soon</em>' : '');
        html += ph
          ? '<a href="' + ph + '"' + (pt.slug === cur ? ' class="is-active"' : '') + '>' + pin + '</a>'
          : '<span class="ma-nav-item is-soon">' + pin + '</span>';
      }
      html += '</div></div>';
    }

    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');

    var toggles = el.querySelectorAll('[data-ma-toggle]');
    for (var k = 0; k < toggles.length; k++) {
      toggles[k].addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
      });
    }
  }

  /* ---------- PREV / NEXT over live pages only ---------- */
  function renderPager(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;
    var built = allParts().filter(function (x) { return hrefFor(x.part); });
    var cur = slugFromPath(), i = -1;
    for (var n = 0; n < built.length; n++) if (built[n].part.slug === cur) i = n;
    var prev = i > 0 ? built[i - 1] : null;
    var next = (i > -1 && i < built.length - 1) ? built[i + 1] : null;
    /* "The page between lessons loads slow." Each lesson is a separate GHL page,
       so Next means a full navigation: ~1.2MB of GHL's own bundle again, then
       ma.js renders. ma.js itself is 17KB gzipped and ~0.2s — not the cost.
       What we CAN do is fetch the neighbouring pages' HTML in idle time, so the
       click paints from cache. rel=prefetch is a hint: it never blocks the
       current page and does nothing on data-saver connections. */
    if (!document.querySelector('link[data-ma-prefetch]')) {
      [prev, next].forEach(function (n) {
        if (!n) return;
        var href = hrefFor(n.part);
        if (!href) return;
        var l = document.createElement('link');
        l.rel = 'prefetch'; l.href = href; l.setAttribute('data-ma-prefetch', '1');
        document.head.appendChild(l);
      });
    }
    el.innerHTML =
      (prev ? '<a href="' + hrefFor(prev.part) + '"><span class="ma-pager-arrow">←</span>'
            + '<span class="ma-pager-label">' + esc(prev.part.label) + '</span></a>'
            : '<a class="is-empty" aria-hidden="true"></a>') +
      (next ? '<a href="' + hrefFor(next.part) + '"><span class="ma-pager-label">'
            + esc(next.part.label) + '</span><span class="ma-pager-arrow">→</span></a>'
            : '<a class="is-empty" aria-hidden="true"></a>');
    el.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- HOME ROADMAP: lesson-level rows ---------- */
  function renderLadder(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;
    var html = '', n = 0;
    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (e.group) { html += '<p class="ma-ladder-group">' + esc(e.group) + '</p>'; continue; }
      if (!e.parts || e.hidden || e.parts[0].slug === 'start') continue;
      n++;
      var live = e.parts.filter(function (p) { return !p.soon; });
      var target = live.length ? hrefFor(live[0]) : null;
      var meta = (e.teacher ? esc(e.teacher) : '')
               + (e.parts.length > 1 ? ' · ' + e.parts.length + ' parts' : '')
               + (live.length ? '' : ' <em class="ma-soon">Soon</em>');
      var body = '<span class="ma-ladder-n">' + n + '</span>'
               + '<span class="ma-ladder-body">'
               + '<span class="ma-ladder-label">' + esc(e.lesson) + '</span>'
               + '<span class="ma-ladder-teacher">' + meta + '</span></span>';
      html += target
        ? '<a href="' + target + '">' + body + '</a>'
        : '<span class="is-soon">' + body + '</span>';
    }
    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- PAGE META: title, kicker, byline, opt-in, video ---------- */
  function renderMeta() {
    var slug = slugFromPath();
    var ctx = findPart(slug);
    if (!ctx) return;

    var kicker = document.querySelector('[data-ma-kicker]');
    if (kicker && kicker.getAttribute('data-ma-rendered') !== '1') {
      var trail = ctx.group || 'Complimentary Training For Canadian Advisors';
      if (ctx.lesson.lesson && ctx.lesson.lesson !== ctx.part.label) {
        trail += ' · ' + ctx.lesson.lesson;
      }
      kicker.textContent = trail;
      kicker.setAttribute('data-ma-rendered', '1');
    }

    var byline = document.querySelector('[data-ma-byline]');
    if (byline && byline.getAttribute('data-ma-rendered') !== '1') {
      byline.innerHTML = ctx.lesson.teacher
        ? 'Taught by <strong>' + esc(ctx.lesson.teacher) + '</strong>' : '';
      byline.setAttribute('data-ma-rendered', '1');
    }

    var title = document.querySelector('[data-ma-title]');
    if (title && !title.textContent.trim()) title.textContent = ctx.part.label;
    /* Every lesson page shipped with the template's <title> ("Start Here — …"),
       so tabs, bookmarks and search results all said Start Here. Set it from
       the same match that fills the H1. */
    if (ctx.part.slug !== 'start') {
      document.title = ctx.part.label + ' — $1M Advisor Training';
    }

    var optin = document.querySelector('[data-ma-optin]');
    if (optin && ctx.lesson.optin && optin.getAttribute('data-ma-rendered') !== '1') {
      optin.textContent = ctx.lesson.optin;
      optin.setAttribute('data-ma-rendered', '1');
    }

    /* The store was unreachable from any lesson page: a $2,000 class could be
       on sale for the exact topic the visitor is watching, with no way to buy
       it. When the part is open with a checkout URL, put the enrol row in the
       right rail above the inquiry form. Rendered once, guarded like the rest. */
    /* ── the right rail ── */
    var rail = document.getElementById('optin');
    if (rail && rail.getAttribute('data-ma-rail') !== '1') {
      rail.setAttribute('data-ma-rail', '1');

      /* the sub-line promised a form and a "ladder" that no longer exist */
      var sub = rail.querySelector('.ma-optin-sub');
      if (sub) sub.textContent = 'Taught live by MDRT, COT and TOT mentors.';

      var html = '';
      if (ctx.part.open && ctx.part.buy) {
        /* the paid class for THIS topic */
        var meta = [];
        if (ctx.part.fee) meta.push(esc(ctx.part.fee));
        if (ctx.part.classes) meta.push(ctx.part.classes + (ctx.part.classes === 1 ? ' class' : ' classes'));
        html += '<div class="ma-rail-buy">'
          + '<span class="ma-chip-open">Enrolling Now</span>'
          + '<p class="ma-rail-buy-name">' + esc(ctx.part.course || ctx.part.label) + '</p>'
          + (meta.length ? '<p class="ma-rail-buy-meta">' + meta.join(' &middot; ') + '</p>' : '')
          + '<a class="ma-btn ma-rail-cta" href="' + esc(ctx.part.buy) + '">Enrol &rarr;</a>'
          + '</div>';
      } else {
        /* no class on sale for this topic: send them to everything that is */
        html += '<div class="ma-rail-buy ma-rail-buy--all">'
          + '<p class="ma-rail-buy-name">Live classes with the mentors</p>'
          + '<p class="ma-rail-buy-meta">Small groups &middot; role play &middot; taught by the coach</p>'
          + '<a class="ma-btn ma-rail-cta" href="' + esc(MA_ALL_CLASSES) + '">See All Live Classes &rarr;</a>'
          + '</div>';
      }
      if (MA_NEXT_SESSION && MA_NEXT_SESSION.url) {
        html += '<div class="ma-rail-next">'
          + '<p class="ma-rail-next-eyebrow">' + esc(MA_NEXT_SESSION.eyebrow) + '</p>'
          + '<p class="ma-rail-next-title">' + esc(MA_NEXT_SESSION.title) + '</p>'
          + '<p class="ma-rail-next-when">' + esc(MA_NEXT_SESSION.when) + '</p>'
          + '<a class="ma-btn ma-btn--ghost ma-rail-cta" href="' + esc(MA_NEXT_SESSION.url) + '">' + esc(MA_NEXT_SESSION.cta) + ' &rarr;</a>'
          + '</div>';
      }
      var wrap = document.createElement('div');
      wrap.className = 'ma-rail';
      wrap.innerHTML = html;
      rail.appendChild(wrap);

      /* styles travel WITH the registry so a stale page stylesheet cannot
         render this as black-on-navy (which is exactly what happened) */
      if (!document.getElementById('ma-rail-style')) {
        var st = document.createElement('style');
        st.id = 'ma-rail-style';
        st.textContent =
          '.ma-rail{margin-top:18px}'
        + '.ma-rail-buy,.ma-rail-next{padding:16px 16px 18px;border-radius:12px;margin:0 0 14px}'
        + '.ma-rail-buy{border:1px solid var(--ma-gold-edge,rgba(236,160,33,.38));background:var(--ma-gold-10,rgba(236,160,33,.10))}'
        + '.ma-rail-next{border:1px solid var(--ma-panel-edge,#344A64);background:var(--ma-mid,#203044)}'
        + '.ma-rail .ma-chip-open{display:inline-block;margin-bottom:8px}'
        + '.ma-rail-buy-name,.ma-rail-next-title{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:16px;font-weight:800;line-height:1.25;color:var(--ma-paper,#F0EFEF);margin:8px 0 4px;letter-spacing:-.1px}'
        + '.ma-rail-buy-meta,.ma-rail-next-when{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:13px;font-weight:700;color:var(--ma-gold,#ECA021);margin:0 0 12px;letter-spacing:.2px}'
        + '.ma-rail-next-eyebrow{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:11px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:var(--ma-gold,#ECA021);margin:0}'
        + '.ma-rail-cta{display:block;text-align:center;width:100%;box-sizing:border-box}'
        + (MA_RAIL_FORM ? '' :
           '.ma-col-optin .form-builder--wrap,.ma-col-optin .form-builder--wrap-full,.ma-col-optin form,.ma-col-optin .ma-consent{display:none!important}');
        document.head.appendChild(st);
      }
    }

    var vid = document.querySelector('[data-ma-video]');
    if (vid && ctx.part.video && vid.getAttribute('data-ma-rendered') !== '1') {
      var raw = ctx.part.video;
      var isUrl = /^https?:\/\//.test(raw);
      /* A direct media file (GHL media library, any CDN) needs a <video>
         element — an iframe would download it or render it unstyled.
         Anything else is treated as an embed: a bare YouTube ID, or a
         full embed URL from YouTube/Vimeo/Wistia. */
      var isFile = isUrl && /\.(mp4|m4v|mov|webm|ogg)(\?|#|$)/i.test(raw);

      vid.classList.remove('ma-video--soon');

      if (isFile) {
        vid.innerHTML = '<video src="' + esc(raw) + '" controls preload="metadata"'
          + (ctx.part.poster ? ' poster="' + esc(ctx.part.poster) + '"' : '')
          + ' playsinline title="' + esc(ctx.part.label) + '"></video>';
      } else {
        var src = isUrl ? raw
          : 'https://www.youtube.com/embed/' + encodeURIComponent(raw) + '?rel=0';
        vid.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(ctx.part.label) + '"'
          + ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"'
          + ' allowfullscreen></iframe>';
      }
      vid.setAttribute('data-ma-rendered', '1');
    }
  }

  /* ---------- HOSTED LESSON COPY ---------- */
  function renderContent() {
    var host = document.querySelector('[data-ma-content]');
    if (!host || host.getAttribute('data-ma-rendered') === '1') return;
    var html = (typeof MA_CONTENT !== 'undefined') && MA_CONTENT[slugFromPath()];
    if (!html) return;   /* fallback video panel in the block stays */
    host.innerHTML = html;
    host.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- META PIXEL: per-lesson ViewContent ----------
     Fires only on lesson pages, and only if a pixel is present — the
     guard means this is completely inert until the base pixel code is
     pasted into the site-level head field. Sending the slug, part name
     and category makes every lesson its own audience-buildable signal
     without tagging a single page by hand. */
  function trackPageView() {
    if (typeof fbq === 'undefined') return;
    if (window.MA_TRACKED) return;
    var ctx = findPart(slugFromPath());
    if (!ctx) return;                       /* home / non-lesson pages */
    window.MA_TRACKED = true;
    try {
      fbq('track', 'ViewContent', {
        content_ids:      [ctx.part.slug],
        content_name:     ctx.part.label,
        content_category: ctx.group || 'Training',
        content_type:     'product',
        lesson:           ctx.lesson.lesson,
        coach:            ctx.lesson.teacher || ''
      });
    } catch (e) { /* never let tracking break a page */ }
  }

  /* ---------- MENTOR CARDS ----------
     Coaches with no bio on file render as a compact name card listing the
     topics they teach — honest and useful, rather than a fabricated bio. */
  function renderMentors(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;
    if (typeof MA_MENTORS === 'undefined') return;

    /* data-ma-mentors="featured" shows the board chosen for the event page.
       Selection is EXPLICIT (`featured: true`) rather than inferred from having
       a bio — a coach can be worth showing before their bio is written, and the
       previous bio-inference silently hid them. Falls back to bio-having, then
       to everyone, so this can never render blank. */
    var roster = MA_MENTORS;
    if (el.getAttribute('data-ma-mentors') === 'featured') {
      roster = [];
      for (var f = 0; f < MA_MENTORS.length; f++) {
        if (MA_MENTORS[f].featured) roster.push(MA_MENTORS[f]);
      }
      if (!roster.length) {                      /* nobody flagged yet */
        for (var g = 0; g < MA_MENTORS.length; g++) {
          if (MA_MENTORS[g].bio) roster.push(MA_MENTORS[g]);
        }
      }
      if (!roster.length) roster = MA_MENTORS;   /* fail open, never blank */
    }

    /* what each coach teaches, straight from the curriculum */
    var teaches = {};
    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (!e.parts || !e.teacher || e.hidden) continue;   /* hidden lessons stay off the cards */
      var names = e.teacher.split('&');
      for (var n = 0; n < names.length; n++) {
        var k = names[n].trim();
        (teaches[k] = teaches[k] || []).push(e.lesson);
      }
    }

    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2)
                 .map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
    }

    var html = '';
    for (var m = 0; m < roster.length; m++) {
      var p = roster[m];
      var lessons = teaches[p.name.split(' ')[0]] || teaches[p.name] || [];

      var portrait = p.photo
        ? '<img class="ma-avatar" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">'
        : '<div class="ma-avatar is-placeholder" aria-hidden="true">' + esc(initials(p.name)) + '</div>';

      html += '<div class="ma-mentor' + (p.bio ? '' : ' is-brief') + '">'
            + '<div class="ma-mentor-top">' + portrait
            + '<div class="ma-mentor-id">'
            + '<h3 class="ma-mentor-name">' + esc(p.name) + '</h3>'
            + (p.creds ? '<p class="ma-mentor-creds">' + esc(p.creds) + '</p>' : '')
            + (p.role  ? '<p class="ma-mentor-role">'  + esc(p.role)  + '</p>' : '')
            + '</div></div>'
            + (p.bio ? '<p class="ma-mentor-bio">' + esc(p.bio) + '</p>' : '')
            + (lessons.length
                ? '<p class="ma-mentor-teaches"><span>Teaches</span> ' + esc(lessons.join(' · ')) + '</p>'
                : '')
            + '</div>';
    }
    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- FULL COURSE INDEX ---------- */
  function renderIndex(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;
    var html = '', group = null;
    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (e.group) { group = e.group; html += '<h3 class="ma-cidx-cat">' + esc(e.group) + '</h3>'; continue; }
      if (!e.parts || e.hidden || e.parts[0].slug === 'start') continue;

      html += '<div class="ma-cidx-lesson">'
            + '<div class="ma-cidx-head">'
            + '<span class="ma-cidx-title">' + esc(e.lesson) + '</span>'
            + (e.teacher ? '<span class="ma-cidx-coach">' + esc(e.teacher) + '</span>' : '')
            + '</div><div class="ma-cidx-parts">';
      for (var j = 0; j < e.parts.length; j++) {
        var p = e.parts[j], href = hrefFor(p);
        var label = esc(p.label) + ((p.soon && !p.open) ? ' <em class="ma-soon">Soon</em>' : '');
        html += href ? '<a href="' + href + '">' + label + '</a>'
                     : '<span class="is-soon">' + label + '</span>';
      }
      html += '</div>';

      /* Live classes are sold per PART, not per lesson — Ben sells
         `prospecting-hnw` on its own and splits Discovery, AUM and Personal IRP
         into separately priced pieces. So the enrolment row is built from the
         open parts, one line each, with its own price and checkout.
         A part with no `buy` URL falls back to the inquiry page: never render a
         Buy button that goes nowhere. */
      var openParts = [];
      for (var k = 0; k < e.parts.length; k++) {
        if (e.parts[k].open) openParts.push(e.parts[k]);
      }
      if (openParts.length) {
        html += '<div class="ma-cidx-enrol">';
        for (var q = 0; q < openParts.length; q++) {
          var op = openParts[q];
          var name = op.course || op.label;
          var meta = [];
          if (op.fee) meta.push(esc(op.fee));
          if (op.classes) meta.push(op.classes + (op.classes === 1 ? ' class' : ' classes'));
          html += '<div class="ma-cidx-buy">'
                + '<div class="ma-cidx-buy-id">'
                + '<span class="ma-chip-open">Enrolling Now</span>'
                + '<span class="ma-cidx-buy-name">' + esc(name) + '</span>'
                + (meta.length ? '<span class="ma-cidx-meta">' + meta.join(' &middot; ') + '</span>' : '')
                + '</div>'
                + (op.buy
                    ? '<a class="ma-cidx-cta" href="' + esc(op.buy) + '">Enrol →</a>'
                    : '<a class="ma-cidx-cta is-inquiry" href="' + MA_APPLY_URL
                      + '?course=' + encodeURIComponent(name) + '">Request A Seat →</a>')
                + '</div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    el.innerHTML = html;
    el.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- APPLY PAGE: show the picked course ---------- */
  function renderApplyCourse() {
    var el = document.querySelector('[data-ma-apply-course]');
    if (!el || el.getAttribute('data-ma-rendered') === '1') return;
    var m = /[?&]course=([^&]+)/.exec(location.search);
    if (!m) return;
    var name = decodeURIComponent(m[1].replace(/\+/g, ' '));
    el.innerHTML = 'Requesting: <strong>' + esc(name) + '</strong>';
    el.style.display = '';
    el.setAttribute('data-ma-rendered', '1');
  }

  /* ---------- FOOTER VERSION LINE ---------- */
  function renderVersion() {
    var ft = document.querySelector('.ma-footer');
    if (!ft || ft.querySelector('.ma-version')) return;
    var cssv = getComputedStyle(document.documentElement)
                 .getPropertyValue('--ma-css-version').replace(/["' ]/g, '') || 'pre-stamp';
    var p = document.createElement('p');
    p.className = 'ma-version';
    p.textContent = 'design ' + cssv + ' · registry ' + MA_JS_VERSION;
    ft.appendChild(p);
  }

  function syncAccordion() {
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

  /* ---------- SEPT 10 AGENDA ----------
     One host element on the event page; everything else, including the
     stylesheet, comes from MA_AGENDA above. */
  function renderAgenda(el) {
    if (el.getAttribute('data-ma-rendered') === '1') return;
    if (typeof MA_AGENDA === 'undefined' || !MA_AGENDA) { el.innerHTML = ''; return; }
    var A = MA_AGENDA;
    function initials(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2)
                 .map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
    }
    var h = '<div class="ma-agenda">'
      + (A.eyebrow ? '<p class="ma-eyebrow-c">' + esc(A.eyebrow) + '</p>' : '')
      + '<h2 class="ma-h2">' + A.title + '</h2>'
      + '<ol class="ma-agenda-topics">';
    for (var t = 0; t < (A.topics || []).length; t++)
      h += '<li><span class="ma-agenda-n">' + (t + 1) + '</span>' + esc(A.topics[t]) + '</li>';
    h += '</ol>'
      + (A.tagline ? '<p class="ma-agenda-tag">' + esc(A.tagline) + '</p>' : '')
      + '<p class="ma-agenda-meta">';
    for (var m = 0; m < (A.meta || []).length; m++) h += '<span>' + esc(A.meta[m]) + '</span>';
    h += '</p>'
      + '<p class="ma-eyebrow-c ma-agenda-sub">Agenda &amp; Speakers</p>'
      + '<ol class="ma-agenda-list">';
    for (var i = 0; i < (A.slots || []).length; i++) {
      var sl = A.slots[i];
      h += '<li class="ma-agenda-slot">'
         + '<div class="ma-agenda-av" aria-hidden="true">' + esc(initials(sl.name)) + '</div>'
         + '<div class="ma-agenda-body">'
         + '<p class="ma-agenda-name">' + esc(sl.name)
         + (sl.min ? '<span class="ma-agenda-min">' + sl.min + ' min</span>' : '') + '</p>'
         + (sl.role ? '<p class="ma-agenda-role">' + esc(sl.role) + '</p>' : '')
         + '<p class="ma-agenda-topic"><strong>' + esc(sl.lead || '') + '</strong>' + esc(sl.rest || '') + '</p>'
         + '</div></li>';
    }
    h += '</ol>'
      + (A.series ? '<p class="ma-agenda-series">' + esc(A.series) + '</p>' : '')
      + '</div>';
    el.innerHTML = h;

    if (!document.getElementById('ma-agenda-style')) {
      var st = document.createElement('style');
      st.id = 'ma-agenda-style';
      st.textContent =
          '.ma-agenda{max-width:900px;margin:0 auto;text-align:center;background:var(--ma-deep-1,#1B2938);border:1px solid rgba(74,111,138,.28);border-radius:16px;padding:52px 44px;box-sizing:border-box}'
        + '.ma-agenda .ma-h2{color:var(--ma-paper,#F0EFEF)}'
        + '.ma-agenda-topics{list-style:none;margin:28px auto 0;padding:0;max-width:640px;text-align:left}'
        + '.ma-agenda-topics li{display:flex;align-items:flex-start;gap:14px;font-family:var(--ma-sans,Montserrat,sans-serif);font-size:17px;font-weight:600;line-height:1.45;color:#fff;margin:0 0 12px}'
        + '.ma-agenda-n{flex:0 0 28px;height:28px;border-radius:50%;background:var(--ma-gold,#ECA021);color:var(--ma-navy-deep,#1E2D3F);font-size:13px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;margin-top:1px}'
        + '.ma-agenda-tag{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:18px;font-style:italic;font-weight:600;color:var(--ma-gold,#ECA021);margin:22px 0 0}'
        + '.ma-agenda-meta{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px;margin:26px 0 0;font-family:var(--ma-sans,Montserrat,sans-serif);font-size:15px;font-weight:700;color:#fff;letter-spacing:.2px}'
        + '.ma-agenda-sub{margin:52px 0 0}'
        + '.ma-agenda-list{list-style:none;margin:22px 0 0;padding:0;text-align:left}'
        + '.ma-agenda-slot{display:flex;gap:18px;align-items:flex-start;background:var(--ma-panel,#2C4058);border-left:4px solid var(--ma-gold,#ECA021);border-radius:10px;padding:18px 22px;margin:0 0 12px}'
        + '.ma-agenda-slot:nth-child(even){border-left-color:var(--ma-rust,#E05C26)}'
        + '.ma-agenda-av{flex:0 0 44px;height:44px;border-radius:50%;background:var(--ma-navy-deep,#1E2D3F);color:var(--ma-gold,#ECA021);font-family:var(--ma-sans,Montserrat,sans-serif);font-size:14px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;letter-spacing:.5px}'
        + '.ma-agenda-body{flex:1 1 auto;min-width:0}'
        + '.ma-agenda-name{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-family:var(--ma-sans,Montserrat,sans-serif);font-size:18px;font-weight:800;color:#fff;margin:0}'
        + '.ma-agenda-min{font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;background:var(--ma-gold,#ECA021);color:var(--ma-navy-deep,#1E2D3F);border-radius:999px;padding:5px 12px;white-space:nowrap}'
        + '.ma-agenda-role{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:13px;font-weight:600;color:rgba(255,255,255,.72);margin:3px 0 0}'
        + '.ma-agenda-topic{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:15px;line-height:1.5;color:#fff;margin:10px 0 0}'
        + '.ma-agenda-topic strong{font-weight:800}'
        + '.ma-agenda-series{font-family:var(--ma-sans,Montserrat,sans-serif);font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.6);margin:26px 0 0}'
        + '@media(max-width:640px){.ma-agenda{padding:32px 20px}.ma-agenda-slot{gap:14px;padding:16px}.ma-agenda-av{flex-basis:38px;height:38px;font-size:12px}.ma-agenda-name{font-size:16px}.ma-agenda-topics li{font-size:15px}}';
      document.head.appendChild(st);
    }
    el.setAttribute('data-ma-rendered', '1');
  }

  function init() {
    renderContent();               /* before meta: video hook lives inside */
    var navs = document.querySelectorAll('.ma-nav');
    for (var i = 0; i < navs.length; i++) renderNav(navs[i]);
    var pagers = document.querySelectorAll('.ma-pager');
    for (var j = 0; j < pagers.length; j++) renderPager(pagers[j]);
    var ladders = document.querySelectorAll('[data-ma-ladder]');
    for (var m = 0; m < ladders.length; m++) renderLadder(ladders[m]);
    var mentors = document.querySelectorAll('[data-ma-mentors]');
    for (var q = 0; q < mentors.length; q++) renderMentors(mentors[q]);
    var agendas = document.querySelectorAll('[data-ma-agenda]');
    for (var g = 0; g < agendas.length; g++) renderAgenda(agendas[g]);
    var cidx = document.querySelectorAll('[data-ma-course-index]');
    for (var w = 0; w < cidx.length; w++) renderIndex(cidx[w]);
    renderMeta();
    renderApplyCourse();
    renderVersion();
    trackPageView();
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
  setTimeout(init, 600);
  window.addEventListener('load', syncAccordion);
  window.addEventListener('load', init);

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(syncAccordion, 150);
  });
})();
