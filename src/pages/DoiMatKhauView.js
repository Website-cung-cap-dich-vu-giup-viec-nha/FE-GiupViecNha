import DoiMatKhau from "../components/DoiMatKhau";
const DoiMatKhauView = ({ user }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f06543",
        backgroundImage: "linear-gradient(315deg, #f06543 0%, #ffbe3d 74%)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 d-lg-block d-none d-lg-flex align-items-center justify-content-center"></div>
          <div className="col-lg-6 p-4">
            <DoiMatKhau user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoiMatKhauView;
