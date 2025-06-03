import { ProgressStatus } from "./StaticTypeModels";

export interface ProgressStatusModel {
  id: number;
  progress_status: ProgressStatus;
  changed_at: string;
}
