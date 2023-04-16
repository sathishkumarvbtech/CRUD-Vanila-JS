const formEl = document.forms.empolyeeData;
const popupForm = document.querySelector('.popup__form');
const overlayContainer = document.querySelector('.overlay');
const empolyeeData = document.querySelector(".empolyee__data");
const msg = document.querySelector(".message");
const footerMsg = document.querySelector(".footer__message");
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
    var message = "Employee data added successfully !";
    var error = "Please enter  valid empolyee data "
    let [FullName, email, phone] = formEl.elements;
    formValidation([FullName, email, phone], user, message, error);
})

const formValidation = (Name, user, message, error) => {
    const success = document.querySelectorAll(".success-icon");
    const failure = document.querySelectorAll(".failure-icon");
    if (Name[0].value.trim() === "" || Name[1].value.trim() === "" || Name[2].value.trim() === "") {
        Name[0].style.borderBottom = "1px solid red";
        failure[0].style.display = "block";
        success[0].style.display = "none";
        Name[0].focus();
        // Email Validation
        Name[1].style.borderBottom = "1px solid red";
        failure[1].style.display = "block";
        success[1].style.display = "none";
        msg.innerText = error;
        // Phone Number Validation
        Name[2].style.borderBottom = "1px solid red";
        failure[2].style.display = "block";
        success[2].style.display = "none";
        Name[2].focus();
        msg.innerText = error;
        msg.classList.add('redcolor');
        return false;
    }
    else {
        formEl.reset()
        formvaluePushUsers(user)
        msg.innerText = message;
        msg.classList.add('showcolor');
        msg.classList.remove('redcolor');
    }
}
const formvaluePushUsers = (user) => {
    users.push(user)
    handleDataSubmit(user)

}

const updateEmpolyeeDetails = (id) => {
    users.forEach((user) => {
        if (user.id === id) {
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
            overlayContainer.classList.add('show');
            popupForm.style.opacity = 1;

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
                footerMsg.classList.add('showcolor');
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
            footerMsg.classList.add('redcolor');
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


