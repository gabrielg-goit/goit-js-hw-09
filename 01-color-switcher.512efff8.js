!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}var n=null;t.addEventListener("click",(function(){n=setInterval(a,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.512efff8.js.map
