import { Route } from "./models/Route.js";
import { load } from "cheerio";
import fetch from "node-fetch";

export async function getRoutes() {
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
    let [shortName, longName] = $(link).text().trim().split(",");
    route.route_short_name = prepareShortName(shortName.trim());
    route.route_long_name = longName.trim();
    route.route_url = url;
    routes.push(route);
  });
  return routes;
}

function prepareShortName(name) {
  const names = name.split(" - ");
  if (names.length > 1) {
    return `${names[0]} - ${names[names.length - 1]}`;
  }
  return name;
}
