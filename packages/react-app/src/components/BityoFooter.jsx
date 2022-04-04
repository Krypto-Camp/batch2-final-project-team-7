import React from "react";

export default function BityoFooter(props) {
  return (
    <footer className="footer position-fixed w-100 bottom-0 start-50 translate-middle-x bg-black">
      <div className="container-lg text-center px-4 py-2 d-flex align-items-center justify-content-between">
        <small className="text_14 text-paper">&copy; Copyright 2022, Example Corporation</small>
      </div>
    </footer>
  );
}