import React from "react";
import { getCookie } from "typescript-cookie";

export default function CreateRefraction() {
  const token = getCookie("VISION_ACCESS_TOKEN");

  return <div>CreateRefraction</div>;
}
