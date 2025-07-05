function applyPrintSettings() {
  const fontFamily = document.getElementById("font-family").value;
  const fontSize = document.getElementById("font-size").value + "pt";
  const lineHeight = document.getElementById("line-height").value;
  const pageMargin = (document.getElementById("margin")?.value || "1.5") + "cm";
  const gapBetween = (document.getElementById("gap-between")?.value || 0) + "px";

  let style = document.getElementById("dynamic-print-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-print-style";
    document.head.appendChild(style);
  }

  style.innerHTML = `
    /* 💻 معاينة الشاشة */
    body {
      font-family: "${fontFamily}", serif;
      font-size: ${fontSize};
      line-height: ${lineHeight};
      color: #000;
    }

    .project-box > div,
    .left-column > div {
      margin-bottom: ${gapBetween} !important;
    }

    /* 🖨️ الطباعة */
    @media print {
      body {
        font-family: "${fontFamily}", serif;
        font-size: ${fontSize};
        line-height: ${lineHeight};
        color: #000;
      }

      .project-box > div,
      .left-column > div {
        margin-bottom: ${gapBetween} !important;
      }

      .edit-button, .no-print, #print-btn, #save-btn, #clear-btn {
        display: none !important;
      }

      .left-column, .project-box, .profile-pic {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      h1, h2, h3, .project-box, .left-column > div {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      @page {
        margin: ${pageMargin};
      }
    }
  `;
}
