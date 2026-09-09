import { Publication } from "../types";

export const CURATED_PUBLICATIONS: Publication[] = [
  {
    id: "pub-2025-01",
    title: "Algorithmic Infiltration: Measuring Synthetic Video Velocity Across Encrypted Chat Networks",
    subtitle: "A Multi-Platform Evidentiary Audit of Deepfake Propagation During Electoral Cycles",
    authors: [
      {
        name: "Dr. Elena Rostova",
        title: "Lead Digital Forensic Fellow",
        affiliation: "FactLive Investigative Lab & Stanford Cyber Policy Center",
      },
      {
        name: "Marcus Vance, M.S.",
        title: "Senior OSINT Analyst",
        affiliation: "Global Fact-Checking Network (IFCN)",
      },
    ],
    publishedDate: "2025-04-12",
    doi: "10.1016/j.factlive.2025.04.01",
    category: "AI & Synthetic Media",
    peerReviewStatus: "Peer-Reviewed",
    abstract:
      "This study assesses the propagation latency and perceptual credibility of AI-synthesized audiovisual media across 120,000 public and invite-only messaging groups in North America and Europe. Utilizing automated perceptual hash matching and acoustic spectral distortion tracking, we quantify how quickly synthetic rumors jump from fringe forums into mainstream television broadcasts.",
    keyTakeaways: [
      "AI audio deepfakes traverse encrypted networks 3.4x faster than text-based misinformation due to sensory authenticity bias.",
      "The 'Liar's Dividend' defense was invoked by public figures in 41% of authentic scandals during the 2024-2025 audit window.",
      "Cryptographic provenance watermarking (C2PA) reduced unverified viral attribution by 68% among media outlets that implemented automated validation headers.",
    ],
    contentSections: [
      {
        heading: "1. Introduction & Theoretical Framework",
        text: "The proliferation of diffusion-based neural audio synthesis models has collapsed the technical and economic barriers to generating human-indistinguishable vocal recordings. Where traditional misinformation relied on linguistic persuasion, synthetic audio exploits immediate psychoacoustic trust.",
        callout: "Sensory credibility bias causes listeners to believe voice recordings 2.8 times more readily than transcribed text quotes.",
        dataPoints: [
          { label: "Sample Size", value: "120,000 Channels" },
          { label: "Average Velocity", value: "14.2 min to viral spike" },
          { label: "Detection Accuracy", value: "96.4% F1 Score" },
        ],
      },
      {
        heading: "2. Spectrogram Inversion & Acoustic Forensic Findings",
        text: "By examining high-frequency phase inconsistencies in compressed audio files, we identified signature phase cancellation artifacts characteristic of vocoders (e.g., HiFi-GAN, BigVGAN) across 88% of verified deepfake audio samples.",
      },
      {
        heading: "3. Policy Recommendations & Verification Protocols",
        text: "We propose a mandatory three-tiered verification standard for wire agencies: (1) Spectral vocoder anomaly screening, (2) Temporal metadata provenance verification, and (3) Corroborative on-the-ground primary source verification.",
      },
    ],
    citations: [
      "Rostova, E., & Vance, M. (2025). Synthetic Video Velocity in P2P Channels. Journal of Information Integrity, 14(2), 112-135.",
      "Stanford Cyber Policy Center. (2024). Acoustic Deepfakes in the Democratic Process. Policy Brief Series No. 8.",
      "Content Authenticity Initiative. (2024). C2PA Implementation Standard v2.1.",
    ],
    tags: ["Deepfakes", "Acoustics", "Elections", "Forensics", "PeerReviewed"],
    readTimeMinutes: 14,
  },
  {
    id: "pub-2025-02",
    title: "The Anatomy of Health Pseudoscience: Mapping Monetized Miracle Cures on Short-Form Video Algorithms",
    subtitle: "How Algorithmic Engagement Incentives Systematically Amplify Autoimmune Misinformation",
    authors: [
      {
        name: "Dr. Sarah Al-Mansoor, MD, PhD",
        title: "Associate Professor of Clinical Epidemiology",
        affiliation: "FactLive Health Integrity Taskforce & Johns Hopkins Bloomberg",
      },
    ],
    publishedDate: "2025-03-28",
    doi: "10.1016/j.factlive.2025.03.02",
    category: "Health & Medicine",
    peerReviewStatus: "Peer-Reviewed",
    abstract:
      "A systematic evaluation of 5,000 top-performing health advice videos across viral short-form video algorithms. We categorised claims into evidence-based, unsupported, and directly harmful. Results demonstrate that claims promising instant detoxes or curing incurable chronic illnesses received 7.2x higher algorithmic engagement than accredited hospital guidance.",
    keyTakeaways: [
      "Over 62% of viral health videos promoting dietary cures failed to disclose financial affiliate links or supplement store sponsorships.",
      "Claims targeting autoimmune conditions (rheumatoid arthritis, lupus, Hashimoto's) exhibited the highest rate of harmful medical recommendations.",
      "Algorithmic recommender engines rewarded negative emotional framing ('what doctors won't tell you') with 4.1x greater distribution velocity.",
    ],
    contentSections: [
      {
        heading: "1. Background & Clinical Risk Landscape",
        text: "Patients suffering from chronic autoimmune conditions frequently experience diagnostic delay and symptom fatigue, rendering them susceptible to predatory pseudo-medical claims that promise rapid non-pharmacological cures.",
        callout: "Delaying standard-of-care DMARD therapy in rheumatoid arthritis by >6 months increases permanent radiographic joint erosion by 340%.",
        dataPoints: [
          { label: "Videos Analyzed", value: "5,000 Videos" },
          { label: "Misleading Ratio", value: "68.4% of total sample" },
          { label: "Affiliate Link Concealment", value: "62.1%" },
        ],
      },
      {
        heading: "2. Classification of Pseudoscientific Tropes",
        text: "We identified four dominant rhetorical mechanisms: (1) The 'Secret Cure' suppressed by medical cartels, (2) The Fallacy of Universal Heavy Metal Toxicity, (3) Misappropriation of epigenetic terminology, and (4) Pure anecdotal testimonial authority.",
      },
      {
        heading: "3. Conclusions & Clinical Intervention Guidance",
        text: "Clinicians must proactively address viral misinformation in clinical consultations through empathetic motivational interviewing rather than dismissive rebuttal.",
      },
    ],
    citations: [
      "Al-Mansoor, S. (2025). Short-Form Video Algorithms and Health Misinformation. Lancet Digital Health, 7(4), e204-e218.",
      "American College of Rheumatology. (2024). Clinical Practice Guidelines for Autoimmune Disease Management.",
      "Mayo Clinic Proceedings. (2023). Dietary Supplements and Autoimmune Disease: An Evidence Review.",
    ],
    tags: ["Health", "Epidemiology", "Medicine", "Algorithms", "Nutrition"],
    readTimeMinutes: 18,
  },
  {
    id: "pub-2025-03",
    title: "Post-Quantum Cryptography and the 'Q-Day' Disinformation Spectrum",
    subtitle: "Separating Concrete NIST Standards from Commercial Apocalypse Hype",
    authors: [
      {
        name: "Prof. Kenneth Sterling",
        title: "Director of Cryptographic Research",
        affiliation: "FactLive Tech Security Group & MIT CSAIL",
      },
    ],
    publishedDate: "2025-02-15",
    doi: "10.1016/j.factlive.2025.02.03",
    category: "Science & Space",
    peerReviewStatus: "IFCN Certified",
    abstract:
      "A technical monograph examining the prevalent narrative that quantum computing will render all global financial encryption obsolete in 2025. We review the timeline of logical qubit error mitigation, NIST's finalized post-quantum standards (ML-KEM, ML-DSA, SLH-DSA), and quantify the actual threat horizon for public-key infrastructure.",
    keyTakeaways: [
      "Current noisy intermediate-scale quantum (NISQ) devices remain 4 to 6 orders of magnitude away from running Shor's algorithm on RSA-2048 keys.",
      "NIST's finalized post-quantum cryptographic standards provide mathematically robust quantum-resistant replacements available today.",
      "The genuine immediate threat is 'Harvest Now, Decrypt Later' (HNDL) for long-lived state secrets, not consumer banking collapse.",
    ],
    contentSections: [
      {
        heading: "1. The Quantum Computing Reality vs Hype",
        text: "Sensationalist media regularly confuses physical qubits with fault-tolerant logical qubits. Breaking RSA-2048 requires roughly 20 million physical qubits with surface-code error correction, whereas state-of-the-art processors operate with ~1,000 physical qubits.",
        callout: "NIST's FIPS 203, 204, and 205 standards establish lattice-based cryptography that resists both classical and quantum cryptanalysis.",
        dataPoints: [
          { label: "Qubits Needed for RSA", value: "~20 Million Physical" },
          { label: "Current Record", value: "~1,180 Physical" },
          { label: "PQC Migration Window", value: "2024 - 2030" },
        ],
      },
    ],
    citations: [
      "Sterling, K. (2025). Quantum Fact-Check: Error Correction Thresholds and Shor's Algorithm. IEEE Security & Privacy, 23(1), 45-56.",
      "NIST. (2024). Post-Quantum Cryptography Standardization: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA).",
    ],
    tags: ["Cryptography", "Quantum", "Cybersecurity", "NIST", "Tech"],
    readTimeMinutes: 12,
  },
];
