// ==========================================================================
// CHARADES RUSH — Core Game Engine, Tilt Gyroscope & WebAudio SFX
// 100% Client-Side PWA Game for PartyNights.online
// ==========================================================================

(function () {
  "use strict";

  // --- Sound Effects System (WebAudio Synthesizer) ---
  const SoundFX = {
    ctx: null,
    enabled: true,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    },

    ding() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Two-tone bell chord
      [1046.5, 1318.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.3, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    },

    buzzer() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(105, now + 0.22);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    },

    beep(high = false) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(high ? 880 : 440, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    },

    fanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // C major chord fanfare: C4, E4, G4, C5
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.35, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });
    },

    vibrate(pattern) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (_) {}
      }
    }
  };

  // --- Game State ---
  const state = {
    screen: "landing",
    mode: "forehead", // 'forehead' | 'classic' | 'team'
    selectedDeckId: "bollywood",
    roundDuration: 60,
    controlMode: "both", // 'both' | 'touch'
    soundEnabled: true,

    // Active Round State
    currentCard: null,
    deckCards: [],
    unusedIndices: [],
    score: 0,
    correctCards: [],
    passedCards: [],
    timeLeft: 60,
    timerId: null,
    countdownVal: 3,
    countdownId: null,

    // Tilt Controls
    tiltCooldown: false,
    baseTiltBeta: 85, // Neutral vertical forehead tilt

    // Team Battle Mode
    teamDuel: {
      active: false,
      currentTeam: "blue", // 'blue' | 'red'
      scores: { blue: 0, red: 0 }
    }
  };

  // Storage Keys
  const STORAGE_KEYS = {
    PREFS: "cr_preferences_v1",
    FAMILY_MODE: "pn_family_mode_v1"
  };

  // Helper DOM Selector
  const $ = (id) => document.getElementById(id);

  // ==========================================================================
  // INITIALIZATION & PREFERENCES
  // ==========================================================================
  function loadPreferences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.selectedDeckId) state.selectedDeckId = p.selectedDeckId;
        if (p.roundDuration) state.roundDuration = p.roundDuration;
        if (p.controlMode) state.controlMode = p.controlMode;
        if (typeof p.soundEnabled === "boolean") {
          state.soundEnabled = p.soundEnabled;
          SoundFX.enabled = p.soundEnabled;
        }
      }
    } catch (_) {}
  }

  function savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify({
        selectedDeckId: state.selectedDeckId,
        roundDuration: state.roundDuration,
        controlMode: state.controlMode,
        soundEnabled: state.soundEnabled
      }));
    } catch (_) {}
  }

  // ==========================================================================
  // DECK SELECTION & CARD SHUFFLE
  // ==========================================================================
  function getActiveDeck() {
    if (typeof CHARADES_DECKS === "undefined") return { cards: [] };
    if (state.selectedDeckId === "all") {
      // Blend all decks
      const allCards = [];
      CHARADES_DECKS.forEach((d) => allCards.push(...d.cards));
      return { id: "all", name: "All-Star Party Mix", icon: "🌍", cards: allCards };
    }
    return CHARADES_DECKS.find((d) => d.id === state.selectedDeckId) || CHARADES_DECKS[0];
  }

  function renderDecksGrid() {
    const grid = $("deck-selector-grid");
    if (!grid || typeof CHARADES_DECKS === "undefined") return;
    grid.innerHTML = "";

    // Add All-Star Mix Option First
    const allDeck = {
      id: "all",
      name: "All-Star Party Mix",
      icon: "🌍",
      desc: "Blended mix of all categories",
      cards: []
    };
    let totalCardsCount = 0;
    CHARADES_DECKS.forEach((d) => (totalCardsCount += d.cards.length));

    const renderChip = (d, count) => {
      const chip = document.createElement("div");
      const isSel = state.selectedDeckId === d.id;
      chip.className = `deck-chip${isSel ? " active" : ""}`;
      chip.innerHTML = `
        <span class="d-icon">${d.icon}</span>
        <div class="d-info">
          <span class="d-name">${d.name}</span>
          <span class="d-count">${count} Cards</span>
        </div>
      `;
      chip.addEventListener("click", () => {
        SoundFX.ding();
        state.selectedDeckId = d.id;
        savePreferences();
        renderDecksGrid();
        updateSelectedDeckBadge();
      });
      grid.appendChild(chip);
    };

    renderChip(allDeck, `${totalCardsCount}+`);

    CHARADES_DECKS.forEach((d) => {
      renderChip(d, `${d.cards.length}`);
    });

    updateSelectedDeckBadge();
  }

  function updateSelectedDeckBadge() {
    const badge = $("selected-deck-badge");
    const deck = getActiveDeck();
    if (badge && deck) {
      badge.textContent = `${deck.icon} ${deck.name}`;
    }
  }

  // ==========================================================================
  // ROUND MANAGEMENT
  // ==========================================================================
  function prepareRoundCards() {
    const deck = getActiveDeck();
    state.deckCards = [...deck.cards];
    // Fisher-Yates Shuffle
    for (let i = state.deckCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.deckCards[i], state.deckCards[j]] = [state.deckCards[j], state.deckCards[i]];
    }
    state.unusedIndices = state.deckCards.map((_, idx) => idx);
    state.score = 0;
    state.correctCards = [];
    state.passedCards = [];
  }

  function drawNextCard() {
    if (state.unusedIndices.length === 0) {
      // Reshuffle if deck exhausted
      state.unusedIndices = state.deckCards.map((_, idx) => idx);
    }
    const randPos = Math.floor(Math.random() * state.unusedIndices.length);
    const chosenIdx = state.unusedIndices.splice(randPos, 1)[0];
    state.currentCard = state.deckCards[chosenIdx];

    $("active-card-title").textContent = state.currentCard.text;
    $("active-card-hint").textContent = state.currentCard.hint || "Act it out or give clues!";
  }

  function startCountdown() {
    SoundFX.init();
    showScreen("countdown");
    state.countdownVal = 3;
    $("countdown-number").textContent = "3";

    if (state.mode === "forehead") {
      $("countdown-tip-text").textContent = "📱 Place phone on your FOREHEAD facing your squad!";
    } else if (state.mode === "classic") {
      $("countdown-tip-text").textContent = "🎭 Read the card and act it out SILENTLY!";
    } else {
      const teamColor = state.teamDuel.currentTeam === "blue" ? "TEAM BLUE" : "TEAM RED";
      $("countdown-tip-text").textContent = `👥 ${teamColor}'S TURN! Get ready to guess!`;
    }

    SoundFX.beep(false);

    if (state.countdownId) clearInterval(state.countdownId);
    state.countdownId = setInterval(() => {
      state.countdownVal--;
      if (state.countdownVal > 0) {
        $("countdown-number").textContent = String(state.countdownVal);
        SoundFX.beep(false);
      } else {
        clearInterval(state.countdownId);
        state.countdownId = null;
        SoundFX.beep(true);
        launchActiveRound();
      }
    }, 950);
  }

  function launchActiveRound() {
    prepareRoundCards();
    showScreen("play");
    drawNextCard();

    state.timeLeft = state.roundDuration;
    $("timer-seconds").textContent = String(state.timeLeft);
    $("score-counter").textContent = "0";
    $("hud-timer").classList.remove("hurry");

    // Enable Motion Sensor if supported
    enableDeviceTiltListeners();

    if (state.timerId) clearInterval(state.timerId);
    state.timerId = setInterval(() => {
      state.timeLeft--;
      $("timer-seconds").textContent = String(state.timeLeft);

      if (state.timeLeft <= 10) {
        $("hud-timer").classList.add("hurry");
        SoundFX.beep(false);
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timerId);
        state.timerId = null;
        finishRound();
      }
    }, 1000);
  }

  function registerScore(isCorrect) {
    if (state.screen !== "play" || !state.currentCard) return;

    const cardStage = $("active-word-card");
    if (isCorrect) {
      state.score++;
      state.correctCards.push(state.currentCard);
      SoundFX.ding();
      SoundFX.vibrate(30);

      cardStage.classList.add("feedback-correct");
      setTimeout(() => cardStage.classList.remove("feedback-correct"), 350);
    } else {
      state.passedCards.push(state.currentCard);
      SoundFX.buzzer();
      SoundFX.vibrate([20, 40, 20]);

      cardStage.classList.add("feedback-pass");
      setTimeout(() => cardStage.classList.remove("feedback-pass"), 350);
    }

    $("score-counter").textContent = String(state.score);
    drawNextCard();
  }

  function finishRound() {
    disableDeviceTiltListeners();
    SoundFX.fanfare();
    SoundFX.vibrate([60, 100, 60]);

    if (state.mode === "team") {
      const cur = state.teamDuel.currentTeam;
      state.teamDuel.scores[cur] += state.score;
      // Alternate team
      state.teamDuel.currentTeam = cur === "blue" ? "red" : "blue";
    }

    renderSummaryScreen();
    showScreen("gameover");
  }

  // ==========================================================================
  // SUMMARY SCREEN
  // ==========================================================================
  function renderSummaryScreen() {
    $("summary-final-score").textContent = String(state.score);
    const reviewList = $("summary-words-list");
    reviewList.innerHTML = "";

    if (state.mode === "team") {
      $("summary-badge").textContent = `🔵 Blue: ${state.teamDuel.scores.blue}p • 🔴 Red: ${state.teamDuel.scores.red}p`;
    } else {
      $("summary-badge").textContent = "🏆 ROUND COMPLETED!";
    }

    state.correctCards.forEach((c) => {
      const row = document.createElement("div");
      row.className = "review-item correct";
      row.innerHTML = `<span>${c.text}</span><span style="color:var(--correct-green);">✅ +1</span>`;
      reviewList.appendChild(row);
    });

    state.passedCards.forEach((c) => {
      const row = document.createElement("div");
      row.className = "review-item passed";
      row.innerHTML = `<span>${c.text}</span><span style="color:var(--pass-red);">⏭️ Pass</span>`;
      reviewList.appendChild(row);
    });

    if (state.correctCards.length === 0 && state.passedCards.length === 0) {
      reviewList.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No cards played in this round.</p>`;
    }

    if (state.mode === "team") {
      const nextTeamName = state.teamDuel.currentTeam === "blue" ? "Team Blue" : "Team Red";
      $("btn-play-next-round").innerHTML = `<span>🔄 Launch ${nextTeamName}'s Turn →</span>`;
    } else {
      $("btn-play-next-round").innerHTML = `<span>🔄 Play Another Round →</span>`;
    }
  }

  // ==========================================================================
  // MOTION / TILT GYROSCOPE CONTROLLER
  // ==========================================================================
  function handleDeviceOrientation(e) {
    if (state.controlMode === "touch" || state.tiltCooldown || state.screen !== "play") {
      return;
    }

    const beta = e.beta; // Front-to-back tilt in degrees [-180, 180]
    if (beta === null || typeof beta === "undefined") return;

    // Standard Forehead Hold: Phone held upright against forehead (beta is ~70 to 110 deg)
    // TILT DOWN (Correct): Player dips forehead downward (beta drops < 28 deg)
    if (beta < 28 && beta > -60) {
      triggerTiltAction(true);
    }
    // TILT UP (Pass): Player tilts forehead upward towards ceiling (beta rises > 135 deg)
    else if (beta > 135 || beta < -140) {
      triggerTiltAction(false);
    }
  }

  function triggerTiltAction(isCorrect) {
    state.tiltCooldown = true;
    registerScore(isCorrect);
    setTimeout(() => {
      state.tiltCooldown = false;
    }, 850);
  }

  function enableDeviceTiltListeners() {
    if (typeof window.DeviceOrientationEvent !== "undefined") {
      // Check iOS 13+ permission
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((res) => {
            if (res === "granted") {
              window.addEventListener("deviceorientation", handleDeviceOrientation, false);
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation, false);
      }
    }
  }

  function disableDeviceTiltListeners() {
    window.removeEventListener("deviceorientation", handleDeviceOrientation, false);
  }

  // ==========================================================================
  // SCREEN SWITCHER
  // ==========================================================================
  function showScreen(screenId) {
    const wasActiveRound = state.screen === "countdown" || state.screen === "play";
    state.screen = screenId;
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    const target = $(`screen-${screenId}`);
    if (target) target.classList.add("active");

    const backLabel = $("back-label");
    if (backLabel) {
      backLabel.textContent = screenId === "landing" ? "Arcade" : "Exit";
    }

    if (!wasActiveRound && (screenId === "countdown" || screenId === "play")) {
      try { window.history.pushState({ charadesRound: true }, "", "#charades-round"); } catch (_) {}
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================
  // VIRAL SOCIAL SHARE (DIRECTIVE 1.B)
  // ==========================================
  function shareResultWhatsApp() {
    const deck = getActiveDeck();
    const shareText = `🎭 We just scored ${state.score} points in Charades Rush (${deck.name}) on PartyNights.online! Can your family beat our score? Play free with zero downloads: https://partynights.online/charades-rush/`;

    if (navigator.share) {
      navigator.share({
        title: "Charades Rush — PartyNights.online",
        text: shareText,
        url: "https://partynights.online/charades-rush/"
      }).catch(() => {});
      return;
    }

    // WhatsApp Fallback
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank", "noopener");
  }

  function isRoundActive() {
    return state.screen === "countdown" || state.screen === "play";
  }

  function openLeaveWarning() {
    if (isRoundActive()) $("modal-leave-warning").classList.add("open");
  }

  function leaveActiveRound() {
    if (state.timerId) clearInterval(state.timerId);
    if (state.countdownId) clearInterval(state.countdownId);
    state.timerId = null;
    state.countdownId = null;
    disableDeviceTiltListeners();
    $("modal-leave-warning").classList.remove("open");
    showScreen("landing");
    try { window.history.replaceState(null, "", window.location.pathname); } catch (_) {}
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================
  function bindEvents() {
    // Top Bar Back Button
    $("btn-ios-back").addEventListener("click", () => {
      if (state.screen === "landing") {
        window.location.href = "https://partynights.online/";
      } else if (isRoundActive()) {
        openLeaveWarning();
      } else {
        showScreen("landing");
      }
    });

    $("btn-stay-in-game").addEventListener("click", () => $("modal-leave-warning").classList.remove("open"));
    $("btn-leave-confirm").addEventListener("click", leaveActiveRound);
    $("brand-home-link").addEventListener("click", (event) => {
      if (!isRoundActive()) return;
      event.preventDefault();
      openLeaveWarning();
    });
    window.addEventListener("popstate", () => {
      if (!isRoundActive()) return;
      try { window.history.pushState({ charadesRound: true }, "", "#charades-round"); } catch (_) {}
      openLeaveWarning();
    });
    window.addEventListener("beforeunload", (event) => {
      if (!isRoundActive()) return;
      event.preventDefault();
      event.returnValue = "";
    });

    // Sound Toggle
    $("btn-sound-toggle").addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      SoundFX.enabled = state.soundEnabled;
      $("btn-sound-toggle").textContent = state.soundEnabled ? "🔊" : "🔇";
      savePreferences();
      if (state.soundEnabled) SoundFX.ding();
    });

    // Mode Switcher Cards
    ["forehead", "classic", "team"].forEach((m) => {
      const btn = $(`mode-btn-${m}`);
      if (btn) {
        btn.addEventListener("click", () => {
          SoundFX.ding();
          state.mode = m;
          document.querySelectorAll(".mode-card").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          if (m === "team") {
            state.teamDuel = { active: true, currentTeam: "blue", scores: { blue: 0, red: 0 } };
          }
        });
      }
    });

    // Launch Button
    $("btn-launch-round").addEventListener("click", startCountdown);
    $("btn-play-next-round").addEventListener("click", startCountdown);

    // Active Touch Controls (Fallback & Direct Tap)
    $("btn-touch-correct").addEventListener("click", (e) => {
      e.preventDefault();
      registerScore(true);
    });
    $("btn-touch-pass").addEventListener("click", (e) => {
      e.preventDefault();
      registerScore(false);
    });

    // WhatsApp Share Button
    $("btn-share-whatsapp").addEventListener("click", shareResultWhatsApp);

    // Settings Modal
    const openSettings = () => {
      SoundFX.ding();
      $("modal-settings").classList.add("open");
    };
    const closeSettings = () => {
      $("modal-settings").classList.remove("open");
    };
    $("btn-open-settings").addEventListener("click", openSettings);
    $("btn-close-settings").addEventListener("click", closeSettings);
    $("btn-done-settings").addEventListener("click", closeSettings);

    // Setting: Time Pills
    document.querySelectorAll("#setting-time-pills .time-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        SoundFX.ding();
        document.querySelectorAll("#setting-time-pills .time-pill-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.roundDuration = parseInt(btn.dataset.time, 10);
        savePreferences();
      });
    });

    // Setting: Control Pills
    document.querySelectorAll("#setting-control-pills .time-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        SoundFX.ding();
        document.querySelectorAll("#setting-control-pills .time-pill-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.controlMode = btn.dataset.ctrl;
        savePreferences();
      });
    });

    // Rules Modal
    $("btn-open-rules").addEventListener("click", () => {
      SoundFX.ding();
      $("modal-rules").classList.add("open");
    });
    $("btn-close-rules").addEventListener("click", () => {
      $("modal-rules").classList.remove("open");
    });
    $("btn-got-rules").addEventListener("click", () => {
      $("modal-rules").classList.remove("open");
    });
  }

  // ==========================================================================
  // SERVICE WORKER REGISTRATION
  // ==========================================================================
  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  // ==========================================================================
  // APP INIT
  // ==========================================================================
  function init() {
    loadPreferences();
    renderDecksGrid();
    bindEvents();
    registerServiceWorker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
