"use client";
import Image from "next/image";
import Records from "./components/records/Records";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { records } = useGlobalState();
  return (
    <>
      <Records title={"All records"} records={records} />
    </>
  );
}
