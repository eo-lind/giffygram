const loggedInUser = {
	id: 2,
	name: "Rupert",
	email: "rupert@bn.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}

export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

export const getPosts = () => {

    return fetch("http://localhost:8088/posts?_sort=id&_order=desc")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}