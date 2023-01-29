//"https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=40&languageId=1"
import { getRoutes } from "./src/getRoutes.js";
import { getAgency } from "./src/getAgency.js";
import { getInfo } from "./src/getInfo.js";
import { saveData } from "./src/saveData.js";
import zipper from "zip-local";

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
  saveData("feed_info", [
    {
      feed_publisher_name: agency.agency_name,
      feed_publisher_url: agency.agency_url,
      feed_lang: "en",
    },
  ]);
  zipData();
})();

function zipData() {
  zipper.zip("./out", (error, zipped) => {
    if (!error) {
      zipped.compress();
      var buff = zipped.memory();
      zipped.save("./out/gtfs.zip", (error) => {
        if (!error) {
          console.log("saved successfully !");
        }
      });
    }
  });
}
