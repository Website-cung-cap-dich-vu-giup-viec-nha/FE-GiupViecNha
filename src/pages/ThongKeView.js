import React, { useState, useEffect, useRef, useCallback } from "react";
import pattern from "../assets/background/pattern.jpg";
import axios from "axios";
import Chart from "chart.js/auto";

const ThongKeView = ({ setPageName, setBreadCrumb }) => {
  const setPageNameCallback = useCallback(
    () => setPageName(""),
    [setPageName]
  );
  const setBreadCrumbCallback = useCallback(
    () => setBreadCrumb([]),
    [setBreadCrumb]
  );
  useEffect(() => {
    setPageNameCallback();
    setBreadCrumbCallback();
  }, [setPageNameCallback, setBreadCrumbCallback]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  const renderChart = useRef(() => {});

  useEffect(() => {
    renderChart.current();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  renderChart.current = () => {
    const labels = data.map((item) => item.TenDichVu);
    const values = data.map((item) => item.DoanhThu);

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy old chart before rendering new one
    }

    const ctx = document.getElementById("myChart");

    const colors = generateColors(data.length); // Generate colors for each bar

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh Thu", // Label for the whole dataset
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top", // Adjust position as needed
            onClick: (e, legendItem) => {
              const index = legendItem.index;
              const meta = chartRef.current.getDatasetMeta(0);
              meta.data[index].hidden = !meta.data[index].hidden;
              chartRef.current.update();
            },
            labels: {
              generateLabels: function (chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function (label, i) {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i);
                    return {
                      text: label,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      hidden: meta.data[i].hidden,
                      index: i,
                    };
                  });
                } else {
                  return [];
                }
              },
            },
          },
        },
      },
    });
  };

  // Function to generate random colors
  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );
    }
    return colors;
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (new Date(e.target.value) > new Date(endDate)) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    if (new Date(e.target.value) < new Date(startDate)) {
      alert("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.");
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/api/thongke", {
        params: {
          NgayBD: startDate,
          NgayKT: endDate,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${pattern})` }}
    >
      <div className="container">
        <div className="row py-5">
          <h3 className="text-center mb-3">Thống kê doanh thu từng dịch vụ</h3>
          <form onSubmit={handleDateSubmit} className="row mb-3">
            <div className="col">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="form-control"
                min={startDate} // Set minimum date to start date
                required
              />
            </div>
            <div className="col">
              <button className="btn btn-outline-success" type="submit">
                Thống kê
              </button>
            </div>
          </form>
          <canvas id="myChart" width="800" height="600"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ThongKeView;
