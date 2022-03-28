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

  return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <p class="small-text">Posted by user ${postObject.userId}</p>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
        <p class="small-text">${
          monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}</p>
        <div><button id="edit--${postObject.id}">Edit</button></div>
        <div><button id="delete--${postObject.id}">Delete</button></div>
      </section>
    `;
};
