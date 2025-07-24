import { Dayjs } from "dayjs";

export interface DateRangeInputModel {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}
