function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001059311/users';

    function createUser(user) {
        let userData = {
            "username":user.username,
            "password":user.password,
            "firstname":user.firstname,
            "lastname":user.lastname,
            "role":user.role
        };
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers : {
                "content-type": "application/json"
            }
        }).then(res => res.json());
    }

    function findAllUsers() {
        return fetch(this.url).then(res => res.json());
    }

    function findUserById(userId) {
        return fetch(`${this.url}/${userId}`).then(res => res.json());
    }

    function updateUser(userId, user) {
        let userData = {
            "username":user.username,
            "password":user.password,
            "firstname":user.firstname,
            "lastname":user.lastname,
            "role":user.role
        };
        return fetch(`${this.url}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers : {
                "content-type": "application/json"
            }
        }).then(res => res.json());
    }

    function deleteUser(userId) {
        return fetch(`${this.url}/${userId}`, {
            method: 'DELETE'
        }).then(res => res.json());
    }
}