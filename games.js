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
  }
];
