/* ==========================================
   Streaming Switcher (STABLE VERSION)
   Server 1 : short.icu (slug)
   Server 2 : vidsrcme (IMDb)
   Server 3 : 2embed (IMDb)
   Compatible: vBulletin 4.1.11
========================================== */

var STREAM_SERVERS = [
  {
    label: "Server 1",
    build: (imdb, slug) =>
      slug ? `https://short.icu/${slug}` : null
  },
  {
    label: "Server 2",
    build: imdb =>
      `https://vidsrcme.ru/embed/movie?imdb=${imdb}`
  },
  {
    label: "Server 3",
    build: imdb =>
      `https://www.2embed.stream/embed/movie/${imdb}`
  }
];

var currentIndex = 0;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  loadServer(0);
});

// ===== LOAD SERVER =====
function loadServer(index) {
  var box = document.getElementById("player-box");
  if (!box || !STREAM_SERVERS[index]) return;

  var imdb = box.getAttribute("data-imdb");
  var slug = box.getAttribute("data-slug");

  if (!imdb) {
    showError("IMDb ID tidak ditemukan.");
    return;
  }

  var url = STREAM_SERVERS[index].build(imdb, slug);

  // Server 1 tapi slug kosong → langsung lompat ke Server 2
  if (!url) {
    loadServer(index + 1);
    return;
  }

  currentIndex = index;
  document.getElementById("videoPlayer").src = url;
  setActiveButton(index);
}

// ===== MANUAL SWITCH =====
function changeServer(n) {
  loadServer(n - 1);
}

// ===== UI =====
function setActiveButton(index) {
  document.querySelectorAll(".server-table button")
    .forEach(btn => btn.classList.remove("active"));

  var btn = document.querySelectorAll(".server-table button")[index];
  if (btn) btn.classList.add("active");
}

function showError(msg) {
  var box = document.getElementById("player-box");
  if (!box) return;

  box.innerHTML =
    "<div style='background:#000;color:#fff;padding:20px;text-align:center'>" +
    msg +
    "</div>";
}
