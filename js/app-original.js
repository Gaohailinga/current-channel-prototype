const options = [
  { value: "leshan", label: "乐刷" },
  { value: "fuyou", label: "富友" },
  { value: "haoda", label: "好哒" },
  { value: "lakala", label: "拉卡拉" },
  { value: "yibao", label: "易宝" },
  { value: "huifu", label: "汇付" },
  { value: "guotong", label: "国通" },
  { value: "huilaimi", label: "汇来米" },
  { value: "shouqianba", label: "收钱吧" },
  { value: "other", label: "其他" }
];

let selectedValues = []; // 多选数组

function $(id) {
  return document.getElementById(id);
}

function showToast(message, duration = 2000) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

function renderOptions() {
  const list = $("option-list");
  list.innerHTML = "";
  options.forEach((opt) => {
    const isSelected = selectedValues.includes(opt.value);
    const item = document.createElement("div");
    item.className = "option-item" + (isSelected ? " selected" : "");
    item.dataset.value = opt.value;
    item.innerHTML = `
      <span class="option-text">${opt.label}</span>
      <span class="option-check${isSelected ? " checked" : ""}"></span>
    `;
    item.addEventListener("click", () => {
      toggleSelect(opt.value);
    });
    list.appendChild(item);
  });
}

function toggleSelect(value) {
  const idx = selectedValues.indexOf(value);
  if (idx !== -1) {
    selectedValues.splice(idx, 1);
  } else {
    selectedValues.push(value);
  }
  renderOptions();
  toggleOtherInput();
}

function validateAndSubmit() {
  if (selectedValues.length === 0) {
    showToast("请选择当前渠道");
    return;
  }
  if (selectedValues.includes("other")) {
    const otherText = $("other-text").value.trim();
    if (!otherText) {
      showToast("请输入当前渠道名称");
      $("other-text").focus();
      return;
    }
  }
  const labels = selectedValues.map(v => {
    if (v === "other") return $("other-text").value.trim();
    return options.find(o => o.value === v).label;
  });
  showToast(`已选择：${labels.join("、")}`);
}

$("btn-done").addEventListener("click", validateAndSubmit);
$("nav-back").addEventListener("click", () => {
  showToast("返回上一页");
});

renderOptions();
toggleOtherInput();
