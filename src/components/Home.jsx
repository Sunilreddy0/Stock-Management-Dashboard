import React from "react";
import Header from "./Header";

export default function Home() {
  return (
    <>
      <Header />
      <div data-testid="home-component">
        <div className="div-page">
          <div className="container">
            <h1>Home</h1>
            <p>Culpa cillum eiusmod dolore et velit aute eiusmod consectetur. Ea velit pariatur eu tempor Lorem commodo enim. 
              Consectetur nulla veniam elit voluptate sit magna voluptate ex esse. Pariatur eu et sunt culpa non veniam laboris. 
              Cupidatat dolore do ipsum exercitation laborum velit proident aliquip irure.</p>
          </div>
        </div>
      </div>
      </>
  );
}
