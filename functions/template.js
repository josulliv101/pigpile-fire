const template = opts => {
  return `
  <!DOCTYLE html>
  <html>
    <head>
      <title>Pigpile</title>
      <meta name="description" content="Free online fundraising. Be kind. Pigpile on good causes.">
      <!-- Custom CSS 
      <link rel="stylesheet" href="/assets/custom.css" />-->
      <style>${opts.css}</style>
    </head>
    <body>
      <div id="root">${opts.body}</div>
    </body>
    <script>
      window.__initialState = ${opts.initialState}
    </script>
    <script src="/__/firebase/4.5.0/firebase-app.js" defer></script>
    <script src="/__/firebase/4.5.0/firebase-database.js" defer></script>
    <script src="/__/firebase/4.5.0/firebase-firestore.js" defer></script>
    <script src="/__/firebase/init.js" defer></script>
    <script src='${opts.assetsUrl || ''}/assets/client.bundle.js' defer></script>
  </html>
  `;
};

module.exports = template;
