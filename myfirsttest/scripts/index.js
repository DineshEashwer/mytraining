const guidslistdata = document.querySelector(".guides");
//setup uid
const setupguide = (data) => {
  let uiguide = "";
  if (data.length) {
    data.forEach((doc) => {
      const datauide = doc.data();
      const li = `
    <li>
        <div class="collapsible-header grey lighten-4">${datauide.project}</div>
        <div class="collapsible-body white">${datauide.title}</div>
      </li>
    `;
      uiguide += li;
    });
    guidslistdata.innerHTML = uiguide;
  } else {
    guidslistdata.innerHTML = `<h5> no user  loged in</h5>`;
  }
};
// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
