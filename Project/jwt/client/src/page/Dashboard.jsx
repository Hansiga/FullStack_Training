import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const API = "http://localhost:3000/api";

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [editId, setEditId] = useState(null); // <-- NEW: Track editing student ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch {}
  };

  const addStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // If editing → update
    if (editId) {
      await axios.put(
        `${API}/students/${editId}`,
        { name, rollNumber, department, year },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditId(null); // Reset edit mode
    } 
    // Else → add
    else {
      await axios.post(
        `${API}/students`,
        { name, rollNumber, department, year },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    // Clear form & reload list
    setName("");
    setRollNumber("");
    setDepartment("");
    setYear("");
    loadStudents();
  };

  const remove = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API}/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadStudents();
  };

  const startEdit = (student) => {
    setEditId(student._id);
    setName(student.name);
    setRollNumber(student.rollNumber);
    setDepartment(student.department);
    setYear(student.year);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Student Management</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={addStudent}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll No" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
        <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" type="number" />

        <button>{editId ? "Update Student" : "Add Student"}</button>
      </form>

      <ul>
        {students.map((s) => (
          <li key={s._id} className="student-item">
  <div className="info">
    {s.name} — {s.rollNumber} — {s.department} — Year {s.year}
  </div>

  <div className="actions">
    <button className="edit-btn" onClick={() => startEdit(s)}>Edit</button>
    <button className="delete-btn" onClick={() => remove(s._id)}>Delete</button>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
}
