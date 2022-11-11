import React, { useState } from "react";
import Select from "react-select";
import { users, frequencies, auditType } from "../constants";

export default function SetFrequency() {
const [input, setInputs] = useState()
const [remainder, setRemainder] = useState()

const handleChange = (e) => {
const name = e.label
const value = e.value
setInputs({...input, [name]: value })
}

  return (
    <div className="flex items-end flex-row">
      <div>
        <b className="text-white">Users</b>
        <Select 
        onChange={(e) => handleChange(e)}
        options={users} />
      </div>
      <div>
        <b className="text-white">Frequency</b>
        <Select options={frequencies} />
      </div>
      <div>
        <b className="text-white">type</b>
        <Select 
        options={auditType} />
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Set Remainder
        </button>
      </div>
    </div>
  );
}
