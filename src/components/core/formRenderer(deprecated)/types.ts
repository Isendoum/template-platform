export interface IField {
  type: string; // type of the input element. It is used to identify which type of field the renderer should render also used inside input element
  type2?: string; // second type of the input element. It will be used instead of type inside of input element if exist in cases i.e password type. Never used by the renderer
  label: string; // label that shows on ui above field
  name: string; // name that is used as main identifier for the form
  validation: {
    type: string;
    type2?: string;
    required: boolean;
    min?: number;
    max?: number;
    oneOf?: "string";
  }; // validation configuration to create yup schema
}
