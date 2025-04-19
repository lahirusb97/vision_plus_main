import { RouteObject } from "react-router";
import Channel from "../../view/channel/Channel";
import Channel_Invoice from "../../view/channel/Channel_Invoice";
import ChannelDetails from "../../view/channel/ChannelDetails";
import ProtectedChildRoute from "../ProtectedChildRoute";
import DoctorTable from "../../view/channel/doctor/DoctorTable";
import DoctorUpdate from "../../view/channel/doctor/DoctorUpdate";
import DoctorCreate from "../../view/channel/doctor/DoctorCreate";
import DoctorSheduleIndex from "../../view/channel/doctorShedule/DoctorSheduleIndex";
import PatientShedule from "../../view/channel/PatientShedule";

export const channelRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <Channel />,
      },
    ],
  },
  {
    path: "doctor",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <DoctorTable />,
      },
      {
        path: ":doctor_id/update",
        element: <DoctorUpdate />,
      },
      {
        path: "create",
        element: <DoctorCreate />,
      },
    ],
  },
  {
    path: "doctor_shedule",
    element: <DoctorSheduleIndex />,
  },
  {
    path: "patient_shedule/:appointment_id",
    element: <PatientShedule />,
  },
  // {
  //   path: "channel_invoice",
  //   element: <Channel_Invoice />,
  // },
  {
    path: "channel_details",
    element: <ChannelDetails />,
  },
  {
    path: "channel_invoice/:channel_id",
    element: <Channel_Invoice />,
  },
];
