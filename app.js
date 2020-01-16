db.collection("todo")
  .get()
  .then(data => {
    console.log("++", data);
  });
