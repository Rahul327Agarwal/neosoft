import { useState } from "react";
import "../CSS/taskmanager.css";
import { useDispatch } from 'react-redux';
import {managetask} from '../Redux/action';
import { Link } from "react-router-dom";

var curr_setstage = "";
var curr_stage = "";
var curr_num = 0;
var curr_key = "";
function TaskManagement() {
  const [stage1, setStage1] = useState([]);
  const [stage2, setStage2] = useState([]);
  const [stage3, setStage3] = useState([]);
  const [stage4, setStage4] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch=useDispatch();

  // handling forward click event.
  const moveforward = (item) => {
    const stage = item.stage_num;

    if (stage === 1) {
      let temp = stage1.filter((data) => {
        return data.key !== item.key;
      });
      setStage1(temp);
      item.stage_num = 2;
      setStage2([...stage2, item]);
    }

    if (stage === 2) {
      let temp = stage2.filter((data) => {
        return data.key !== item.key;
      });
      setStage2(temp);
      item.stage_num = 3;
      setStage3([...stage3, item]);
    }
    if (stage === 3) {
      let temp = stage3.filter((data) => {
        return data.key !== item.key;
      });
      setStage3(temp);
      item.stage_num = 4;
      setStage4([...stage4, item]);
    }
    dispatch(managetask(stage));
  };

  // handling backward click event.
  const movebackward = (item) => {
    const stage = item.stage_num;

    if (stage === 2) {
      let temp = stage2.filter((data) => {
        return data.key !== item.key;
      });
      setStage2(temp);
      item.stage_num = 1;
      setStage1([...stage1, item]);
    }
    if (stage === 3) {
      let temp = stage3.filter((data) => {
        return data.key !== item.key;
      });
      setStage3(temp);
      item.stage_num = 2;
      setStage2([...stage2, item]);
    }

    if (stage === 4) {
      let temp = stage4.filter((data) => {
        return data.key !== item.key;
      });
      setStage4(temp);
      item.stage_num = 3;
      setStage3([...stage3, item]);
    }
    dispatch(managetask(stage))
  };

  // handling edit event.
  const handleedit = (stage, setStage, item) => {
    console.log(item);
    document.getElementById("task").value = item.name;
    setIsEdit(true);
    curr_setstage = setStage;
    curr_stage = stage;
    curr_num = item.stage_num;
    console.log(curr_num);
    curr_key = item.key;
    // console.log(stage);
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
    if (name.length === 0) {
      alert("Please enter the task name");
      return;
    }
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;
    var current = new Date();
    var key = current.toLocaleString();

    let data = {
      name: name,
      priority: priority,
      date: date,
      key: key,
      stage_num: 1,
    };
    // if task is not new but it is updating.
    if (isEdit === true) {
      console.log(curr_stage);
      const filtered_data = curr_stage.filter((item) => {
        return item.key !== curr_key;
      });
      data.stage_num = curr_num;
      console.log(filtered_data);
      console.log(data);
      curr_setstage([...filtered_data, data]);
      setIsEdit(false);
    }
    // when it is new task
    else setStage1([...stage1, data]);
    document.getElementById("task").value = "";
    dispatch(managetask(1))
  };
  return (
    <>
    <div id="dash"><Link to="/dashboard"><button id="btn1">Click me to move dashboard</button></Link></div>
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
          {stage1.map((item,i) => {
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
          {stage2.map((item,i) => {
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
          {stage3.map((item,i) => {
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
          {stage4.map((item,i) => {
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
