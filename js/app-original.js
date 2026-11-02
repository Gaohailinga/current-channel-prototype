const options = [
  { value: "leshan", label: "乐刷" },
  { value: "fuyou", label: "富友" },
  { value: "haoda", label: "好哒" },
  { value: "suixingfu", label: "随行付" },
  { value: "lakala", label: "拉卡拉" },
  { value: "yibao", label: "易宝" },
  { value: "huifu", label: "汇付" },
  { value: "guotong", label: "国通" },
  { value: "huilaimi", label: "汇来米" },
  { value: "shouqianba", label: "收钱吧" },
  { value: "other", label: "其他" }
];

let selectedValue = "other";

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
    const item = document.createElement("div");
    item.className = "option-item" + (opt.value === selectedValue ? " selected" : "");
    item.dataset.value = opt.value;
    item.innerHTML = `
      <span class="option-text">${opt.label}</span>
      <span class="option-check">✓</span>
    `;
    item.addEventListener("click", () => {
      selectedValue = opt.value;
      renderOptions();
      toggleOtherInput();
    });
    list.appendChild(item);
  });
}

function toggleOtherInput() {
  const otherInput = $("other-input");
  const otherText = $("other-text");
  if (selectedValue === "other") {
    otherInput.classList.remove("hidden");
    setTimeout(() => otherText.focus(), 50);
  } else {
    otherInput.classList.add("hidden");
  }
}

function validateAndSubmit() {
  if (!selectedValue) {
    showToast("请选择当前渠道");
    return;
  }
  if (selectedValue === "other") {
    const otherText = $("other-text").value.trim();
    if (!otherText) {
      showToast("请输入当前渠道名称");
      $("other-text").focus();
      return;
    }
  }
  const label = options.find((o) => o.value === selectedValue).label;
  const extra = selectedValue === "other" ? " - " + $("other-text").value.trim() : "";
  showToast(`已选择：${label}${extra}`);
}

$("btn-done").addEventListener("click", validateAndSubmit);
$("nav-back").addEventListener("click", () => {
  showToast("返回上一页");
});

renderOptions();
toggleOtherInput();
