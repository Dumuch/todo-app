const KEY = "todo-list";

const add = (item) => {
  let data = JSON.parse(localStorage.getItem(KEY));

  if (data) {
    data.items.push(item);
    localStorage.setItem(
      KEY,
      JSON.stringify({
        items: data.items,
      })
    );
  } else {
    data = [];
    data.push(item);

    localStorage.setItem(
      KEY,
      JSON.stringify({
        items: data,
      })
    );
  }
};

const remove = (id) => {
  let data = JSON.parse(localStorage.getItem(KEY));

  if (data) {
    data = data.items.filter((item) => item.id !== id);
    localStorage.setItem(
      KEY,
      JSON.stringify({
        items: data,
      })
    );
  }
};

const change = (id) => {
  let data = JSON.parse(localStorage.getItem(KEY));

  if (data) {
    data.items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    localStorage.setItem(
      KEY,
      JSON.stringify({
        items: data.items,
      })
    );
  }
};

const get = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

export { add, remove, change, get };
