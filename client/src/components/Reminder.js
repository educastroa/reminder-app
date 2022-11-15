import { useId, useState } from "react";
import {
  Form,
  useLoaderData,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { users, frequencies, auditTypes, remainders } from "../constants";
import axios from "axios";

// export async function action({ request }) {
//   const formData = await request.formData();
//   const user = formData.get('user');
//   const frequency = formData.get('frequency');
//   const auditType = formData.get('auditType');

//   const res = await fetch('/reminder', { method: 'post', body: JSON.stringify({ user, frequency, auditType }) })
//   console.log(user, frequency, auditType);

//   return {
//     isSuccess: true,
//   };
// }

// export async function loader({ request }) {
const arr = [
  { user: "juarez666@hotmail.com", frequency: "hourly", auditTypes: "lpa1" },
  { user: "juarez333@gmail.com", frequency: "montly", auditTypes: "lpa2" },
  {
    user: "juarez69@outlook.com",
    frequency: "hourly",
    auditTypes: "workinspection",
  },
];

//   return {
//     reminders,
//   }
// }

const addReminderAPIUrl =
  "https://u4mk83b0qk.execute-api.us-east-2.amazonaws.com/prod/addreminder";

  const apiToken = {
    headers: {
      "x-api-key": "",
    },
  };

export default function Remainder({ date, setDate }) {
  const [input, setInput] = useState({});
  const [reminders, setReminders] = useState(arr);
  const id = useId();
  // const submit = useSubmit();
  // const { reminders } = useLoaderData();
  // const actionResult = useActionData();

  // if (actionResult?.isSuccess) {

  // }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit(event.currentTarget);
    axios.post(addReminderAPIUrl, input, apiToken)
    setReminders([...reminders, input]);
    event.currentTarget.reset();
  };

  return (
    <div className="flex flex-col">
      <form
        // method="post"
        className="flex items-end flex-row w-100"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-white">Reminder Name: </label>
          <input
            onChange={handleChange}
            type="text"
            name="reminderName"
            placeholder="Type reminder name"
            required
          ></input>
        </div>
        <div>
          <label className="text-white">Users</label>
          <select onChange={handleChange} name="username" defaultValue="" required>
            <option value="" hidden>
              Select...
            </option>
            {users.length > 0 &&
              users.map((user, i) => (
                <option key={`user-${id}-${i}`} value={user.value}>
                  {user.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="text-white">Frequency</label>
          <select
            onChange={handleChange}
            name="frequency"
            defaultValue=""
            required
          >
            <option value="" hidden>
              Select...
            </option>
            {frequencies.length > 0 &&
              frequencies.map((fq, i) => (
                <option key={`frequency-${id}-${i}`} value={fq.value}>
                  {fq.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="text-white">Type</label>
          <select
            onChange={handleChange}
            name="type"
            defaultValue=""
            required
          >
            <option value="" hidden>
              Select...
            </option>
            {auditTypes.length > 0 &&
              auditTypes.map((at, i) => (
                <option key={`auditType-${id}-${i}`} value={at.value}>
                  {at.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Set Remainder
          </button>
        </div>
      </form>
      <div className="text-white py-2">
        {reminders.length > 0 &&
          reminders.map((reminder, i) => (
            <div key={`reminder-${id}-${i}`} className="pt-6">
              <div className="flex justify-between bg-gray-500 py-2 px-4 rounded">
                <div>
                  <div>
                    <b>User: </b>
                    {reminder.user}
                  </div>
                  <div>
                    <b>Frequency: </b>
                    {reminder.frequency}
                  </div>
                  <div>
                    <b>Audit Type: </b>
                    {reminder.auditType}
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
