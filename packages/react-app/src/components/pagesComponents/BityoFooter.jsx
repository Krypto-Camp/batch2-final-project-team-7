import React from "react";

// displays a page header

export default function BityoFooter(props) {
  return (
    <footer className="footer position-fixed w-100 bottom-0 start-50 translate-middle-x bg-black">
      <div className="container-md text-center px-4 py-2 d-flex align-items-center justify-content-between">
        <small className="note_15 text-paper">&copy; Copyright 2022, Example Corporation</small>
      </div>
    </footer>
  );
}