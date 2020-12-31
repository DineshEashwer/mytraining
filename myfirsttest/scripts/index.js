const guidslistdata = document.querySelector(".guides");
const logoutui = document.querySelectorAll(".logged-out");
const loginui = document.querySelectorAll(".logged-in");
const Accountui = document.querySelector(".account-details");
const setupUI = (user) => {
  if (user) {
    const urlParams = "";
    Fstorage.ref("images/" + user.uid + "/profile")
      .getDownloadURL()
      .then((url) => {
        document.getElementById("pimage").src = url;
      })
      .catch((e) => {
        document.getElementById("pimage").src = "";
      });
    db.collection("usersbio")
      .doc(user.uid)
      .get()
      .then(
        (querySnapshot) => {
          const htmlcode = `<div align="left"> 
         
          <li>User Name :${user.email}</li>
          <li>last Login Time : ${user.metadata.lastSignInTime}</li>
          <li>First name : ${querySnapshot.data().Fname}</li>

          <li>Last name : ${querySnapshot.data().Lname}</li>
          <li>Ae : ${querySnapshot.data().Age}</li>
         
          </div>`;
          Accountui.innerHTML = htmlcode;
        },
        (err) => {
          console.log(err.message);
        }
      );

    loginui.forEach((items) => (items.style.display = "block"));
    logoutui.forEach((items) => (items.style.display = "none"));
  } else {
    Accountui.innerHTML = "";
    loginui.forEach((items) => (items.style.display = "none"));
    logoutui.forEach((items) => (items.style.display = "block"));
  }
};
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
