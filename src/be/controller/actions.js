const isStorgeSupport = () => {
  if (typeof Storage !== 'undefined') {
    // Code for localStorage/sessionStorage.
    return true;
  } else {
    // Sorry! No Web Storage support..
    return false;
  }
};

// CRUD Category
export const createCategories = categories => {
  if (isStorgeSupport ()) {
    localStorage.setItem ('categories', categories);
  }
  return categories;
};

export const readCategories = () => {
  if (isStorgeSupport ()) {
    return JSON.parse (localStorage.getItem ('categories'));
  } else {
    return null;
  }
};

export const updateCategory = newCategory => {
  if (isStorgeSupport ()) {
    for (let key in localStorage) {
      if (key === 'categories') {
        const categoriesArr = JSON.parse (localStorage.getItem (key));
        //Find index of specific object using findIndex method.
        let objIndex = categoriesArr.findIndex (
          obj => obj.id === newCategory.id
        );
        //Update object's.
        categoriesArr[objIndex] = newCategory;

        localStorage.removeItem ('categories');
        localStorage.setItem ('categories', JSON.stringify (categoriesArr));
      }
    }
  }
};

export const deleteCategory = categories => {
  if (isStorgeSupport ()) {
    for (let key in localStorage) {
      if (key === 'categories') {
        localStorage.removeItem ('categories');
        localStorage.setItem ('categories', JSON.stringify (categories));
      }
    }
  }
};

// CRUD Location
export const updateLocation = (newLocation, currentCategoryId) => {
  if (isStorgeSupport ()) {
    for (let key in localStorage) {
      if (key === 'categories') {
        const categoriesArr = JSON.parse (localStorage.getItem (key));
        const locations = categoriesArr[currentCategoryId - 1].locations;
        if (locations) {
          //Find index of specific object using findIndex method.
          let objIndex = locations.findIndex (
            obj => obj.currentLocationId === newLocation.currentLocationId
          );
          //Update object's.
          locations[objIndex] = newLocation;
          categoriesArr.locations = locations;
          localStorage.removeItem ('categories');
          localStorage.setItem ('categories', JSON.stringify (categoriesArr));
        }
      }
    }
  }
};
