import { useState, useEffect } from "react";
import { getFeedbacks, deleteFeedback } from "../services/api";

export default function AdminDetails() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await getFeedbacks();
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [info]);

  const handleDelete = async (name, email, feedback, rating) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this record?");
      if (!confirmed) return;

      await deleteFeedback({ name, email, feedback, rating });
      alert("Record Deleted");
      setInfo(info.filter((e) => e.email !== email));
    } catch (err) {
      alert("Delete issue: " + err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-4">
      <div className="max-w-6xl relative mx-auto top-24 bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          User Feedbacks
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm sm:text-base">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Feedback</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {info.map((e, idx) => (
                <tr
                  key={idx}
                  className="text-sm sm:text-base border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-3">{e.name}</td>
                  <td className="px-4 py-3">{e.email}</td>
                  <td className="px-4 py-3">{e.feedback}</td>
                  <td className="px-4 py-3">{e.rating} star</td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                      onClick={() =>
                        handleDelete(e.name, e.email, e.feedback, e.rating)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {info.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No feedbacks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
