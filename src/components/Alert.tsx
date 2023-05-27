import React from "react";

interface Props {
  className: string;
  msg: string;
  icon: React.ReactElement;
  title: string;
}

const Alert = (props: Props) => {
  let { className, msg, icon, title } = props;

  return (
    <div className={className}>
      {icon}
      <h1>{title}</h1>
      <span>{msg}</span>
    </div>
  );
};

export default Alert;
