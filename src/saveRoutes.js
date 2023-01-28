import { saveData } from "./saveData.js";
import { Route } from "./models/Route.js";
import { load } from "cheerio";
import fetch from "node-fetch";

export async function saveRoutes() {
  const routes = [];
  const text = await fetch(
    "https://www.cyprusbybus.com/routes.aspx?sid=1"
  ).then((res) => res.text());
  const $ = load(text);
  const links = $("#ctl00_ContentPlaceHolder1_gvRoutes tr td:first-child a");
  links.each((index, link) => {
    const route = new Route();
    const url = link.attribs["href"];
    route.route_id = url.substring(url.indexOf("?id=") + 4);
    const [shortName, longName] = $(link).text().trim().split(",");
    route.route_short_name = shortName.trim();
    route.route_long_name = longName.trim();
    routes.push(route);
  });
  return saveData("routes", routes);
}
