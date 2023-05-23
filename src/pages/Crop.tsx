import { useEffect } from "react";
import { useGetCropsQuery } from "../service/api";
export default function CropPage() {
  const { data: crops } = useGetCropsQuery();
  useEffect(() => {
    if (crops) {
      console.log(crops);
    }
  }, [crops]);
  return <>AAAAAA</>;
}
