import React from "react";
import { Link } from "react-router-dom";
import edit from "../assets/edit.png";
import del from "../assets/deleteimg.png";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const MyTask = ({ baseURL }) => {
  const test = useFetch(`${baseURL}/api/task`);

  const { data, setData, loading, error } = test;

  const handleDelete = async (id) => {
    setData((prevData) => {
      return prevData.filter((task) => {
        return task._id !== id;
      });
    });

    const deleteTask = {
      method: "DELETE",
    };

    const respon = await fetch(`${baseURL}/api/task/${id}`, deleteTask);

    const data = await respon.json();

    if (respon.status === 200) {
      toast.success(data.message);
      return;
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="alltasks-con">
      <div className="my-tasks d-flex justify-content-between algin-items-center">
        <h2 className="m-0">My Tasks</h2>
        <Link to={"/new"} className="anchor m-0">
          + Add New Task
        </Link>
      </div>
      {/* ======================== */}
      {data
        ? data.map((Task) => {
            const { title, description, tag, _id } = Task;

            const tagColor = tag === "Urgent" ? "#f38383" : "#73c3a6";

            return (
              <div className="task-content " key={_id}>
                <div className="inner-task-content d-flex justify-content-between align-items-end">
                  <p className="para m-0 " style={{ color: tagColor }}>
                    {tag}
                  </p>
                  <div className="task-but d-flex gap-5">
                    <Link
                      to={`/edit/${Task._id}`}
                      className="edit d-flex align-items-center justify-content-center"
                    >
                      <img src={edit} alt="edit" />
                      <p className="m-0">Edit</p>
                    </Link>
                    <button
                      onClick={() => {
                        return handleDelete(_id);
                      }}
                      className="deletee d-flex align-items-center justify-content-center"
                    >
                      <img src={del} alt="delete" />
                      <p className="m-0">Delete</p>
                    </button>
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="text-start task-detail">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}

      {loading ? <p>LOADING...</p> : null}
      {error ? <p>{error}</p> : null}

      <div className="reload my-5">
        <a href="#">Back To Top</a>
      </div>
    </div>
  );
};

export default MyTask;
