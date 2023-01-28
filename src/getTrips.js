import { Trip } from "./models/Trip.js";
import { load } from "cheerio";
import fetch from "node-fetch";

export async function getTrips(routes, calendars) {
  const trips = [];
  for (let route of routes.slice(0, 1)) {
    const text = await fetch(route.route_url + "&t=2").then((res) =>
      res.text()
    );
    const $ = load(text);
    $(
      "#ctl00_ContentPlaceHolder1_RouteScheduleTimes_TopGroupsList1_ctl00_GroupsList1_ctl00_ScheduleTimesControl1_DataList1 tr table tr:first-child td:first-child b"
    ).each((index, el) => {
      const calName = $(el).text().trim();
      const calendar = calendars.find((c) => c.service_id == calName);
      if (calendar) {
        const trip = new Trip();
        trip.service_id = calendar.service_id;
        trip.route_id = route.route_id;
        trip.trip_id = `${trip.route_id}_${trip.service_id}`;
        trips.push(trip);
      }
    });
  }
  return trips;
}
