// Can you explain what is being imported here?
import {
  countPosts,
  createPost,
  deletePost,
  getLoggedInUser,
  getPosts,
  getSinglePost,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  setLoggedInUser,
  updatePost,
  usePostCollection,
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "../../auth/LoginForm.js";
import { RegisterForm } from "../../auth/RegisterForm.js";

const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
  navElement.innerHTML = NavBar();
};

const showFooter = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("footer");
  navElement.innerHTML = Footer();
};

const showPostList = () => {
  //Get a reference to the location on the DOM where the list will display
  const postElement = document.querySelector(".postList");
  getPosts().then((allPosts) => {
    postElement.innerHTML = PostList(allPosts);
  });
};

const showPostEntry = () => {
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
};

const showPostCount = () => {
  //Get a reference to the location on the DOM where the post count will display
  const entryElement = document.querySelector("#postCount");
  entryElement.innerHTML = countPosts();
};

const startGiffyGram = () => {
  showNavBar();
  showPostList();
  showFooter();
  showPostCount();
  showPostEntry();
};

const checkForUser = () => {
  if (sessionStorage.getItem("user")) {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    startGiffyGram();
  } else {
    showLoginRegister();
  }
};

const showLoginRegister = () => {
  showNavBar();
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
};

checkForUser();

// *********** EVENT LISTENERS ***********

// reference where on the DOM we will be listening for events - any clicks within this element will be heard:
const applicationElement = document.querySelector(".giffygram");

// how we react to the click (this looks for more specific target IDs):

// when user completes login form and clicks submit button, this collects their info in an object, checks the db to see if they're an existing user. If so, it will set them as the user in sessionStorage and invoke startGiffyGram(). If they aren't already in the db, they will be prompted to register.
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value,
    };
    loginUser(userObject).then((dbUserObj) => {
      if (dbUserObj) {
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      } else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    });
  }
});

// when user completes the register form and clicks submit button, this collects their info into an object and uses "POST" method to add them to the db. It then takes the response and sets them as logged in user as well as sets them as user in sessionStorage. It then invokes startGiffyGram()
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value,
    };
    registerUser(userObject).then((dbUserObj) => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    });
  }
});

// listen for clicks on logout
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
    sessionStorage.clear();
    checkForUser();
  }
});

// listen for clicks on footer dropdown
applicationElement.addEventListener("change", (event) => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value);

    console.log(`User wants to see posts since ${yearAsNumber}`);
  }
});

// listen for clicks on DM icon (directMessageIcon)
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "directMessageIcon") {
    alert("You clicked the DM icon");
  }
});

// listen for clicks on Giffygram icon (PB-jar)
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "PB-jar") {
    alert("You clicked the Giffygram icon");
  }
});

// listen for clicks on specific post
applicationElement.addEventListener("click", (event) => {
  if (event.target.id.startsWith("edit")) {
    console.log("post clicked", event.target.id.split("--"));
    console.log("the id is", event.target.id.split("--")[1]);
  }
});

// listen for cancel and submit buttton
applicationElement.addEventListener("click", (event) => {
  if (event.target.id === "newPost__cancel") {
    showPostEntry();
  }
});

// .preventDefault() prevents the default behavior of refreshing the page
applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: Date.now(),
    };

    createPost(postObject).then(() => {
      showPostList();
      showPostEntry();
    });
  }
});

// listen for clicks on the delete button

applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("--")[1];
    deletePost(postId).then((response) => {
      showPostList();
    });
  }
});

// listen for clicks on edit button

applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("edit")) {
    const postId = event.target.id.split("--")[1];
    getSinglePost(postId).then((response) => {
      showEdit(response);
    });
  }
});

// put data to be edited into edit form
const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
};

// when user submits edits on post

applicationElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("--")[1];

    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value;
    const url = document.querySelector("input[name='postURL']").value;
    const description = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    const timestamp = document.querySelector("input[name='postTime']").value;

    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: parseInt(timestamp),
      id: parseInt(postId),
    };

    updatePost(postObject).then((response) => {
      showPostList();
      showPostEntry();
    });
  }
});

// for filtering posts by year:

applicationElement.addEventListener("change", (event) => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value);
    console.log(`User wants to see posts since ${yearAsNumber}`);
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber);
  }
});

const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter((singlePost) => {
    if (singlePost.timestamp >= epoch) {
      return singlePost;
    }
  });
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = PostList(filteredData);
};
