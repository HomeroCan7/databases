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

  try {
    addPage('Problem 1', db.exec(`
      SELECT title, year
      FROM movies
      WHERE year = 2000
      ORDER BY title, id
      LIMIT 12;
    `));

    addPage('Problem 2', db.exec(`
      SELECT title, rating
      FROM movies
      WHERE ('|' || genres || '|') LIKE '%|Comedy|%'
      ORDER BY rating DESC, title, id
      LIMIT 5;
    `));

    addPage('Problem 3', db.exec(`
      SELECT title, year, rating
      FROM movies
      WHERE ('|' || genres || '|') LIKE '%|Horror|%' AND rating_count >= 20
      ORDER BY rating DESC, title, id
      LIMIT 5;
    `));

    addPage('Problem 4', db.exec(`
      SELECT title, year, rating
      FROM movies
      WHERE year = 2000 AND ('|' || genres || '|') LIKE '%|Comedy|%'
      ORDER BY title, id
      LIMIT 8;
    `));

    addPage('Problem 5', db.exec(`
      SELECT title, year, rating, rating_count
      FROM movies
      WHERE year >= 2010 AND ('|' || genres || '|') LIKE '%|Horror|%' AND rating_count >= 20
      ORDER BY year DESC, title, id
      LIMIT 5;
    `));

    addPage('Problem 6', db.exec(`
      SELECT title, year, rating
      FROM movies
      WHERE year < 1990 AND rating >= 4 AND rating_count >= 50
      ORDER BY rating DESC, title, id
      LIMIT 10;
    `));

    addPage('Problem 7', db.exec(`
      SELECT title, genres, rating
      FROM movies
      WHERE ('|' || genres || '|') LIKE '%|Horror|%' AND ('|' || genres || '|') LIKE '%|Comedy|%' AND rating_count >= 10
      ORDER BY rating DESC, title, id
      LIMIT 5;
    `));

    addPage('Problem 8', db.exec(`
      SELECT title, year, rating_count
      FROM movies
      WHERE year BETWEEN 2000 AND 2009 AND rating_count >= 50
      ORDER BY rating_count DESC, title, id
      LIMIT 5;
    `));

  } finally {
    db.close();
  }
}

start().catch(showError);
