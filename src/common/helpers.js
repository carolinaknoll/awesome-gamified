import React from 'react';
import {toast} from 'react-toastify';

export function sortByNameAscending(array) {
  array.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    return nameA.localeCompare(nameB);
  })
}

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

export function notifyAction(itemName, itemLocation, icon, action) {
  let translatedLocation = translateLocation(itemLocation);

  let formattedIcon = `awesome-text-gradient fas ${icon}`;

  let formattedMessage = (
    <span><i className={formattedIcon}></i> Your topic <span className="awesome-text-gradient bold">{itemName} </span>
    has been <span className="bold"> {action} </span> your <span className="bold">{translatedLocation}</span> list!</span>
  );

  return toast(formattedMessage);
}
