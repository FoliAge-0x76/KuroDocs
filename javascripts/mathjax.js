window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  startup: {
    typeset: false
  }
};

const mathJaxScript = document.createElement("script");
mathJaxScript.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
mathJaxScript.async = true;
mathJaxScript.onload = typesetMath;
document.head.appendChild(mathJaxScript);

function typesetMath() {
  if (!window.MathJax?.startup?.promise) return;

  MathJax.startup.promise.then(() => {
    MathJax.startup.output.clearCache();
    MathJax.typesetClear();
    MathJax.texReset();
    return MathJax.typesetPromise();
  }).catch((error) => {
    console.error("MathJax typesetting failed", error);
  });
}

window.addEventListener("load", typesetMath);

if (typeof document$ !== "undefined") {
  document$.subscribe(typesetMath); // 兼容支持即时加载的主题
}