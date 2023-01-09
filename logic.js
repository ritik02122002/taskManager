var all = document.getElementById("all");
var done = document.getElementById("done");
var pending = document.getElementById("pending");
var inp = document.getElementById("text");
var taskList = document.getElementById("tasks");

inp.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addNew();
    }
});

all.addEventListener("click", function () {
    all.classList.add("selected");
    done.classList.remove("selected");
    pending.classList.remove("selected");

    let chilren = taskList.childNodes;
    chilren.forEach(x => {
        x.style.display = "block";
    }
    )
});

done.addEventListener("click", function () {
    all.classList.remove("selected");
    done.classList.add("selected");
    pending.classList.remove("selected");

    let chilren = taskList.childNodes;
    chilren.forEach(x => {
        if (x.childNodes[0].checked == true)
            x.style.display = "block";
        else
            x.style.display = "none";
    }
    )

});

pending.addEventListener("click", function () {
    all.classList.remove("selected");
    done.classList.remove("selected");
    pending.classList.add("selected");

    let chilren = taskList.childNodes;
    chilren.forEach(x => {
        if (x.childNodes[0].checked == false)
            x.style.display = "block";
        else
            x.style.display = "none";
    }
    )

});

function add(taskVal) {
    let newContainer = document.createElement("div");
    newContainer.setAttribute("class", "item");
    let newelement = document.createElement("span");
    newelement.innerHTML = taskVal;


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (checkbox.checked == true) {
            newelement.setAttribute("style", "text-decoration:line-through");
            localStorage.setItem(taskVal, "done");
        }
        else {
            newelement.setAttribute("style", "text-decoration:none");
            localStorage.setItem(taskVal, "pending");
        }
    });
    if (localStorage.getItem(taskVal) == "done") {
        newelement.setAttribute("style", "text-decoration:line-through");
        checkbox.checked = true;
    }

    let delButton = document.createElement("img");
    delButton.src = "DELETE.png";
    delButton.setAttribute("style", "height:15px;margin-left:15px");

    delButton.addEventListener("click", function () {
        taskList.removeChild(newContainer);
        localStorage.removeItem(taskVal);
    });
    newContainer.addEventListener("mouseover", function () {
        delButton.style.display = "inline";
    })
    newContainer.addEventListener("mouseout", function () {
        delButton.style.display = "none";
    })
    newContainer.appendChild(checkbox);
    newContainer.appendChild(newelement);
    newContainer.appendChild(delButton);


    taskList.appendChild(newContainer);

}

function display() {
    const items = { ...localStorage };
    for (let key in items) {
        add(key);
    }
}


function addNew() {
    if (inp.value.length == 0) {
        alert("Task name must include atleast one character");
        return;
    }
    else if (validate(inp.value) == false) {
        alert("Task name must not include special symbols");
        return;
    }
    else if (localStorage.getItem(inp.value) != null) {
        alert("Task already listed!");
        return;
    }
    localStorage.setItem(inp.value, "pending");
    add(inp.value);
    inp.value = "";
}


function validate(val) {
    for (let i = 0; i < val.length; i++) {
        if (((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A' && val[i] <= 'Z') || (val[i] >= '0' && val[i] <= '9') || val[i] == ' ') == false)
            return false;


    }

}


display();
all.classList.add("selected");