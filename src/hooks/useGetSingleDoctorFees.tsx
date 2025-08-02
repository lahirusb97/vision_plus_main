import { useState } from "react";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import axiosClient from "../axiosClient";

interface SingleDoctorFees {
  id: number;
  doctor: number;
  branch: number;
  doctor_name: string;
  branch_name: string;
  doctor_fees: string;
  branch_fees: string;
}
export default function useGetSingleDoctorFees() {
  const [singleDoctorFees, setSingleDoctorFees] =
    useState<SingleDoctorFees | null>(null);
  const [singleDoctorFeesLoading, setSingleDoctorFeesLoading] =
    useState<boolean>(true);

  const loadData = async ({
    doctor_id,
    branch_id,
  }: {
    doctor_id: number;
    branch_id: number;
  }) => {
    if (doctor_id && branch_id) {
      try {
        const response = await axiosClient.get(`channels/fees/list/`, {
          params: {
            doctor_id,
            branch_id,
          },
        });
        setSingleDoctorFees(response.data[0]);
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setSingleDoctorFeesLoading(false);
      }
    }
  };
  return {
    singleDoctorFees,
    singleDoctorFeesLoading,
    singleUserDataRefresh: loadData,
  };
}
