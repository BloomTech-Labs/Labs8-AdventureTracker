interface FormInfo {
  [key: string]: string;
}
interface EventTarget {
  target: {
    name: string;
    value: string;
  };
}

export default (
  formInfo: FormInfo,
  setFormInfo: Function,
  e: EventTarget,
): void => {
  console.log(formInfo);
  setFormInfo({...formInfo, [e.target.name]: e.target.value});
};
