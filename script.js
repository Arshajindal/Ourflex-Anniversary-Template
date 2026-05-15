/*
  EDIT HERE:
  1. Replace names, titles, dates, captions.
  2. Put your real photos in assets/photos/ and videos in assets/videos/.
  3. Update image/video paths below.
  4. Optional: add assets/audio/your-song.mp3 for background music.
*/

const SITE = {
  coupleName: "Arsha & Him",
  heroTitle: "Life of Arsha & Him",
  heroMeta: "6 months • Romance • Comedy • Forever",
  heroDescription: "Tomorrow is our anniversary, so I made this tiny movie world for you. Every photo, every video, every inside joke - all in one place.",
  heroImage: "assets/photos/hero.svg",
  profiles: [
    { name: "1 month", image: "assets/photos/month-1.svg" },
    { name: "3 months", image: "assets/photos/month-3.svg" },
    { name: "5 months", image: "assets/photos/month-5.svg" },
    { name: "6 months", image: "assets/photos/month-6.svg" }
  ],
  rows: [
    {
      title: "Continue Watching: Our Favorite Memories",
      items: [
        {
          title: "The First Favorite Day",
          tag: "Episode 01",
          date: "Replace with date/place",
          caption: "Write what happened here. Add the tiny details only both of you know.",
          type: "image",
          image: "assets/photos/memory-1.svg",
          video: ""
        },
        {
          title: "The Cute Random Video",
          tag: "Episode 02",
          date: "Replace with date/place",
          caption: "This slot can become a video. Put your file in assets/videos and set type to video.",
          type: "video",
          image: "assets/photos/video-placeholder.svg",
          video: "assets/videos/your-video-1.mp4"
        },
        {
          title: "The Smile I Love",
          tag: "Episode 03",
          date: "Replace with date/place",
          caption: "A sweet caption goes here.",
          type: "image",
          image: "assets/photos/memory-2.svg",
          video: ""
        },
        {
          title: "The Inside Joke",
          tag: "Episode 04",
          date: "Replace with date/place",
          caption: "Use this for a funny photo, screenshot, or voice-note memory.",
          type: "image",
          image: "assets/photos/memory-3.svg",
          video: ""
        }
      ]
    },
    {
      title: "Because You Are My Favorite Person",
      items: [
        {
          title: "Comfort Character",
          tag: "Special Feature",
          date: "Always",
          caption: "Write one thing he does that makes you feel safe and loved.",
          type: "image",
          image: "assets/photos/memory-4.svg",
          video: ""
        },
        {
          title: "The Little Things",
          tag: "Special Feature",
          date: "Every day",
          caption: "Add a list of little things you adore about him.",
          type: "image",
          image: "assets/photos/memory-5.svg",
          video: ""
        },
        {
          title: "Our Future Trailer",
          tag: "Coming Soon",
          date: "Soon",
          caption: "A soft future note: more dates, more photos, more us.",
          type: "image",
          image: "assets/photos/memory-6.svg",
          video: ""
        }
      ]
    }
  ],
  reasons: [
    "You make normal days feel special.",
    "You are my safest place and my favorite chaos.",
    "You make me laugh even when I am trying not to.",
    "You remember the little things.",
    "You make love feel soft, fun, and real.",
    "Six months with you already feels like my favorite season."
  ],
  letter: {
    title: "Happy 6 Months, Love",
    body: "Replace this with your real letter.\n\nTell him what these six months have meant to you. Mention your favorite memory, something you admire about him, an inside joke, and what you are excited for next.\n\nEnd with something only you would say."
  },
  credits: [
    { role: "Directed by", text: "God, destiny, and a little bit of delusion" },
    { role: "Starring", text: "You and Me" },
    { role: "Favorite Scene", text: "Every time you smiled" },
    { role: "Best Soundtrack", text: "Your laugh" },
    { role: "Produced with", text: "Love, patience, screenshots, and memories" },
    { role: "Coming Soon", text: "More dates, more adventures, more us" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const profilesEl = $("#profiles");
const rowsEl = $("#memories");
const reasonsGrid = $("#reasonsGrid");
const modal = $("#modal");
const finaleOverlay = $("#finaleOverlay");
const bgMusic = $("#bgMusic");
let allItems = [];
let musicOn = false;

function setScreen(name) {
  $("#profileScreen").classList.toggle("active", name === "profiles");
  $("#homeScreen").classList.toggle("active", name === "home");
  if (name === "home") window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProfiles() {
  profilesEl.innerHTML = SITE.profiles.map((profile, index) => `
    <button class="profile-card" data-profile="${index}">
      <span class="profile-avatar"><img src="${profile.image}" alt="${profile.name} profile photo"></span>
      <span class="profile-name">${profile.name}</span>
    </button>
  `).join("");

  profilesEl.querySelectorAll(".profile-card").forEach((card) => {
    card.addEventListener("click", () => setScreen("home"));
  });
}

function renderHero() {
  $("#hero").style.backgroundImage = `url('${SITE.heroImage}')`;
  $("#heroTitle").textContent = SITE.heroTitle;
  $("#heroMeta").textContent = SITE.heroMeta;
  $("#heroDescription").textContent = SITE.heroDescription;
}

function renderRows() {
  allItems = SITE.rows.flatMap((row) => row.items);
  rowsEl.innerHTML = SITE.rows.map((row) => `
    <section class="row">
      <h2>${row.title}</h2>
      <div class="card-track">
        ${row.items.map((item, index) => {
          const realIndex = allItems.indexOf(item);
          return `
          <button class="memory-card" data-item="${realIndex}">
            <div class="memory-thumb">
              <img src="${item.image}" alt="${item.title}">
              <span class="play-badge">${item.type === "video" ? "▶" : "♡"}</span>
            </div>
            <div class="memory-info">
              <h3>${item.title}</h3>
              <p>${item.caption}</p>
            </div>
          </button>`;
        }).join("")}
      </div>
    </section>
  `).join("");

  rowsEl.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", () => openMemory(Number(card.dataset.item)));
  });
}

function renderReasons() {
  reasonsGrid.innerHTML = SITE.reasons.map((reason, i) => `
    <article class="reason-card">
      <strong>${String(i + 1).padStart(2, "0")}</strong>
      <p>${reason}</p>
    </article>
  `).join("");
}

function openMemory(index) {
  const item = allItems[index] || allItems[0];
  $("#modalTag").textContent = item.tag;
  $("#modalTitle").textContent = item.title;
  $("#modalDate").textContent = item.date;
  $("#modalText").textContent = item.caption;

  const media = $("#modalMedia");
  if (item.type === "video" && item.video) {
    media.innerHTML = `
      <video controls autoplay playsinline poster="${item.image}" onerror="this.outerHTML='<img src=&quot;${item.image}&quot; alt=&quot;Video placeholder&quot;>'">
        <source src="${item.video}" type="video/mp4">
      </video>`;
  } else {
    media.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeMemory() {
  $("#modalMedia").innerHTML = "";
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function openFinale() {
  $("#letterTitle").textContent = SITE.letter.title;
  $("#letterBody").textContent = SITE.letter.body;
  $("#creditsRoll").innerHTML = SITE.credits.map((credit) => `
    <div class="credit-line"><span class="credit-role">${credit.role}</span>${credit.text}</div>
  `).join("");

  finaleOverlay.className = "finale-overlay active";
  finaleOverlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    if (finaleOverlay.classList.contains("active")) finaleOverlay.classList.add("credits");
  }, 6500);

  window.setTimeout(() => {
    if (finaleOverlay.classList.contains("active")) {
      finaleOverlay.classList.remove("credits");
      finaleOverlay.classList.add("logo");
    }
  }, 27500);
}

function closeFinale() {
  finaleOverlay.className = "finale-overlay";
  finaleOverlay.setAttribute("aria-hidden", "true");
}

function toggleMusic() {
  musicOn = !musicOn;
  const btn = $("#musicToggle");
  if (musicOn) {
    bgMusic.play().then(() => {
      btn.textContent = "Music: On";
    }).catch(() => {
      musicOn = false;
      btn.textContent = "Add song first";
    });
  } else {
    bgMusic.pause();
    btn.textContent = "Music: Off";
  }
}

function bindEvents() {
  $("#skipIntro").addEventListener("click", () => setScreen("home"));
  $("#backToProfiles").addEventListener("click", () => setScreen("profiles"));
  $("#playFirst").addEventListener("click", () => openMemory(0));
  $("#openLetter").addEventListener("click", openFinale);
  $("#playFinale").addEventListener("click", openFinale);
  $("#closeModal").addEventListener("click", closeMemory);
  $("#closeFinale").addEventListener("click", closeFinale);
  $("#replayStory").addEventListener("click", () => {
    closeFinale();
    setScreen("profiles");
  });
  $("#musicToggle").addEventListener("click", toggleMusic);
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close) closeMemory();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMemory();
      closeFinale();
    }
  });
}

renderProfiles();
renderHero();
renderRows();
renderReasons();
bindEvents();
