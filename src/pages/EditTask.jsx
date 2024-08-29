import React, { useEffect, useState } from "react";
import arrowback from "../assets/Vector.png";
// import arrowdown from "../assets/arrowdown.png";
import { Link, useNavigate, useParams, useSubmit } from "react-router-dom";
import DropDown from "../components/DropDown";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const EditTask = ({ baseURL }) => {
  const { id } = useParams();

  const { data } = useFetch(`${baseURL}/api/task/${id}`);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setTag(data.tag);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();

    const editedData = {
      title,
      description,
      tag,
    };
    const oldData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    };
    const response = await fetch(`${baseURL}/api/task/${id}`, oldData);

    const resData = await response.json();

    if (response.status === 200) {
      toast.success(resData.message);
      setSending(false);
      navigate("/tasks");

      return;
    } else {
      toast.error(resData.message);
    }

    setSending(false);
  };

  return (
    <div className="edit-t-con text-start">
      <div className="edit-task d-flex align-items-center gap-3">
        <Link to={"/tasks"}>
          <img src={arrowback} alt="backarrow" />
        </Link>{" "}
        <h2 className="m-0">Edit Task</h2>
      </div>
      {/* ========================= */}
      <form onSubmit={handleSubmit} className="edit-t-form" action="">
        <div className="title-edit position-relative">
          <label className="position-absolute  " htmlFor="title">
            Task Title
          </label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="w-100 py-4 px-5 rounded-2"
            type="text"
            placeholder="Project Completion"
            id="title"
            value={title}
          />
        </div>
        {/* ========================== */}
        <div className="describe-edit position-relative">
          <label className="position-absolute" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="w-100 py-4 px-5 rounded-2"
            name=""
            id="description"
            cols="30"
            rows="7"
            placeholder="Briefly describe your task..."
            value={description}
          ></textarea>
        </div>
        {/* ========================== */}
        <DropDown setTag={setTag} />
        {/* ============================= */}
        <button disabled={sending} className="but-edit">
          Done
        </button>
      </form>
      {/* =========================== */}
      <div className="reload text-center my-5">
        <a href="#">Back To Top</a>
      </div>{" "}
    </div>
  );
};

export default EditTask;
