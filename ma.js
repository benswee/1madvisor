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
var MA_JS_VERSION = '1e70ec6b';

var MA_STAGES = [
  { lesson: 'Start Here', parts: [ { slug: 'start', label: 'Start Here', url: '/training' } ] },

  { group: 'Marketing — Getting Clients' },
  { lesson: 'Prospecting', teacher: 'Gord', section: 'Prospecting',
    optin: 'Live Class: Building A Pipeline That Does Not Depend On Your Warm Market',
    parts: [
      { slug: 'prospecting-family-market', label: 'The Family Market' },
      { slug: 'prospecting-hnw',           label: 'The High-Net-Worth Market' }
  ]},
  { lesson: 'Client Conferences', teacher: 'Ace', section: 'Running Conferences',
    optin: 'Live Class: Run A Client Conference That Fills Your Pipeline',
    parts: [
      { slug: 'conferences-staging',   label: 'Staging & Guest Acquisition', soon: true },
      { slug: 'conferences-execution', label: 'Executing the Conference', soon: true },
      { slug: 'conferences-follow-up', label: 'Post-Conference Follow-Up', soon: true }
  ]},
  { lesson: 'Becoming a Star Speaker', teacher: 'Tim', section: 'Running Conferences',
    optin: 'Live Class: Becoming The Speaker Rooms Remember',
    parts: [ { slug: 'star-speaker', label: 'Becoming a Star Speaker', soon: true } ]},
  { lesson: 'Strategic Networking', teacher: 'Clement', section: 'Strategic Networking',
    optin: 'Live Class: Networking With Intention — With Clement',
    parts: [
      { slug: 'networking-preparation', label: 'Networking Preparation', soon: true },
      { slug: 'networking-follow-up',   label: 'Lead Follow-Up & Relationships', soon: true }
  ]},

  { group: 'Sales — Closing Bigger Cases' },
  { lesson: 'The Discovery Process', teacher: 'Ace & Mayank', section: 'Discovery Process',
    optin: 'Live Class: Discovery Questions That Open Bigger Cases',
    parts: [
      { slug: 'discovery-theory',    label: 'The Theory Behind Discovery', soon: true },
      { slug: 'discovery-questions', label: 'The Actual Discovery Questions', soon: true }
  ]},
  { lesson: 'Building a Predictable AUM Engine', teacher: 'Harry', section: 'Investment',
    optin: 'Live Class: Build Your AUM Engine With Harry',
    parts: [
      { slug: 'aum-engine',   label: 'The AUM Engine', soon: true },
      { slug: 'aum-pac',      label: 'PAC Strategy', soon: true },
      { slug: 'aum-lump-sum', label: 'Lump-Sum Transfers', soon: true },
      { slug: 'aum-loans',    label: 'Investment Loans', soon: true }
  ]},
  { lesson: 'RRSP/RRIF Interest Meltdown', teacher: 'Amanda', section: 'Investment',
    optin: 'Live Class: The RRSP/RRIF Interest Meltdown Strategy',
    parts: [ { slug: 'rrsp-meltdown', label: 'RRSP/RRIF Interest Meltdown', soon: true } ]},
  { lesson: 'Personal Insured Retirement Plan', teacher: 'Carmen', section: 'Insurance',
    optin: 'Live Class: Presenting The Personal IRP With Confidence',
    parts: [
      { slug: 'personal-irp',     label: 'The Personal IRP', soon: true },
      { slug: 'personal-irp-ifa', label: 'The IFA Version', soon: true }
  ]},
  { lesson: 'Personal Estate Insurance', teacher: 'Tim', section: 'Insurance',
    optin: 'Live Class: Personal Estate Insurance With Tim',
    parts: [
      { slug: 'personal-estate',     label: 'Personal Estate Insurance', soon: true },
      { slug: 'personal-estate-ifa', label: 'The IFA Version', soon: true }
  ]},
  { lesson: 'Corporate Insured Retirement Plan', section: 'Insurance',   /* coach TBD */
    optin: 'Live Class: The Corporate IRP Conversation',
    parts: [
      { slug: 'corporate-irp',     label: 'The Corporate IRP', soon: true },
      { slug: 'corporate-irp-ifa', label: 'The IFA Version', soon: true }
  ]},
  { lesson: 'Corporate Estate Insurance', teacher: 'Tim', section: 'Insurance',
    optin: 'Live Class: Corporate Estate Cases With Tim',
    parts: [
      { slug: 'corporate-estate',     label: 'Corporate Estate Insurance', soon: true },
      { slug: 'corporate-estate-ifa', label: 'The IFA Version', soon: true }
  ]},
  { lesson: 'Advanced Case Study', teacher: 'Carmen', section: 'Case Study',
    optin: 'Live Class: Work A Real Advanced Case With Carmen',
    parts: [ { slug: 'case-study', label: 'Advanced Case Study', soon: true } ]},
  { lesson: 'Objection Handling', teacher: 'Tim', section: 'Objection Handling',
    optin: 'Live Class: Objection Handling Role Play With The Coaches',
    parts: [
      { slug: 'objection-mid-affluent', label: 'Middle-to-Affluent Market', soon: true },
      { slug: 'objection-hnw',          label: 'High-Net-Worth', soon: true }
  ]},

  { group: 'Practice Growth — Building Beyond You' },
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
  { name: 'Tim Lau', photo: 'https://benswee.github.io/1madvisor/mentors/tim.jpg', creds: 'CFP, CLU, CEA · 14 Consecutive Years Top of the Table',
    role: 'President, GT Wealth & Way Financial',
    bio: 'Twenty years at the top of high-net-worth planning — estate, corporate tax, trusts and wills — and coaches over 500 advisors a year.' },
  { name: 'Ace Liew', photo: 'https://benswee.github.io/1madvisor/mentors/ace.jpg', creds: '2 Yrs TOT · 3 Yrs MDRT · CEA',
    role: 'Director, Seed Wealth',
    bio: 'Premier strategist for Canada\'s medical elite, using advanced corporate frameworks and trust strategies to protect capital from tax erosion.' },
  { name: 'Harry Lee', photo: 'https://benswee.github.io/1madvisor/mentors/harry.jpg', creds: '$1.5B+ in Client Wealth',
    role: 'Wealth Development Director',
    bio: 'Over 20 years in life insurance, having coached more than 1,000 agents to build segregated-fund businesses and sustainable passive income.' },
  { name: 'Clement Lai', photo: 'https://benswee.github.io/1madvisor/mentors/clement.jpg', creds: 'MDRT since 2006',
    role: 'President, UFinancial Group Inc.',
    bio: 'Coached over 200 insurance advisors and has specialised for a decade in high-net-worth individuals and corporations with sophisticated structures.' },
  { name: 'Gord' },
  { name: 'Carmen' },
  { name: 'Amanda' },
  { name: 'Mayank' },
  { name: 'Ling' },
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
  "aum-engine": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Commission income restarts at zero every January. A book of assets under management pays you again for work you did once — and building it is a system you can run alongside your insurance practice.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Why recurring trailer income changes the economics of your practice</li>\n      <li>The realistic path to $10K+ per month of recurring revenue</li>\n      <li>Positioning investments with insurance clients you already serve</li>\n      <li>The crawl-walk-run sequence the next three parts teach</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-pac": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The crawl stage: pre-authorized contributions. Small monthly amounts, set up once, growing quietly — the habit that builds your AUM base and deepens every client relationship it touches.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Making the PAC conversation natural in any client meeting</li>\n      <li>Amounts that clients sustain without feeling pinched</li>\n      <li>The review rhythm that grows contributions over time</li>\n      <li>Why PAC clients become your best transfer candidates later</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-lump-sum": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The walk stage: moving existing assets under your management. The money already exists — in RRSPs, TFSAs and non-registered accounts elsewhere — and the conversation for earning it is more natural than most advisors think.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Opening the transfer conversation without trashing the other advisor</li>\n      <li>The consolidation case from the client's side of the table</li>\n      <li>Tax triggers to flag on non-registered transfers before they bite</li>\n      <li>Handling the incumbent-advisor objection cleanly</li>\n    </ul>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
  "aum-loans": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>The run stage: investment leverage, for the right client. Borrowing to invest can accelerate wealth meaningfully — and it is exactly as serious as it sounds, which is why presenting it honestly is the entire skill.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>Who leverage genuinely suits — and who it never should</li>\n      <li>Presenting upside and downside so consent is real</li>\n      <li>Suitability and compliance boundaries you don't cross</li>\n      <li>Preparing clients for the downturn before it happens</li>\n    </ul>\n    <p><strong>Leverage done right expands a practice. Done casually, it ends one.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>",
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
  "delegation": "<div class=\"ma-video ma-video--soon\" data-ma-video><span>Video Coming Soon</span></div>\n  <div class=\"ma-pager ma-pager--top\"></div>\n  <div class=\"ma-lesson\" style=\"margin-top:20px;\">\n    <p>Every practice hits the ceiling of its founder's calendar. Delegation is how you get your hours back without dropping the standard of care your clients expect — and it's a skill, not a personality trait.</p>\n    <h3>What you'll learn</h3>\n    <ul>\n      <li>What to hand off first — and what never to hand off</li>\n      <li>Documenting a task so someone else can own it</li>\n      <li>Delegating outcomes instead of chores</li>\n      <li>The weekly rhythm that keeps a delegated practice tight</li>\n    </ul>\n    <p><strong>You don't scale by working more. You scale by needing to be in fewer places.</strong></p>\n  </div>\n  <div class=\"ma-res\" style=\"margin-top:28px;\">\n    <p class=\"ma-res-label\">Relevant Resources</p>\n    <a href=\"https://1mclub.ca/\">The $1M Club — meet the board of TOT mentors</a>\n  </div>"
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
      if (!e.parts) continue;

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
      if (!e.parts || e.parts[0].slug === 'start') continue;
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

    var optin = document.querySelector('[data-ma-optin]');
    if (optin && ctx.lesson.optin && optin.getAttribute('data-ma-rendered') !== '1') {
      optin.textContent = ctx.lesson.optin;
      optin.setAttribute('data-ma-rendered', '1');
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

    /* data-ma-mentors="featured" shows only coaches with a bio on file.
       Used where a short, complete board reads better than a long one with
       placeholders — the event page. Drops back to the full list on its own
       as bios land, so this never needs revisiting. */
    var roster = MA_MENTORS;
    if (el.getAttribute('data-ma-mentors') === 'featured') {
      roster = [];
      for (var f = 0; f < MA_MENTORS.length; f++) {
        if (MA_MENTORS[f].bio) roster.push(MA_MENTORS[f]);
      }
      if (!roster.length) roster = MA_MENTORS;   /* fail open, never blank */
    }

    /* what each coach teaches, straight from the curriculum */
    var teaches = {};
    for (var i = 0; i < MA_STAGES.length; i++) {
      var e = MA_STAGES[i];
      if (!e.parts || !e.teacher) continue;
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
      if (!e.parts || e.parts[0].slug === 'start') continue;

      html += '<div class="ma-cidx-lesson">'
            + '<div class="ma-cidx-head">'
            + '<span class="ma-cidx-title">' + esc(e.lesson) + '</span>'
            + (e.teacher ? '<span class="ma-cidx-coach">' + esc(e.teacher) + '</span>' : '')
            + '</div><div class="ma-cidx-parts">';
      for (var j = 0; j < e.parts.length; j++) {
        var p = e.parts[j], href = hrefFor(p);
        var label = esc(p.label) + (p.soon ? ' <em class="ma-soon">Soon</em>' : '');
        html += href ? '<a href="' + href + '">' + label + '</a>'
                     : '<span class="is-soon">' + label + '</span>';
      }
      html += '</div>';
      if (e.open) {
        html += '<div class="ma-cidx-enrol">'
              + '<span class="ma-chip-open">Enrolling Now</span>'
              + '<a class="ma-cidx-cta" href="' + MA_APPLY_URL
              + '?course=' + encodeURIComponent(e.lesson) + '">Request A Seat →</a>'
              + '</div>';
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
