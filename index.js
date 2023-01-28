//"https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=40&languageId=1"
import { getRoutes } from "./src/getRoutes.js";
import { getAgency } from "./src/getAgency.js";
import { getInfo } from "./src/getInfo.js";
import { saveData } from "./src/saveData.js";
import zip from "file-zip";

(async () => {
  const agency = getAgency();
  const routes = await getRoutes();
  const [calendars, trips, stop_times, stops] = await getInfo(routes);

  saveData("agency", [agency]);
  saveData("calendar", calendars);
  saveData("routes", routes);
  saveData("trips", trips);
  saveData("stops", stops);
  saveData("stop_times", stop_times);
  zip.zipFile(["./out"], "./out/gtfs.zip");
})();
