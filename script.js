const firebaseConfig = {
  apiKey: "AIzaSyBC5nAkrkQF06zF_wE0HWILFG5ntWBtvb4",
  authDomain: "formularioprueba-77a36.firebaseapp.com",
  projectId: "formularioprueba-77a36",
  storageBucket: "formularioprueba-77a36.appspot.com",
  messagingSenderId: "565635749943",
  appId: "1:565635749943:web:d241a3e38c02dee42f47b2"
};
  

firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();

const printUser = (coleccionUsuarios, docId) => {
  let picture = document.createElement('img');
  picture.setAttribute('src', coleccionUsuarios.imagen);
  picture.setAttribute('style', 'max-width:250px');
  let nombreUsuario = document.createElement('h3');
  nombreUsuario.innerHTML = coleccionUsuarios.nombre;
  let id = document.createElement('p');
  id.setAttribute("class", "innerId")
  id.innerHTML = docId;
  let correo = document.createElement('p');
  correo.innerHTML = coleccionUsuarios.mail;
  let comentario = document.createElement('p');
  comentario.innerHTML = coleccionUsuarios.texto;

  const datos = document.getElementById('datos');
  datos.appendChild(picture);
  datos.appendChild(nombreUsuario);
  datos.appendChild(correo)
  datos.appendChild(comentario)
  datos.appendChild(id);
};

/*const createUser = (coleccionUsuarios) => {

  const borrar =  id.setAttribute("class", "innerId")
  db.collection("datos")
    .add(coleccionUsuarios)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch((error) => console.error("Error adding document: ", error));
}*/


let form =document.querySelector("form")

form.addEventListener("submit", function(event) {
  event.preventDefault();
  

  const fname = event.target.fname.value;
  const email = event.target.email.value;
  const img = event.target.img.value;
  const comments = event.target.comments.value;

  let coleccionUsuarios ={
      nombre:fname,
      mail:email,
      imagen:img,
      texto:comments
    }
  
createUser(coleccionUsuarios);
  
});

const readAll = () => {
  db.collection("datos") 
    .get() 
    .then((querySnapshot) => { 
      querySnapshot.docs.forEach((doc) => { 
          let user ={
              nombre: doc.data().nombre,
              imagen: doc.data().imagen,
              mail: doc.data().mail,
              texto: doc.data().texto
          }
        printUser(user, doc.id)
      });

    })
    .catch((error) => console.log('Error reading documents ' + error));
};

const deleteUsers = () => {
  db.collection('datos').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete(); //itera y borra todos por la referencia
    });
  }).then(() => {
    alert('Se han borrado todos los usuarios');
    document.getElementById('datos').innerHTML = ''; //y aqui se aprovecha para hacer clean

  }).catch((error) => {
    console.error('Error borrando documentos: ', error);
  });
};


document.getElementById("read-all").addEventListener("click", () => {
  readAll();
});

document.getElementById('delete').addEventListener('click', () => {
  deleteUsers();
});