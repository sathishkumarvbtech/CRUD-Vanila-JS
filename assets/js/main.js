const formEl = document.forms.empolyeeData;
const popupForm = document.querySelector('.popup__form');
const overlayContainer = document.querySelector('.overlay');
const empolyeeData = document.querySelector(".empolyee__data");
const msg = document.querySelector(".message");
const footerMsg = document.querySelector(".footer__message");
const success = document.querySelectorAll(".success-icon");
const failure = document.querySelectorAll(".failure-icon");
const users = [{
    id: 1,
    fullName: "Sathishkumar V",
    email: "sathishkumarvbtech@gmail.com",
    phonenumber: "+91 8056686885"
},]

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    var user = {}
    for (let [name, value] of formData) {
        user[name] = value
    }
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;
    const [fullName, email, phonenumber] = formEl.elements;
    var message = "Employee data added successfully !";
    formValidation([fullName, email, phonenumber], user);
})

formEl.addEventListener("keyup", (event) => {
    enterKey(event)
})

const enterKey = (event) => {
    if (event === "Enter") {
        const formData = new FormData(formEl);
        var user = {}
        for (let [name, value] of formData) {
            user[name] = value
        }
        var lastUser = users[Object.keys(users).sort().pop()];
        user.id = lastUser.id + 1;
        formValidation([fullName, email, phonenumber], user);
    }
}

const formValidation = (Name, user) => {
    userfieldValidation(Name, user)
}

const userfieldValidation = (Name, user) => {
    if (Name[0].value.trim() === "") {
        var message ="Name field is empty";
        showError(Name[0]);
        showErrorIcon(0);
        showErrorMessage(message)
        return false;
    }
    if (!isNaN(Name[0].value)) {
        var message ="Enter valid name"
        showError(Name[0]);
        showErrorIcon(0);
        showErrorMessage(message)
        return false;
    }
    else {
        showSuccess(Name[0]);
        showSuccessIcon(0);
    }


    if (Name[1].value.trim() === "") {
        var message ="Email fild is empty"
        showError(Name[1]);
        showErrorIcon(1);
        showErrorMessage(message)
        return false;
    }

    else {
        showSuccess(Name[1]);
        showSuccessIcon(1);
    }

    if (Name[2].value === "") {
        var message ="Phonenumber fild is empty"
        showErrorMessage(message)
        showError(Name[2]);
        showErrorIcon(2);
        return false;
    }

    else {
        var message=`${user.fullName}Empolyee details added successfully`;
        showSuccess(Name[2]);
        showSuccessIcon(2);
        formvaluePushUsers(user);
        showSuccessMessage(message)
        formEl.reset();
    }
}

const showError = (input) => {
    input.parentElement.classList.add("error-border");
}

const showErrorIcon = (i) => {
    success[i].classList.remove("show");
    failure[i].classList.add("show");
}

const showSuccess = (input) => {
    input.parentElement.classList.add("success-border");
}

const showSuccessIcon = (i) => {
    success[i].classList.add("show");
    failure[i].classList.remove("show");
}

const formvaluePushUsers = (user) => {
    users.push(user)
    handleDataSubmit(user)
}

const showErrorMessage = (message) => {
    msg.innerText = message;
    msg.classList.add('show__font-r')
}


const showSuccessMessage = (message) => {
    msg.innerText = message;
    msg.classList.add('show__font-g')
}

const updateEmpolyeeDetails = (id) => {
    users.forEach((user) => {
        if (user.id === id) {
            overlayContainer.classList.add('show');
            popupForm.innerHTML = `<form name="updateEmpolyeeData" class="update__form">
    <div class="name">
        <label for="name">Full Name:</label><br>
        <input type="text" name="fullName" id="fullName" class="form-name" value="${user.fullName}" />
    </div>

    <div class="email">
        <label for="email">Email:</label><br>
        <input type="text" id="email" name="email" class="form-email" value="${user.email}"/>
    </div>
    <div class="phone">
        <label for="phone">Phone Number:</label><br>
        <input type="text" id="phonenumber" name="phonenumber" class="form-phone"
            value="${user.phonenumber}"/>
    </div>
    <div class="button">
        <button class="submit__btn" id="Sumbit" onclick="updateData(${id},event)">Update</button>
        <button type="button" class="cancel__btn" id="cancel" onclick="closeForm()">Cancel</button>
    </div>
</form>
<div class="close"><i class="fa-sharp fa-solid fa-circle-xmark clsose--icon" onclick="closeForm()"></i></div>`
        }
    })

}

const closeForm = () => {
    overlayContainer.classList.remove('show');
}

const updateData = (id, event) => {
    event.preventDefault();
    users.forEach((user) => {
        if (id == user.id) {
            const updateForm = document.forms.updateEmpolyeeData;
            const { fullName, email, phonenumber } = updateForm.elements;
            if (fullName.name === "fullName") {
                user.fullName = fullName.value;
            }
            if (email.name === "email") {
                user.email = email.value;
            }
            if (phonenumber.name === "phonenumber") {
                user.phonenumber = phonenumber.value;
            }
            let i = user.id - 1;
            users.splice(i, 1)
            users.splice(i, 0, user)
            closeForm();
            const userdatas = document.querySelectorAll(`#user${user.id} .userData`);
            userdatas.forEach((Data) => {
                const nameAttr = Data.getAttribute("name");
                if (nameAttr === "name") {
                    Data.innerText = user.fullName;
                }
                if (nameAttr === "email") {
                    Data.innerText = user.email;
                }
                if (nameAttr === "phonenumber") {
                    Data.innerText = user.phonenumber;
                }
                footerMsg.innerText = `Empolyee id ${user.id} details was updated`;
                footerMsg.classList.add('show__font-g');
            })
        }
    })
}

const deleteData = (id) => {
    users.forEach((user) => {
        if (user.id === id) {
            let i = user.id - 1;
            users.splice(i, 1);
            document.querySelector(`#user${user.id}`).remove();
            footerMsg.innerText = `Empolyee id ${user.id} details was deleted`;
            footerMsg.classList.add('show__font-r');
        }
    })
}

const handleDataSubmit = (user) => {
    empolyeeData.firstElementChild.firstElementChild.lastElementChild.insertAdjacentHTML("afterend", `<tr id="user${user.id}">
    <td>
        <div class="userData" name="name">${user.fullName}</div>
    </td>

    <td>
        <div class="userData" name="email">${user.email}</div>
    </td>
    <td>
        <div class="userData" name="phonenumber">${user.phonenumber}</div>
    </td>
    <td>
        <div onclick="updateEmpolyeeDetails(${user.id})" class="edit">Edit <span class="fa-sharp fa-solid fa-pencil"></span>

        </div>
    </td>
    <td>
        <div class="delete" onclick="deleteData(${user.id})">Delete <span class="fa-sharp fa-solid fa-circle-xmark"></span></div>
    </td>

</tr>`)
}

users.forEach((user) => {
    handleDataSubmit(user)
})

