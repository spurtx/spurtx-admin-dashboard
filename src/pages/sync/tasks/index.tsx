import TaskCard from "../../../components/sync/task/TaskCard";
import TaskTable from "../../../components/sync/task/TaskTable";


const Tasks = () => {
  return (
    <main>
      <h1 className="font-semibold">Tasks</h1>
      <div className="grid grid-cols-5 gap-5 bg-white px-4 py-3 shadow-md rounded-[8px] mt-3">
        <TaskCard taskValue="100,100" taskType="Total Tasks Created"/>
        <TaskCard taskValue="90,100" taskType="Total Tasks Completed"/>
        <TaskCard taskValue="10,100" taskType="Not Started"/>
        <TaskCard taskValue="4,100" taskType="Total To-do List"/>
        <TaskCard taskValue="3,900" taskType="Total To-do Checked"/>
      </div>
      <TaskTable />
    </main>
  )
}

export default Tasks;