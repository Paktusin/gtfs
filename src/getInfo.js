import { Trip } from "./models/Trip.js";
import { Calendar } from "./models/Calendar.js";
import { Stop } from "./models/Stop.js";
import { StopTime } from "./models/StopTime.js";
import dayjs from "dayjs";
import fetch from "node-fetch";

export async function getInfo(routes) {
  const trips = [];
  const stop_times = [];
  const allStops = new Map();
  const calendars = new Map();
  for (let route of routes) {
    const res = await fetch(
      `https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=${route.route_id}`
    ).then((res) => res.json());
    if (res.data.routeSchedules) {
      for (let schedule of res.data.routeSchedules[0].groupSchedules) {
        const service_id = schedule.days.join("");
        let calendar = calendars.get(service_id);
        if (!calendar) {
          calendar = new Calendar(service_id, schedule.days);
          calendars.set(service_id, calendar);
        }

        for (
          let tripIndex = 0;
          tripIndex < schedule.times.length;
          tripIndex++
        ) {
          const time = schedule.times[tripIndex];
          const startTime = dayjs(`1990-01-01 ${time}:00`);
          const trip = new Trip(route.route_id, calendar.service_id, tripIndex);
          trips.push(trip);
          const tripStops = [];
          for (let conn of res.data.routeConnections) {
            let stop = allStops.get(conn.id);
            if (!stop) {
              stop = new Stop();
              stop.stop_id = conn.id;
              stop.stop_name = conn.title;
              stop.stop_lon = conn.longitude;
              stop.stop_lat = conn.latitude;
              allStops.set(stop.stop_id, stop);
            }
            tripStops.push(stop);
          }

          for (let i = 0; i < tripStops.length; i++) {
            const stopTime = new StopTime();
            stopTime.trip_id = trip.trip_id;
            if (i === 0) {
              stopTime.arrival_time = stopTime.departure_time =
                startTime.format("HH:mm:ss");
              stopTime.timepoint = 1;
            }
            if (i === tripStops.length - 1) {
              const durationMinutes = dayjs(
                `1900-01-01 ${schedule.duration}`
              ).diff(dayjs("1900-01-01 00:00:00"), "minutes");
              const endTime = startTime.add(durationMinutes, "minutes");
              let endHours = endTime.hour();
              if (startTime.date() !== endTime.date()) {
                endHours += 24;
              }
              stopTime.arrival_time = stopTime.departure_time = endTime.format(
                `${endHours.toString().padStart(2, "0")}:mm:ss`
              );
              stopTime.timepoint = 1;
            }
            stopTime.stop_id = tripStops[i].stop_id;
            stopTime.stop_sequence = (i + 1) * 5;
            stop_times.push(stopTime);
          }
        }
      }
    }
  }
  return [
    Array.from(calendars.values()),
    trips,
    stop_times,
    Array.from(allStops.values()),
  ];
}
