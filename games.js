/**
 * PARTY NIGHT GAMES REGISTRY
 * --------------------------
 * To add a new game to Party Night:
 * 1. Add an object to the ` GAMES ` array below.
 * 2. Either link to an external/internal HTML file via `url: "/games/my-game.html"`
 *    OR provide built-in deck prompts in `prompts: [...]`.
 */
window.PARTY_GAMES = [
  {
    id: "undercover",
    title: "Spy / Undercover",
    emoji: "🕵️",
    players: "3–12 Players",
    category: "Social Deduction",
    badge: "Popular",
    description: "Pass the phone! Everyone gets the same secret word except the Impostor, who gets a slightly different word.",
    type: "undercover",
    wordPairs: [
      ["Coffee", "Tea"],
      ["Netflix", "YouTube"],
      ["Pizza", "Burger"],
      ["Goa", "Manali"],
      ["Tinder", "Bumble"],
      ["IPL", "World Cup"],
      ["Batman", "Iron Man"],
      ["Beer", "Whiskey"]
    ]
  },
  {
    id: "most-likely",
    title: "Who's Most Likely To...",
    emoji: "👉",
    players: "3–20 Players",
    category: "Icebreaker",
    badge: "Party Classic",
    description: "Read the prompt aloud. On the count of 3, everyone points at the person most likely to do it!",
    type: "deck",
    prompts: [
      "Who is most likely to accidentally text their ex at 2 AM tonight?",
      "Who is most likely to become a billionaire purely by accident?",
      "Who is most likely to survive a zombie apocalypse first — and who gets eaten first?",
      "Who is most likely to ghost a group trip 2 hours before departure?",
      "Who is most likely to laugh during a dead-serious moment?",
      "Who is most likely to spend all their money on food delivery?",
      "Who is most likely to get arrested for something completely ridiculous?",
      "Who is most likely to marry a celebrity?"
    ]
  },
  {
    id: "charades",
    title: "60-Second Act It Out",
    emoji: "🎭",
    players: "2+ Teams",
    category: "Fast-Paced",
    badge: "Timed",
    description: "Hold the phone to your forehead or act it out without speaking before the 60-second timer runs out!",
    type: "charades",
    words: [
      "Auto Rickshaw Driver Arguing",
      "Taking a Selfie on a Rollercoaster",
      "Trying to Hold in a Sneeze",
      "Indian Wedding Uncle Dancing",
      "Walking on Hot Sand",
      "Making Maggi at 3 AM",
      "Parallel Parking Fails",
      "Cat Knocking Glass Off a Table",
      "Strict Gym Trainer",
      "Watching a Horror Movie Alone"
    ]
  },
  {
    id: "hot-takes",
    title: "Spicy Hot Takes",
    emoji: "🌶️",
    players: "2+ Players",
    category: "Debate",
    badge: "Spicy",
    description: "Agree or Disagree? Pull a card and defend your controversial opinion against the room.",
    type: "deck",
    prompts: [
      "Pineapple on pizza is actually elite.",
      "Texting back immediately is better than playing hard to get.",
      "Biryani without potato is incomplete.",
      "Most people pretend to like coffee just to look productive.",
      "A 4-person house party beats a loud club every single time.",
      "Skipping a song halfway through should be illegal at a party.",
      "Friends who don't split the bill evenly are annoying."
    ]
  }
];
