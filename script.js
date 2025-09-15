let hotels = [];
let table;

async function loadHotels() {
  const response = await fetch("hotels.json");
  const data = await response.json();
  hotels = data.filter(h => h["Unnamed: 0"] && !isNaN(h["Unnamed: 0"]));
  renderTable();
  renderStats();
}

function renderTable() {
  if (table) table.destroy();
  table = $('#hotelsTable').DataTable({
    data: hotels,
    columns: [
      { title: "ID", data: "Unnamed: 0" },
      { title: "الاسم", data: "Unnamed: 1" },
      { title: "التصنيف", data: "Unnamed: 2" },
      { title: "المدينة", data: "Unnamed: 3" },
      { title: "العنوان", data: "Unnamed: 4" },
      { title: "الغرف", data: "Unnamed: 5" },
      { title: "الأسرة", data: "Unnamed: 6" },
      { title: "الهاتف", data: "Unnamed: 7" },
      {
        title: "إجراءات",
        render: (data, type, row) => `
          <button onclick="editHotel(${row["Unnamed: 0"]})">✏️</button>
          <button onclick="deleteHotel(${row["Unnamed: 0"]})">🗑️</button>`
      }
    ]
  });
}

function showSection(id) {
  document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("hotelForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("hotelId").value || hotels.length + 1;
  const newHotel = {
    "Unnamed: 0": parseInt(id),
    "Unnamed: 1": document.getElementById("name").value,
    "Unnamed: 2": document.getElementById("classification").value,
    "Unnamed: 3": document.getElementById("city").value,
    "Unnamed: 4": document.getElementById("address").value,
    "Unnamed: 5": parseInt(document.getElementById("rooms").value),
    "Unnamed: 6": parseInt(document.getElementById("beds").value),
    "Unnamed: 7": document.getElementById("phone").value,
  };

  const existingIndex = hotels.findIndex(h => h["Unnamed: 0"] == id);
  if (existingIndex >= 0) {
    hotels[existingIndex] = newHotel;
  } else {
    hotels.push(newHotel);
  }
  renderTable();
  renderStats();
  this.reset();
  showSection('list');
});

function editHotel(id) {
  const h = hotels.find(h => h["Unnamed: 0"] == id);
  if (!h) return;
  document.getElementById("hotelId").value = h["Unnamed: 0"];
  document.getElementById("name").value = h["Unnamed: 1"];
  document.getElementById("classification").value = h["Unnamed: 2"];
  document.getElementById("city").value = h["Unnamed: 3"];
  document.getElementById("address").value = h["Unnamed: 4"];
  document.getElementById("rooms").value = h["Unnamed: 5"];
  document.getElementById("beds").value = h["Unnamed: 6"];
  document.getElementById("phone").value = h["Unnamed: 7"];
  showSection("add");
}

function deleteHotel(id) {
  hotels = hotels.filter(h => h["Unnamed: 0"] != id);
  renderTable();
  renderStats();
}

function renderStats() {
  document.getElementById("totalHotels").innerText = `📌 إجمالي الفنادق: ${hotels.length}`;
  document.getElementById("totalRooms").innerText = `🛏️ الغرف: ${hotels.reduce((a,b)=>a+(+b["Unnamed: 5"]||0),0)}`;
  document.getElementById("totalBeds").innerText = `🛋️ الأسرة: ${hotels.reduce((a,b)=>a+(+b["Unnamed: 6"]||0),0)}`;

  const ctx1 = document.getElementById("classificationChart").getContext("2d");
  const classificationCounts = {};
  hotels.forEach(h => {
    const c = h["Unnamed: 2"] || "غير مصنف";
    classificationCounts[c] = (classificationCounts[c] || 0) + 1;
  });
  new Chart(ctx1, {
    type: "pie",
    data: {
      labels: Object.keys(classificationCounts),
      datasets: [{ data: Object.values(classificationCounts) }]
    }
  });

  const ctx2 = document.getElementById("cityChart").getContext("2d");
  const cityCounts = {};
  hotels.forEach(h => {
    const c = h["Unnamed: 3"] || "غير معروف";
    cityCounts[c] = (cityCounts[c] || 0) + 1;
  });
  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: Object.keys(cityCounts),
      datasets: [{ data: Object.values(cityCounts), label: "عدد الفنادق" }]
    }
  });
}

window.onload = () => { loadHotels(); showSection("list"); };
