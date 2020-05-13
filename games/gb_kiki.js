window.url_js_main_kiki = "https://cdn.jsdelivr.net/gh/mikeylibs/mikeylibs.github.io@1.0.5/games/main_kiki.js";
// window.url_js_main_kiki = "main_kiki.js";
window.timerOW = 8000;

window.includeJS_GD = function() {
        setTimeout(function () {
          console.log("K.O.");
          (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = window.url_js_main_kiki;
                fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'game' + 'distribution-jssdk'));
        }, window.timerOW);
};

window.executeGD = function() {
  console.log("QQQQ");
  (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = window.url_js_main_kiki;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "game" + "distribution-jssdk");
};