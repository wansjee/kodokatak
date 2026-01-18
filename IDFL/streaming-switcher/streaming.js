/* ==========================================
   Simple Iframe Streaming Switcher
   vBulletin 4.1.11 Compatible
========================================== */

function loadIframe(server) {
  var box = document.getElementById("player-box");
  if (!box) return;

  var imdb = box.getAttribute("data-imdb");
  var slug = box.getAttribute("data-slug");
  var iframe = document.getElementById("videoPlayer");

  if (!iframe || !imdb) return;

  var url = "";

  if (server === 1 && slug) {
    url = "https://short.icu/" + slug;
  }

  if (server === 2) {
    url = "https://vidsrcme.ru/embed/movie?imdb=" + imdb;
  }

  if (server === 3) {
    url = "https://www.2embed.stream/embed/movie/" + imdb;
  }

  if (url) {
    iframe.src = url;
    setActive(server);
  }
}

function setActive(server) {
  var buttons = document.querySelectorAll(".server-table button");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (buttons[server - 1]) {
    buttons[server - 1].classList.add("active");
  }
}

// load default server (Server 1 kalau ada slug, kalau tidak Server 2)
document.addEventListener("DOMContentLoaded", function () {
  var box = document.getElementById("player-box");
  if (!box) return;

  var slug = box.getAttribute("data-slug");
  if (slug) {
    loadIframe(1);
  } else {
    loadIframe(2);
  }
});
