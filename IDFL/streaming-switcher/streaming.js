/* =====================================================
   STREAMING SWITCHER WITH AUTO FAILOVER
   Compatible: vBulletin 4.1.11
   ===================================================== */

// ====== CONFIG ======
var STREAM_SERVERS = [
  {
    label: "Server 1",
    url: "https://abyss.to/embed/XXXX"
  },
  {
    label: "Server 2",
    url: "https://vidsrcme.ru/embed/XXXX"
  },
  {
    label: "Server 3",
    url: "https://2embed.stream/embed/XXXX"
  },
  {
    label: "Server 4",
    url: "https://backup-stream.com/embed/XXXX"
  }
];

// waktu tunggu sebelum fallback (ms)
var FALLBACK_TIMEOUT = 6000;

// ====== STATE ======
var currentIndex = 0;
var fallbackTimer = null;

// ====== INIT ======
document.addEventListener("DOMContentLoaded", function () {
  initButtons();
  loadServer(0);
});

// ====== CORE ======
function loadServer(index) {
  if (!STREAM_SERVERS[index]) {
    showError("Semua server sedang tidak tersedia.");
    return;
  }

  currentIndex = index;

  var iframe = document.getElementById("videoPlayer");
  if (!iframe) return;

  iframe.src = STREAM_SERVERS[index].url;
  setActiveButton(index);

  // reset timer fallback
  if (fallbackTimer) clearTimeout(fallbackTimer);

  fallbackTimer = setTimeout(function () {
    autoFallback();
  }, FALLBACK_TIMEOUT);
}

function autoFallback() {
  var nextIndex = currentIndex + 1;
  if (STREAM_SERVERS[nextIndex]) {
    loadServer(nextIndex);
  } else {
    showError("Semua server sedang sibuk. Coba lagi nanti.");
  }
}

// ====== MANUAL SWITCH ======
function changeServer(serverNumber) {
  var index = serverNumber - 1;
  if (fallbackTimer) clearTimeout(fallbackTimer);
  loadServer(index);
}

// ====== UI ======
function initButtons() {
  var container = document.querySelector(".server-table");
  if (!container) return;

  var buttons = container.querySelectorAll("button");
  buttons.forEach(function (btn, i) {
    btn.innerText = STREAM_SERVERS[i]
      ? STREAM_SERVERS[i].label.toUpperCase()
      : "SERVER";
  });
}

function setActiveButton(index) {
  var buttons = document.querySelectorAll(".server-table button");
  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });

  if (buttons[index]) {
    buttons[index].classList.add("active");
  }
}

function showError(message) {
  var box = document.getElementById("player-box");
  if (!box) return;

  box.innerHTML =
    "<div style='background:#000;color:#fff;padding:25px;text-align:center'>" +
    message +
    "</div>";
}
