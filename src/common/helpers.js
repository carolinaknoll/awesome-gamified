export function sortByNameAscending(array) {
  array.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    return nameA.localeCompare(nameB);
  })
};

export function toggleDifferentClasses(target, firstClass, secondClass) {
  if (target.classList.contains(firstClass)) {
    target.classList.remove(firstClass);
    target.classList.add(secondClass);
  } else {
    target.classList.remove(secondClass);
    target.classList.add(firstClass);
  }
}

export function translateLocation(location) {
  let locationMap = {
    'savedSeen': 'seen',
    'savedBookmarks': 'bookmarked',
  }

  return locationMap[location];
}
