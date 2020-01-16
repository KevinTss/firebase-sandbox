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

  li.appendChild(checkbox);
  li.appendChild(title);

  return li;
}

db.collection("todo")
  .get()
  .then(response => {
    const items = [];
    response.docs.forEach(doc => items.push(renderDocument(doc)));
    items.map(item => list.appendChild(item));
  });

form.addEventListener("submit", event => {
  event.preventDefault();
  db.collection("todo").add({ is_done: false, title: form.title.value });
  form.title.value = "";
});
