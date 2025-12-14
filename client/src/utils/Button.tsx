import type { btnProps } from "../types";

const Button = (props: btnProps) => {
  return (
    <button className={`bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 ${props.className}`}
    onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
