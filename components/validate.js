export default function validate(query, bash = false) {
  // asked for validation from browser
  if (!bash) {
    const mainRegex = /^[a-zA-Z ]{1,40}(,[a-zA-Z ]{2,10})?$/;
    const testMainRegex = mainRegex.test(query);

    if (!testMainRegex) return { query: query, valid: testMainRegex };

    query = query.replace(/^\s+|\s(?=\s)|\s+$/g, "");

    const hasCommaRegex = /.*,.*/;
    const testHasCommaRegex = hasCommaRegex.test(query);

    if (testHasCommaRegex) {
      const splitQuery = query.split(",");
      const city = splitQuery[0].replace(/\s+$/g, "");
      const country = splitQuery[1].replace(/\s+/g, "");
      const finalQuery = `${city},${country}`;
      return { query: finalQuery, valid: testMainRegex };
    }

    return { query: query, valid: testMainRegex };
  }

  // asked for validation from terminal (curl)

  const mainRegex = /^[a-zA-Z-]{1,40}(,[a-zA-Z]{2})?$/;
  const testMainRegex = mainRegex.test(query);

  if (!testMainRegex) return { query: query, valid: testMainRegex };

  query = query.replace(/^-+|-(?=-)|-+$/g, "");

  const hasCommaRegex = /^.*,.*$/;
  const testHasCommaRegex = hasCommaRegex.test(query);

  if (testHasCommaRegex) {
    const splitQuery = query.split(",");
    let city1 = splitQuery[0].replace(/-+$/g, "");
    city1 = city1.replace(/-/g, " ");
    const country = splitQuery[1];
    const finalQuery = `${city1},${country}`;
    return { query: finalQuery, valid: testMainRegex };
  }

  let finalQuery = query.replace(/-+$/g, "");
  finalQuery = finalQuery.replace(/-/g, " ");
  return { query: finalQuery, valid: testMainRegex };
}
