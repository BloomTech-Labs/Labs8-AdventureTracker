import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
export default `https://us1.unwiredlabs.com/v2/reverse.php?token=${
  publicRuntimeConfig.OPEN_CELL_TOKEN
}`;
