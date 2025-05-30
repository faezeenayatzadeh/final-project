import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const linkStyle = {
    textDecoration: "none",
    color: theme === "light" ? "blue" : "lightblue",
    fontWeight: "bold",
    marginLeft: "20px",
  };

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center" }}>HomePage</h1>

      <h1 style={{ textAlign: "right", marginRight: "30px" }}>
        *من کی هستم ؟*
      </h1>

      <p style={{ textAlign: "right", marginRight: "40px" }}>
        من فائزه عنایت زاده‌ام از اصفهان، 16 سالمه و به برنامه نویسی خیلی علاقه دارم و امیدوارم تو این مسیر بتونم خیلی خیلی پیشرفت کنم.
      </p>

      {/* عکس بعد از متن معرفی */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          marginBottom: "30px",
          paddingRight: "40px",
        }}
      >
        <img
          src="/image/img.jpg"
          alt="معرفی"
          style={{
            width: "180px",
            height: "250px",
            borderRadius: "15%",
          }}
        />
      </div>

      {/* دکمه و لینک در یک خط */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          Change Theme: {theme}
        </button>

        <Link to="/auth" style={linkStyle}>
          ورود / ثبت‌نام
        </Link>
      </div>
    </div>
  );
};

export default HomePage;