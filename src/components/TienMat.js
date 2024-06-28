import React from "react";

const TienMat = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <img width={200} src={require("../assets/icon/ikigai.png")} alt="" />
          <p>
            Nhân viên thực hiện dịch vụ sẽ nhận tiền sau khi thực hiện xong dịch
            vụ. <br/> Trong trường hợp bạn muốn chuyển khoản, nhân viên sẽ cung cấp
            tài khoản của công ty!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TienMat;
