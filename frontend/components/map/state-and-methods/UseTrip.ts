import {useState} from "react";
export default () => {
  const [tripModalOpen, setTripModalOpen] = useState(true);

  return {
    //methods
    setTripModalOpen,
    //state
    tripModalOpen,
  };
};
