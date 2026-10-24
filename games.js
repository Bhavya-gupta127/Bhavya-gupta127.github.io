/**
 * PARTYNIGHTS.ONLINE — OFFICIAL GAMES REGISTRY
 * --------------------------------------------
 * How games appear on PartyNights.online:
 * 1. Automatic GitHub Repo Discovery:
 *    Any public GitHub repo under `Bhavya-gupta127` tagged with topic `party-game` (or `partynights`)
 *    and with GitHub Pages enabled automatically appears on the homepage and routes to `/<repo-name>/`!
 * 2.Pinned / Private Repo Games (like `mr-alien`):
 *    Listed below in `window.PARTY_GAMES`.
 */
window.GITHUB_OWNER = "Bhavya-gupta127";

window.PARTY_GAMES = [
  {
    id: "mr-alien",
    repo: "Bhavya-gupta127/mr-alien",
    title: "Mr. Alien",
    emoji: "👽",
    icon: "/mr-alien/icon-192.png",
    players: "3–20 Players",
    category: "Desi Social Deduction",
    badge: "500+ Desi Words",
    description: "Someone in the room is not Human! Pass one phone, give 1-word clues across Food, Bollywood, Cricket & Desi Life, and expose Mr. Alien.",
    url: "/mr-alien/"
  }
];
