import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AddGpWiseKpi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const taluk_id = searchParams.get("taluk_id") || "";
  const gram_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const [kpis, setKpis] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await axios.get("/api/getKpis", {
          params: { theme_id },
        });
        setKpis(response.data.kpis);

        const initialFormData = response.data.kpis.map(kpi => ({
          kpi_id: kpi.id,
          question_id: null,
          max_range: "",
          input_range: "",
          remarks: "",
        }));
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/getQuestions", {
          params: { theme_id },
        });
        setQuestions(response.data.questions);

        const updatedFormData = formData.map(item => {
          const question = response.data.questions.find(q => q.kpi_id === item.kpi_id);
          return {
            ...item,
            question_id: question ? question.id : null,
          };
        });
        setFormData(updatedFormData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchKpis();
    fetchQuestions();
  }, [theme_id]);

  const handleInputChange = (index, event) => {
    const newFormData = [...formData];
    newFormData[index].data = event.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const dataToSend = {
      state_id,
      dist_id,
      block_id,
      gp_id,
      theme_id,
      user_id,
      date: "2024-06-14",
      theme_id,
      submitted_id,
      formData: formData,
    };

    try {
      const response = await axios.post("/api/submitKpiData", dataToSend);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="container p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow Form - Edit</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>KPI Name</th>
                <th>Question</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, index) => (
                <tr key={kpi.id}>
                  <td>{kpi.kpi_name}</td>
                  <td>{questions.find(q => q.kpi_id === kpi.id)?.question_text || "No question"}</td>
                  <td>
                    <input type="text" value={formData[index] ? formData[index].data : ""} onChange={event => handleInputChange(index, event)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddGpWiseKpi;
