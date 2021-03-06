export default function uniquePicker(array) {
  let clone = [];
  return () => {
    if (!clone.length)
      clone = array.slice(0);
    let index = Math.floor(Math.random() * clone.length);
    return clone.splice(index, 1)[0];
  };
}
