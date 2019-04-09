import {useState} from "react";
export default () => {
  const [tripModalOpen, setTripModalOpen] = useState(false);

  return {
    //methods
    setTripModalOpen,
    //state
    tripModalOpen,
  };
};
