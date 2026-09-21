(function () {
  "use strict";

  // localStorage prefix is unique to this site -- never reuse hoc.tieng.viet.mobile's "vn-app-".
  // Chosen as "kh-app-" (no collision with vn-app- / bi-app- / zw-app-).
  var PREFIX = "kh-app-";
  var LAST_TAB_KEY = PREFIX + "last-tab";

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }
  function speakIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>';
  }

  // ---------------- TTS ----------------
  // Always speaks in SITE_DATA.ttsLocale ("ko-KR" here -- this site teaches Korean to
  // Vietnamese speakers, the reverse direction of hoc.tieng.viet.mobile, whose speak() always
  // used vi-VN). A short retry covers the same Chrome/WebKit race that project's comments
  // document: speechSynthesis.speak() called immediately after cancel() can be silently dropped.
  function currentVoice() {
    try {
      var voices = window.speechSynthesis.getVoices();
      var exact = voices.filter(function (v) { return v.lang === SITE_DATA.ttsLocale; });
      if (exact.length) return exact[0];
      var prefix = SITE_DATA.ttsLocale.split("-")[0];
      var loose = voices.filter(function (v) { return v.lang.indexOf(prefix) === 0; });
      return loose[0] || null;
    } catch (e) { return null; }
  }
  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    try {
      var synth = window.speechSynthesis;
      var hadActive = synth.speaking || synth.pending;
      if (hadActive) synth.cancel();
      var fire = function () {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = SITE_DATA.ttsLocale;
        var voice = currentVoice();
        if (voice) { u.voice = voice; u.lang = voice.lang; }
        synth.speak(u);
      };
      setTimeout(fire, hadActive ? 30 : 0);
    } catch (e) { /* no-op: speech unavailable */ }
  }
  function bindSpeakBtns(root) {
    root.querySelectorAll(".speak-btn").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        speak(b.dataset.speak);
      });
    });
  }

  // ---------------- last-active-tab persistence ----------------
  function saveLastTab(tabId) {
    try { window.localStorage && window.localStorage.setItem(LAST_TAB_KEY, tabId); } catch (e) { /* no-op */ }
  }
  function loadLastTab() {
    try { return window.localStorage && window.localStorage.getItem(LAST_TAB_KEY); } catch (e) { return null; }
  }

  // ---------------- rendering (UI chrome text in Tiếng Việt -- this site's explanation
  // language, reversed from bahasa-indonesia/zhong-wen where the UI chrome is Korean) ----------------
  function cardListHtml(items, query) {
    var q = query ? query.trim().toLowerCase() : "";
    var filtered = !q ? items : items.filter(function (it) {
      return it.base.toLowerCase().indexOf(q) >= 0 || it.ui.toLowerCase().indexOf(q) >= 0;
    });
    if (!filtered.length) return '<div class="empty-state">Không có kết quả.</div>';
    return '<div class="card-list">' + filtered.map(function (it) {
      return '<div class="card"><div class="card-base">' + escapeHtml(it.base) +
        '<button type="button" class="speak-btn" data-speak="' + escapeAttr(it.base) + '" aria-label="Nghe phát âm">' + speakIcon() + '</button></div>' +
        '<div class="card-ui">' + escapeHtml(it.ui) + '</div></div>';
    }).join("") + '</div>';
  }

  function renderCategoryPanel(panelRoot, category) {
    panelRoot.innerHTML =
      '<div class="search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<input type="text" class="cat-search" placeholder="Tìm kiếm"></div>' +
      '<div class="cat-list"></div>';
    var listEl = panelRoot.querySelector(".cat-list");
    var searchEl = panelRoot.querySelector(".cat-search");
    function draw() { listEl.innerHTML = cardListHtml(category.items, searchEl.value); bindSpeakBtns(listEl); }
    draw();
    searchEl.addEventListener("input", draw);
  }

  function renderReviewPanel(panelRoot, allItems) {
    var idx = 0;
    panelRoot.innerHTML = '<div id="review-card-root"></div><div class="flash-hint">Nhấn vào thẻ để xem nghĩa &middot; Nhấn lại để xem thẻ tiếp theo</div>';
    var cardRoot = panelRoot.querySelector("#review-card-root");
    function draw() {
      if (!allItems.length) { cardRoot.innerHTML = '<div class="empty-state">Không có mục để ôn tập.</div>'; return; }
      var it = allItems[idx % allItems.length];
      cardRoot.innerHTML = '<div class="flash-card" data-revealed="false">' +
        '<div class="fc-base">' + escapeHtml(it.base) + '</div>' +
        '<div class="fc-ui">' + escapeHtml(it.ui) + '</div></div>';
      var card = cardRoot.querySelector(".flash-card");
      card.addEventListener("click", function () {
        if (card.dataset.revealed !== "true") { card.dataset.revealed = "true"; }
        else { idx++; draw(); }
      });
    }
    draw();
  }

  function init() {
    if (typeof SITE_DATA === "undefined") return;
    var tabBar = document.getElementById("tab-bar");
    var panelsRoot = document.getElementById("panels-root");
    var tabs = SITE_DATA.categories.map(function (c) { return { id: c.id, label: c.label.ui }; });
    tabs.push({ id: "review", label: "Ôn tập" });

    tabBar.innerHTML = tabs.map(function (t, i) {
      return '<button type="button" class="tab-btn" role="tab" data-tab="' + t.id + '" aria-selected="' + (i === 0 ? "true" : "false") + '">' + escapeHtml(t.label) + '</button>';
    }).join("");

    var panelEls = {};
    tabs.forEach(function (t) {
      var el = document.createElement("div");
      el.className = "panel" + (t.id === tabs[0].id ? " active" : "");
      el.dataset.panel = t.id;
      panelsRoot.appendChild(el);
      panelEls[t.id] = el;
    });

    var allItems = [];
    SITE_DATA.categories.forEach(function (c) { allItems = allItems.concat(c.items); });

    var rendered = {};
    function activate(tabId) {
      if (!panelEls[tabId]) return;
      tabBar.querySelectorAll(".tab-btn").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === tabId ? "true" : "false"); });
      Object.keys(panelEls).forEach(function (k) { panelEls[k].classList.toggle("active", k === tabId); });
      if (!rendered[tabId]) {
        rendered[tabId] = true;
        if (tabId === "review") {
          renderReviewPanel(panelEls.review, allItems);
        } else {
          var category = SITE_DATA.categories.filter(function (c) { return c.id === tabId; })[0];
          if (category) renderCategoryPanel(panelEls[tabId], category);
        }
      }
      saveLastTab(tabId);
    }

    tabBar.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { activate(btn.dataset.tab); });
    });

    var startTab = loadLastTab();
    activate((startTab && panelEls[startTab]) ? startTab : tabs[0].id);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // ---------------- service worker ----------------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* no-op: offline shell optional */ });
    });
  }
})();
