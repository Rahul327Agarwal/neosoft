import { useEffect, useState } from "react";
import "../CSS/taskmanager.css";
import { useDispatch } from "react-redux";
import { managetask } from "../Redux/action";
import { useNavigate } from "react-router-dom";

var curr_setstage = "";
var curr_stage = "";
var curr_num = 0;
var curr_key = "";
var curr_status = "";
function TaskManagement() {
  const navigate = useNavigate();
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  const [stage3, setStage3] = useState([]);
  const [stage4, setStage4] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  // handling forward click event.
  const moveforward = (item) => {
    const stage = item.stage_num;

    if (stage === 1) {
      let temp = stage1.filter((data) => {
        return data.key !== item.key;
      });
      setStage1(temp);
      item.stage_num = 2;
      item.status = "todo";
      setStage2([...stage2, item]);
    }

    if (stage === 2) {
      let temp = stage2.filter((data) => {
        return data.key !== item.key;
      });
      setStage2(temp);
      item.stage_num = 3;
      item.status = "ongoing";
      setStage3([...stage3, item]);
    }
    if (stage === 3) {
      let temp = stage3.filter((data) => {
        return data.key !== item.key;
      });
      setStage3(temp);
      item.stage_num = 4;
      item.status = "done";
      setStage4([...stage4, item]);
    }
  };

  // handling backward click event.
  const movebackward = (item) => {
    const stage = item.stage_num;

    if (stage === 2) {
      let temp = stage2.filter((data) => {
        return data.key !== item.key;
      });
      setStage2(temp);
      item.status = "backlog";
      item.stage_num = 1;
      setStage1([...stage1, item]);
    }
    if (stage === 3) {
      let temp = stage3.filter((data) => {
        return data.key !== item.key;
      });
      setStage3(temp);
      item.stage_num = 2;
      item.status = "todo";
      setStage2([...stage2, item]);
    }

    if (stage === 4) {
      let temp = stage4.filter((data) => {
        return data.key !== item.key;
      });
      setStage4(temp);
      item.stage_num = 3;
      item.status = "ongoing";
      setStage3([...stage3, item]);
    }
  };

  // handling edit event.
  const handleedit = (stage, setStage, item) => {
    console.log(item);
    document.getElementById("task").value = item.name;
    setIsEdit(true);
    curr_setstage = setStage;
    curr_stage = stage;
    curr_num = item.stage_num;
    curr_key = item.key;
    curr_status = item.status;
  };

  // functionality to delete a task

  const handledelete = (stage, setStage, item) => {
    const modified_data = stage.filter((task) => {
      return task.key !== item.key;
    });
    setStage(modified_data);
  };

  //  functionality to add a task
  const handleclick = () => {
    let name = document.getElementById("task").value;
    let date = document.getElementById("date").value;
    if (name.length === 0) {
      alert("Please enter the task name");
      return;
    }
    if (date.length === 0) {
      alert("Please enter the date");
      return;
    }
    let priority = document.getElementById("priority").value;

    var current = new Date();
    var key = current.toLocaleString();

    let data = {
      name: name,
      priority: priority,
      date: date,
      key: key,
      stage_num: 1,
      status: "backlog",
      user: sessionStorage.getItem("user"),
    };
    // if task is not new but it is updating.
    if (isEdit === true) {
      const filtered_data = curr_stage.filter((item) => {
        return item.key !== curr_key;
      });
      data.stage_num = curr_num;
      data.status = curr_status;
      curr_setstage([...filtered_data, data]);
      setIsEdit(false);
    }
    // when it is new task
    else setStage1([...stage1, data]);
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
  };

  // function to save data to the database
  const savedata = () => {
    //updating the store with the count of pending and completed tasks.
    const pending_count = stage1.length + stage2.length + stage3.length;
    const completed_count = stage4.length;
    dispatch(managetask({ pending_count, completed_count }));

    // Adding all the tasks in the one array to move that array to the database.
    var alltask = [];
    for (let i = 0; i < stage1.length; i++) alltask.push(stage1[i]);
    for (let i = 0; i < stage2.length; i++) alltask.push(stage2[i]);
    for (let i = 0; i < stage3.length; i++) alltask.push(stage3[i]);
    for (let i = 0; i < stage4.length; i++) alltask.push(stage4[i]);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alltask),
    };
    fetch("http://localhost:1234/task", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getdata = () => {
    const email = sessionStorage.getItem("user");
    fetch(`http://localhost:1234/task?user=${email}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === "backlog") arr1.push(data[i]);
          if (data[i].status === "todo") arr2.push(data[i]);
          if (data[i].status === "ongoing") arr3.push(data[i]);
          if (data[i].status === "done") arr4.push(data[i]);
        }

        setStage1(arr1);
        setStage2(arr2);
        setStage3(arr3);
        setStage4(arr4);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div id="dash">
        {/* <Link to="/dashboard"> */}
        <button id="btn1" onClick={savedata}>
          Click me to move dashboard
        </button>
        {/* </Link> */}
      </div>
      <div id="divtask1">
        <h3>Task Manager</h3>

        <p>Please enter your task here</p>
      </div>

      <div id="divtask2">
        <input type="text" id="task" placeholder="Task Name" />

        <select name="priority" id="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input type="date" id="date" placeholder="Deadline of the task" />
        <button id="submit" onClick={handleclick}>
          Create Task
        </button>
      </div>

      <div id="stage">
        <div id="stage1">
          <h1>Backlog</h1>
          {stage1.map((item, i) => {
            return (
              <div key={i}>
                <li>{item.name}</li>

                <button onClick={() => moveforward(item)}>Forward</button>
                <button onClick={() => handleedit(stage1, setStage1, item)}>
                  Edit
                </button>
                <button onClick={() => handledelete(stage1, setStage1, item)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div id="stage2">
          <h1>To Do</h1>
          {stage2.map((item, i) => {
            return (
              <div key={i}>
                <li>{item.name}</li>

                <button onClick={() => movebackward(item)}>Back</button>
                <button onClick={() => moveforward(item)}>Forward</button>
                <button onClick={() => handleedit(stage2, setStage2, item)}>
                  Edit
                </button>
                <button onClick={() => handledelete(stage2, setStage2, item)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div id="stage3">
          <h1>Ongoing</h1>
          {stage3.map((item, i) => {
            return (
              <div key={i}>
                <li>{item.name}</li>

                <button onClick={() => movebackward(item)}>Back</button>
                <button onClick={() => moveforward(item)}>Forward</button>
                <button onClick={() => handleedit(stage3, setStage3, item)}>
                  Edit
                </button>
                <button onClick={() => handledelete(stage3, setStage3, item)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div id="stage4">
          <h1>Done</h1>
          {stage4.map((item, i) => {
            return (
              <div key={i}>
                <li>{item.name}</li>

                <button onClick={() => movebackward(item)}>Back</button>
                <button onClick={() => handleedit(stage4, setStage4, item)}>
                  Edit
                </button>
                <button onClick={() => handledelete(stage4, setStage4, item)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default TaskManagement;
