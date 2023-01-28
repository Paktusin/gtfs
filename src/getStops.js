import { Stop } from "./models/Stop.js";
import fetch from "node-fetch";

export async function getStops(routes) {
  const stops = [];
  for (let route of routes) {
    const res = await fetch(
      `https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=${route.route_id}`
    ).then((res) => res.json());
    const connections = res.data.reversedRouteConnections;
    for (let conn of connections) {
      const stop = new Stop();
      stop.stop_id = conn.id;
      stop.parent_station = stop.stop_id;
      stop.stop_name = conn.title;
      stop.stop_lon = conn.longitude;
      stop.stop_lat = conn.latitude;
      stops.push(stop);
    }
  }
  return stops;
}
