const stats = [
  { label: "عدد الفنادق", value: 56 },
  { label: "عدد الغرف", value: 980 },
  { label: "عدد الأسرة", value: 1450 },
  { label: "عدد العمالة", value: 320 },
  { label: "عدد القرى السياحية", value: 12 },
  { label: "عدد الشاليهات", value: 340 }
];

const dashboard = document.getElementById("dashboard");

stats.forEach(stat => {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `<h2>${stat.value}</h2><p>${stat.label}</p>`;
  dashboard.appendChild(card);
});
