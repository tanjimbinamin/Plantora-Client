import tres from "../../assets/1.jpg";
import { CSSProperties } from "react";

const productStyle: CSSProperties = {
  marginTop: "0px",
  background: `url(${tres})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100%",
  backgroundAttachment: "Fixed",
};

const textStyle: CSSProperties = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#ffffff",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
};

const Parallex = () => {
  return (
    <div style={productStyle} className="min-h-80 flex justify-center items-center mb-10 pb-10">
      <div style={textStyle}>
        Welcome to Plantora
      </div>
    </div>
  );
};

export default Parallex;
