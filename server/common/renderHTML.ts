const renderHTML = (componentHTML: any, assetUrl: string) => {
	// tslint:disable:max-line-length
	return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="//cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css" media="all" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Alegreya+SC" rel="stylesheet">
          <title>Collect Team</title>
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/static/js/bundle.js"></script>
      </body>
    </html>
  `;
};

export default renderHTML;
