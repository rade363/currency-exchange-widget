const dotenv = require('dotenv');

dotenv.config();

const { app } = require('./dist/server.js');

const PORT = Number(process.env.WEB_PORT || 5000);

app.listen(PORT, () => {
  console.log(`Web server listens on port: ${PORT}`);
});
