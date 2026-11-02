(function () {
  const annots = document.querySelectorAll(".annot, .annot-dim, .annot-highlight");
  annots.forEach((el) => {
    const id = el.dataset.annotId;
    if (id) {
      const saved = localStorage.getItem("annot-pos-" + id);
      if (saved) {
        try {
          const pos = JSON.parse(saved);
          el.style.left = pos.left;
          el.style.top = pos.top;
        } catch (e) {}
      }
    }

    let isDragging = false;
    let startX, startY, startLeft, startTop;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      el.classList.add("dragging");
      startX = e.clientX;
      startY = e.clientY;
      const rect = el.getBoundingClientRect();
      const parent = el.offsetParent.getBoundingClientRect();
      startLeft = rect.left - parent.left;
      startTop = rect.top - parent.top;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.left = startLeft + dx + "px";
      el.style.top = startTop + dy + "px";
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove("dragging");
      if (id) {
        localStorage.setItem(
          "annot-pos-" + id,
          JSON.stringify({ left: el.style.left, top: el.style.top })
        );
      }
    });
  });
})();
