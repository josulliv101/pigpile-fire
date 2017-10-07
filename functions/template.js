const template = ({assets = {}, host = assets.url || '', body = '', css = '', initialState}) => {
  console.log('template', body)
  return `
  <!DOCTYLE html>
  <html>
    <head>
      <title>Pigpile</title>
      <meta name="description" content="Free online fundraising. Be kind. Pigpile on good causes.">
      <!-- Custom CSS
      <link rel="stylesheet" href="/assets/custom.css" />-->
      <style>${css}</style>
    </head>
    <body>
      <div id="root">${body}</div>
    </body>
    <script>
      window.__initialState = ${initialState}
    </script>
    <script src="/__/firebase/4.5.0/firebase-app.js" defer></script>
    <script src="/__/firebase/4.5.0/firebase-database.js" defer></script>
    <script src="/__/firebase/4.5.0/firebase-firestore.js" defer></script>
    <script src="/__/firebase/init.js" defer></script>
    <script src='${host}/assets/client.bundle.js' defer></script>
  </html>
  `;
};

module.exports = template;
