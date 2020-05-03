window.includeJS_GD = function() {
        setTimeout(function () {
          (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = window.url_js_main;
                fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'game' + 'distribution-jssdk'));
        }, window.timerOW);
};

window.executeGD = function() {
  (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = window.url_js_main;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "game" + "distribution-jssdk");
};