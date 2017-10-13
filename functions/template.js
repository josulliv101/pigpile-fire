const template = ({assets = {}, host = assets.url || '', body = '', css = '', initialState}) => {
  console.log('template', body)
  return `
  <!DOCTYLE html>
  <html>
    <head>
      <title>Pigpile</title>
      <meta charset="utf8"/>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1"/>
      <meta name="description" content="Free online fundraising. Be kind. Pigpile on good causes.">
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500"/>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Caveat"/>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Bungee"/>
      <style id="jss-server-side">${css}</style>
    </head>
    <body>
      <div id="app">${body}</div>
    </body>
    <script>
      window.__initialState = ${initialState}
    </script>
    <script src="/__/firebase/4.5.0/firebase-app.js" async></script>
    <script src="/__/firebase/4.5.0/firebase-firestore.js" async></script>
    <script src="/__/firebase/init.js" async></script>
    <script src='${host}/assets/client.bundle.js' async></script>
  </html>
  `;
};

module.exports = template;
