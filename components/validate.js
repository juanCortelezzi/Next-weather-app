export default function validate(query, bash = false) {
  if (!bash) {
    const mainRegex = /^[a-zA-Z ]{1,30},[a-zA-Z ]{2,10}$/;
    const testMainRegex = mainRegex.test(query);

    if (!testMainRegex) return { query: query, valid: testMainRegex };

    const splitQuery = query.split(",");
    const city = splitQuery[0].replace(/^\s+|\s(?=\s)|\s+$/g, "");
    const country = splitQuery[1].replace(/\s+/g, "");

    const finalQuery = `${city},${country}`;

    return { query: finalQuery, valid: testMainRegex };
  } else {
    const mainRegex = /^[a-zA-Z-]{1,30},[a-zA-Z]{2}$/;
    const testMainRegex = mainRegex.test(query);

    if (!testMainRegex) return { query: query, valid: testMainRegex };

    const splitQuery = query.split(",");
    const city1 = splitQuery[0].replace(/^-+|-(?=-)|-+$/g, "");
    const city2 = city1.replace(/-/g, " ");
    const country = splitQuery[1].replace(/-+/g, "");
    const finalQuery = `${city2},${country}`;

    return { query: finalQuery, valid: testMainRegex };
  }
}
