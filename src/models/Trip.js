export class Trip {
  route_id;
  service_id;
  trip_id;

  constructor(route_id, service_id, index) {
    this.route_id = route_id;
    this.service_id = service_id;
    this.trip_id = `${route_id}_${service_id}_${index}`;
  }
}
