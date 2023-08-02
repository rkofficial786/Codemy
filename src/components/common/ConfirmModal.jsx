import React from "react";

import BtnIcon from "./BtnIcon";

const ConfirmModal = ({ modalData }) => {
  return (
    <div>
      <div>
        <h1>{modalData.text1}</h1>
        <p>{modalData.text2}</p>

        <div>
          <BtnIcon
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1text}
            disabled={modalData?.btn1disabled}
          />

          <BtnIcon
            onClick={modalData?.btn2Handler}
            text={modalData?.btn2text}
            disabled={modalData?.btn2disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
