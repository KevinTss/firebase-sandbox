const list = document.querySelector("#todo-list");
const form = document.querySelector("#add-todo-form");

function renderDocument(doc) {
  let li = document.createElement("li");
  li.setAttribute("data-id", doc.id);

  let data = doc.data();
  console.log("Data", data);

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", data.title);
  checkbox.setAttribute("value", doc.id);
  checkbox.checked = data.is_done;

  let title = document.createElement("span");
  title.textContent = doc.data().title;

  let cross = document.createElement("div");
  cross.textContent = "X";

  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(cross);

  list.appendChild(li);

  cross.addEventListener("click", event => {
    event.stopPropagation();
    let id = event.target.parentElement.getAttribute("data-id");
    console.log("id", id);
    db.collection("todo")
      .doc(id)
      .delete();
  });
}

db.collection("todo")
  .get()
  .then(response => {
    response.docs.forEach(doc => renderDocument(doc));
  });

form.addEventListener("submit", event => {
  event.preventDefault();
  db.collection("todo").add({ is_done: false, title: form.title.value });
  form.title.value = "";
});
