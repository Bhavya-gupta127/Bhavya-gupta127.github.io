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
    subtitle: "The Desi Undercover Impostor Game",
    emoji: "👽",
    icon: "/mr-alien/icon-192.png",
    banner: "/mr-alien/og-banner.png",
    players: "3–20 Players",
    minPlayers: 3,
    maxPlayers: 20,
    duration: "5–15 Mins",
    deviceMode: "Pass 1 Phone",
    category: "Social Deduction",
    tags: ["500+ Desi Words", "Bollywood & Cricket", "Food & Chai", "Offline PWA"],
    badge: "🔥 Featured Hit",
    featured: true,
    description: "Someone in the room is not Human! Pass one phone around the group, give clever 1-word clues across Desi Food, Bollywood, Cricket & Festivals, and vote out Mr. Alien before they blend in.",
    url: "/mr-alien/"
  },
  {
    id: "secret-dictator",
    repo: "Bhavya-gupta127/secret-dictator",
    title: "Secret Dictator",
    subtitle: "The Shadow Regime Board Game for Phones",
    emoji: "👑",
    icon: "/secret-dictator/icon-192.png",
    banner: "/secret-dictator/og-banner.png",
    players: "5–10 Players",
    minPlayers: 5,
    maxPlayers: 10,
    duration: "15–30 Mins",
    deviceMode: "Room Code or Pass 1 Phone",
    category: "Social Deduction",
    tags: ["Multi-Phone Room Code", "Pass 1 Phone", "Executive Powers", "Smart AI Bots"],
    badge: "👑 Board Classic",
    featured: true,
    description: "Inspired by the legendary 5–10 player hidden-identity board game! Join on your own phones via Room Code (or Pass 1 Phone), elect a President & Chancellor, enact Freedom Bills, and expose the Secret Dictator before the Syndicate seizes power.",
    url: "/secret-dictator/"
  }
];

