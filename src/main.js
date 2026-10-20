import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
  const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
  entrance.from(".hero-copy .eyebrow", { y: 14, opacity: 0, duration: 0.55 })
    .from(".hero h1", { y: 38, opacity: 0, duration: 0.85 }, "-=0.25")
    .from(".hero-deck, .hero-actions, .hero-index", { y: 18, opacity: 0, duration: 0.65, stagger: 0.1 }, "-=0.42")
    .from(".hero-art", { scale: 0.94, opacity: 0, duration: 1.1 }, "-=0.9");

  gsap.to(".art-card", {
    y: -24,
    rotate: -1,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 }
  });
  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      y: 26,
      opacity: 0,
      duration: 0.72,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 86%", once: true }
    });
  });
  gsap.from(".story-step", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.16,
    ease: "power2.out",
    scrollTrigger: { trigger: ".story-path", start: "top 78%", once: true }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "關閉導覽選單" : "開啟導覽選單");
});
document.querySelectorAll(".desktop-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "開啟導覽選單");
  });
});

const clues = {
  ticket: {
    index: "線索 01 / 03",
    category: "票券細節",
    title: "電影票與 QR code",
    description: "電影票可能包含場次、座位或可讀取資訊的 QR code。上傳前先確認哪些細節不需要公開。"
  },
  uniform: {
    index: "線索 02 / 03",
    category: "個人識別",
    title: "姓名、學號或校名",
    description: "校服上的姓名、學號，或明顯的校園資訊，可能讓陌生人更容易辨認你的身分。可以先遮住再分享。"
  },
  location: {
    index: "線索 03 / 03",
    category: "位置資訊",
    title: "位置標籤與時間",
    description: "照片或貼文可能附帶位置。想一想是否需要現在公開；也可以關閉定位，或等離開後再分享。"
  }
};
const clueButtons = [...document.querySelectorAll("[data-clue]")];
function showClue(key) {
  const clue = clues[key];
  if (!clue) return;
  document.querySelector("#clue-index").textContent = clue.index;
  document.querySelector("#clue-category").textContent = clue.category;
  document.querySelector("#clue-title").textContent = clue.title;
  document.querySelector("#clue-description").textContent = clue.description;
  clueButtons.forEach((button) => {
    const active = button.dataset.clue === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
clueButtons.forEach((button) => button.addEventListener("click", () => showClue(button.dataset.clue)));

const responseCopy = {
  remove: "先移除可能帶來風險的貼文，再和信任的大人說說發生了什麼。",
  block: "封鎖陌生帳號可以停止對方繼續傳訊息；如果覺得害怕或不安，找信任的大人一起處理。",
  audience: "檢查誰能看見貼文，並把分享對象調整為自己認識的人。"
};
document.querySelectorAll("[data-response]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-response]").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelector("#response-feedback").textContent = responseCopy[button.dataset.response];
  });
});

const checklist = document.querySelector("#checklist-form");
const checklistInputs = [...checklist.querySelectorAll("input[type=checkbox]")];
function updateChecklist() {
  const complete = checklistInputs.filter((input) => input.checked).length;
  document.querySelector("#check-progress").textContent = "已檢查 " + complete + " / " + checklistInputs.length + " 項";
  document.querySelector("#progress-fill").style.width = ((complete / checklistInputs.length) * 100) + "%";
  document.querySelector("#check-message").textContent = complete === checklistInputs.length
    ? "完成檢查！你已替這次分享多留意幾個重要細節。"
    : complete === 0
      ? "慢慢看，每一項都是保護自己的方法。"
      : "很棒，繼續檢查；你可以依照每張照片調整清單。";
}
checklist.addEventListener("change", updateChecklist);

const feedbackForm = document.querySelector("#feedback-form");
const feedbackStatus = document.querySelector("#form-status");
const feedbackEndpoint = (import.meta.env.VITE_APPS_SCRIPT_URL || "").trim();
if (feedbackEndpoint) {
  feedbackStatus.textContent = "匿名回饋已啟用。請勿在任何欄位輸入可辨識身分的資料。";
}
feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!feedbackForm.reportValidity()) return;
  const answers = new FormData(feedbackForm);
  const response = {
    confidence: answers.get("confidence"),
    checks: answers.getAll("checks"),
    actions: answers.getAll("actions"),
    helpful: answers.get("helpful"),
    difficulty: answers.get("difficulty")
  };
  if (!feedbackEndpoint) {
    feedbackStatus.textContent = "感謝完成預覽！目前未連接回饋試算表，你的答案沒有送出或保存。";
    return;
  }
  feedbackStatus.textContent = "正在送出回饋…";
  try {
    await fetch(feedbackEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(response)
    });
    feedbackStatus.textContent = "已送出回饋請求。瀏覽器無法讀取 Apps Script 的跨網域回應，請由管理者確認試算表是否收到資料。";
    feedbackForm.reset();
  } catch {
    feedbackStatus.textContent = "送出失敗，請稍後再試。你的答案仍留在目前畫面。";
  }
});
