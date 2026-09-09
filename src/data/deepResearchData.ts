import { DeepResearchDossier } from "../types";

export const CURATED_DEEP_RESEARCH_DOSSIERS: DeepResearchDossier[] = [
  {
    id: "dossier-deepfake-elections",
    topic: "Synthesized Audio Clones & AI Micro-Targeting in Geopolitical Elections",
    depth: "Investigative",
    generatedAt: "2025-05-18T16:00:00Z",
    executiveHypothesis:
      "Generative voice cloning tools with low training thresholds (<3 seconds of sample audio) have enabled coordinated synthetic robocalls and candidate impersonation during critical blackout periods before democratic elections.",
    truthPlausibilityScore: 92,
    plausibilityRationale:
      "Multiple forensic acoustic analyses from Stanford Cyber Policy Center and DARPA SemaFor programs confirm state and proxy deployments of low-latency voice synthesis in European and North American municipal and presidential cycles.",
    timeline: [
      {
        dateOrPeriod: "Jan 2024",
        event: "New Hampshire Primary Robocall Incident",
        significance: "An AI-generated audio clone of President Joe Biden urged 25,000 voters not to vote. Traced back to a political consultant using ElevenLabs API, resulting in landmark FCC ban on AI robocalls.",
        sourceRef: "FCC Enforcement Bureau Record 24-11",
      },
      {
        dateOrPeriod: "Sep 2024",
        event: "Slovak Parliamentary Audio Leak",
        significance: "Two days prior to voting, synthetic audio simulated a party leader discussing vote rigging. Disseminated during a mandatory media silence window, minimizing real-time debunk capability.",
        sourceRef: "Globsec Threat Intelligence Report",
      },
      {
        dateOrPeriod: "Mar 2025",
        event: "Adoption of C2PA Cryptographic Provenance Standard",
        significance: "Major camera manufacturers and AI providers begin embedding cryptographic metadata to differentiate authentic recordings from algorithmic generations.",
        sourceRef: "Content Authenticity Initiative Whitepaper",
      },
    ],
    keyEntities: [
      {
        name: "Synthetic Audio APIs",
        role: "Generation Vector",
        affiliation: "Commercial Speech AI Engines",
        impact: "High",
      },
      {
        name: "Dark Social Channels (Telegram / WhatsApp)",
        role: "Velocity Multiplier",
        affiliation: "Encrypted P2P Networks",
        impact: "High",
      },
      {
        name: "Elective Oversight Commissions (FCC / Ofcom)",
        role: "Regulatory Enforcement",
        affiliation: "Governmental Regulators",
        impact: "Moderate",
      },
    ],
    counterNarrativeMatrix: [
      {
        viralHypothesis: "All modern political leaks are synthetic deepfakes created by intelligence agencies.",
        verifiedReality: "While deepfakes have increased, over 80% of viral misinformation remains 'cheapfakes' (real footage taken out of chronological or geographic context).",
        consensusVerdict: "Disproportionate Claim: Cheapfakes still outpace generative deepfakes in scale.",
      },
      {
        viralHypothesis: "Audio watermarking and cryptographic hashes cannot be bypassed.",
        verifiedReality: "Acoustic re-recording and lossy audio compression (e.g., MP3 conversion, screen recording) can degrade soft spectral watermarks.",
        consensusVerdict: "Technical Caveat: Multi-modal forensic detection is required.",
      },
    ],
    concludingAssessment:
      "The primary threat of generative audio lies in the 'Liar's Dividend'—where politicians falsely claim authentic compromising audio is an AI forgery, eroding trust in objective evidence.",
    methodologyNotes:
      "Synthesized from peer-reviewed audio spectrogram forensic benchmarks, regulatory filings, and verified incident repositories across 14 international elections.",
    citations: [
      {
        title: "DARPA SemaFor Audio Provenance Framework",
        source: "Defense Advanced Research Projects Agency",
        url: "https://www.darpa.mil",
        snippet: "Acoustic phase-distortion metrics for neural voice synthesizer detection.",
      },
      {
        title: "Stanford Internet Observatory: The Threat Horizon of Audio Disinformation",
        source: "Stanford Cyber Policy Center",
        url: "https://cyber.fsi.stanford.edu",
        snippet: "Analysis of voter suppression tactics utilizing low-resource audio cloning.",
      },
    ],
    tags: ["AI", "Deepfakes", "Elections", "Cybersecurity", "OSINT"],
  },
  {
    id: "dossier-microplastics-health",
    topic: "Microplastics in Human Arteries: Cardiovascular Pathology vs Media Alarmism",
    depth: "Scholarly",
    generatedAt: "2025-05-18T15:30:00Z",
    executiveHypothesis:
      "Nanoplastics and microplastics (MNPs) have been detected in human carotid plaque, correlating with increased cardiovascular risk, but causal biochemical mechanisms are under active scientific exploration.",
    truthPlausibilityScore: 84,
    plausibilityRationale:
      "The landmark New England Journal of Medicine (NEJM 2024) prospective study demonstrated a 4.5-fold higher risk of heart attack, stroke, or death in patients with polyethylene/PVC detected in carotid atheromas.",
    timeline: [
      {
        dateOrPeriod: "March 2024",
        event: "NEJM Publishes Landmark Carotid Plaque Study",
        significance: "Marfella et al. observed 257 patients undergoing carotid endarterectomy; 58% had detectable microplastics in plaque tissue.",
        sourceRef: "N Engl J Med 2024;390:900-910",
      },
      {
        dateOrPeriod: "August 2024",
        event: "EPA & WHO Toxicology Consensus Meeting",
        significance: "Joint committee established standard sampling protocols to eliminate laboratory environmental plastic contamination from test blanks.",
        sourceRef: "World Health Organization Environmental Health Circular 112",
      },
      {
        dateOrPeriod: "Early 2025",
        event: "Mechanistic In Vitro Vascular Studies",
        significance: "Researchers demonstrated nanoplastics promote inflammatory cytokines (IL-6, TNF-alpha) in endothelial cell cultures.",
        sourceRef: "Environmental Health Perspectives Journal",
      },
    ],
    keyEntities: [
      {
        name: "Polyethylene & Polyvinyl Chloride Particles",
        role: "Primary Contaminant",
        affiliation: "Single-Use Packaging & Industrial Effluent",
        impact: "High",
      },
      {
        name: "Carotid Endarterectomy Patient Cohort",
        role: "Clinical Study Group",
        affiliation: "University of Campania Luigi Vanvitelli",
        impact: "Moderate",
      },
      {
        name: "Food and Drug Administration (FDA)",
        role: "Food Contact Assessment",
        affiliation: "US Public Health Agency",
        impact: "Moderate",
      },
    ],
    counterNarrativeMatrix: [
      {
        viralHypothesis: "Drinking bottled water will guarantee severe arterial blockage within 12 months.",
        verifiedReality: "The study showed an observational correlation in patients who already had advanced carotid artery disease; causality and dosage thresholds are not yet established.",
        consensusVerdict: "Exaggerated: Correlation observed in high-risk patients, not proven instantaneous causation.",
      },
      {
        viralHypothesis: "Microplastics in blood are completely harmless and pass through without biological interaction.",
        verifiedReality: "Pyrolysis-GC/MS and electron microscopy confirm particle internalization and localized macrophage activation.",
        consensusVerdict: "False: Biological inflammatory markers are definitively elevated.",
      },
    ],
    concludingAssessment:
      "Microplastic accumulation in human vascular tissue is a scientifically proven phenomenon with significant prognostic correlation, requiring standardized environmental mitigation without panic-driven unscientific detox fads.",
    methodologyNotes:
      "Meta-analysis of peer-reviewed clinical data from NEJM, The Lancet Planetary Health, and toxicology protocols from the National Institute of Environmental Health Sciences.",
    citations: [
      {
        title: "Microplastics and Nanoplastics in Atheromas and Cardiovascular Events",
        source: "New England Journal of Medicine",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822",
        snippet: "Prospective study measuring polyethylene and PVC in surgical carotid plaque specimens.",
      },
      {
        title: "Microplastics in Drinking-Water: Global Assessment",
        source: "World Health Organization (WHO)",
        url: "https://www.who.int",
        snippet: "Human exposure pathways and toxicology consensus framework.",
      },
    ],
    tags: ["Medicine", "Microplastics", "Cardiology", "Environment", "Health"],
  },
  {
    id: "dossier-15-minute-cities",
    topic: "The '15-Minute City' Urban Planning Model: Urban Design vs Climate Lockdown Conspiracies",
    depth: "Investigative",
    generatedAt: "2025-05-18T14:45:00Z",
    executiveHypothesis:
      "The '15-minute city' is a decentralized urban planning concept ensuring daily amenities are within a 15-minute walk or bike ride; viral conspiracy claims that it enforces internal travel checkpoints and climate lockdowns are completely false.",
    truthPlausibilityScore: 98,
    plausibilityRationale:
      "Authored by urbanist Carlos Moreno in 2016 and implemented in Paris, Oxford, and Melbourne, the concept aims to reduce traffic congestion and carbon emissions. Zero municipal legislations restrict citizen movement.",
    timeline: [
      {
        dateOrPeriod: "2016 - 2020",
        event: "Carlos Moreno Proposes the 15-Minute City",
        significance: "Paris Mayor Anne Hidalgo adopts the framework for municipal zoning to decentralize essential services.",
        sourceRef: "Sorbonne University Urban Planning Review",
      },
      {
        dateOrPeriod: "Late 2022",
        event: "Oxford Low-Traffic Neighborhood (LTN) Trial",
        significance: "Oxford County Council introduced traffic filters for private cars on six arterial roads. Misrepresented on social media as 'zonal containment zones'.",
        sourceRef: "Oxfordshire County Council Statement",
      },
      {
        dateOrPeriod: "2023 - 2025",
        event: "Global Viral Weaponization of the Concept",
        significance: "Coordinated online narratives merged the urbanist proposal with QAnon and anti-vaccine conspiracy networks, claiming a 'WEF digital prison plan'.",
        sourceRef: "Institute for Strategic Dialogue (ISD) Report",
      },
    ],
    keyEntities: [
      {
        name: "Carlos Moreno & C40 Cities Network",
        role: "Originators",
        affiliation: "International Urban Planning Consortium",
        impact: "High",
      },
      {
        name: "Disinformation Multiplier Networks",
        role: "Conspiracy Amplifiers",
        affiliation: "Alternative Digital Media & Astroturf Groups",
        impact: "High",
      },
    ],
    counterNarrativeMatrix: [
      {
        viralHypothesis: "Citizens will be fined or arrested if they leave their 15-minute geographic zone more than 100 times per year.",
        verifiedReality: "Oxford and other cities created traffic management permits for specific congested roads. Pedestrians, cyclists, public transit, and unrestricted alternate driving routes remain entirely free.",
        consensusVerdict: "Categorically False: Conflates private car bypass routes with personal physical containment.",
      },
    ],
    concludingAssessment:
      "The 15-minute city is an urban accessibility blueprint that has been distorted into a global conspiratorial trope through astroturfed fear of institutional control.",
    methodologyNotes:
      "Cross-referenced municipal statutory codes, transport authority records, and narrative network analysis from the Institute for Strategic Dialogue.",
    citations: [
      {
        title: "The 15-Minute City: For a Sustainable Urban Mobility",
        source: "Smart Cities Journal / MDPI",
        url: "https://www.mdpi.com",
        snippet: "Decentralized socio-ecological urban proximity framework.",
      },
      {
        title: "Disinformation Threat Brief: Weaponizing Urban Planning in Oxford",
        source: "Institute for Strategic Dialogue (ISD)",
        url: "https://www.isdglobal.org",
        snippet: "Investigation of bot network coordination surrounding low-traffic neighborhood protests.",
      },
    ],
    tags: ["Urbanism", "Conspiracies", "Misinformation", "Transport", "Policy"],
  },
];
