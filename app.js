// use mock data for one card
async function start() {
  // Load SQLite into the browser.
  const SQL = await initSqlJs({
    locateFile: file => `vendor/${file}`
  });

  // Download and open our database file.
  const response = await fetch('movies.db');
  if (!response.ok) throw new Error('Could not load movies.db');
  const bytes = await response.arrayBuffer();
  const db = new SQL.Database(new Uint8Array(bytes));

  // Our problem pages will go here.
  addPage('Problem 1', db.exec(`
  SELECT *
  FROM movies
  LIMIT 6;
`));


  
  db.close();
}

start().catch(showError);
