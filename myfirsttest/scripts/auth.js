//check login
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    db.collection("userdata").onSnapshot(
      (querySnapshot) => {
        setupguide(querySnapshot.docs);
        setupUI(user);
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    // User is signed out.
    setupUI();
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
      return db.collection("usersbio").doc(response.user.uid).set({
        Fname: singnupform["Fname"].value,
        Lname: singnupform["lname"].value,
        Age: singnupform["age"].value,
      });
    })
    .then(() => {
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
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
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
//add data to firebase
const createform = document.querySelector("#add_form");
createform.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("userdata")
    .add({
      title: createform["title"].value,
      project: createform["projectname"].value,
    })
    .then(() => {
      // close form
      const modal = document.querySelector("#modal-Add");
      M.Modal.getInstance(modal).close();
    })
    .catch(function (error) {
      console.log(error.message);
    });
});
