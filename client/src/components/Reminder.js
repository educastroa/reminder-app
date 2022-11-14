import { useId } from "react";
import { Form, useLoaderData, useActionData, useSubmit } from "react-router-dom";
import { users, frequencies, auditTypes } from "../constants";

export async function action({ request }) {
  const formData = await request.formData();
  const user = formData.get('user');
  const frequency = formData.get('frequency');
  const auditType = formData.get('auditType');

  const res = await fetch('/reminder', { method: 'post', body: JSON.stringify({ user, frequency, auditType }) })
  console.log(user, frequency, auditType);

  return {
    isSuccess: true,
  };
}

export async function loader({ request }) {
  const reminders = [
    { user: 'juarez666@hotmail.com', frequency: 'hourly', auditTypes: 'lpa1' },
    { user: 'juarez333@gmail.com', frequency: 'montly', auditTypes: 'lpa2' },
    { user: 'juarez69@outlook.com', frequency: 'hourly', auditTypes: 'workinspection' },
  ];

  return {
    reminders,
  }
}

export default function SetFrequency() {
  const id = useId();
  const submit = useSubmit();
  const { reminders } = useLoaderData();
  const actionResult = useActionData();

  if (actionResult?.isSuccess) { 
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.currentTarget);
    event.currentTarget.reset();
  }

  return (
    <div className="flex flex-wrap">
      <Form method="post" className="flex items-end flex-row w-100" onSubmit={handleSubmit}>
        <div>
          <label className="text-white">Users</label>
          <select name="user" defaultValue="" required>
            <option value="" hidden>Select...</option>
            {users.length > 0 && users.map((user, i) => (
              <option key={`user-${id}-${i}`} value={user.value}>{user.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white">Frequency</label>
          <select name="frequency" defaultValue="" required>
            <option value="" hidden>Select...</option>
            {frequencies.length > 0 && frequencies.map((fq, i) => (
              <option key={`frequency-${id}-${i}`} value={fq.value}>{fq.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white">Type</label>
          <select name="auditType" defaultValue="" required>
            <option value="" hidden>Select...</option>
            {auditTypes.length > 0 && auditTypes.map((at, i) => (
              <option key={`auditType-${id}-${i}`} value={at.value}>{at.label}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Set Remainder
          </button>
        </div>
      </Form>
      <div className="w-100 text-white">
        {reminders.length > 0 && JSON.stringify(reminders)}
      </div>
    </div>
  );
}
