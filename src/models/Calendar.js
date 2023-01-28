export class Calendar {
  service_id;
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;
  sunday = 0;
  start_date = new Date().getFullYear() + "0101";
  end_date = new Date().getFullYear() + "1231";

  constructor(id,days) {
    this.service_id = id;
    const daySet = new Set(days);
    this.sunday = daySet.has(0);
    this.monday = daySet.has(1);
    this.tuesday = daySet.has(2);
    this.wednesday = daySet.has(3);
    this.thursday = daySet.has(4);
    this.friday = daySet.has(5);
    this.saturday = daySet.has(6);
  }
}
