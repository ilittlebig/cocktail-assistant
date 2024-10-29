/**
 * Utility function to print a given HTML content.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

export function printHTMLContent(htmlContent: string) {
  const iframe = document.createElement("iframe");
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (iframeDoc) {
    const fullHtmlContent = `
      <html>
        <head>
          <style>
            body {
              padding: 20px;
            }
            h3 {
              text-align: left;
            }
            hr {
              border: 1px solid #ccc;
              margin: 16px 0;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin: 4px 0;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(fullHtmlContent);
    iframeDoc.close();

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
    };
  } else {
    console.error("Failed to access iframe document.");
  }
}
