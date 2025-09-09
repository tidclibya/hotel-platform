const stats = [
  { label: "عدد الفنادق", value: 357},
  { label: "عدد الغرف", value: 30653 },
  { label: "عدد الأسرة", value: 55605},
  { label: "عدد العمالة", value: 103902},
  { label: "عدد القرى السياحية", value: 127 },
  { label: "عدد الشقق الفندق", value: 241 },
  { label: "عدد الشاليهات", value: 6917 },
{ label: " إجمالي مرافق الأيواء", value: 725 مرفق }
];

const dashboard = document.getElementById("dashboard");

stats.forEach(stat => {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `<h2>${stat.value}</h2><p>${stat.label}</p>`;
  dashboard.appendChild(card);
});

