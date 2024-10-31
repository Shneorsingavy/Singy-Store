
const LogIn = ({toolsLogIn}) => {

  const{ handleChange, details, SignLogIn, role, handleRoleChange,} = toolsLogIn
 
   
  return (
    <form onSubmit={(e) => { e.preventDefault(); SignLogIn(); }}>
    <div className="mb-4">
      <label className="block text-gray-700">אימייל:</label>
      <input
        type="email"
        name="email"
        value={details.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="הכנס את האימייל שלך"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">סיסמה:</label>
      <input
        type="password"
        name="password"
        value={details.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="הכנס סיסמה"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold">
        <span className='text-red-500'>*</span>role:
      </label>
      <select
        value={role}
        onChange={handleRoleChange}
        className="w-full px-3 py-2 border rounded"
        required
      >
        <option value="user">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
      התחבר
    </button>
  </form>
  )
}

export default LogIn