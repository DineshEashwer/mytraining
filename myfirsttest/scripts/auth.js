//db connect

//status of user

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    db.collection("userdata")
      .get()
      .then((querySnapshot) => {
        setupguide(querySnapshot.docs);
      });
  } else {
    // User is signed out.
    setupguide([]);
  }
});
//signup
const singnupform = document.querySelector("#signup-form");
singnupform.addEventListener("submit", (e) => {
  e.preventDefault();

  const eid = singnupform["signup-email"].value;
  const pid = singnupform["signup-password"].value;
  //creat user
  Auth.createUserWithEmailAndPassword(eid, pid)
    .then((response) => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      singnupform["signup-email"].value = "";
      singnupform["signup-password"].value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
});
//logout user
const lout = document.querySelector("#logout");
lout.addEventListener("click", (e) => {
  e.preventDefault();
  Auth.signOut();
});
//loin user

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const leid = loginForm["login-email"].value;
  const lpid = loginForm["login-password"].value;

  Auth.signInWithEmailAndPassword(leid, lpid)
    .then((response) => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
    })
    .catch(function (error) {
      console.log(error);
    });
});
