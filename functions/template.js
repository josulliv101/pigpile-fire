/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Template file that the server will use to inject the React markup and
// initial state before sending it to the client

const template = opts => {
  return `
  <!DOCTYLE html>
  <html>
    <head>
      <title>Pigpile</title>
      <meta name="description" content="Be kind. Pigpile on good causes. Free online fundraising.">
      <!-- Bootstrap -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
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
    <script src="/__/firebase/4.5.0/firebase-app.js"></script>
    <script src="/__/firebase/4.5.0/firebase-database.js"></script>
    <script src="/__/firebase/4.5.0/firebase-firestore.js"></script>
    <script src="/__/firebase/init.js"></script>
    <script src='${opts.assetsUrl || ''}/assets/client.bundle.js'></script>
  </html>
  `;
};

module.exports = template;
