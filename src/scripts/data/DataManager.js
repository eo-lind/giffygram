const loggedInUser = {
  id: 1,
  name: "Rupert",
  email: "rupert@bn.com",
};

export const getLoggedInUser = () => {
  return loggedInUser;
};

export const getUsers = () => {
  return fetch("http://localhost:8088/users")
    .then((response) => response.json())
    .then((parsedResponse) => {
      // do something with response here
      return parsedResponse;
    });
};

export const createUserObj = (userObj) => {
  return fetch("http://localhost:8088/users")
    .then((response) => response.json())
    .then((parsedResponse) => {
      // do something with response here
      return parsedResponse;
    });
};
// TODO delete this when filter works
// export const getPosts = () => {

//     return fetch("http://localhost:8088/posts?_sort=id&_order=desc")
//     .then(response => response.json())
//     .then(parsedResponse => {
//         // do something with response here
//         return parsedResponse;
//     })
// }

// begin filter addition
let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
};
export const getPosts = () => {
  return fetch("http://localhost:8088/posts?_sort=id&_order=desc")
    .then((response) => response.json())
    .then((parsedResponse) => {
      postCollection = parsedResponse;
      return parsedResponse;
    });
};

// end filter addition

export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  }).then((response) => response.json());
};

// ! console.log returns post count, return statement does not
//  post count
export const countPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log(parsedResponse.length);
      return parsedResponse;
    });
};

// TO DELETE A POST

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

// TO EDIT A POST

// first you need to get the single post
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((response) =>
    response.json()
  );
};

// this will replace the original version of the post object in the database (it's using "PUT", not "POST", so it's not creating a new object)
export const updatePost = (postObj) => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  }).then((response) => response.json());
};
