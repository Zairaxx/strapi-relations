let getData = async (url) => {
  let response = await axios.get(url);
  return response.data;
};

let loadPage = async () => {
  let dishes = await getData("http://localhost:1337/api/dishes?populate=*");
  console.log(dishes);

  dishes.data.forEach((dish) => {
    document.querySelector("#menu").innerHTML += `<li><p>${
      dish.attributes.name
    } - ${dish.attributes.price} kr - ${dish.attributes.categories.data.map(
      (cat) => cat.attributes.name
    )}</p>
    <img  height="100" src="http://localhost:1337${
      dish.attributes.picture.data?.attributes.url
    }" />
    </li>`;
  });
};

let createDish = async () => {
  let inputName = document.querySelector("#dishName").value;
  let inputPrice = +document.querySelector("#dishPrice").value;

  let inputCategories = [];
  let checkedCategories = document.querySelectorAll(
    "[name='category']:checked"
  );
  checkedCategories.forEach((checkbox) => {
    inputCategories.push(checkbox.value);
  });
  console.log(inputCategories);
  axios.post("http://localhost:1337/api/dishes", {
    data: {
      name: inputName,
      price: inputPrice,
      categories: inputCategories,
      picture: 2,
    },
  });
};

loadPage();

document.querySelector("#addDish").addEventListener("click", createDish);
