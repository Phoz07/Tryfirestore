import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBhKONA68IayvyUFSRq9Psyry2aLDmxh0A",
  authDomain: "myfirstfire-3f031.firebaseapp.com",
  projectId: "myfirstfire-3f031",
  storageBucket: "myfirstfire-3f031.appspot.com",
  messagingSenderId: "993420275305",
  appId: "1:993420275305:web:d9b241cb232e57e2e37cf8",
  measurementId: "G-LR9TM5B2HJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.getElementById("addform");
const table = document.getElementById("table");

async function getEmployees(db){
    const emCol= collection(db, 'employees');
    const empSnapshot = await getDocs(emCol);
    return empSnapshot;
};

function showData(employee){
    const row = table.insertRow(-1);
    const nameCol = row.insertCell(0);
    const ageCol = row.insertCell(1);
    const deleteCol = row.insertCell(2);
    nameCol.innerHTML = employee.data().name;
    ageCol.innerHTML = employee.data().age;

    let btn = document.createElement('button');
    btn.textContent = "Delete data";
    btn.setAttribute('class', 'btn btn-danger');
    btn.setAttribute('data-id', employee.id);
    deleteCol.appendChild(btn);
    btn.addEventListener('click', (e) => {
        let id = e.target.getAttribute('data-id');
        deleteDoc(doc(db, 'employees', id));
    });
};

const data = await getEmployees(db);

data.forEach( employee => {
    showData(employee);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(collection(db, 'employees'),{
        name:form.name.value,
        age:form.age.value
    });
    form.name.value = ""
    form.age.value = ""
    alert("Saved your data");
});