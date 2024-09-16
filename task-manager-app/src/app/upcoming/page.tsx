"use client";

import React from "react";
import Records from "../components/records/Records";
import { useGlobalState } from "../context/globalProvider";

function page() {
  const { upcomingRecords } = useGlobalState();
  return <Records title="Upcoming!" records={upcomingRecords} />;
}

export default page;
