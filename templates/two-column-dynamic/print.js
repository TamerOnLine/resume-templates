function applyPrintSettings() {
  const fontFamily = document.getElementById("font-family").value;
  const fontSize = document.getElementById("font-size").value + "pt";
  const lineHeight = document.getElementById("line-height").value;
  const hideLeft = document.getElementById("hide-left-column").checked;
  const pageMargin = document.getElementById("margin").value + "cm";

  // إنشاء عنصر style أو استرجاعه
  let style = document.getElementById("dynamic-print-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-print-style";
    document.head.appendChild(style);
  }

  // توليد CSS مخصص للطباعة
  style.innerHTML = `
    @media print {
      body, .left-column, .right-column, .project-box {
        font-family: "${fontFamily}", sans-serif !important;
        font-size: ${fontSize} !important;
        line-height: ${lineHeight} !important;
        color: #000 !important;
      }

      ${hideLeft ? `
        .left-column { display: none !important; }
        .right-column { width: 100% !important; }
      ` : ""}

      .edit-button, .no-print, #print-btn, #save-btn, #clear-btn {
        display: none !important;
      }

      @page {
        margin: ${pageMargin};
      }

      .profile-pic,
      .project-box {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `;
}
