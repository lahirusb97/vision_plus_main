import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FactoryFromOne from "./FactoryFromOne";
import FactoryFromTwo from "./FactoryFromTwo";
import FactoryFromTree from "./FactoryFromTree";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FactoryInvoiceForm() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleNext = () => {
    setValue(value + 1);
  };
  const handleBack = () => {
    setValue(value - 1);
  };
  const validationSchema = Yup.object().shape({
    hb_rx_right_dist: Yup.string().required("Right Distance is required"),
    hb_rx_left_dist: Yup.string().required("Left Distance is required"),
    hb_rx_right_near: Yup.string().required("Right Near is required"),
    hb_rx_left_near: Yup.string().required("Left Near is required"),
    auto_ref_right: Yup.string().required("Auto Ref Right is required"),
    auto_ref_left: Yup.string().required("Auto Ref Left is required"),
    right_eye_dist_sph: Yup.string().required(
      "Right Eye Distance Sph is required"
    ),
    right_eye_dist_cyl: Yup.string().required(
      "Right Eye Distance Cyl is required"
    ),
    right_eye_dist_axis: Yup.string().required(
      "Right Eye Distance Axis is required"
    ),
    right_eye_near_sph: Yup.string().required("Right Eye Near Sph is required"),
    left_eye_dist_sph: Yup.string().required(
      "Left Eye Distance Sph is required"
    ),
    left_eye_dist_cyl: Yup.string().required(
      "Left Eye Distance Cyl is required"
    ),
    left_eye_dist_axis: Yup.string().required(
      "Left Eye Distance Axis is required"
    ),
    left_eye_near_sph: Yup.string().required("Left Eye Near Sph is required"),
    remark: Yup.string(),
    customer_name: Yup.string().required("Customer Name is required"),
    customer_age: Yup.number()
      .min(1)
      .max(120)
      .required("Customer Age is required"),
    customer_mobile: Yup.string().required("Customer Mobile is required"),
    customer_address: Yup.string().required("Customer Address is required"),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submiteFromData = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component={"form"}
        onSubmit={methods.handleSubmit(submiteFromData)}
        sx={{ maxWidth: "1200px" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Step One" {...a11yProps(0)} />
            <Tab label="Step Two" {...a11yProps(1)} />
            <Tab label="Step Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FactoryFromOne handleNext={handleNext} handleBack={handleBack} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FactoryFromTwo handleNext={handleNext} handleBack={handleBack} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FactoryFromTree handleNext={handleNext} handleBack={handleBack} />
        </CustomTabPanel>
      </Box>
    </FormProvider>
  );
}
