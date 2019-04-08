import baseUrl from "../openCellularAPI/baseUrl";
import axios from "axios";

export default async (
  lat: string | number,
  lng: string | number,
  onSuccess?: Function,
  onError?: Function,
) => {
  try {
    console.log(
      baseUrl +
        `&lat=${lat}&lon=${lng}
    `,
    );
    const {data} = await axios({
      method: "get",
      url: `${baseUrl}&lat=${lat}&lon=${lng}
      `,
    });
    if (onSuccess) {
      onSuccess();
    }
    console.log(data);
    return data;
  } catch (err) {
    if (onError) {
      onError();
    }
    return {status: "error"};
  }
};
