window.timerOW = 7000;
var urlPrefix = "https://cdn.jsdelivr.net/gh/nooboss/noob_libs.github.io@1.0.3";

window.url_js_cs = urlPrefix + "/cs.js";

window.url_gb_kiki = urlPrefix + "/gb_kiki.js";
window.url_js_main_kiki = urlPrefix + "/main_kiki.js";

// window.url_js_cs = "../cs.js";
// window.gb_kiki = "../gb_kiki.js";
// window.url_js_main_kiki = "../main_kiki.js";

var script = document.createElement('script'); 
script.src = window.url_js_cs;
document.head.appendChild(script);

var script3 = document.createElement('script'); 
script3.src = window.url_gb_kiki;
document.head.appendChild(script3);

var script4 = document.createElement('script'); 
script4.src = window.url_js_main_kiki;
document.head.appendChild(script4);