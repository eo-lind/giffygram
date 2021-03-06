import { getLoggedInUser } from "../data/DataManager.js";

export const Post = (postObject) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(postObject.timestamp);

  const buttonsForAuthor = () => {
    let user = getLoggedInUser();
    if (user.id === postObject.userId) {
      return `<button id="edit--${postObject.id}">Edit</button>
      <button id="delete--${postObject.id}">Delete</button>`;
    } else {
      return ``;
    }
  };

  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <p class="small-text">Posted by ${postObject.user.name}</p>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
        <p class="small-text">${
          monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}</p>
        ${buttonsForAuthor()}
      </section>
    `;
};
