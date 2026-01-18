/* ==========================================
   Conditional Streaming Switcher
   vBulletin 4.1.11 Compatible
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  var box = document.querySelector(".player-wrapper");
  if (!box) return;

  var servers = [
    {
      label: "SERVER 1",
      value: box.getAttribute("data-s1"),
      build: v => "https://short.icu/" + v
    },
    {
      label: "SERVER 2",
      value: box.getAttribute("data-s2"),
      build: v => "https://vidsrcme.ru/embed/movie?imdb=" + v
    },
    {
      label: "SERVER 3",
      value: box.getAttribute("data-s3"),
      build: v => "https://www.2embed.stream/embed/movie/" + v
    }
  ];

  var iframe = document.getElementById("videoPlayer");
  var table  = document.getElementById("serverTable");

  // filter server yang ADA saja
  var activeServers = servers.filter(s => s.value);

  if (activeServers.length === 0) return;

  // build table
  var html = "<tr><th colspan='" + activeServers.length + "'>PILIH SERVER</th></tr><tr>";
  activeServers.forEach(function (s, i) {
    html += "<td><button onclick='loadServer(" + i + ")'>" + s.label + "</button></td>";
  });
  html += "</tr>";
  table.innerHTML = html;

  // expose loader
  window.loadServer = function (index) {
    var srv = activeServers[index];
    if (!srv) return;
    iframe.src = srv.build(srv.value);
    setActive(index);
  };

  function setActive(index) {
    table.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    var btn = table.querySelectorAll("button")[index];
    if (btn) btn.classList.add("active");
  }

  // load default = server pertama yang tersedia
  loadServer(0);
});
