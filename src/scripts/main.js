// Can you explain what is being imported here?
import { getPosts, getUsers, getLoggedInUser, createPost } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }


const startGiffyGram = () => {
	showNavBar();
	showPostList();
	showFooter();
	showPostEntry();
}

startGiffyGram();



// *********** EVENT LISTENERS ***********

// reference where on the DOM we will be listening for events - any clicks within this element will be heard:
const applicationElement = document.querySelector(".giffygram");

// how we react to the click (this looks for more specific target IDs):

// listen for clicks on logout
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

// listen for clicks on footer dropdown
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
  
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	}
  })

// listen for clicks on DM icon (directMessageIcon)
applicationElement.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon"){
		alert("You clicked the DM icon")
	}
})

  // listen for clicks on Giffygram icon (PB-jar)
  applicationElement.addEventListener("click", event => {
	if (event.target.id === "PB-jar"){
		alert("You clicked the Giffygram icon")
	}
})

// listen for clicks on specific post
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})


// listen for cancel and submit buttton
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
	}
  })
  
// .preventDefault() prevents the default behavior of refreshing the page
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: getLoggedInUser().id,
		  timestamp: Date.now()
	  }
	
  
		createPost(postObject)
		.then(showPostEntry())
		.then(showPostList())
	}
  })



  