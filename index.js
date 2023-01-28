//"https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=40&languageId=1"
import { getAgency } from "./src/getAgency.js";
import { getCalendars } from "./src/getCalendars.js";
import { getRoutes } from "./src/getRoutes.js";
import { saveData } from "./src/saveData.js";
import { getTrips } from "./src/getTrips.js";
import { getStops } from "./src/getStops.js";

(async () => {
  const agency = getAgency();
  const calendars = getCalendars();
  const routes = await getRoutes();
  const trips = await getTrips(routes, calendars);
  const stops = await getStops(routes);

  saveData("agency", [agency]);
  saveData("calendar", calendars);
  saveData("routes", routes);
  saveData("trips", trips);
  saveData("stops", stops);
})();
