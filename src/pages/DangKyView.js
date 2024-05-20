import DangKy from "../components/DangKy";
const DangKyView = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#FF8227",
      }}
    >
      <div className="container">
        <div className="row py-5">
          <DangKy/>
        </div>
      </div>
    </div>
  );
};

export default DangKyView;
