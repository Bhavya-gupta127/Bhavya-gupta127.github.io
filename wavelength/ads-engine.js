/**
 * PARTYNIGHTS.ONLINE — CFO MONETIZATION & GOOGLE H5 GAMES ADS ENGINE (v1.0)
 * =========================================================================
 * Publisher ID: ca-pub-5935694635631350
 *
 * Implements CFO Levers #1 & #3 (Strict Zero-Gameplay-Interruption Policy):
 * 1. Google H5 Games Ad Placement API (`adConfig` + `adBreak`):
 *    - Rewarded Video Unlocker (`type: "reward"`): Unlocks the +100 Card VIP
 *      After-Hours & Chaos Expansion Pack across all 4 games (`Mr. Alien`,
 *      `Wavelength`, `Paranoia: Exposed`, `Secret Dictator`) for 24 hours.
 *    - Includes an 8-second Sponsor Break + 1-Tap WhatsApp Viral Unlock fallback
 *      whenever Google H5 video inventory is unfilled or ad-blocked.
 *    - Every-3rd-Game-Over Rematch Break (`type: "next"`): Triggers a clean
 *      between-match break only on every 3rd Game Over rematch click.
 * 2. Compact Sticky `320x50` High-Viewability Anchor Banner (`#pn-sticky-anchor-ad`):
 *    - Shown ONLY on Waiting Lobbies, Game Over screens, and the Arcade Hub.
 *    - Strictly hidden during active gameplay and on TV/Projector Boards.
 *    - Out-of-flow (`position: fixed`) and auto-collapsed (`display: none`)
 *      until AdSense fills (`ins[data-ad-status="filled"]`), guaranteeing
 *      0px mobile `scrollHeight` impact and zero blank boxes.
 */
(function () {
  "use strict";

  var PUB_ID = "ca-pub-5935694635631350";
  var VIP_STORAGE_KEY = "pn_vip_afterhours_unlock_until_v1";
  var MATCH_COUNT_KEY = "pn_completed_matches_session_v1";
  var MR_ALIEN_CUSTOM_KEY = "mr_alien_custom_word_pool_v1";

  // =========================================================================
  // 1. GOOGLE H5 GAMES AD PLACEMENT API SHIM (`adConfig` & `adBreak`)
  // =========================================================================
  window.adsbygoogle = window.adsbygoogle || [];
  var hasNativeH5AdBreak = typeof window.adBreak === "function";
  if (!hasNativeH5AdBreak) {
    window.adBreak = function (o) {
      if (o && typeof o.adBreakDone === "function") {
        try {
          o.adBreakDone({ breakStatus: "notReady" });
        } catch (_) {}
      }
    };
  }
  if (typeof window.adConfig !== "function") {
    window.adConfig = function () {};
  }

  if (hasNativeH5AdBreak) {
    try {
      window.adConfig({
        preloadAdBreaks: "on",
        sound: "on"
      });
    } catch (_) {}
  }

  // =========================================================================
  // 2. +100 VIP AFTER-HOURS & CHAOS EXPANSION VAULT (ALL 4 GAMES)
  // =========================================================================
  var VIP_MR_ALIEN_WORDS = [
    { word: "Drunk Text", hint: "2 AM", reason: "Usually sent at 2 AM and regretted the next morning.", category: "desilife" },
    { word: "Situationship", hint: "No Label", reason: "More than talking, less than official—zero labels attached.", category: "desilife" },
    { word: "Fake ID", hint: "21", reason: "Used at the club door to look older than your real birth year.", category: "places" },
    { word: "Walk of Shame", hint: "Last Night's Fit", reason: "Heading home at 8 AM still wearing last night's party outfit.", category: "desilife" },
    { word: "Finsta", hint: "Close Friends", reason: "A secret second Instagram account locked to only trusted friends.", category: "places" },
    { word: "Ghosting", hint: "Seen", reason: "Vanishing from a chat without a single reply after leaving them on seen.", category: "desilife" },
    { word: "Hangover", hint: "Lemon Water", reason: "Waking up with a pounding head craving nimbu pani and dark curtains.", category: "food" },
    { word: "Red Flag", hint: "Siren", reason: "A warning sign in someone's personality you pretend not to see.", category: "desilife" },
    { word: "Bouncer", hint: "Velvet Rope", reason: "Stands with crossed arms guarding the club VIP entry list.", category: "places" },
    { word: "Truth or Dare", hint: "Empty Bottle", reason: "Played in a circle by spinning a bottle on the floor.", category: "festivals" },
    { word: "Speed Dating", hint: "Bell", reason: "You switch tables every five minutes when the timer bell rings.", category: "festivals" },
    { word: "Hickey", hint: "Collar", reason: "Forces you to wear a high collar or scarf in summer.", category: "desilife" },
    { word: "Tequila Shot", hint: "Wedge", reason: "Followed immediately by a pinch of salt and a bite of lime wedge.", category: "food" },
    { word: "Vegas Wedding", hint: "Elvis", reason: "Happens at a 24-hour neon chapel with an impersonator officiating.", category: "festivals" },
    { word: "Sugar Daddy", hint: "Allowance", reason: "Spoils someone half their age with designer bags and trips.", category: "desilife" },
    { word: "Stalker", hint: "2018 Post", reason: "Accidentally double-taps a photo from 6 years ago at 3 AM.", category: "desilife" },
    { word: "Bachelor Party", hint: "Last Night", reason: "Celebrated as the groom's final wild night before the wedding.", category: "festivals" },
    { word: "Ex-Partner", hint: "Blocked", reason: "Lives permanently in your blocked list until a festival text.", category: "desilife" },
    { word: "Blind Date", hint: "Red Rose", reason: "Meeting a stranger set up by a mutual friend for the first time.", category: "festivals" },
    { word: "Club VIP Table", hint: "Sparklers", reason: "Waiters parade out holding flaming bottle sparklers.", category: "places" },
    { word: "Lie Detector", hint: "Pulse", reason: "Measures your heart rate and sweat when you try to bluff.", category: "places" },
    { word: "Secret Crush", hint: "Eye Contact", reason: "You look away the exact millisecond they look back at you.", category: "desilife" },
    { word: " Wingman", hint: "Distraction", reason: "Takes one for the team to keep the strict friend busy.", category: "desilife" },
    { word: "Afterparty", hint: "4 AM", reason: "Starts in someone's living room after the main venue shuts down.", category: "festivals" },
    { word: "Catfish", hint: "Filter", reason: "Uses someone else's photos or heavy edits on dating apps.", category: "places" },
    { word: "Long Distance", hint: "Time Zones", reason: "Dating through FaceTime calls across two different cities.", category: "desilife" },
    { word: "Goa Shack", hint: "Plastic Chair", reason: "Feet in the sand with neon fairy lights and kingfisher bottles.", category: "places" },
    { word: "3 AM Maggi", hint: "Kettle", reason: "Cooked secretly in a hostel electric kettle after midnight.", category: "food" },
    { word: "Paparazzi", hint: "Airport Gate", reason: "Waiting outside arrivals with flash cameras for celebrity gym looks.", category: "bollywood" },
    { word: "Bigg Boss", hint: "Voice", reason: "A booming invisible voice commands everyone in the locked house.", category: "bollywood" },
    { word: "IPL Auction", hint: "Paddle", reason: "Franchise owners raise a table paddle to bid crores in seconds.", category: "cricket" },
    { word: "Super Over", hint: "Six Balls", reason: "Decides a tied match in just 6 balls per team.", category: "cricket" },
    { word: "Item Song", hint: "Hook Step", reason: "A high-energy Bollywood dance number Everyone copies at weddings.", category: "bollywood" },
    { word: "Nepotism", hint: "Surname", reason: "Landing a debut movie launch purely because of a famous family name.", category: "bollywood" }
  ];

  var VIP_WAVELENGTH_SPECTRUMS = [
    { left: "Green Flag in a Partner", right: "Run Immediately Red Flag", category: "Desi Chaos", sparks: ["Remembers Your Coffee Order", "Still Besties With Their Ex", "Has 4 Secret Instagram Accounts"] },
    { left: "Text You Send Sober", right: "Text You Send at 2:30 AM", category: "Desi Chaos", sparks: ["'Reached Home Safely'", "'You Up?'", "'I Still Think About Goa 2022'"] },
    { left: "Innocent Compliment", right: "Unhinged Chaotic Flirting", category: "Desi Chaos", sparks: ["'Nice Shoes!'", "'You Look Trouble'", "'Our Kids Would Have Great Hair'"] },
    { left: "Normal Excuse to Skip Plans", right: "Oscar-Worthy Lie", category: "Desi Chaos", sparks: ["'Stuck in Traffic'", "'My Dog Ate My Car Keys'", "'Flew to Dubai for an Emergency'"] },
    { left: "Mildly Embarrassing Moment", right: "Flee the Country & Change Name", category: "Desi Chaos", sparks: ["Waving Back at Wrong Person", "Calling Boss 'Mummy'", "Liking Crush's 2016 Bikini Pic"] },
    { left: "Chill House Party", right: "Cops Called at 3 AM", category: "Desi Chaos", sparks: ["Board Games & Pizza", "Balcony Speaker Full Bass", "Project X on the Terrace"] },
    { left: "First Date Question", right: "3rd Drink Overshare", category: "Desi Chaos", sparks: ["'What Music Do You Like?'", "'Why Did Your Last Relationship End?'", "'Here Is My Childhood Trauma'"] },
    { left: "Secret You Tell Everyone", right: "Taking It to the Grave", category: "Desi Chaos", sparks: ["Celebrity Crush", "Fake Sick Leave", "Who Actually Broke the Hostel Window"] },
    { left: "Harmless White Lie", right: "Full Double Life", category: "Desi Chaos", sparks: ["'On My Way! (In Towel)'", "'Group Study at Rahul's'", "Secret Apartment in Another City"] },
    { left: "Cute Quirky Habit", right: "Serial Killer Energy", category: "Desi Chaos", sparks: ["Singing in the Shower", "Pouring Milk Before Cereal", "Biting Into a Whole KitKat Sideways"] },
    { left: "Low-Key Flex", right: "Obnoxious Show-Off", category: "Desi Chaos", sparks: ["Airport Lounge Coffee Story", "Leaving Car Keys on Table", "Reading Price Tags Out Loud"] },
    { left: "Valid Breakup Reason", right: "Pettiest Breakup Ever", category: "Desi Chaos", sparks: ["Cheating", "Bad Music Taste", "They Clapped When the Plane Landed"] },
    { left: "Parent-Approved Outfit", right: "Sneaking Out in a Hoodie Over It", category: "Desi Chaos", sparks: ["Full-Sleeve Kurta", "Ripped Jeans", "Club Backless Fit"] },
    { left: "Friend Zone Forever", right: "Secretly Married in 5 Years", category: "Desi Chaos", sparks: ["Calls You 'Bro/Bhai'", "Shares Netflix Password", "2 AM Rooftop Deep Talks"] },
    { left: "Broke End-of-Month Meal", right: "Salary Day Treat", category: "Desi Chaos", sparks: ["₹14 Maggi Packet", "Zomato Gold Biryani", "₹4,000 Rooftop Cocktails"] },
    { left: "Acceptable Stalking", right: "FBI Cyber Crime Unit", category: "Desi Chaos", sparks: ["Checking LinkedIn Before Date", "Finding Their Ex's Tagged Photos", "Checking Their Venmo/GPay History"] }
  ];

  var VIP_PARANOIA_QUESTIONS = [
    { id: "vip01", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who in this room is most likely to send a risky 'you up?' text before tonight ends?" },
    { id: "vip02", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who here has the most chaotic dating history that they still haven't fully confessed to the squad?" },
    { id: "vip03", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who in this room is most likely to secretly hook up with someone in the friend group and keep it hidden for months?" },
    { id: "vip04", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who here gives the biggest 'I can fix them' energy when picking toxic partners?" },
    { id: "vip05", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who in this room would fold the fastest if their ex texted 'I miss you' right now?" },
    { id: "vip06", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who here is the biggest smooth-talker when they're trying to flirt at a party?" },
    { id: "vip07", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who in this room has had a low-key crush on someone sitting here right now?" },
    { id: "vip08", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who here is most likely to wake up tomorrow morning and immediately delete their Instagram stories?" },
    { id: "vip09", category: "party", tag: "🔥 VIP After-Hours", q: "Who in this room is most likely to disappear for 2 hours at a club and return with a wild story?" },
    { id: "vip10", category: "party", tag: "🔥 VIP After-Hours", q: "Who here would be the absolute worst person to share a hotel room with on a Goa trip?" },
    { id: "vip11", category: "desi", tag: "🔥 VIP After-Hours", q: "Who in this room lies the most effortlessly when their parents call mid-party?" },
    { id: "vip12", category: "desi", tag: "🔥 VIP After-Hours", q: "Who here has a Screenshot Vault on their phone that could destroy half this group?" },
    { id: "vip13", category: "awkward", tag: "🔥 VIP After-Hours", q: "Who in this room is most likely to get caught stalking someone's profile from 2019?" },
    { id: "vip14", category: "awkward", tag: "🔥 VIP After-Hours", q: "Who here acts like the most innocent angel in public but is the biggest instigator in private?" },
    { id: "vip15", category: "spicy", tag: "🔥 VIP After-Hours", q: "Who in this room is most likely to elope in Vegas or Goa on a dare?" },
    { id: "vip16", category: "party", tag: "🔥 VIP After-Hours", q: "Who here is most likely to convince the whole squad to stay out until 5 AM on a work night?" }
  ];

  function isFamilyModeActive() {
    try {
      return localStorage.getItem("pn_family_mode_v1") === "1";
    } catch (_) {
      return false;
    }
  }

  function isVipUnlocked() {
    if (isFamilyModeActive()) return false;
    try {
      var until = parseInt(localStorage.getItem(VIP_STORAGE_KEY) || "0", 10);
      return until > Date.now();
    } catch (_) {
      return false;
    }
  }

  function applyVipPacksToActiveGame() {
    if (isFamilyModeActive()) return;
    if (!isVipUnlocked()) return;
    window.PN_VIP_UNLOCKED = true;

    // 1. Inject into Wavelength Vault if present
    try {
      if (Array.isArray(window.WAVELENGTH_VAULT) && !window.__PN_WAVELENGTH_VIP_INJECTED__) {
        window.__PN_WAVELENGTH_VIP_INJECTED__ = true;
        VIP_WAVELENGTH_SPECTRUMS.forEach(function (card) {
          window.WAVELENGTH_VAULT.push(card);
        });
      }
    } catch (_) {}

    // 2. Inject into Paranoia Vault if present
    try {
      if (Array.isArray(window.PARANOIA_VAULT) && !window.__PN_PARANOIA_VIP_INJECTED__) {
        window.__PN_PARANOIA_VIP_INJECTED__ = true;
        VIP_PARANOIA_QUESTIONS.forEach(function (q) {
          window.PARANOIA_VAULT.push(q);
        });
      }
    } catch (_) {}

    // 3. Inject into Mr. Alien custom word merge pool
    try {
      var existingRaw = localStorage.getItem(MR_ALIEN_CUSTOM_KEY);
      var shouldWrite = true;
      if (existingRaw) {
        var parsed = JSON.parse(existingRaw);
        if (parsed && parsed.mode === "replace") {
          shouldWrite = false; // preserve user's custom replace pack
        }
      }
      if (shouldWrite) {
        localStorage.setItem(
          MR_ALIEN_CUSTOM_KEY,
          JSON.stringify({
            mode: "merge",
            items: VIP_MR_ALIEN_WORDS
          })
        );
      }
    } catch (_) {}

    updateAllVipButtonsUI();
  }

  function grantVipUnlock24h(sourceLabel) {
    try {
      var expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(VIP_STORAGE_KEY, String(expiresAt));
    } catch (_) {}
    applyVipPacksToActiveGame();
    closeRewardedModal();
    showVipToast(
      sourceLabel || "🎉 VIP After-Hours Pack Unlocked for 24h! (+100 Bonus Cards Active)"
    );
  }

  // =========================================================================
  // 3. UI STYLES & NON-INTRUSIVE DOM INJECTION (ZERO MOBILE SCROLL IMPACT)
  // =========================================================================
  function injectStyles() {
    if (document.getElementById("pn-ads-engine-styles")) return;
    var style = document.createElement("style");
    style.id = "pn-ads-engine-styles";
    style.textContent = [
      /* Auto-collapse any legacy unfilled AdSense boxes so they never render 280px blank space */
      ".google-ad-slot:not(:has(ins[data-ad-status='filled'])),",
      ".ad-banner-slot:not(:has(ins[data-ad-status='filled'])),",
      ".ad-slot-wrapper:not(:has(ins[data-ad-status='filled'])),",
      "#ad-banner-container:not(:has(ins[data-ad-status='filled'])),",
      "#ad-container:not(:has(ins[data-ad-status='filled'])) {",
      "  display: none !important; height: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important;",
      "}",
      /* Lever 3: Compact Sticky 320x50 Anchor Dock (Only visible when filled & on Lobby/GameOver) */
      "#pn-sticky-anchor-ad {",
      "  position: fixed;",
      "  bottom: max(4px, env(safe-area-inset-bottom, 4px));",
      "  left: 50%;",
      "  transform: translateX(-50%);",
      "  width: 324px;",
      "  height: 0px;",
      "  opacity: 0;",
      "  pointer-events: none;",
      "  overflow: hidden;",
      "  z-index: 88;",
      "  background: rgba(12, 14, 28, 0.95);",
      "  border-radius: 10px;",
      "  transition: opacity 0.25s ease, height 0.25s ease;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "}",
      "#pn-sticky-anchor-ad.pn-ad-filled.pn-screen-allowed {",
      "  height: 54px;",
      "  opacity: 1;",
      "  pointer-events: auto;",
      "  border: 1px solid rgba(255, 255, 255, 0.14);",
      "  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65);",
      "}",
      "body.tv-board-mode #pn-sticky-anchor-ad { display: none !important; }",
      "#pn-sticky-anchor-close {",
      "  position: absolute;",
      "  top: 2px;",
      "  right: 2px;",
      "  width: 18px;",
      "  height: 18px;",
      "  border-radius: 50%;",
      "  background: rgba(7, 8, 18, 0.88);",
      "  color: rgba(255, 255, 255, 0.75);",
      "  border: 1px solid rgba(255, 255, 255, 0.2);",
      "  font-size: 11px;",
      "  line-height: 1;",
      "  cursor: pointer;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  z-index: 3;",
      "  padding: 0;",
      "}",
      /* Lever 1: Compact VIP Unlock Button inside Hub & Rules/GameOver */
      ".pn-vip-unlock-btn {",
      "  display: inline-flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  gap: 6px;",
      "  background: linear-gradient(135deg, rgba(255, 46, 99, 0.22), rgba(168, 85, 247, 0.24));",
      "  border: 1px solid rgba(255, 46, 99, 0.55);",
      "  color: #fff;",
      "  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;",
      "  font-size: 0.76rem;",
      "  font-weight: 800;",
      "  padding: 6px 12px;",
      "  border-radius: 999px;",
      "  cursor: pointer;",
      "  transition: transform 0.15s ease, box-shadow 0.2s ease;",
      "  box-shadow: 0 4px 14px rgba(255, 46, 99, 0.22);",
      "  text-decoration: none;",
      "  white-space: nowrap;",
      "}",
      ".pn-vip-unlock-btn:hover {",
      "  transform: translateY(-1px);",
      "  box-shadow: 0 6px 18px rgba(255, 46, 99, 0.38);",
      "}",
      ".pn-vip-unlock-btn.is-unlocked {",
      "  background: rgba(16, 215, 150, 0.16);",
      "  border-color: rgba(16, 215, 150, 0.55);",
      "  color: #10d796;",
      "  box-shadow: none;",
      "}",
      /* Desktop-only floating VIP pill on Setup/Landing (hidden on <640px so mobile layout is 100% untouched) */
      "#pn-desktop-vip-fab {",
      "  position: fixed;",
      "  bottom: 16px;",
      "  right: 16px;",
      "  z-index: 84;",
      "}",
      "@media (max-width: 640px) {",
      "  #pn-desktop-vip-fab { display: none !important; }",
      "}",
      "body.tv-board-mode #pn-desktop-vip-fab { display: none !important; }",
      /* Rewarded Ad / Sponsor Break Overlay Modal */
      "#pn-rewarded-modal {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 9999;",
      "  background: rgba(5, 6, 14, 0.88);",
      "  backdrop-filter: blur(10px);",
      "  display: none;",
      "  align-items: center;",
      "  justify-content: center;",
      "  padding: 16px;",
      "}",
      "#pn-rewarded-modal.open { display: flex; }",
      ".pn-rewarded-card {",
      "  width: 100%;",
      "  max-width: 380px;",
      "  background: linear-gradient(180deg, #151830 0%, #0c0e1d 100%);",
      "  border: 1px solid rgba(255, 46, 99, 0.45);",
      "  border-radius: 20px;",
      "  padding: 18px 16px;",
      "  text-align: center;",
      "  color: #f8fafc;",
      "  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;",
      "  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);",
      "}",
      ".pn-rewarded-badge {",
      "  display: inline-block;",
      "  font-size: 0.68rem;",
      "  font-weight: 800;",
      "  text-transform: uppercase;",
      "  letter-spacing: 0.08em;",
      "  padding: 4px 10px;",
      "  border-radius: 999px;",
      "  background: rgba(255, 46, 99, 0.18);",
      "  color: #ff6b93;",
      "  border: 1px solid rgba(255, 46, 99, 0.38);",
      "  margin-bottom: 8px;",
      "}",
      ".pn-rewarded-timer-ring {",
      "  width: 54px;",
      "  height: 54px;",
      "  border-radius: 50%;",
      "  margin: 10px auto;",
      "  border: 3px solid #ff2e63;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  font-size: 1.15rem;",
      "  font-weight: 900;",
      "  color: #fff;",
      "  background: rgba(255, 46, 99, 0.12);",
      "}",
      ".pn-rewarded-wa-btn {",
      "  width: 100%;",
      "  margin-top: 10px;",
      "  padding: 11px 14px;",
      "  border-radius: 12px;",
      "  border: none;",
      "  background: linear-gradient(135deg, #10d796, #059669);",
      "  color: #04130d;",
      "  font-weight: 800;",
      "  font-size: 0.84rem;",
      "  cursor: pointer;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  gap: 6px;",
      "}",
      ".pn-rewarded-claim-btn {",
      "  width: 100%;",
      "  margin-top: 8px;",
      "  padding: 11px 14px;",
      "  border-radius: 12px;",
      "  border: 1px solid rgba(255, 255, 255, 0.16);",
      "  background: rgba(255, 255, 255, 0.08);",
      "  color: #fff;",
      "  font-weight: 800;",
      "  font-size: 0.84rem;",
      "  cursor: pointer;",
      "}",
      ".pn-rewarded-claim-btn.ready {",
      "  background: linear-gradient(135deg, #ff2e63, #a855f7);",
      "  border-color: transparent;",
      "}",
      "#pn-vip-toast {",
      "  position: fixed;",
      "  top: 62px;",
      "  left: 50%;",
      "  transform: translateX(-50%);",
      "  z-index: 10000;",
      "  background: rgba(16, 215, 150, 0.96);",
      "  color: #04120c;",
      "  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;",
      "  font-size: 0.8rem;",
      "  font-weight: 800;",
      "  padding: 8px 16px;",
      "  border-radius: 999px;",
      "  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);",
      "  display: none;",
      "  white-space: nowrap;",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  var toastTimer = null;
  function showVipToast(text) {
    var toast = document.getElementById("pn-vip-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "pn-vip-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.display = "block";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.style.display = "none";
    }, 3400);
  }

  // =========================================================================
  // 4. REWARDED AD TRIGGER + SPONSOR COUNTDOWN FALLBACK MODAL
  // =========================================================================
  var countdownInterval = null;

  function ensureRewardedModal() {
    var existing = document.getElementById("pn-rewarded-modal");
    if (existing) return existing;

    var modal = document.createElement("div");
    modal.id = "pn-rewarded-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = [
      '<div class="pn-rewarded-card">',
      '  <span class="pn-rewarded-badge">🎬 VIP AFTER-HOURS EXPANSION</span>',
      '  <h3 style="margin: 0 0 4px; font-size: 1.1rem; font-weight: 800;">Unlock +100 Spicy Party Cards</h3>',
      '  <p style="margin: 0; font-size: 0.78rem; color: #94a3b8; line-height: 1.4;">',
      "    Unlocks +36 Mr. Alien After-Hours Words, +32 Wavelength Spicy Spectrums &amp; +32 Paranoia Midnight Questions for 24 hours!",
      "  </p>",
      '  <div class="pn-rewarded-timer-ring" id="pn-rewarded-countdown">8s</div>',
      '  <div id="pn-rewarded-ad-slot-wrap" style="min-height: 0; margin: 6px 0; overflow: hidden;"></div>',
      '  <button type="button" class="pn-rewarded-wa-btn" id="pn-btn-wa-instant-unlock">',
      "    <span>📲</span> <span>Share to WhatsApp Squad (Instant 0s Unlock)</span>",
      "  </button>",
      '  <button type="button" class="pn-rewarded-claim-btn" id="pn-btn-claim-countdown" disabled>',
      "    ⏳ Sponsor Break (8s)...",
      "  </button>",
      '  <button type="button" id="pn-btn-close-rewarded" style="margin-top: 8px; background: none; border: none; color: #64748b; font-size: 0.74rem; cursor: pointer;">Cancel</button>',
      "</div>"
    ].join("\n");
    document.body.appendChild(modal);

    document.getElementById("pn-btn-close-rewarded").addEventListener("click", function () {
      closeRewardedModal();
    });

    document.getElementById("pn-btn-wa-instant-unlock").addEventListener("click", function () {
      var shareText =
        "🎮 Play Mr. Alien, Secret Dictator, Wavelength & Paranoia free with zero downloads on https://partynights.online !";
      if (navigator.share) {
        navigator
          .share({
            title: "PartyNights.online — Free House Party Games",
            text: shareText,
            url: "https://partynights.online/"
          })
          .catch(function () {});
      } else {
        window.open(
          "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText),
          "_blank",
          "noopener"
        );
      }
      grantVipUnlock24h("🎉 VIP Pack Unlocked via Squad Share! (+100 Cards Active)");
    });

    document.getElementById("pn-btn-claim-countdown").addEventListener("click", function () {
      if (!this.disabled) {
        grantVipUnlock24h("🎉 VIP After-Hours Pack Unlocked for 24h! (+100 Cards Active)");
      }
    });

    return modal;
  }

  function openSponsorCountdownModal() {
    var modal = ensureRewardedModal();
    modal.classList.add("open");

    var remaining = 8;
    var ring = document.getElementById("pn-rewarded-countdown");
    var claimBtn = document.getElementById("pn-btn-claim-countdown");
    if (ring) ring.textContent = remaining + "s";
    if (claimBtn) {
      claimBtn.disabled = true;
      claimBtn.classList.remove("ready");
      claimBtn.textContent = "⏳ Unlocking VIP Pack in " + remaining + "s...";
    }

    // Try rendering a responsive display ad inside the modal if width >= 300
    try {
      var wrap = document.getElementById("pn-rewarded-ad-slot-wrap");
      if (wrap && !wrap.querySelector("ins.adsbygoogle") && wrap.offsetWidth >= 300) {
        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "inline-block";
        ins.style.width = "300px";
        ins.style.height = "50px";
        ins.setAttribute("data-ad-client", PUB_ID);
        wrap.appendChild(ins);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (_) {}

    clearInterval(countdownInterval);
    countdownInterval = setInterval(function () {
      remaining -= 1;
      if (remaining > 0) {
        if (ring) ring.textContent = remaining + "s";
        if (claimBtn) claimBtn.textContent = "⏳ Unlocking VIP Pack in " + remaining + "s...";
      } else {
        clearInterval(countdownInterval);
        if (ring) ring.textContent = "🔓";
        if (claimBtn) {
          claimBtn.disabled = false;
          claimBtn.classList.add("ready");
          claimBtn.textContent = "🎉 Claim +100 VIP Spicy Cards Now →";
        }
      }
    }, 1000);
  }

  function closeRewardedModal() {
    clearInterval(countdownInterval);
    var modal = document.getElementById("pn-rewarded-modal");
    if (modal) modal.classList.remove("open");
  }

  function triggerRewardedUnlock() {
    if (isFamilyModeActive()) return;
    if (isVipUnlocked()) {
      applyVipPacksToActiveGame();
      showVipToast("✨ VIP After-Hours Pack (+100 Cards) is already unlocked & active!");
      return;
    }

    var h5Handled = false;
    var fallbackTimer = setTimeout(function () {
      if (!h5Handled) {
        openSponsorCountdownModal();
      }
    }, 650);

    try {
      window.adBreak({
        type: "reward",
        name: "unlock_vip_afterhours_pack",
        beforeAd: function () {
          h5Handled = true;
          clearTimeout(fallbackTimer);
        },
        beforeReward: function (showAdFn) {
          h5Handled = true;
          clearTimeout(fallbackTimer);
          if (typeof showAdFn === "function") showAdFn();
        },
        adViewed: function () {
          grantVipUnlock24h("🎉 VIP After-Hours Pack Unlocked! (+100 Cards Active)");
        },
        adDismissed: function () {
          showVipToast("⚠️ Watch the full clip or share on WhatsApp to unlock VIP cards.");
        },
        adBreakDone: function (placementInfo) {
          if (
            placementInfo &&
            placementInfo.breakStatus !== "viewed" &&
            placementInfo.breakStatus !== "dismissed" &&
            !h5Handled
          ) {
            clearTimeout(fallbackTimer);
            openSponsorCountdownModal();
          }
        }
      });
    } catch (_) {
      clearTimeout(fallbackTimer);
      openSponsorCountdownModal();
    }
  }

  // =========================================================================
  // 5. LEVER 3: COMPACT STICKY 320x50 ANCHOR BANNER (LOBBY & GAME OVER ONLY)
  // =========================================================================
  var stickyDismissed = false;
  var stickyPushed = false;

  function ensureStickyAnchorBanner() {
    var existing = document.getElementById("pn-sticky-anchor-ad");
    if (existing) return existing;

    var bar = document.createElement("div");
    bar.id = "pn-sticky-anchor-ad";
    bar.setAttribute("aria-label", "Sponsor Banner");

    var closeBtn = document.createElement("button");
    closeBtn.id = "pn-sticky-anchor-close";
    closeBtn.type = "button";
    closeBtn.title = "Dismiss Sponsor Banner";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", function () {
      stickyDismissed = true;
      bar.classList.remove("pn-screen-allowed", "pn-ad-filled");
      bar.style.display = "none";
    });

    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "inline-block";
    ins.style.width = "320px";
    ins.style.height = "50px";
    ins.setAttribute("data-ad-client", PUB_ID);

    bar.appendChild(closeBtn);
    bar.appendChild(ins);
    document.body.appendChild(bar);

    // Observe when AdSense marks `data-ad-status="filled"` so we never show an empty box
    var attrObserver = new MutationObserver(function () {
      var status = ins.getAttribute("data-ad-status");
      if (status === "filled") {
        bar.classList.add("pn-ad-filled");
      } else if (status === "unfilled") {
        bar.classList.remove("pn-ad-filled");
      }
    });
    attrObserver.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });

    return bar;
  }

  function isActiveGameplayScreen() {
    var gameplayIds = [
      "screen-pass",
      "screen-discussion",
      "screen-voting",
      "screen-elimination",
      "screen-game",
      "screen-paranoia",
      "screen-poll",
      "screen-countdown",
      "screen-play"
    ];
    for (var i = 0; i < gameplayIds.length; i++) {
      var el = document.getElementById(gameplayIds[i]);
      if (el && el.classList.contains("active")) return true;
    }
    return false;
  }

  function isLobbyOrGameOverActive() {
    if (isActiveGameplayScreen()) return false;
    if (document.body.classList.contains("tv-board-mode")) return false;

    // Never show fixed bottom sticky bar on Game Over screen because Play Again / Edit Setup buttons sit at the bottom of Game Over
    var gameOver = document.getElementById("screen-gameover");
    if (gameOver && gameOver.classList.contains("active")) return false;

    // 0. Arcade Hub Main Stage (Central Arcade Hub)
    if (document.querySelector(".arcade-stage") || document.getElementById("ad-container")) return true;

    // 1. Secret Dictator Waiting Lobby or Setup
    var sdLobby = document.getElementById("screen-lobby") || document.getElementById("screen-setup");
    if (sdLobby && sdLobby.classList.contains("active")) return true;

    // 2. Mr. Alien Online Waiting Lobby or Setup
    var maSetup = document.getElementById("screen-setup");
    if (maSetup && maSetup.classList.contains("active")) return true;
    var maLobby = document.getElementById("online-lobby-box") || document.getElementById("online-lobby-panel");
    if (maLobby && maLobby.offsetParent !== null) return true;

    // 3. Paranoia Multi-Phone Room Lobby or Setup
    var paLobby = document.getElementById("multi-room-lobby") || document.getElementById("room-host-banner");
    if (paLobby && paLobby.offsetParent !== null) return true;

    // 4. Wavelength TV/Room Setup Card open or Setup screen
    var wvSetup = document.getElementById("screen-setup");
    if (wvSetup && wvSetup.classList.contains("active")) return true;
    var wvLobby = document.getElementById("tv-room-card");
    if (wvLobby && wvLobby.offsetParent !== null) return true;

    // 5. Landing screens across all games
    var landing = document.getElementById("screen-landing");
    if (landing && landing.classList.contains("active")) return true;

    return false;
  }

  var isSyncingAds = false;

  function syncAdVisibilityByScreen() {
    var bar = ensureStickyAnchorBanner();
    var inGameplay = isActiveGameplayScreen();
    var gameOverEl = document.getElementById("screen-gameover");
    var inGameOver = !!(gameOverEl && gameOverEl.classList.contains("active"));

    // Desktop floating VIP pill: show on Landing/Setup/Lobby, hide during active gameplay & on Game Over so it never overlaps Play Again
    var fab = document.getElementById("pn-desktop-vip-fab");
    if (fab) {
      var desiredDisplay = isFamilyModeActive() || inGameplay || inGameOver ? "none" : "";
      if (fab.style.display !== desiredDisplay) {
        fab.style.display = desiredDisplay;
      }
    }

    if (stickyDismissed || inGameplay || inGameOver) {
      if (bar.classList.contains("pn-screen-allowed")) {
        bar.classList.remove("pn-screen-allowed");
      }
      return;
    }

    var allowed = isLobbyOrGameOverActive();
    if (bar.classList.contains("pn-screen-allowed") !== allowed) {
      bar.classList.toggle("pn-screen-allowed", allowed);
    }

    if (allowed && !stickyPushed) {
      var ins = bar.querySelector("ins.adsbygoogle");
      if (
        ins &&
        !ins.getAttribute("data-adsbygoogle-status") &&
        window.innerWidth >= 320
      ) {
        stickyPushed = true;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_) {}
      }
    }
  }

  // =========================================================================
  // 6. EVERY-3RD-GAME-OVER REMATCH INTERSTITIAL (`type: "next"`)
  // =========================================================================
  var lastGameOverSeen = false;

  function checkGameOverTransition() {
    var go = document.getElementById("screen-gameover");
    var isNowActive = !!(go && go.classList.contains("active"));
    if (isNowActive && !lastGameOverSeen) {
      try {
        var c = parseInt(sessionStorage.getItem(MATCH_COUNT_KEY) || "0", 10) + 1;
        sessionStorage.setItem(MATCH_COUNT_KEY, String(c));
      } catch (_) {}
    }
    lastGameOverSeen = isNowActive;
  }

  function wireRematchInterstitialHook() {
    if (!hasNativeH5AdBreak) return;
    var rematchBtnIds = [
      "btn-play-again",
      "btn-gameover-again",
      "btn-rematch",
      "btn-new-game"
    ];
    rematchBtnIds.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn || btn.dataset.pnRematchWired) return;
      btn.dataset.pnRematchWired = "1";
      btn.addEventListener(
        "click",
        function () {
          try {
            var count = parseInt(sessionStorage.getItem(MATCH_COUNT_KEY) || "0", 10);
            if (count > 0 && count % 3 === 0) {
              window.adBreak({
                type: "next",
                name: "every_3rd_gameover_rematch"
              });
            }
          } catch (_) {}
        },
        false
      );
    });
  }

  // =========================================================================
  // 7. INJECT VIP UNLOCK TRIGGERS INTO HUB, RULES MODALS & GAME OVER
  // =========================================================================
  function createVipButtonElement() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pn-vip-unlock-btn" + (isVipUnlocked() ? " is-unlocked" : "");
    btn.innerHTML = isVipUnlocked()
      ? "<span>✨</span><span>VIP +100 Spicy Pack Active (24h)</span>"
      : "<span>🎬</span><span>Unlock +100 VIP Spicy Cards (Free Ad)</span>";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      triggerRewardedUnlock();
    });
    return btn;
  }

  function updateAllVipButtonsUI() {
    var unlocked = isVipUnlocked();
    var btns = document.querySelectorAll(".pn-vip-unlock-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("is-unlocked", unlocked);
      btns[i].innerHTML = unlocked
        ? "<span>✨</span><span>VIP +100 Spicy Pack Active (24h)</span>"
        : "<span>🎬</span><span>Unlock +100 VIP Spicy Cards (Free Ad)</span>";
    }
    var hubSlot = document.querySelector(".coming-soon-slot[data-pn-vip-mounted='1']");
    if (hubSlot) {
      hubSlot.innerHTML = unlocked
        ? '<div style="display:flex;align-items:center;gap:0.5rem;"><span class="slot-pill" style="background:rgba(16,215,150,0.2);color:#10d796;">✨ VIP Active</span><span>+100 After-Hours Cards unlocked across all 4 games!</span></div>'
        : '<div style="display:flex;align-items:center;gap:0.5rem;"><span class="slot-pill">🎬 VIP Pack</span><span>Tap to unlock +100 Spicy Cards (Free 15s Ad) →</span></div>';
    }
  }

  function mountVipTriggers() {
    if (isFamilyModeActive()) {
      var existingFab = document.getElementById("pn-desktop-vip-fab");
      if (existingFab) existingFab.style.display = "none";
      var btns = document.querySelectorAll(".pn-vip-unlock-btn");
      btns.forEach(function (b) { b.style.display = "none"; });
      return;
    }
    // A. On Arcade Hub (`partynights.online/`): turn `.coming-soon-slot` into a 1-line clickable VIP Unlocker (0px height/word bloat)
    var hubSlot = document.querySelector(".coming-soon-slot");
    if (hubSlot && !hubSlot.dataset.pnVipMounted) {
      hubSlot.dataset.pnVipMounted = "1";
      hubSlot.style.cursor = "pointer";
      hubSlot.setAttribute("role", "button");
      hubSlot.setAttribute("tabindex", "0");
      hubSlot.addEventListener("click", function () {
        triggerRewardedUnlock();
      });
      updateAllVipButtonsUI();
    }

    // B. Inside Rules / How-To-Play Modals (`#modal-rules`, `#modal-how-to-play`) across all 4 games
    var modals = ["modal-rules", "modal-how-to-play"];
    modals.forEach(function (mId) {
      var m = document.getElementById(mId);
      if (!m || m.dataset.pnVipMounted) return;
      var card = m.querySelector(".modal-card, .modal-content, .rules-modal-card");
      if (card) {
        m.dataset.pnVipMounted = "1";
        var wrap = document.createElement("div");
        wrap.style.cssText = "margin: 8px 0; text-align: center;";
        wrap.appendChild(createVipButtonElement());
        card.insertBefore(wrap, card.firstChild);
      }
    });

    // C. Desktop-only floating VIP pill (hidden on <640px mobile via CSS)
    if (!document.getElementById("pn-desktop-vip-fab") && !hubSlot) {
      var fab = document.createElement("div");
      fab.id = "pn-desktop-vip-fab";
      fab.appendChild(createVipButtonElement());
      document.body.appendChild(fab);
    }
  }

  function initAdsEngine() {
    injectStyles();
    applyVipPacksToActiveGame();
    mountVipTriggers();
    ensureStickyAnchorBanner();
    wireRematchInterstitialHook();
    syncAdVisibilityByScreen();

    var syncTimer = null;
    var bodyObserver = new MutationObserver(function (mutations) {
      if (isSyncingAds) return;
      var hasRelevantChange = false;
      for (var i = 0; i < mutations.length; i++) {
        var t = mutations[i].target;
        if (
          t &&
          t.classList &&
          (t.classList.contains("screen") ||
            t.id === "screen-gameover" ||
            t.id === "screen-lobby" ||
            t.id === "screen-setup" ||
            t === document.body)
        ) {
          hasRelevantChange = true;
          break;
        }
      }
      if (!hasRelevantChange) return;

      if (syncTimer) clearTimeout(syncTimer);
      syncTimer = setTimeout(function () {
        if (isSyncingAds) return;
        isSyncingAds = true;
        try {
          checkGameOverTransition();
          syncAdVisibilityByScreen();
        } finally {
          isSyncingAds = false;
        }
      }, 40);
    });
    bodyObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdsEngine);
  } else {
    initAdsEngine();
  }

  window.PartyNightsAds = {
    isVipUnlocked: isVipUnlocked,
    triggerRewardedUnlock: triggerRewardedUnlock,
    grantVipUnlock24h: grantVipUnlock24h,
    syncAdVisibilityByScreen: syncAdVisibilityByScreen
  };
})();
