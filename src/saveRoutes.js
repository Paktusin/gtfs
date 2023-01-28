import { saveData } from "./saveData.js";
import { Route } from "./models/Route.js";
import { load } from "cheerio";

export async function saveRoutes() {
  const routes = [];
  const text = await fetch(
    "https://www.cyprusbybus.com/routes.aspx?sid=1"
  ).then((res) => res.text());
  const $ = load(text);
  const links = $("#ctl00_ContentPlaceHolder1_gvRoutes tr td:first-child a");
  links.each((index, link) => {
    const url = link.attribs["href"];
    const id = url.substring(url.indexOf("?id=") + 4);
    const name = $(link).text().trim();

    const route = new Route();
  });

  return saveData("routes", [routes]);
}
