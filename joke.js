const btnRandom = document.getElementById("random");
btnRandom.addEventListener("click", getRandom);
const URL = "https://api.chucknorris.io/jokes/random";
const $ul = document.querySelector(".result");

function getRandom() {
  let promise = fetch(URL);
  promise
    .then((res) => {
      return res.json();
    })
    .then((joke) => {
      let { value } = joke;
      $ul.innerHTML = ` <li class="ran">${value}</li>`;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
}

const URL1 = "https://api.chucknorris.io/jokes/categories";
const list = document.querySelector(".category");
let $li;

let categorys = fetch(URL1);
categorys
  .then((res) => {
    return res.json();
  })
  .then((c) => {
    for (let category of c) {
      $li = document.createElement("li");
      $li.className = "li";
      $li.innerHTML = category;

      list.appendChild($li);

      $li.addEventListener("click", function (e) {
        let url3 = `https://api.chucknorris.io/jokes/random?category=${e.target.innerHTML}`;
        let p = fetch(url3);
        p.then((res) => {
          return res.json();
        }).then((joke) => {
          console.log(joke);
          let { value } = joke;
          $ul.innerHTML = `<h5 class"li"> Fact/joke of category ${e.target.innerHTML}</h5>
           <li class="li">${value}</li>`;
        });
      });
    }
  });

const myInput = document.getElementById("search");
myInput.addEventListener("keypress", render);

async function search1(q) {
  const URL = `https://api.chucknorris.io/jokes/search?query=${q}`;
  try {
    let res = await fetch(URL);
    let data = await res.json();
    const results = await data.result;
    const jokes = results.map((joke) => {
      return joke.value;
    });
    console.log(jokes);
    for (j of jokes) {
      li = document.createElement("li");
      li.className = "joke";
      li.innerHTML = j;
      let br = document.createElement("br");

      $ul.appendChild(li);
      $ul.appendChild(br);
    }
  } catch (err) {
    console.log(err);
  }
}

function render(e) {
  loadData2(e.target.value);
}
const loadData2 = _.debounce(search1, 800);
