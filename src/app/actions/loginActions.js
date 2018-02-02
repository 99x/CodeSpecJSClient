export function addUser(username, password) {
    return {
        type: "ADD_USER",
        payload: {
            username: username,
            password: password
        }
    };
}