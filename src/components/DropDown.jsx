import React, { useState } from "react";
import arrowdown from "../assets/arrowdown.png";

const DropDown = ({ setTag }) => {
  // const [tag, setTag] = useState("Select a Tag");
  const [options, setOptions] = useState(["Urgent", "Important"]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOption = (option) => {
    setSelected(option);
    setIsOpen(false);
    setTag(option);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      className="tag-new position-relative rounded-2   px-5 py-4"
    >
      <h3 className="position-absolute">Tags</h3>
      <div
        onClick={toggleDropdown}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex gap-5 align-items-center">
          <p className="m-0 py-1 px-2 rounded-1">
            {" "}
            {selected || "Select a Tag"}
          </p>
          {/* <p className="m-0 py-1 px-2 rounded-1">Important</p> */}
        </div>
        <img
          src={arrowdown}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s ease-in-out",
          }}
          alt="arrowdown"
        />
      </div>
      <ul className="position-absolute mt-4  shadow w-100 me-5 start-0  rounded-2 mt-4 p-1 text-white list-unstyled">
        {isOpen
          ? options.map((option) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    return handleOption(option);
                  }}
                  key={option}
                  className="p-1 text-danger rounded-2 w-25 "
                >
                  {option}
                </li>
              );
            })
          : null}
        {/* <li className="p-1 text-success  rounded-2 w-25">Important</li> */}
      </ul>
    </div>
  );
};

export default DropDown;
