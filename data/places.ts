import type { City, Place } from "@/lib/types";

export const cities: City[] = [
  {
    id: "sf",
    name: "San Francisco",
    country: "United States",
    countryCode: "USA",
    iata: "SFO",
    lat: 37.7749,
    lng: -122.4194,
    firstVisited: "2009-04-12",
    blurb:
      "The original delegation. Silicon Valley has been the gravitational center of Aaltoes' worldview since 2009; the February 2026 board trip met nineteen founder houses, startups, Big Tech orgs, and ecosystem nodes across the Bay Area.",
    photos: ["/SF2026S.jpg"],
  },
  {
    id: "stockholm",
    name: "Stockholm",
    country: "Sweden",
    countryCode: "SWE",
    iata: "ARN",
    lat: 59.3293,
    lng: 18.0686,
    firstVisited: "2026-04-01",
    blurb:
      "Closest world-class hub with Scandinavia's strongest operator network. The April 2026 interrail delegation visited investor funds, builder communities, and the student societies shaping the Nordic tech generation.",
  },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    countryCode: "DEU",
    iata: "BER",
    lat: 52.52,
    lng: 13.405,
    firstVisited: "2026-04-01",
    blurb:
      "Europe's contrarian capital, artistically ambitious, technically serious, sceptical of convention. The interrail leg moved through VC offices, an industrial AI hackathon, and startups built around physical-world problems.",
  },
  {
    id: "zurich",
    name: "Zürich",
    country: "Switzerland",
    countryCode: "CHE",
    iata: "ZRH",
    lat: 47.3769,
    lng: 8.5417,
    firstVisited: "2026-04-01",
    blurb:
      "ETH gravity well. AI research density per capita that rivals anywhere in the world, and a student builder culture, anchored in the Hangar, that directly inspired The Plant.",
  },
];

export const places: Place[] = [

  // ─── San Francisco · February 2026 ───────────────────────────────────────

  {
    id: "agi-house",
    cityId: "sf",
    name: "AGI House",
    kind: "Founder House",
    firstVisited: "2026-02-19",
    website: "https://www.agihouse.org",
    photos: [
      "https://www.agihouse.org/imgs/PixelHouse2.png",
      "https://www.agihouse.org/imgs/PixelHouse.png",
      "https://www.agihouse.org/imgs/AGIHouseThumbnail2.jpg",
    ],
    description:
      "AGI House is a community, VC fund, and applied AI lab empowering the world's top AI builders and researchers. Advancing frontier AI from breakthrough to mass adoption, on a mission to accelerate humanity's transition to AGI. Operates as a merit-based community hosting events and hackathons, a venture fund writing checks up to $1M into early-stage AI startups, and an applied research lab connecting AI founders with Fortune 2000 companies.",
    notes: [
      "AGI House stood out for the way it treats community as a product. Their \"vertical integration\" framing (the idea of building infrastructure that serves founders, VCs, and companies end-to-end) is operationalised through a serious CRM of roughly nineteen thousand people and a deliberate practice they call \"transparency into the network\": they don't just collect contacts, they actively introduce them. That part isn't a nice-to-have. It's the wedge.",
      "The event flywheel is similarly engineered. Around fourteen events over two years, ninety thousand signups, and a careful balance between repeat attendees and fresh faces. The blunt insight: most startups don't show up to events for inspiration, they show up to hire. We left thinking some of our own programming should be reframed openly around that, even something as direct as a \"hiring hackathon\".",
    ],
    monogram: "AGI",
  },
  {
    id: "aevitas-house",
    cityId: "sf",
    name: "Aevitas House",
    kind: "Founder House",
    firstVisited: "2026-02-19",
    website: "https://aevitashouse.bio",
    photos: [
      "https://aevitashouse.bio/wp-content/uploads/elementor/thumbs/hero-image.fill_.size_1248x702.v1699834051-qrbv325z7nhw2zs5rlb1uq5t20hqygl9o89dqpikiu.jpg",
      "https://aevitashouse.bio/wp-content/uploads/elementor/thumbs/1691646563-scaled-qrcwkntpz4zzv9es1gq4enqm7ih7tfeyw4y4q6g4me.jpg",
      "https://aevitashouse.bio/wp-content/uploads/2024/07/Hayes-Valley-the-market-3.jpg",
    ],
    description:
      "Aevitas House is \"a home for those building the new human condition\", the nexus of futurists, vitalists, and biotech builders in the heart of San Francisco. A curated residential community of ambitious residents working on longevity and age reversal, biological enhancement, and bioengineered life.",
    notes: [
      "Aevitas sits inside the longevity cluster known informally as Vitalist Bay, and visiting it was less about meeting a single company than about understanding why a particular flavour of ambition concentrates in this geography. The shorthand: a disproportionate share of global wealth is now held by older people, which creates a demand vector for longevity, healthspan, and quality-of-life products that's hard to overstate. The cultural surface is the visible part of a more sober underlying flow of capital and talent. Brian Johnson as a public figure, hundred-million-dollar prizes for ageing reversal, philosophical conversations about staying in your prime longer and where biology ends and BCIs begin: all of it sits on top of capital and operator density that is much less performative.",
      "Robin Gustafsson came up repeatedly here, both as a personal example of the founder-house model (being in San Francisco partly to stay close to a top mentor, doing work face-to-face rather than over Zoom) and as a bridge into the biotech and longevity network we want access to.",
      "A second thread, prompted by Robin, was about how to allocate time as a venture-builder ecosystem. A 70/20/10 split between main work, smaller bets, and pure investigation. Time-blocking exploration as if it were a meeting. Being intentional on trips: every person carries explicit questions and goals, pushes for solo meetings instead of always travelling in a pack, and sends follow-ups religiously. Whether or not we run paper-reading sessions, the operating model is the takeaway worth importing. Be best in the world at the mission, and be deliberate about exploration.",
      "The practical takeaway is that Aevitas House is two things at once. It's a longevity learning node, a place to find out what people are actually building when the macro pull is this strong, and it's an access point into the Vitalist Bay and Robin orbit. We should treat it as both, and apply Robin's discipline (intentional trip goals, ruthless follow-up, protected investigation time) to whichever angle we pursue.",
    ],
    monogram: "AV",
  },
  {
    id: "uc-berkeley-scet",
    cityId: "sf",
    name: "UC Berkeley SCET",
    kind: "Startup Ecosystem",
    firstVisited: "2026-02-20",
    website: "https://scet.berkeley.edu",
    photos: [
      "https://scet.berkeley.edu/wp-content/uploads/20231208_ColliderCup_AVL_0256-scaled.jpg",
      "https://scet.berkeley.edu/wp-content/uploads/Graduation-by-Doe-Library.png",
      "https://scet.berkeley.edu/wp-content/uploads/IMG_2530-scaled.jpg",
    ],
    description:
      "At the Sutardja Center for Entrepreneurship and Technology (SCET), the mission is to empower innovators to positively change the world. UC Berkeley's hub for innovation and entrepreneurship education, equipping students, professionals, and global partners with skills in innovation, technology commercialisation, and leadership through the Berkeley Method of Entrepreneurship pedagogy.",
    notes: [
      "Berkeley's entrepreneurship culture in a sentence: take a break from your degree to build, and don't apologise for it. The implicit message, and one that quietly dissolves a lot of imposter syndrome, is that the people inside these institutions are not different in kind. Getting in isn't \"making it\". The thing you do once you're inside is what matters.",
      "What stuck most about SCET wasn't the funding or the formal infrastructure but the framing. Berkeley positions entrepreneurship as mindset plus learning by doing. They actively destigmatise pivoting and treat the process of conflict and problem-solving as part of building, not a failure mode. They organise around themed courses, entrepreneurship through climate, through biotech, through media, to pull in students who wouldn't otherwise self-identify as \"startup people\". The hidden curriculum is helping students figure out where they fit in the ecosystem and what they're actually good at.",
      "Two ideas worth porting back: founder mixers structured as explicit matching, people with an idea on one side, people looking for a team on the other, possibly across universities, and a much sharper marketing push for Aalto as \"the\" entrepreneurship university. The long-term reputation effects of being known as a building campus compound over years, in who shows up to study there and what they ship while they're there.",
    ],
    monogram: "SCET",
  },
  {
    id: "token-company",
    cityId: "sf",
    name: "The Token Company",
    kind: "Startup",
    firstVisited: "2026-02-21",
    website: "https://thetoken.company",
    description:
      "The Token Company builds context-engineering infrastructure for large language models and agentic systems, tooling that helps AI products select, structure, and serve the right information to models at runtime. European-rooted team, Y Combinator-backed.",
    notes: [
      "The Token Company was one of the strongest meetings of the trip.",
      "A few themes ran through the conversation. First, that YC applies a B2B-SaaS-shaped framework very broadly, and that framework isn't a fit for every company. Second, that the most durable building philosophy is to build for what you genuinely like rather than for what looks fundable (a recurring theme across SF, but unusually well-articulated here). Third, that VC behaviour is its own world with its own incentives (ghosting, referral-gating, perception games), and founders need the confidence to opt out of the parts that don't serve them. Fourth, that \"strategically not making everything ready\" is sometimes the better choice; you don't need to figure everything out before you start.",
      "The conversation also surfaced a gap on our side: for people with no startup background, there isn't an obvious first step or set of resources. The ideas we left with were practical: a QR-code resource guide, a refreshed startup jargon dictionary that includes new AI vocabulary, and a pressure-focused but non-toxic bootcamp format. From the YC side, the positioning is mostly the \"stamp of approval\" that makes fundraising and hiring easier, at the cost of around eight percent equity. \"Verticals\" was flagged as a fashionable but premature buzzword; product-market fit needs to come before vertical expansion. And one Finland-specific lever stayed with us: lobbying to make it easier for foreign capital to invest into Finnish startups.",
    ],
    monogram: "TTC",
  },
  {
    id: "olo",
    cityId: "sf",
    name: "Olo",
    kind: "Startup",
    firstVisited: "2026-02-20",
    website: "https://www.olo.app",
    photos: [
      "https://cdn.prod.website-files.com/6564c630135481c24bdd4d2a/677ef2af24e1c52744218736_Olo%20therapist.png",
      "https://cdn.prod.website-files.com/6564c630135481c24bdd4d2a/6700c427423ccdeef1ed58cf_featherwhite%201.png",
      "https://cdn.prod.website-files.com/6564c630135481c24bdd4d2a/673138d85a80fcb0f141f550_IMG_5278.JPG",
    ],
    description:
      "Olo is a mobile app that pairs immersive nature soundscapes with somatic therapeutic techniques to reduce stress and anxiety. Guided audio journeys, 5 to 30 minutes long, deliver mental alertness and calm at the same time through spatial-audio technology. The team travels the world to capture the richest sounds available to the human ear.",
    notes: [
      "Olo's contribution to the trip was less a set of tactical learnings and more a coherent worldview about what kind of person should be starting a company. Entrepreneurship is a vehicle, not an identity, a way to get something done in the world, not a label to wear. Success is courage to do what you want plus timing; the most useful question to ask yourself isn't \"do I know enough to start?\" but \"am I willing to learn fast enough once I'm in?\".",
      "A practical filter came out of that worldview: at the early stage, you'll be drowning in advice, and the skill that actually matters is figuring out whose advice to listen to and whose to politely ignore. Don't reinvent the wheel, but also don't optimise for sounding right to the wrong audience.",
      "On AI and product strategy, the framing was that AI gives you speed and humans bring depth, and that agents will increasingly connect directly to APIs, eroding the value of the \"app\" as a layer. On the market side, a quiet but important observation: a large share of the world's money is now held by older people, which is what's really driving the surge in longevity, quality-of-life, and experience-economy companies.",
      "The Harbor sub-conversation reinforced something we already half-believed: it's valuable for students to go through the full build–sell–support–wind-down cycle and feel the consequences of good and bad decisions. The loop is the lesson.",
    ],
    monogram: "OLO",
  },
  {
    id: "nordic-innovation-house",
    cityId: "sf",
    name: "Nordic Innovation House",
    kind: "Founder House",
    firstVisited: "2026-02-23",
    website: "https://www.nordicinnovationhouse.com",
    photos: [
      "https://images.squarespace-cdn.com/content/v1/5be156f4365f02418a904b89/1543422921709-PAP1CKXHIDUJJK62BK4X/Nordic_innovation_House_Silicon_Valley_peace.jpg",
      "https://images.squarespace-cdn.com/content/v1/5be156f4365f02418a904b89/1541495755514-QRHBMJQSI2U48CDRWRR7/image-asset.jpeg",
      "https://images.squarespace-cdn.com/content/v1/5be156f4365f02418a904b89/1543320456439-3BH7SZJA3A6700TQR5N7/jace-grandinetti-110734-unsplash.jpg",
    ],
    description:
      "Nordic Innovation House helps Nordic startups land in global markets. Co-founded by Nordic Innovation and the Nordic governments, it offers office space, programs, mentorship, and an active community designed to support Nordic founders entering Silicon Valley and the wider US market.",
    notes: [
      "Nordic Innovation House is one of those offerings that sounds great on paper and reads differently up close. Annual membership is in the order of two thousand euros (a rounding error compared to SF office rents) and comes with a built-in Nordic network, an SF address, and a mailing service. The reality on the ground is that day-to-day usage is very low: often zero or one people in the office, peaking around five. Many Finns in SF don't use it, and Nordic founders tend to build the connections it offers without needing to pay for them.",
      "The pay-it-forward and culture-of-helping framing, that being generous comes back to you, is real and worth absorbing as an operating principle. There's also a useful observation about communication norms in SF that's worth internalising: people don't listen to be polite. You get roughly thirty seconds to capture someone's attention, and maybe three minutes if they're still engaged. Pitches that bury the lede die in the first beat.",
      "A few governance and policy notes came up around the conversation: the \"elephant in the room\" political environment (chaos as an opportunity surface, rather than something to wait out), and an idea worth tracking: pressuring governments toward gradual taxation scaled to company size. A note on Nordic identity also crystallised: the social-security \"fail-safe\" makes taking risk abroad genuinely easier than people credit, and Nordics chronically undersell themselves, a habit that probably costs us more than we realise.",
    ],
    monogram: "NIH",
  },
  {
    id: "meru-health",
    cityId: "sf",
    name: "Meru Health",
    kind: "Startup",
    firstVisited: "2026-02-23",
    website: "https://www.meruhealth.com",
    photos: [
      "https://framerusercontent.com/images/LF8e2SBIPIRVxLysQHnC2wJI.jpg",
      "https://framerusercontent.com/images/I4IdIY0oFy4mGVNcaaE3bczGIFA.png",
      "https://framerusercontent.com/images/XtpdgkF3CEZ4RnCQWH4MdMaARQo.png",
    ],
    description:
      "Meru Health is a comprehensive online mental health solution combining therapy from licensed therapists with biofeedback, mindfulness practices, sleep coaching, and peer support. Delivered through US health insurance, with measurable outcomes for depression, anxiety, and burnout.",
    notes: [
      "Meru Health is mission-driven in the strict sense of the word: the founder's older brother died by suicide, and that loss is the direct origin of the company. They got into Y Combinator on roughly the sixth attempt, which is itself a useful data point. Persistence isn't a cliché in this space; it's the actual operating model.",
      "The investor lessons were unusually sharp. Choose your investors carefully; bad partnerships are difficult and expensive to unwind because, as Kristian put it, you can't \"divorce\" a VC. Someone has to buy them out. Look for partners who genuinely understand startups and who trust the founder's vision, not just the deck.",
      "The go-to-market story is a good case study in market-fit by geography. Meru sells via insurance, and different insurers route to different demographics; Meru is positioned for the working-age population. The US market turned out to be easier than the EU largely because of language and bureaucratic speed, the thesis is that Meru might not have survived in Finland because adoption would have been too slow. US healthcare has corruption and gray zones and unequal access, but if you can get inside the insured channels, the power of the system tilts in your favour.",
      "The final thread was about credibility. Even a fast-moving company benefits from academic channels (publications, university relationships) used strategically. The early-stage networking playbook was practical and worth copying: show up at topic-specific seminars, email researchers about their papers and turn that into coffee, bond over Finland, and provide data to researchers who can return the favour with rigour and reach.",
    ],
    monogram: "MH",
  },
  {
    id: "the-residency",
    cityId: "sf",
    name: "The Residency",
    kind: "Founder House",
    firstVisited: "2026-02-21",
    website: "https://www.livetheresidency.com",
    photos: [
      "https://cdn.prod.website-files.com/62f41dee5606d80f65b7dcbb/66941bdc3dc19067eace313c_statutepng.webp",
      "https://cdn.prod.website-files.com/62f41dee5606d80f65b7dcbb/667fd250c213d85ea69e82f8_theresidents_theresidency.webp",
      "https://cdn.prod.website-files.com/62f41dee5606d80f65b7dcbb/6681f0102e93829020493695_demo%20day.webp",
    ],
    description:
      "The Residency exists to support and connect ambitious builders. A full-time program where inventors, creators, and visionaries live together in shared residencies for 3-month cohorts, combining housing, co-working space, mentorship, and demo days that connect them with investors and collaborators.",
    notes: [
      "The Residency was one of the most clarifying visits of the trip, not because it was the most impressive thing we saw, but because it forced an honest comparison with what we already have at home. The residency runs more like a well-curated hotel than a startup programme: the environment is genuinely beautiful, the experience is intentionally designed, and the implicit pitch is \"with enough time and conviction, you can build this\". That part is true. The harder part is what the visit revealed about our own presentation.",
      "The projects we saw weren't obviously more ambitious than what we already enable at Aaltoes. What's different is the staging. The Residency makes its environment, its people, and its calibre legible at a glance. We don't. The concrete to-do list that came out of this visit isn't to copy the model. It's to clean and re-arm the co-working space, add visual cues that signal ambition, and make our standout builders visible in the building (literally placing the most impressive teams where new arrivals will encounter them first, so the bar is set on day one).",
      "Two adjacent observations also stuck. The first: we should pander more deliberately to high-value people (investors, ecosystem giants) and run regular events that bring them into our orbit, while prepping much harder to \"grill\" them with sharp questions when they show up. The second is cultural texture from the visit itself. The Inventors' House used to be Coco Chanel's place; \"sky is not the limit\" is the operating mythology of that building. Some founders explicitly said they didn't like San Francisco but stayed for the gravity of capital, which is its own honest read on the city. And running a house while building a company is genuinely hard; operations drag on founders in ways that aren't visible until you're inside them.",
    ],
    monogram: "RES",
  },
  {
    id: "varun-singh",
    cityId: "sf",
    name: "Varun Singh",
    kind: "Alumni",
    firstVisited: "2026-02-23",
    description:
      "Aaltoes ecosystem alumnus based in San Francisco. Builder, investor, and a recurring connector between the Bay Area and the Finnish startup community.",
    notes: [
      "Varun is the kind of alumnus you want to keep talking to: pragmatic, direct, and willing to flag the parts of the playbook that nobody else will. The headline advice he kept returning to was about the relationship between exploration and commitment. Keep studying and exploring until you find the thing that actually pulls you in, and don't try to manufacture commitment before that pull exists. Once you're in, build strategically, grow, raise, and hire only when the next constraint demands it, and resist the temptation to over-plan.",
      "The most actionable piece was a habit, not an idea: build something every weekend. Consistent low-stakes building dramatically raises the chance you'll stumble into the thing you actually want to commit to. He also encouraged us to think in terms of \"band-aid versus durable company\", knowing whether you're shipping something temporary or something you intend to be around in ten years should change the way you build it, not just the way you talk about it.",
      "And finally, the \"echo chamber\" point, which we already half-suspected: every ecosystem optimises for its own local signals, and the cost of staying inside one for too long is that you start to mistake those signals for the world. Be intentional about leaving.",
    ],
    monogram: "VS",
  },
  {
    id: "silta-house",
    cityId: "sf",
    name: "SILTA House",
    kind: "Founder House",
    firstVisited: "2026-02-26",
    website: "https://www.siltahouse.com",
    photos: [
      "https://cdn.sanity.io/images/w74owj5x/production/8dac11c24ed8ca93e5bbbfa5fd04f94b40ea5eee-1800x1200.jpg?w=1200&auto=format&q=82",
      "https://cdn.sanity.io/images/w74owj5x/production/90663409d6da1ca0ae19ef27e7277542ffb2d8ae-2000x1333.jpg?w=1400&auto=format&q=82",
      "https://cdn.sanity.io/images/w74owj5x/production/7eb1e8230a5a17e588f75cd94334bc0d5ed78f3c-2000x1333.jpg?w=1400&auto=format&q=82",
    ],
    description:
      "SILTA House is the fast track from Finland to Silicon Valley. An immersive program in San Francisco for early-stage Finnish founders, taking the next step as global founders through mentorship, networking, and direct access to US capital and market validation.",
    notes: [
      "SILTA, in this trip, functioned less as a single meeting and more as a high-signal gathering point, a place that compresses many of the founders we'd otherwise have had to chase individually into one room. The S26 cohort kick-off at Valo.ai on the Embarcadero was the canonical example: an entire batch of new founders introducing themselves, surrounded by the surrounding SF ecosystem, with the kind of casual density that makes follow-up meetings far more likely.",
      "Strategically, SILTA is also part of the broader \"Aaltoes ecosystem entities\" landscape, a spin-out from our own ecosystem with the focused mandate of bringing early-stage Finnish founders to San Francisco. The takeaway here is less about a specific learning and more about how we relate to SILTA going forward: as a deliberate downstream conduit for the founders we develop in Helsinki, with cohort moments that we can plan around as natural meeting points.",
    ],
    monogram: "SLT",
  },
  {
    id: "nvidia",
    cityId: "sf",
    name: "NVIDIA",
    kind: "Big Tech",
    firstVisited: "2026-02-24",
    website: "https://www.nvidia.com",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/7/75/2788-2888_San_Tomas_Expwy.jpg",
      "https://images.nvidia.com/nv-story-tool/nv-story-09132023/assets/about-nvidia/history-ari.jpg",
      "https://images.nvidia.com/nv-story-tool/nv-story-09132023/assets/about-nvidia/careers-ari.jpg",
    ],
    description:
      "Since its founding in 1993, NVIDIA has been a pioneer in accelerated computing. The company's invention of the GPU in 1999 sparked the growth of the PC gaming market, redefined computer graphics, and ignited the era of modern AI. NVIDIA is now a full-stack computing infrastructure company powering AI, scientific computing, autonomous systems, and robotics.",
    notes: [
      "The format of the NVIDIA meeting (a walking conversation outdoors, in the heat, with one person doing most of the talking) wasn't ideal for everyone in the delegation. The substance, however, was unusually good: a clear-eyed view of how to structure an organisation at the scale they operate, and what \"scale\" actually means in practice when you're the dominant supplier of compute to a global industry.",
      "The most important outcome wasn't intellectual, it was operational. NVIDIA expressed real interest in collaborating, and the only meaningful constraint they flagged was lead time: they want roughly five months' notice for anything substantive. That gives us a clean planning window. The shape we left thinking about is an NVIDIA-backed community event in the autumn, high-profile, possibly involving hardware or GPU support for community projects, that we can begin scoping immediately if we want to hit the runway.",
    ],
    monogram: "NVDA",
  },
  {
    id: "guardant-health",
    cityId: "sf",
    name: "Guardant Health",
    kind: "Big Tech",
    firstVisited: "2026-02-24",
    website: "https://guardanthealth.com",
    photos: [
      "https://guardanthealth.com/wp-content/uploads/GuardantHealth_BayArea_Lab_11-opt-mw.webp",
      "https://guardanthealth.com/wp-content/uploads/Patient-Homepage-m-opt.webp",
      "https://guardanthealth.com/wp-content/uploads/guardantnewsroomhome.webp",
    ],
    description:
      "Guardant Health is a leading precision oncology company committed to helping conquer cancer globally through its proprietary blood and tissue tests, vast data sets, and advanced analytics. Its platform supports earlier detection, more informed treatment, and better outcomes for patients with cancer.",
    notes: [
      "Guardant Health was simultaneously the most \"American\" meeting of the trip, the hospitality, the office culture, the production value, and a strong source of biotech-operational learnings, even if it wasn't directly the most strategic visit for AaltoES.",
      "The technical scale is what most people don't grasp until they see it. Sequencing produces terabytes per sample, which means the cloud and data-pipeline infrastructure isn't a supporting function; it's the product. The end-to-end loop, from sample logistics through assays and clinical tests, runs roughly one to two weeks. The competitive landscape (Natera, Freenome, Foundation Medicine, Grail) is dense, and Guardant's positioning around precision oncology and liquid biopsy is best read as: turn cancer into a manageable, chronic disease through molecular-signal screening done at sufficient scale.",
      "The cultural lessons were sharper than expected. Investing early time and money into doing things \"properly\" (FDA approvals, regulatory diligence) turns out to be a hiring asset, because the kind of senior talent you most want only joins teams that take the long-form work seriously. Speed culture matters too: they build new labs in months, where Finland would build them in years. Customers, as a rule, prefer to buy solutions rather than build their own labs and run their own tests. And a small but practical communication note: avoid acronyms (Guardant ran into avoidable confusion around \"IEM\"); we should be similarly disciplined and say \"venture capital\" instead of \"VC\" in our own public events.",
      "Underneath all of it, the broader generalisable lesson: startups iterate fast and often redo their core architecture, so \"buy versus build\" depends on scale and required expertise, and the best experts often won't join a tiny early team.",
    ],
    monogram: "GH",
  },
  {
    id: "daivin",
    cityId: "sf",
    name: "DAIVIN!",
    kind: "Startup",
    firstVisited: "2026-02-24",
    website: "https://www.daivin.tech",
    photos: [
      "https://static.wixstatic.com/media/3a3f12_3f6272b02a2c487899921d9f04baee65~mv2.jpeg",
      "https://static.wixstatic.com/media/3a3f12_80cf09e31f004d1bb040d649907f1c3a~mv2.jpeg",
      "https://static.wixstatic.com/media/3a3f12_27889fdcbf604e6d84bb16761193d675~mv2.png/v1/fill/w_1024,h_1024,al_c/3a3f12_27889fdcbf604e6d84bb16761193d675~mv2.png",
    ],
    description:
      "DAIVIN! builds tankless dive gear: breath autonomy at sea, land, and space. Their flagship product, HYDRA, generates oxygen directly from water molecules and replaces traditional pressurised tanks, enabling longer and safer dives as well as use cases in high-altitude climbing, space travel, and emergency medicine.",
    notes: [
      "DAIVIN! was a short conversation, but it landed harder than expected. Leo's perspective on Y Combinator felt grounded in a way that most second-hand YC commentary doesn't, the kind of clarity that comes from being inside the room rather than narrating it from outside.",
      "The operating principle that came out of the conversation is one of the more useful ones to internalise early: you don't need everything ready at the start. Some pieces of the product, the team, and the strategy are discovered along the way, and over-preparing can be its own failure mode. The pattern matched what we heard elsewhere on the trip: execution beats readiness, and the willingness to ship something incomplete is itself a competitive advantage when the alternative is shipping nothing.",
    ],
    monogram: "DV",
  },
  {
    id: "the-embassy",
    cityId: "sf",
    name: "The Embassy",
    kind: "Founder House",
    firstVisited: "2026-02-25",
    website: "https://embassy-house.org",
    photos: [
      "https://embassy-house.org/images/34bbd92f387a75fc6f08b7f5d7cd8cdd.png",
      "https://embassy-house.org/images/13a90d6fb0d952f530627f3ef528de7f.png",
      "https://embassy-house.org/images/435cda712ff4448bd7535934b8fcafab.png",
    ],
    description:
      "The Embassy is an intentional community living in the heart of counterculture San Francisco, building life together for over twelve years. Their mission is to build a commons and to explore what commoning can become, operating as a shared living space and experimental commune that hosts cultural events and gatherings, and reclaiming time, labour, and resources through communal living to support broader social projects.",
    notes: [
      "The Embassy visit was inspiring in a specific way: it crystallised the difference in posture between SF and Europe more precisely than any other meeting of the trip. The shorthand the conversation kept returning to was \"yes-and\" versus \"yes-but\", and the related \"pay it forward\" mentality, which is genuinely operational here in a way it usually isn't in Europe.",
      "The funding landscape they described matched the rumours: there is now \"more money than good ideas\", with most of it concentrated in later stages. The current window is unusually good for indie hackers, robotics, and deep tech, and worse for pure software. There's a broad expectation that the AI hype cycle is rotating toward robotics and harder physical problems, which has consequences for what people start working on next.",
      "The Embassy's operating model is itself the most interesting part. Exclusive, referral-only, deliberately small and analog, with the explicit mission of maximising serendipity, and they actively engineer social dynamics inside the house to pull the \"bottom layer up\" and the \"top layer down\". The European founder pattern they care most about is the one where Europeans come to SF, succeed, and then forget where they came from, contrasted with the Brazilian playbook of succeeding in SF and then returning home to invest in and rebuild the local ecosystem. The Embassy wants Europeans to do the Brazilian thing. We agree.",
      "We also got into the robotics question (humanoids slotting into existing infrastructure versus infrastructure itself becoming robotic) and the related, deeply current problem of where the training data for robotics actually comes from. That's the hot problem in the space right now.",
    ],
    monogram: "EMB",
  },
  {
    id: "airbnb",
    cityId: "sf",
    name: "Airbnb",
    kind: "Big Tech",
    firstVisited: "2026-02-25",
    website: "https://www.airbnb.com",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/2/25/888_Brannan%2C_San_Francisco%2C_2016.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c5/Airbnb_instructions.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
    ],
    description:
      "Airbnb was born in 2007 when two hosts welcomed three guests to their San Francisco home. It has since grown into a global marketplace where millions of hosts and travellers connect through unique stays and experiences in more than 100,000 cities around the world.",
    notes: [
      "At Airbnb, the connecting thread across the conversation was that physical spaces still matter even as networking moves online, and that San Francisco's enduring talent advantage is materially helped by Stanford's proximity, which compounds across decades in a way other cities can't easily replicate.",
      "The product and organisational lessons were the unexpected highlight. The first is what they called the \"data paradox\": Airbnb sits on extraordinary amounts of customer data, but following it too closely can actually lock the organisation into the present at the cost of creativity. The data is a competitive advantage and a creative liability at the same time, and good product calls require knowing when to override it. The second is the new AI-enabled fraud surface: AI-generated photos used to fake \"dirty Airbnb\" refund claims is a real and growing problem, and a useful canary for the broader category of AI-enabled trust attacks. A small cultural note also stayed with us: Google was described as unusually supportive of internal side projects, more so than Airbnb itself.",
      "Zooming out: the founder-shaped qualities the conversation kept returning to (resilience, ownership, resource efficiency) are increasingly necessary for non-founders too. AI tooling amplifies that shift. The skills you'd associate with founders are becoming the baseline for serious operators across roles.",
    ],
    monogram: "ABNB",
  },
  {
    id: "grail",
    cityId: "sf",
    name: "Grail",
    kind: "Big Tech",
    firstVisited: "2026-02-26",
    website: "https://grail.com",
    photos: [
      "https://assets.grail.com/wp-content/uploads/2023/06/grail-lab-compressed.jpg",
      "https://assets.grail.com/wp-content/uploads/2023/06/cancer-signal-compressed.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Grail_logo.svg",
    ],
    description:
      "GRAIL is a healthcare company whose mission is to detect cancer early, when it can be cured. Its multi-cancer early detection (MCED) blood test, Galleri, looks for a signal common across more than 50 types of cancer from a single blood draw, designed to be used alongside existing single-cancer screenings.",
    notes: [
      "Grail entered the trip mainly as the reference point sitting next to Guardant, the close competitor in liquid biopsy and multi-cancer early detection. The two-company comparison is a small but useful case study in how positioning works in a complex regulated market.",
      "Both companies sit at the same physical layer, blood sample, sequencing, cloud, molecular signals, personalised care. The end-state both are pointed at is the same: turning cancer into a manageable chronic disease through early enough detection. The positioning differences are subtle and largely strategic, which screening populations to start with, which clinical partners to anchor on, and how to navigate regulatory and reimbursement paths in parallel.",
      "The category-level lesson is that in markets like this, the architectures of competitors converge quickly; durable advantage tends to come from operational excellence, data scale, and trust with the medical establishment rather than from product differentiation in the conventional sense. The competitive moat in cancer screening isn't really the science any more, it's the institutional layer underneath it.",
    ],
    monogram: "GRL",
  },
  {
    id: "friends-and-family",
    cityId: "sf",
    name: "Friends and Family",
    kind: "Startup Ecosystem",
    firstVisited: "2026-02-25",
    website: "https://friendsandfam.xyz",
    photos: [
      "https://friendsandfam.xyz/header.png",
      "https://friendsandfam.xyz/demos-not-memos.webp",
      "https://friendsandfam.xyz/tightknit-community.webp",
    ],
    description:
      "Friends and Family (FAF) is a home for builders at Stanford, on a mission to reduce the activation energy for people to build what they believe in. A nonprofit builder community that hosts coworking sessions, quarterly demo days, and grants for creators shipping projects across software, writing, hardware, research, and art.",
    notes: [
      "The Stanford visit was instructive for what it didn't look like. The students we spent time with came across as genuinely kind, low-ego, and humble, not the stereotype you arrive expecting. Many of them, asked directly whether they were \"into startups\", said no. The reason is mostly that their peer reference point is so high, the people next to them are already founding companies, that anything less feels like not really being in.",
      "That recalibrated something we'd been wondering about. We assumed BASES, Stanford's main entrepreneurship student organisation, would be more central to the experience of the average student than it apparently is. Several students didn't know what BASES did. The likeliest explanation is that Stanford's culture is dense enough that ambitious students just start building, with or without institutional scaffolding.",
      "The mirror this puts up to our own ecosystem is what we left thinking about. We need a clearer pathway for beginners, people who don't yet have permission to think of themselves as founders, and a culture in which builders demo what they're shipping in front of other builders. Watching someone next to you ship something cool is one of the most reliable motivators we have access to. We should treat that flywheel as core programming rather than incidental atmosphere.",
    ],
    monogram: "FAF",
  },
  {
    id: "figma",
    cityId: "sf",
    name: "Figma",
    kind: "Big Tech",
    firstVisited: "2026-02-26",
    website: "https://www.figma.com",
    photos: [
      "https://cdn.sanity.io/images/599r6htc/regionalized/278b3fae156f139de38afab1b0117410996a5f0e-2100x1183.png",
      "https://cdn.sanity.io/images/599r6htc/regionalized/2f1c0ba703010a1b4126b14a9b0a65695e2655c2-1260x944.png",
      "https://cdn.sanity.io/images/599r6htc/regionalized/24e122cd8a5089bd145f3fd46a35554bae2780b4-1560x1248.png",
    ],
    description:
      "Figma is the leading collaborative design platform, helping the world's product teams ideate, design, and ship better products from start to finish. It brings everyone who designs, builds, and uses products into a single browser-native workspace.",
    notes: [
      "Figma's office was the single clearest argument of the trip for why environment design is not a soft variable. The space is materially more energising and inspiring than ours, and the work that happens inside it visibly reflects that. The takeaway is not \"redecorate\". It's that the physical environment a team builds in is a serious input into the work itself, and treating it as a low-priority concern compounds against you over years.",
      "Our concrete action is to make our co-working space significantly more energising, inspiring, and fun. The levers are well known: lighting, layout, visual stimulation, the visible presence of impressive work. What was less obvious before the visit, and is now obvious, is how big the gap can become between a deliberately built environment and a passively maintained one. The default state of any space is mediocrity; ambition has to be actively designed in.",
    ],
    monogram: "FIG",
  },
  {
    id: "bases",
    cityId: "sf",
    name: "BASES",
    kind: "Startup Ecosystem",
    firstVisited: "2026-02-26",
    website: "https://www.bases.stanford.edu",
    photos: [
      "https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/1476221674302-H6LEWC102LCQAAPAW2O8/stanford.jpg",
      "https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/1466376038646-TPPG9JP1YSHRRQIIWKVQ/image-asset.jpeg",
      "https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/1466376328934-YXFRM3CVBPZMSWXBIQN3/image-asset.jpeg",
    ],
    description:
      "The Business Association of Stanford Entrepreneurial Students (BASES) is the largest entrepreneurship organisation on Stanford's campus, fostering innovation through events, mentorship, accelerator-style programs, and the BASES Challenge competition.",
    notes: [
      "BASES turned into more of a hypothesis than a verified data point. The questions we'd been carrying about it, how central it really is to Stanford's entrepreneurial ecosystem, got partial answers when several Stanford students we spoke to didn't know what it was. The plausible reading is that the cultural baseline at Stanford is high enough that motivated students just start building, with or without formal entrepreneurship programming.",
      "We still want to visit BASES directly rather than infer their footprint from peer interviews. The questions we'd want to answer in that visit are mostly about the marginal student: who does BASES reach that wouldn't have built otherwise, and what specific programming is doing that work.",
      "The broader implication for us, if it holds: ecosystems with a high baseline don't necessarily need their formal entrepreneurship infrastructure to be visible; the work is being done by the surrounding culture. The reverse is also true, in ecosystems with a lower baseline, the formal infrastructure matters much more, because it's doing more of the lifting.",
    ],
    monogram: "BAS",
  },

  // ─── Stockholm · April 2026 interrail ────────────────────────────────────

  {
    id: "sse-ventures",
    cityId: "stockholm",
    name: "SSE Ventures",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://www.hhs.se/en/outreach/sse-initiatives/sse-business-lab/sse-ventures/",
    description:
      "SSE Ventures is the venture and entrepreneurship arm of Stockholm School of Economics, supporting student and alumni founders with funding, coaching, and access to the SSE network.",
    notes: [
      "SSE Ventures illustrated a pattern the delegation encountered more than once on the interrail: a big group dilutes everything. The meeting left almost no trace. Thirty people walking into an organisation is closer to a field trip than a conversation, and the Stockholm School of Economics context, entrepreneurship lab, school-of-business branding, didn't give it enough specificity to cut through. The lesson was less about SSE Ventures and more about format: large-group visits need a very clear agenda, or they shouldn't happen.",
    ],
    monogram: "SSE",
  },
  {
    id: "kth-innovation",
    cityId: "stockholm",
    name: "KTH Innovation",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://www.kth.se/en/om/innovation",
    description:
      "KTH Innovation supports students, researchers, and alumni at KTH Royal Institute of Technology through personal coaching, hub access, and flexible programs designed to turn ideas into ventures at any stage.",
    notes: [
      "KTH Innovation laid out a model worth examining carefully. The core mechanic is simple: a flexible support program where every student gets access to a personal coach, plus hub access, the Knigringen entry point gives students a physical and social foothold even before they have a project to show. The flexibility matters more than it sounds. Most support programs are cohort-based, which means you apply in January or you wait until September. KTH Innovation pulls in the other direction: support is available when a student has something to work on, not when the calendar says so. The European dimension referenced in the meeting suggested ambitions extending beyond campus. The question it left us with is whether Aaltoes could build something similarly on-demand, not a program people apply to, but a layer people pull from.",
    ],
    monogram: "KTHI",
  },
  {
    id: "node-vc",
    cityId: "stockholm",
    name: "Node.vc",
    kind: "VC",
    firstVisited: "2026-04-01",
    website: "https://node.vc",
    description:
      "Node.vc is a Stockholm-based venture capital firm investing in Nordic founders building category-defining technology companies.",
    notes: [
      "Node.vc produced one clean insight: when you innovate in an established field, you often can't sell to the incumbents first. The example was accounting, if you build something that replaces how accounting firms work, accounting firms won't buy it. They'll resist, slow-walk, or copy it. The better move is to build your own firm and outcompete them directly. It sounds obvious stated plainly, but hearing it from people who act on it made it land differently than the usual innovation-vs-incumbents framing. The surrounding meeting didn't surface much else, but one sharp idea carried out of the room.",
    ],
    monogram: "NVC",
  },
  {
    id: "verdane",
    cityId: "stockholm",
    name: "Verdane",
    kind: "VC",
    firstVisited: "2026-04-01",
    website: "https://verdane.com",
    description:
      "Verdane is a specialist growth equity firm partnering with founder-led, technology-enabled businesses across Scandinavia and Northern Europe.",
    notes: [
      "Verdane was on the itinerary and the delegation showed up. No specific learnings surfaced. Not every investor visit breaks through, the density of the day, the format of the meeting, and what a fund is willing to share in a first conversation all affect what you walk out with. Listed here for completeness.",
    ],
    monogram: "VRD",
  },
  {
    id: "relativity-collective",
    cityId: "stockholm",
    name: "Relativity Collective",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://relativitycollective.com",
    description:
      "Relativity Collective brings together a curated group of high-potential students from select European universities for intensive three-day residential programs, with travel and accommodation covered, focused on founder development and cross-university connection.",
    notes: [
      "Relativity Collective was the most impressive thing the delegation encountered in Stockholm. The format is deliberately constrained: a small number of selected universities, a tight group of people, a three-day residential program with travel and accommodation covered. The selectivity is the mechanism. When you put a small group of exceptional people together in person for three days with no exit ramp, the conversations that emerge are a different quality from what you get in a larger room. Everyone is staying in the same place, the group is small enough that you actually meet everyone, and the program is short enough that urgency is built in from the start.",
      "We left convinced this is a format Aaltoes should run. Not copy wholesale, but use as a reference: what would it look like to take our best ten or fifteen people somewhere for three days and let the format do the work? The model doesn't require a big budget. It requires curation and the willingness to keep it small.",
    ],
    monogram: "RC",
  },
  {
    id: "kth-ai-society",
    cityId: "stockholm",
    name: "KTH AI Society",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://kthais.com",
    description:
      "KTH AI Society is a student-run organisation at KTH Royal Institute of Technology building an active community of AI practitioners through research, events, and hands-on projects.",
    notes: [
      "KTH AI Society was a lesson in visit format as much as in content. After a day of large-group meetings, two people went instead of thirty, and went unannounced. The result was a completely different quality of conversation. Without an agenda to prepare, the host just showed what they were actually doing. Walking in without warning trades the formal presentation for the real thing.",
      "The content matched the format. The standout encounter was a first-year bachelor student already deep into LLM token prediction research, using predicted future tokens as context in a way that had clearly gone beyond the mainstream. We left wanting to get him to the Plant. The operational takeaway was explicit: small visits, sometimes unannounced, produce more than large ones almost every time. Go with two people, don't pre-schedule everything, and let the conversation find its own shape.",
    ],
    monogram: "KAI",
  },
  {
    id: "founders-house-stockholm",
    cityId: "stockholm",
    name: "Founders House Stockholm",
    kind: "Founder House",
    firstVisited: "2026-04-01",
    website: "https://founders-house.com",
    description:
      "Founders House Stockholm is an open coworking and community space for founders and builders, hosting a resident community that spans software, hardware, and deep tech.",
    notes: [
      "Founders House Stockholm stood out in comparison to Helsinki. The Helsinki version skews heavily toward software; Stockholm's had more range, someone building flying cars, someone working on hydrogen plants, a wider mix of hardware and physical-world ambition in the building. The delegation used it partly as informal coworking space, which is apparently fine: you can show up and work, and the ambient energy of what's around you is part of what you're there for. One member nearly got locked out on the roof during a remote call. The mix of residents, the access model, and the physical breadth of what's in the building all set a bar the Helsinki version could reasonably aim toward.",
    ],
    monogram: "FHS",
  },

  // ─── Berlin · April 2026 interrail ───────────────────────────────────────

  {
    id: "gtai",
    cityId: "berlin",
    name: "Germany Trade & Invest",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://www.gtai.de/en/invest",
    description:
      "Germany Trade & Invest (GTAI) is the economic development agency of the Federal Republic of Germany, supporting foreign companies entering the German market and German companies expanding abroad.",
    notes: [
      "Germany Trade & Invest was on the schedule. The group split that day meant attendance was uncertain, and nothing from the meeting made it into the post-trip notes. Listed here for completeness.",
    ],
    monogram: "GTAI",
  },
  {
    id: "vireo-ventures",
    cityId: "berlin",
    name: "Vireo Ventures",
    kind: "VC",
    firstVisited: "2026-04-01",
    website: "https://www.vireo.vc",
    description:
      "Vireo Ventures is a Berlin-based impact-focused venture capital firm investing in early-stage startups at the intersection of sustainability and technology.",
    notes: [
      "Vireo Ventures appeared on the Berlin itinerary alongside other group B meetings. The split-group format that day created gaps in what people actually attended, and no specific learnings surfaced. Listed here for completeness.",
    ],
    monogram: "VV",
  },
  {
    id: "unmoeglich-ai",
    cityId: "berlin",
    name: "Unmöglich.AI",
    kind: "Startup",
    firstVisited: "2026-04-01",
    website: "https://unmoglich.ai",
    description:
      "Unmöglich.AI is a Berlin-based creative studio building AI-generated micro dramas, commercials, and artistically driven video content, working at the frontier of generative AI and aesthetic production.",
    notes: [
      "Unmöglich.AI was a deliberately different kind of visit. The team, originally from LUT, now based in Berlin, builds artsy AI: micro dramas, generated commercials, work that sits at the intersection of technology and aesthetics rather than technology and growth. They were 'very artsy, not startup-y at all,' and the delegation found that gap interesting rather than disqualifying. The mindset was what stood out, a way of working with AI shaped by artistic intention rather than venture timelines or market-sizing. The honest reflection afterward: the combination of genuine artistic ambition and serious AI capability would be even more powerful pointed at a growth business. But as a proof that the tools don't have to serve the same goals everyone else is chasing, it landed.",
    ],
    monogram: "UMG",
  },
  {
    id: "htgf",
    cityId: "berlin",
    name: "HTGF",
    kind: "VC",
    firstVisited: "2026-04-01",
    website: "https://www.htgf.de",
    description:
      "High-Tech Gründerfonds (HTGF) is Germany's most active seed investor, backing technology startups across deep tech, digital, and life sciences with a focus on pre-seed and seed stages.",
    notes: [
      "HTGF produced the most contentious discussion of the Berlin leg. The framing from the floor: at pre-seed, a partner 'goes a lot on vibes.' That triggered real debate about whether intuition is a legitimate investment signal or a laundered version of pattern-matching bias. The concrete example made it harder to dismiss: when founders don't visibly respect each other in small interactions, even during a first meeting, that's real information. It doesn't show up in the deck.",
      "The comparison to Jessica Livingston's observer role at YC, the ability to veto a deal based on interpersonal dynamics, suggested this is less idiosyncratic than it sounds, and closer to a skill that's genuinely hard to formalise. We left less certain that 'just trust the data' is always the right answer at the earliest stages, where the data is thin and the person in front of you is most of what you have.",
    ],
    monogram: "HTGF",
  },
  {
    id: "berlin-finai-hackathon",
    cityId: "berlin",
    name: "Berlin Agentic FinAI Hackathon",
    kind: "Event",
    firstVisited: "2026-04-01",
    website: "https://lu.ma/ili241vv",
    description:
      "A Berlin hackathon focused on agentic AI applications in financial services, bringing together developers and builders to prototype the next generation of AI-powered fintech tools.",
    notes: [
      "The Berlin hackathon produced an outcome that's hard to engineer. The delegation didn't win any of the conventional categories, their entry, a large knowledge graph, was by their own assessment probably too ambitious for the time constraint and took too long to load. But after the main awards, the organisers added a special recognition anyway. The technical reflection was self-aware: the knowledge graph was 'way too big.' The outcome was positive regardless. Hackathons reward a certain kind of swing, and a swing that doesn't land cleanly can still attract attention when the ambition behind it is legible.",
    ],
    monogram: "BAH",
  },
  {
    id: "bahn-express",
    cityId: "berlin",
    name: "Bahn Express",
    kind: "Startup",
    firstVisited: "2026-04-01",
    website: "https://www.bahnexpress.com",
    description:
      "Bahn Express is a Berlin-based startup scaling a multi-city service model, known for its operational discipline of placing founders on the ground in each new market they enter.",
    notes: [
      "Bahn Express was a compact case study in what taking scaling seriously actually looks like operationally. Every time the company expands to a new location, the founders go themselves. Not remotely, not through a local hire, they move. The delegation found this striking because it's the kind of commitment most startup writing describes but few teams actually practice. The underlying logic is clear once you say it: culture doesn't travel by memo, and what you've built in one city doesn't automatically replicate in the next. If the founders aren't there in person to build it again, something different grows. The visit was brief, but the principle was portable.",
    ],
    monogram: "BEX",
  },
  {
    id: "redstone-vc",
    cityId: "berlin",
    name: "Redstone VC",
    kind: "VC",
    firstVisited: "2026-04-01",
    website: "https://redstone.vc",
    description:
      "Redstone is a Berlin-based venture capital firm investing in early-stage European tech startups, with a network spanning Berlin, Munich, and beyond.",
    notes: [
      "Redstone VC was one of the most memorable visits of the Berlin leg, partly by accident. A partner stopped by for what was supposed to be five minutes, he stayed for an hour because the board meeting he'd been sitting in was, his word, 'insanely boring.' The conversation that followed became an extended lesson in what happens when you ask genuinely intrusive questions instead of polite ones. One probe opened into a full story: barely enough money for baby food in the early 2000s, grinding for years, the texture of what actually happened. That kind of depth doesn't surface in a normal first meeting. The explicit takeaway the delegation walked away with was simple: ask the uncomfortable question. If someone is willing to answer, the answer is almost always the most useful thing in the room.",
    ],
    monogram: "RVC",
  },

  // ─── Zürich · April 2026 interrail ───────────────────────────────────────

  {
    id: "eth-entrepreneurship-club",
    cityId: "zurich",
    name: "ETH Entrepreneurship Club",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://www.entrepreneur-club.org",
    description:
      "The ETH Entrepreneurship Club is a student-run organisation at ETH Zürich connecting entrepreneurially minded students with mentors, investors, and fellow founders through events, workshops, and matchmaking programs.",
    notes: [
      "The ETH Entrepreneurship Club meeting had a quietly useful dynamic: both sides thought the other had it figured out. Aaltoes looked at ETHEC and saw institutional reach and established structure. ETHEC looked at Aaltoes and saw something they felt they were still building toward. Neither read was accurate, which made the conversation more honest than most peer-society exchanges tend to be. The highlight was a matchmaking event ETHEC had organised, speed-dating format, everyone talkative, arranged well enough that the structure didn't feel forced. The format is worth importing: enough scaffolding to create encounters, loose enough to let them go somewhere real.",
    ],
    monogram: "ETHEC",
  },
  {
    id: "forgis",
    cityId: "zurich",
    name: "Forgis",
    kind: "Startup",
    firstVisited: "2026-04-01",
    website: "https://www.forgis.com",
    description:
      "Forgis builds software for industrial automation, helping manufacturers integrate and operate robotic systems with deep domain expertise in physical-world environments.",
    notes: [
      "Forgis builds automation software for industrial clients, but the office is full of ABB robot arms. That's not decorative, it's the thesis. The explicit learning from the visit was sharp: even if you're fundamentally a software company, if your product runs on hardware, you need to own and operate the hardware yourself. Not because it's cheaper or more efficient, but because the edge cases, the failure modes, and the integration problems only reveal themselves when you're actually running the physical system. Developing industrial automation software remotely, against simulated environments, is a reliable way to build something that works in demos and breaks in production. The team had internalised this, which showed in how precisely they could describe what their clients actually needed.",
    ],
    monogram: "FRG",
  },
  {
    id: "eth-hangar",
    cityId: "zurich",
    name: "ETH Hangar",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://partnerships.ethz.ch/the-hangar.html",
    description:
      "ETH Hangar is a student and startup space at ETH Zürich where focus projects and early ventures work on hardware, aerospace, robotics, and deep tech, often side by side.",
    notes: [
      "ETH Hangar was the most formative visit of the Zürich leg, and in a broader sense one of the most formative for Aaltoes overall. The Plant came out of visiting it. The environment is a mix of student builder teams and early startups coexisting in the same physical space, working on things that span the full range: hydrogen airplane iterations moving through electric, then gas hydrogen, then liquid hydrogen; rockets; hyperloops; security robots. What landed hardest wasn't any single project. It was seeing students who looked like Aaltoes members building things that were genuinely difficult, and treating that difficulty as normal.",
      "The delegation went back a second day. The lesson wasn't just 'build a space like this.' It was that the space is downstream of the people who fill it, and those people show up because the culture expects ambition to be the baseline. 'I could live there' was the honest reaction. The Hangar doesn't inspire you to build, it makes building seem like the obvious thing to do.",
    ],
    monogram: "HNG",
  },
  {
    id: "eth-robotics-club",
    cityId: "zurich",
    name: "ETH Robotics Club",
    kind: "Startup Ecosystem",
    firstVisited: "2026-04-01",
    website: "https://www.ethrobotics.ch",
    description:
      "ETH Robotics Club is a student organisation at ETH Zürich building humanoid robots, robot arms, autonomous vehicles, and other ambitious physical-computing systems inside the ETH Hangar.",
    notes: [
      "ETH Robotics Club operates inside the Hangar, and in that context it represented one of the highest-signal student organisations the delegation encountered anywhere on the trip. The growth, from founding to the scale visible at the time of the visit, in roughly a year, was striking on its own. The projects gave the second impression: a humanoid robot, a robot arm (which the delegation got to try), a self-driving RC car moving fast enough that the demo felt genuinely real. Getting into the technical specifics of each project, rather than sitting through elevator pitches, was what made the time worthwhile. Students building ambitious things and describing what they were actually doing, without filtering for an audience that might not follow.",
    ],
    monogram: "ERC",
  },
  {
    id: "aithon-robotics",
    cityId: "zurich",
    name: "Aithon Robotics",
    kind: "Startup",
    firstVisited: "2026-04-01",
    website: "https://aithon-robotics.ch",
    description:
      "Aithon Robotics builds large industrial drones for infrastructure inspection and preemptive maintenance, using suction-based attachment to access and sample bridges and other hard-to-reach structures.",
    notes: [
      "Aithon Robotics was the cleanest pivot story of the interrail. The original idea, a drone for search-and-rescue in extreme conditions, able to operate when helicopters couldn't, was, on reflection, essentially impossible: if the weather grounds helicopters, it grounds drones too. The team knew this and built prototypes anyway, pushing the concept to its edge, and when the student focus project ended they had a platform with real capabilities and a clearer sense of where to point it. The pivot was to preemptive bridge maintenance: large drones with a suction attachment that lets them cling to bridge surfaces, take structural samples, and catch problems before a bridge fails. The line from 'insanely ambitious, probably too delusional' student project to a fundable startup with a sensible market is exactly the kind of origin story that makes the Hangar worth having. Some of the best companies start with a mission that can't work.",
    ],
    monogram: "ATH",
  },
];
