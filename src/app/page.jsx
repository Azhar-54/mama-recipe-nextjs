import React from "react";
import Link from "next/link";
const Home = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/login" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/register" style={{ color: "#87CEFA", textDecoration: "none" }}>
           Register
          </Link>
        </li>
          <li style={{ marginBottom: "10px" }}>
          <Link href="/landingpage" style={{ color: "#87CEFA", textDecoration: "none" }}>
            LandingPage
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
