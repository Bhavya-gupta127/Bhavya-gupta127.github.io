/**
 * PARTYNIGHTS.ONLINE — OFFICIAL GAMES REGISTRY
 * --------------------------------------------
 * How games appear on PartyNights.online:
 * 1. Automatic GitHub Repo Discovery:
 *    Any public GitHub repo under `Bhavya-gupta127` tagged with topic `party-game` (or `partynights`)
 *    and with GitHub Pages enabled automatically appears on the homepage and routes to `/<repo-name>/`!
 * 2. Pinned / Private Repo Games (like `mr-alien`):
 *    Listed below in `window.PARTY_GAMES`.
 */
window.GITHUB_OWNER = "Bhavya-gupta127";

window.PARTY_GAMES = [
  {
    id: "mr-alien",
    repo: "Bhavya-gupta127/mr-alien",
    title: "Mr. Alien",
    hook: "Expose the Hidden Impostor",
    subtitle: "The Desi Undercover Impostor Game",
    emoji: "👽",
    icon: "./mr-alien/icon-192.png",
    banner: "./mr-alien/og-banner.png",
    players: "3–20 Players",
    minPlayers: 3,
    maxPlayers: 20,
    duration: "5–15 Mins",
    deviceMode: "Pass 1 Phone, Multi-Phone or 📺 TV Board",
    category: "Social Deduction",
    tags: ["TV / Laptop Board", "Multi-Phone Room Code", "Pass 1 Phone", "740+ Global & Desi Words"],
    badge: "🔥 Featured Hit",
    featured: true,
    description: "Someone in the room is not Human! Join on your own phones via Online Room Code, Pass 1 Phone, or project the Area-51 Command Board on a TV/Laptop while everyone gives 1-word clues and votes.",
    url: "/mr-alien/"
  },
  {
    id: "secret-dictator",
    repo: "Bhavya-gupta127/secret-dictator",
    title: "Secret Dictator",
    hook: "Pass Laws or Seize Power",
    subtitle: "The Shadow Regime Board Game for Phones",
    emoji: "👑",
    icon: "./secret-dictator/icon-192.png",
    banner: "./secret-dictator/og-banner.png",
    players: "5–10 Players",
    minPlayers: 5,
    maxPlayers: 10,
    duration: "15–30 Mins",
    deviceMode: "Pass 1 Phone, Multi-Phone or 📺 TV Board",
    category: "Social Deduction",
    tags: ["TV / Laptop Board", "Multi-Phone Room Code", "Pass 1 Phone", "Executive Powers", "Smart AI Bots"],
    badge: "👑 Board Classic",
    featured: true,
    description: "Inspired by the legendary 5–10 player hidden-identity board game! Display the Shared Parliament Board on a Laptop/TV or play via Room Code & Pass 1 Phone to enact Freedom Bills and stop the Secret Dictator.",
    url: "/secret-dictator/"
  },
  {
    id: "wavelength",
    repo: "Bhavya-gupta127/wavelength",
    title: "Wavelength (Mind Sync)",
    hook: "Dial In Your Squad's Mind",
    subtitle: "The Telepathic Spectrum Dial Party Game",
    emoji: "🧠",
    icon: "./wavelength/icon-192.png",
    banner: "./wavelength/og-banner.png",
    players: "2–20 Players",
    minPlayers: 2,
    maxPlayers: 20,
    duration: "5–15 Mins",
    deviceMode: "Pass 1 Phone, Multi-Phone or 📺 TV Board",
    category: "Mind Sync & Debate",
    tags: ["TV / Laptop Board", "Multi-Phone Room Code", "Pass 1 Phone", "180° Touch Dial", "235+ Desi & Global Cards"],
    badge: "🧠 Viral Party Hit",
    featured: true,
    description: "One player sees a hidden bullseye on a 180° slider between two extremes and gives a 1-word clue. Pass 1 Phone, join via Room Code, or project the Giant Neon Dial onto a Laptop/TV!",
    url: "/wavelength/"
  },
  {
    id: "paranoia",
    repo: "Bhavya-gupta127/paranoia",
    title: "Paranoia: Exposed",
    hook: "Whisper, Flip & Expose Friends",
    subtitle: "Whisper, 3D Coin Flip & Most Likely To Poll",
    emoji: "🪙",
    icon: "./paranoia/icon-192.png",
    banner: "./paranoia/og-banner.png",
    players: "3–20 Players",
    minPlayers: 3,
    maxPlayers: 20,
    duration: "5–15 Mins",
    deviceMode: "Pass 1 Phone, Multi-Phone or 📺 TV Board",
    category: "Mind Sync & Debate",
    tags: ["TV / Laptop Board", "Multi-Phone Room Code", "Pass 1 Phone", "3D Coin of Fate", "Most Likely To Poll"],
    badge: "🪙 #1 Gen-Z Trend",
    featured: true,
    description: "Whisper a spicy 'Who in this room...' question, name someone OUT LOUD, and flip the 3D Coin of Fate on a phone or Common TV/Laptop Stage: HEADS exposes the secret question, TAILS locks it forever!",
    url: "/paranoia/"
  },
  {
    id: "charades-rush",
    repo: "Bhavya-gupta127/charades-rush",
    title: "Charades Rush",
    hook: "Forehead Tilt & Dumb Charades",
    subtitle: "100% Family-Friendly Forehead & Party Dumb Charades",
    emoji: "🎭",
    icon: "./charades-rush/icon-192.png",
    banner: "./charades-rush/og-banner.png",
    players: "2–20 Players",
    minPlayers: 2,
    maxPlayers: 20,
    duration: "5–15 Mins",
    deviceMode: "Pass 1 Phone, Forehead Tilt or Team Duel",
    category: "Family & Action",
    tags: ["Forehead Gyro Tilt", "100% Family Friendly", "360+ Cards", "Bollywood & Animals", "Team Duel"],
    badge: "🎭 All-Ages Hit",
    featured: true,
    description: "Hold phone on your forehead and tilt down to score, or act out movies and animals silently! Fast-paced 60s rounds, 100% kid & parent-friendly with zero downloads.",
    url: "/charades-rush/"
  },
  {
    id: "fact-or-cap",
    repo: "Bhavya-gupta127/fact-or-cap",
    title: "Fact or Cap",
    hook: "Bluff Your Squad with Crazy Lies",
    subtitle: "Bizarre Real Facts & Bluff Trivia",
    emoji: "🧢",
    icon: "./fact-or-cap/icon-192.png",
    banner: "./fact-or-cap/og-banner.png",
    players: "2–20 Players",
    minPlayers: 2,
    maxPlayers: 20,
    duration: "8–15 Mins",
    deviceMode: "Pass 1 Phone, Multi-Phone or 📺 TV Board",
    category: "Bluffing & Trivia",
    tags: ["TV / Laptop Board", "Multi-Phone Room Code", "Pass 1 Phone", "113 Curated Facts", "Genius Bonus"],
    badge: "🧢 #1 Viral Bluff",
    featured: true,
    description: "Write believable fake answers to bizarre real-world stories and fool your friends! Sniff out the actual Fact, collect big points when opponents fall for your Cap, and watch dramatic receipt reveals on a TV or phone.",
    url: "/fact-or-cap/"
  }
];



