function User(username, password, firstname, lastname, role) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;

    this.setUsername = setUsername;
    this.getUsername = getUsername;
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.setFirstName = setFirstName;
    this.getFirstName = getFirstName;
    this.setLastName = setLastName;
    this.getLastName = getLastName;
    this.setRole = setRole;
    this.getRole = getRole;

    function setUsername(username) {
        this.username = username;
    }
    function getUsername() {
        return this.username;
    }
    function setPassword(password) {
        this.password = password;
    }
    function getPassword() {
        return this.password;
    }

    function setFirstName(firstname) {
        this.firstname = firstname;
    }
    function getFirstName() {
        return this.firstname;
    }

    function setLastName(lastname) {
        this.lastName = lastname;
    }
    function getLastName() {
        return this.lastname;
    }

    function setRole(role) {
        this.role = role;
    }
    function getRole() {
        return this.role;
    } 

}