import "../CSS/dashboard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const pending = useSelector((state) => state.pending);
  const completed = useSelector((state) => state.completed);

  // useEffect(() => {
  //   const email = sessionStorage.getItem("user");
  //   if (!email) navigate("/");
  // }, []);

  return (
    <div>
      <div id="header2">
        <h1>Welcome to the Dashboard </h1>
      </div>

      <div id="tasks">
        <div id="total">
          <h1>Total tasks</h1>
          <h1>{pending + completed}</h1>
        </div>

        <div id="pending">
          <h1>Pending tasks</h1>
          <h1>{pending}</h1>
        </div>

        <div id="completed">
          <h1>Completed tasks</h1>
          <h1>{completed}</h1>
        </div>
      </div>
      <div id="dash">
        <Link to="/task">
          <button id="btn1">Click me to move to Task Management</button>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;
