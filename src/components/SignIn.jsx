import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ age, name, setAge, setName }) {
  const [localName, setLocalName] = useState(name || "");
  const [localAge, setLocalAge] = useState(age || 0);

  // set starting balance here 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(localName);
    setAge(Number(localAge));

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <div>
        <label className="block">Name</label>
        <input
          className="border p-2 rounded"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
      </div>

      <div>
        <label className="block">Age</label>
        <input
          className="border p-2 rounded"
          type="number"
          value={localAge}
          onChange={(e) => setLocalAge(e.target.value)}
        />
      </div>

      <button className="px-4 py-2 rounded bg-black text-white" type="submit">
        Save
      </button>
    </form>
  );
}

export default SignIn;
