var users = []
var usernameFld = $("#usernameFld")
var passwordFld = $("#passwordFld")
var firstnameFld = $("#firstNameFld")
var lastnameFld = $("#lastNameFld")
var roleFld = $("#roleFld")
var searchBtn = $('.wbdv-search')
var addBtn = $(".wbdv-create")
var updateBtn = $(".wbdv-update")
var deleteBtn = $(".wbdv-remove")
var editBtn = $(".wbdv-edit")
var tbody = $(".wbdv-tbody")
var rowTemplate = $(".wbdv-template")
var client = new AdminUserServiceClient()


addBtn.click(function () {
    createUser();
})

updateBtn.click(function () {
    updateUser();
})

// search function
searchBtn.click(function () {
    let username = usernameFld.val();
    let password = passwordFld.val();
    let firstname = firstnameFld.val();
    let lastname = lastnameFld.val();
    let role = roleFld.val();
    newUsers = [];
    for(i = 0; i < users.length; i++) {
        if (username != '' && users[i].username != username) {
            break;
        }
        if (password != '' && users[i].password != password) {
            break;
        }
        if (firstname != '' && users[i].firstname != firstname) {
            break;
        }
        if (lastname != '' && users[i].lastname != lastname) {
            break;
        }
        if (role != '' && users[i].role != role) {
            break;
        }
        newUsers.push(users[i]);
    }
    renderUsers(newUsers);
})

findAllUsers();

function createUser() {
    let usr = new User(usernameFld.val(), passwordFld.val(), firstnameFld.val(), lastnameFld.val(), roleFld.val());
    let res = client.createUser(usr);
    res.then((newUser) => {
        clearInputs();
        users.push(newUser);
        renderUsers(users);
    })
}

function findAllUsers() {
    users.length = 0;
    let res = client.findAllUsers();
    res.then((userData) => {
        for (let i = 0; i < userData.length; i++) {
            users.push(userData[i])
        }
        renderUsers(users);
    })
}

function findUserById(id) {
    let res = client.findUserById(id);
    res.then((user) => {
        usernameFld.val(user.username);
        passwordFld.val(user.password);
        firstnameFld.val(user.firstname);
        lastnameFld.val(user.lastname);
        roleFld.val(user.role);
    
        // We need to add the id to update button's attr
        // so that it knows the current editing row.
        updateBtn.attr("id", user._id);
    })
    res.catch((err)=>console.log(err));
}

function updateUser() {
    let id = updateBtn.attr("id");
    let res = client.findUserById(id);
    res.then((usr) => {
        usr.username = usernameFld.val();
        usr.password = passwordFld.val();
        usr.firstname = firstnameFld.val();
        usr.lastname = lastnameFld.val();
        usr.role = roleFld.val();
        let updateRes = client.updateUser(id, usr);
        updateRes.then(() => {
            clearInputs();
            renderUser(usr);
        })
        updateRes.catch((err)=>console.log(err))
    })
    res.catch((err)=>console.log(err))

}

function deleteUser(id) {
    let res = client.deleteUser(id);
    res.then((r) => {
        for(i = 0; i < users.length; i++) {
            if(users[i]._id == id) {
                users.splice(i, 1);
                break;
            }
        }
        renderUsers(users);
    });
    res.catch((err)=>console.log(err))
}

function renderUser(user) {
    let found = false;
    for (i = 0; i < users.length; i++) {
        // If we can find the user id, we just need to update
        // the existing record.
        if (users[i]._id == user._id) {
            found = true;
            users[i] = user;
            break;
        }
    }
    if (found) {
        let row = $('#wbdv-remove.'+user._id).parent().parent().parent();
        row.find(".wbdv-username").text(user.username);
        row.find(".wbdv-first-name").text(user.firstname);
        row.find(".wbdv-last-name").text(user.lastname);
        row.find(".wbdv-role").text(user.role);
        console.log(row.length);
        console.log(row);
    } else {
        let newRow = rowTemplate.clone();
        newRow.removeClass("wbdv-hidden");
    
        let newDeleteBtn = newRow.find("#wbdv-remove");
        newDeleteBtn.addClass(user._id);
        newDeleteBtn.click(function() {
            deleteUser(user._id);
        })
    
        let newEditBtn = newRow.find("#wbdv-edit");
        newEditBtn.addClass(user._id);
    
        newRow.find(".wbdv-username").text(user.username);
        newRow.find(".wbdv-first-name").text(user.firstname);
        newRow.find(".wbdv-last-name").text(user.lastname);
        newRow.find(".wbdv-role").text(user.role);
        tbody.append(newRow);
    }
}

function renderUsers(userArray) {
    tbody.empty();
    for(let index in userArray) {
        let newRow = rowTemplate.clone();
        newRow.removeClass("wbdv-hidden");
        let user = userArray[index];

        let newDeleteBtn = newRow.find("#wbdv-remove");
        newDeleteBtn.addClass(user._id);
        newDeleteBtn.click(function() {
            deleteUser(user._id);
        })

        let newEditBtn = newRow.find("#wbdv-edit");
        newEditBtn.addClass(user._id);
        newEditBtn.click(function() {
            findUserById(user._id);
        })

        newRow.find(".wbdv-username").text(user.username);
        newRow.find(".wbdv-first-name").text(user.firstname);
        newRow.find(".wbdv-last-name").text(user.lastname);
        newRow.find(".wbdv-role").text(user.role);
        tbody.append(newRow);
    }
}

function clearInputs() {
    usernameFld.val('');
    passwordFld.val('');
    firstnameFld.val('');
    lastnameFld.val('');
    roleFld.val('');
}