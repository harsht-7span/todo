document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todoIn");
  const btn = document.getElementById("submitBtn");
  const close = document.getElementById("close");
  const todoList = [];

  close.addEventListener("click", () => {
    window.close();
  });

  input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      const task = input.value.trim();
      if (task === "") {
        alert("Enter task");
        return;
      } else {
        addTask(task);
        input.value = "";

        saveData();
      }
    }
  });

  btn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task === "") {
      alert("Enter task");
      return;
    } else {
      addTask(task);
      input.value = "";

      saveData();
    }
  });

  function buttons(id, task) {
    const upDel = document.createElement("div");

    const update = document.createElement("img");
    update.src = "./assets/update.svg";
    update.alt = "update";

    const updateBtn = document.createElement("button");
    updateBtn.classList.add("update");
    updateBtn.appendChild(update);

    updateBtn.addEventListener("click", (e) => {
      console.log(e.target.parentElement.parentElement.id);
      console.log(document.getElementById(id));
      const sp = document.getElementById(id);

      const updatedTask = prompt("Enter updated task " + id, task);

      if (updatedTask !== null && updatedTask.trim() !== "") {
        // updateTask(id, updatedTask);
        const index = todoList.findIndex((item) => item.id === id);

        // todoList[index].task = updatedTask.trim();
        sp.childNodes[0].textContent = updatedTask.trim();

        saveData();
        // window.location.reload();
      }
    });

    const del = document.createElement("img");
    del.src = "./assets/bin.svg";
    del.alt = "delete";

    const delBtn = document.createElement("button");
    delBtn.classList.add("del");
    delBtn.appendChild(del);

    delBtn.addEventListener("click", () => {
      const todo = document.getElementById(id);
      todo.remove();
      const index = todoList.findIndex((item) => item.id === id);
      if (index !== -1) {
        todoList.splice(index, 1);
        saveData();
      }
    });
    upDel.appendChild(updateBtn);
    upDel.appendChild(delBtn);
    return { upDel };
  }

  // function updateTask(id, updatedTask) {
  //   const todo = document.getElementById(id);
  //   todo.textContent = updatedTask.trim();
  // }

  function addTask(task, isChecked = false) {
    const ul = document.getElementById("todoList");
    const todo = document.createElement("li");
    const text = document.createElement("span");
    todo.appendChild(text);
    todo.classList.add("list");

    isChecked && text.classList.add("check");
    const id = "todo_" + Date.now();
    todo.id = id;

    //only for custom check
    const checkDiv = document.createElement("div");
    const checkLabel = document.createElement("label");
    const labelSpan = document.createElement("span");
    const check = document.createElement("input");

    check.type = "checkbox";
    check.checked = isChecked;

    checkDiv.classList.add("checkbox-wrapper-24");
    checkLabel.setAttribute("for", "check-24");

    checkLabel.appendChild(labelSpan);
    checkDiv.appendChild(check);
    checkDiv.appendChild(checkLabel);

    check.addEventListener("change", (e) => {
      const index = todoList.findIndex((item) => item.id === id);
      todoList[index].checked = check.checked;
      e.target.checked
        ? text.classList.add("check")
        : text.classList.remove("check");
      saveData();
    });

    const { updateBtn, delBtn, upDel } = buttons(id, task);

    text.textContent = task;
    // todo.appendChild(updateBtn);
    todo.appendChild(check);
    // todo.appendChild(delBtn);
    todo.appendChild(upDel);

    ul.appendChild(todo);

    todoList.push({ id: id, task: task, checked: isChecked });
  }

  function updateTotalTodoCount() {
    const totalTodoCount = document.getElementById("totalTodoCount");

    const count = todoList.filter((item) => !item.checked).length;

    if (count === 0) {
      totalTodoCount.textContent = "All done!";
    } else {
      totalTodoCount.textContent = count + "/" + todoList.length;
    }
  }

  function saveData() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    updateTotalTodoCount();
  }

  function loadData() {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodoList) {
      storedTodoList.forEach((todo) => {
        addTask(todo.task, todo.checked);
      });
    }
  }

  loadData();
  updateTotalTodoCount();
});
