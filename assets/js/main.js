const formEl = document.forms.empolyeeData;
const users = [{
    id: 1,
    fullName: "Sathishkumar",
    email: "sathishkumarvbtech@gmail.com",
    phone: "+91 8056686885"
}]

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const user = {}
    for (let [name, value] of formData) {
        user[name] = value
    }
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;
    users.push(user)
    let [FullName, email, phone] = formEl.elements;
    formValidation([FullName, email, phone], "Name is can't Blank", user);
})

const onTypingvalidation = (Name) => {
    Name.addEventListener("input", () => {

    })
}

const formValidation = (Name, error, user) => {
    const msg = document.querySelector(".message")
    const success = document.querySelectorAll(".success-icon");
    const failure = document.querySelectorAll(".failure-icon");
    if (Name[0].value.trim() === '' || Name[1].value == "" || Name[2].value == "") {
        Name[0].style.borderBottom = "1px solid red";
        failure[0].style.display = "block";
        success[0].style.display = "none";
        Name[0].focus();
        // Email Validation
        Name[1].style.borderBottom = "1px solid red";
        failure[1].style.display = "block";
        success[1].style.display = "none";
        Name[1].focus();
        // Phone Number Validation
        Name[2].style.borderBottom = "1px solid red";
        failure[2].style.display = "block";
        success[2].style.display = "none";
        Name[2].focus();
        console.log("email error");
        return false;
    }
    else {
        handleDataSubmit(user)
        formEl.reset()
    }

}




const handleDataSubmit = (user) => {
    const empolyeeData = document.querySelector(".empolyee__data");
    empolyeeData.firstElementChild.firstElementChild.lastElementChild.insertAdjacentHTML("afterend", `<tr>
    <td>
        <div>${user.fullName}</div>
    </td>

    <td>
        <div>${user.email}</div>
    </td>
    <td>
        <div>${user.phonenumber}</div>
    </td>
    <td>
        <div onclick="updateEmpolyeeDetails(event)" class="edit">Edit <span class="fa-sharp fa-solid fa-pencil"></span>

        </div>
    </td>
    <td>
        <div class="delete">Delete <span class="fa-sharp fa-solid fa-circle-xmark"
                onclick=""></span></div>
    </td>

</tr>`)
}



const updateEmpolyeeDetails = () => {
    users.forEach((user) => {
        if (user.id === id) {
            const popupForm = document.querySelector('.popup__form');
            popupForm.innerHTML = ` <form name="empolyeeData" class="empolyee__form">
    <div class="name">
        <label for="name">Full Name:</label><br>
        <input type="text" name="fullName" id="name" class="form-name" placeholder="Enter your name" value=${e.user.fullName} />
    </div>

    <div class="email">
        <label for="email">Email:</label><br>
        <input type="text" id="email" name="email" class="form-email" placeholder="Enter your email" />
    </div>
    <div class="phone">
        <label for="phone">Phone Number:</label><br>
        <input type="text" id="phonenumber" name="phonenumber" class="form-phone"
            placeholder="Enter your phonenumber" />
    </div>
    <div class="button">
        <button class="submit__btn" id="Sumbit">Sumbit</button>
    </div>
</form>`
        }
    })

    console.log("Updated");
}




