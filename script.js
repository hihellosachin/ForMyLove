import { storage, db }
from './firebase-config.js';

import {
  ref,
  uploadBytes,
  getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  collection,
  addDoc,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const entry = document.getElementById('entry-screen');
const main = document.getElementById('main-site');
const selfieUpload = document.getElementById('selfie-upload');
const dayGrid = document.getElementById('day-grid');

document.getElementById('no-btn').addEventListener('mouseover', () => {

  document.getElementById('yes-btn').style.transform =
    'scale(1.2)';

  document.getElementById('no-btn').style.transform =
    `translate(${Math.random() * 100 - 50}px,
    ${Math.random() * 100 - 50}px)`;
});

function enterSite() {

  const file = selfieUpload.files[0];

  if (!file) {

    showPopup(
      "Cutieee 😘 please upload your selfie first!"
    );

    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {

    main.style.backgroundImage =
      `url('${e.target.result}')`;

    document.getElementById('decorated-photo')
      .style.backgroundImage =
      `url('${e.target.result}')`;

    entry.classList.add('hidden');

    main.classList.remove('hidden');

    showCountdown();

    renderDays();
  };

  reader.readAsDataURL(file);
}

window.enterSite = enterSite;

function toggleDropdown() {

  dayGrid.style.display =
    dayGrid.style.display === 'grid'
      ? 'none'
      : 'grid';
}

window.toggleDropdown = toggleDropdown;

function showCountdown() {

  const birthday =
    new Date(new Date().getFullYear(), 9, 14);

  const timerEl =
    document.getElementById('live-timer');

  setInterval(() => {

    const now = new Date();

    const diff = birthday - now;

    const days =
      Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor((diff / (1000 * 60 * 60)) % 24);

    const minutes =
      Math.floor((diff / (1000 * 60)) % 60);

    const seconds =
      Math.floor((diff / 1000) % 60);

    timerEl.innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s left 💖`;

  }, 1000);
}

const messages = [
  "You're perfect just the way you are 💖",
  "You make my heart skip a beat 💓",
  "Every day with you is the best day 💘",
  "I love the way you smile 😍",
  "You make life so much sweeter 🍭",
  "You are the peanut butter to my jelly 🥪"
];

function renderDays() {

  const today = new Date();

  const birthday =
    new Date(today.getFullYear(), 9, 14);

  const daysRemaining =
    Math.floor((birthday - today) /
    (1000 * 60 * 60 * 24));

  dayGrid.innerHTML = '';

  for (let i = daysRemaining; i >= 0; i--) {

    const btn = document.createElement('div');

    btn.className = 'day-card';

    const dayOffset = daysRemaining - i;

    const locked = i !== daysRemaining;

    btn.classList.toggle('locked', locked);

    btn.innerText = `${i} days`;

    btn.onclick = () => {

      document
        .querySelectorAll('.animated-message-box')
        .forEach(p => p.remove());

      const wish =
        `Hey baby! Today is ${i} days before your special day 💖`;

      const msg =
        messages[dayOffset % messages.length];

      showPopup(
        locked
          ? "Be patient baby 💞 you can't open this yet!"
          : wish + "\n\n" + msg
      );
    };

    dayGrid.appendChild(btn);
  }
}

function showPopup(text) {

  const box = document.createElement('div');

  box.className = "animated-message-box";

  box.innerText = text;

  document.body.appendChild(box);

  setTimeout(() => box.remove(), 6000);
}

const hearts = ["💖", "💕", "💘", "💝", "💗"];

function spawnEmojiHeart() {

  const heart = document.createElement("div");

  heart.textContent =
    hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.position = "fixed";

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.top = "100vh";

  heart.style.fontSize =
    Math.floor(Math.random() * 12 + 24) + "px";

  heart.style.animation =
    "floatEmoji 5s linear forwards";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}

setInterval(spawnEmojiHeart, 250);

/* =========================================
   MEMORY UPLOAD SYSTEM
========================================= */

const memoryUpload =
  document.getElementById('memory-upload');

const memoryFeed =
  document.getElementById('memory-feed');

if (memoryUpload) {

  memoryUpload.addEventListener(
    'change',
    uploadMemory
  );
}

async function uploadMemory(e) {

  const file = e.target.files[0];

  if (!file) return;

  try {

    showPopup("Uploading memory 💖");

    const storageRef =
      ref(
        storage,
        `memories/${Date.now()}_${file.name}`
      );

    await uploadBytes(storageRef, file);

    const imageUrl =
      await getDownloadURL(storageRef);

    await addDoc(
      collection(db, "memories"),
      {
        imageUrl,
        uploadedAt: new Date()
      }
    );

    showPopup(
      "Memory uploaded successfully 💕"
    );

    loadMemories();

  } catch (error) {

    console.error(error);

    showPopup(
      "Upload failed 😢"
    );
  }
}

async function loadMemories() {

  if (!memoryFeed) return;

  memoryFeed.innerHTML = '';

  const querySnapshot =
    await getDocs(
      collection(db, "memories")
    );

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    const card =
      document.createElement('div');

    card.className = 'memory-card';

    card.innerHTML = `
      <img src="${data.imageUrl}" />
    `;

    memoryFeed.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', () => {

  loadMemories();

});
