export default function sortByNameAscending(array) {
  array.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    return nameA.localeCompare(nameB);
  })
};
