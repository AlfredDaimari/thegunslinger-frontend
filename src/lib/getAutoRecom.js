export default async function getAutoRecom(str) {
  var header = new Headers();
  header.append("Content-Type", "application/json");
  var recommendations = await fetch(
    "http://localhost/products/" + str + "/query",
    {
      headers: header,
    }
  );
  recommendations = await recommendations.json();
  return recommendations;
}
