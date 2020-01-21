import React, {Component} from 'react';
import Location from './model/Location';
import {
  createCategories,
  updateCategory,
  deleteCategory,
  updateLocation,
} from '../../be/controller/actions';
import ButtonAppBar from '../components/UI/Toolbar/Toolbar.js';
import Button from '@material-ui/core/Button';
import Input from '../components/UI/Input/Input';

class MyLocations extends Component {
  state = {
    controls: {
      categoryName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Category Name',
        },
        value: '',
        defaultValue: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type Category Name',
      },
      locationName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Location Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type Location Name',
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Location Address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type Location Address',
      },
      lattitute: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Coordinates (lattitute)',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type Coordinates (lattitute)',
      },
      longitude: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Coordinates (longitude)',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type Coordinates (longitude)',
      },
    },
    categories: JSON.parse (localStorage.getItem ('categories'))
      ? JSON.parse (localStorage.getItem ('categories'))
      : [],
    isNew: null,
    isViewAll: null,
    title: JSON.parse (localStorage.getItem ('categories')) &&
      JSON.parse (localStorage.getItem ('categories')).length > 0
      ? 'Categories List'
      : 'New Category',
    isEditable: false,
    isDeleteable: false,
    isViewDetails: false,
    titleFlag: null,
    error: JSON.parse (localStorage.getItem ('categories')) &&
      JSON.parse (localStorage.getItem ('categories')).length > 0
      ? 'Please, press view all categories button'
      : 'Categories list is empty',
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity (
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState ({controls: updatedControls, error: ''});
  };

  checkValidity (value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim () !== '' && isValid;
    }
    return isValid;
  }

  submitHandler = event => {
    event.preventDefault ();
    const {
      categoryName,
      locationName,
      address,
      lattitute,
      longitude,
    } = this.state.controls;
    if (
      categoryName.valid &&
      locationName.valid &&
      address.valid &&
      lattitute.valid &&
      longitude.valid
    ) {
      const categoriesArr = [...this.state.categories];
      const locationsArr = categoriesArr['locations'];
      let currentLocationId = 0;
      if (locationsArr) {
        currentLocationId = locationsArr.length;
      }
      let currentId = 0;
      const newLocation = {
        isEditable: false,
        isDeleteable: false,
        currentLocationId: currentLocationId + 10,
        locationName: locationName.value,
        address: address.value,
        lattitute: lattitute.value,
        longitude: longitude.value,
        parent: categoryName.value,
      };
      if (categoriesArr) {
        currentId = categoriesArr.length;
      }
      const sameCategory = categoriesArr.find (
        cat => cat.categoryName === categoryName.value
      );
      if (categoriesArr.length > 0 && sameCategory) {
        newLocation.currentLocationId = sameCategory['locations'].length + 10;
        sameCategory['locations'].push (newLocation);
      } else {
        const obj = {
          id: currentId + 1,
          categoryName: categoryName.value,
          locations: [newLocation],
          isCategoryHighlight: false,
          isEditable: false,
          isDeleteable: false,
        };
        categoriesArr.push (obj);
      }

      createCategories (JSON.stringify (categoriesArr));
      const clearControlors = {
        ...this.state.controls,
      };
      for (let key in clearControlors) {
        clearControlors[key].value = '';
      }
      this.setState ({
        categories: categoriesArr,
        controls: clearControlors,
      });
    } else {
      this.setState ({error: 'Please currect the form'});
    }
  };

  viewDetailsHandler = () => {
    this.setState ({isViewDetails: !this.state.isViewDetails});
  };

  addCategoryHandler = () => {
    this.setState ({
      isNew: true,
      isViewAll: false,
      title: 'New Category',
      error: '',
    });
  };

  viewAllCategories = () => {
    this.setState ({
      isNew: false,
      isViewAll: true,
      title: 'Categories List',
      error: '',
    });
  };

  editCategoryHandler = () => {
    this.setState ({isDeleteable: false, isEditable: true, error: ''});
  };

  deleteCategoryHandler = () => {
    this.setState ({isDeleteable: true, isEditable: false, error: ''});
  };

  checkIsEditable = (event, id) => {
    if (!this.state['categories'][id - 1].isEditable) {
      this.setState ({error: 'Please, press choose category button'});
    }
    if (!this.state.isEditable) {
      this.setState ({error: 'Please, press edit category button'});
    }
    return (
      (event.key === 'Enter' || event.key === 'Tab') &&
      this.state['categories'][id - 1].isEditable &&
      this.state.isEditable
    );
  };

  handleHighlightClick = id => {
    const categories = [...this.state.categories];
    const title = 'Categories List';
    const editTitle = 'Edit/Delete Category';
    const newTitle = 'New Category';
    let titleFlagToUpdate = null;
    const categoriesArr = categories.map (cat => {
      if (cat.id === id) {
        cat.isCategoryHighlight = !cat.isCategoryHighlight;
        cat.isEditable = !cat.isEditable;
        cat.isDeleteable = !cat.isDeleteable;
        titleFlagToUpdate = cat.isCategoryHighlight && categories.length > 0;
      }
      return cat;
    });
    let titleToUpdate = titleFlagToUpdate
      ? editTitle
      : categories.length === 0 ? newTitle : title;
    this.setState ({
      categories: categoriesArr,
      title: titleToUpdate,
      error: '',
      titleFlag: titleFlagToUpdate,
    });
    // Save current state in local stroage
    localStorage.setItem ('categories', JSON.stringify (categoriesArr));
  };

  categoryNameKeyPress = (event, id) => {
    const isEditable = this.checkIsEditable (event, id);
    if (isEditable) {
      const categories = [...this.state.categories];
      let categoriesArr = categories.map (cat => {
        if (cat.id === id) {
          cat.categoryName = event.target.value;
          cat.isCategoryHighlight = false;
          cat.isEditable = false;
        }
        updateCategory (cat);
        return cat;
      });
      this.setState ({categories: categoriesArr});
    }
  };

  locationNameKeyPress = (event, currentLocationId, currentCategoryId) => {
    const isEditable = this.checkIsEditable (event, currentCategoryId);
    if (isEditable) {
      const categoriesArr = [...this.state.categories];
      // Array in js start from 0
      const locations = categoriesArr[currentCategoryId - 1].locations;
      if (locations) {
        let locationsArr = locations.map (loc => {
          if (loc.currentLocationId === currentLocationId) {
            loc.locationName = event.target.value;
            updateLocation (loc, currentCategoryId);
          }
          return loc;
        });
        categoriesArr['locations'] = locationsArr;
        this.setState ({categories: categoriesArr});
      }
    }
  };

  addressKeyPress = (event, currentLocationId, currentCategoryId) => {
    const isEditable = this.checkIsEditable (event, currentCategoryId);
    if (isEditable) {
      const categoriesArr = [...this.state.categories];
      // Array in js start from 0
      const locations = categoriesArr[currentCategoryId - 1].locations;
      if (locations) {
        let locationsArr = locations.map (loc => {
          if (loc.currentLocationId === currentLocationId) {
            loc.address = event.target.value;
            updateLocation (loc, currentCategoryId);
          }
          return loc;
        });
        categoriesArr['locations'] = locationsArr;
        this.setState ({categories: categoriesArr});
      }
    }
  };

  lattituteKeyPress = (event, currentLocationId, currentCategoryId) => {
    const isEditable = this.checkIsEditable (event, currentCategoryId);
    if (isEditable) {
      const categoriesArr = [...this.state.categories];
      // Array in js start from 0
      const locations = categoriesArr[currentCategoryId - 1].locations;
      if (locations) {
        let locationsArr = locations.map (loc => {
          if (loc.currentLocationId === currentLocationId) {
            loc.lattitute = event.target.value;
            updateLocation (loc, currentCategoryId);
          }
          return loc;
        });
        categoriesArr['locations'] = locationsArr;
        this.setState ({categories: categoriesArr});
      }
    }
  };

  longitudeKeyPress = (event, currentLocationId, currentCategoryId) => {
    const isEditable = this.checkIsEditable (event, currentCategoryId);
    if (isEditable) {
      const categoriesArr = [...this.state.categories];
      // Array in js start from 0
      const locations = categoriesArr[currentCategoryId - 1].locations;
      if (locations) {
        let locationsArr = locations.map (loc => {
          if (loc.currentLocationId === currentLocationId) {
            loc.longitude = event.target.value;
            updateLocation (loc, currentCategoryId);
          }
          return loc;
        });
        categoriesArr['locations'] = locationsArr;
        this.setState ({categories: categoriesArr});
      }
    }
  };

  checkIsDeleteable = id => {
    if (!this.state['categories'][id - 1].isDeleteable) {
      this.setState ({error: 'Please, press choose category button'});
    }
    if (!this.state.isDeleteable) {
      this.setState ({error: 'Please, press delete category button'});
    }
    return (
      this.state['categories'][id - 1].isDeleteable && this.state.isDeleteable
    );
  };

  handleDeleteCategory = (event, id) => {
    const isDeleteable = this.checkIsDeleteable (id);
    if (isDeleteable) {
      const title = 'Categories List';
      const editTitle = 'Edit/Delete Category';
      const newTitle = 'New Category';
      let titleFlagToUpdate = null;
      const categoriesArr = [...this.state.categories];
      const result = categoriesArr.filter (obj => obj.id !== id);
      const newResults = result.map ((obj, index) => {
        titleFlagToUpdate = obj.isCategoryHighlight && result.length > 0;
        return {
          id: index + 1,
          categoryName: obj.categoryName,
          isCategoryHighlight: obj.isCategoryHighlight,
          isEditable: obj.isEditable,
          isDeleteable: obj.isDeleteable,
        };
      });
      deleteCategory (newResults);
      let titleToUpdate = titleFlagToUpdate
        ? editTitle
        : this.state.categories.length === 0 ? newTitle : title;
      if (
        this.state.categories.length === 0 &&
        (titleToUpdate === 'Categories List' ||
          titleToUpdate === 'New Category')
      ) {
        this.setState ({
          categories: newResults,
          title: titleToUpdate,
          error: 'Categories list is empty',
        });
      } else {
        this.setState ({
          categories: newResults,
          title: titleToUpdate,
          error: '',
        });
      }
    } else {
      this.setState ({error: 'Please, press delete category button'});
    }
  };

  handleDeleteLocation = (event, categoryId, locationName) => {
    const isDeleteable = this.checkIsDeleteable (categoryId);
    if (isDeleteable) {
      const categoriesArr = [...this.state.categories];
      const result = categoriesArr.filter (obj => obj.id === categoryId);
      const categoryName = result.categoryName;
      const locations = result[0].locations;
      if (locations) {
        const newLocations = locations.filter (
          obj => obj.locationName !== locationName
        );
        if (newLocations.length === 0) {
          const newLocation = {
            isEditable: false,
            isDeleteable: false,
            currentLocationId: 10,
            locationName: '',
            address: '',
            lattitute: '',
            longitude: '',
            parent: categoryName,
          };
          newLocations.push (newLocation);
        }
        categoriesArr[categoryId - 1].locations = newLocations;
        deleteCategory (categoriesArr);
        this.setState ({categories: categoriesArr, error: ''});
      }
    } else {
      this.setState ({error: 'Please, press delete category button'});
    }
  };

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push ({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map (formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler (event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (this.state.error) {
      errorMessage = <p style={{color: 'red'}}>{this.state.error}</p>;
    }

    if (this.state.isNew) {
      form = (
        <div>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button color="inherit" type="submit">Save</Button>
          </form>
        </div>
      );
    }

    // const categoriesArr = [...this.state.categories];
    // console.log (categoriesArr);
    return (
      <div>
        <header>
          <ButtonAppBar
            categories={this.state.categories}
            title={this.state.title}
            addCategory={this.addCategoryHandler}
            editCategory={this.editCategoryHandler}
            viewAll={this.viewAllCategories}
            deleteCategory={this.deleteCategoryHandler}
            viewDetails={this.viewDetailsHandler}
          />
        </header>
        <section><div>{errorMessage}</div></section>
        <section>
          <Location
            errorMsg={this.state.error}
            isNew={this.state.isNew}
            isViewAll={this.state.isViewAll}
            categories={this.state.categories}
            isDeleteable={this.state.isDeleteable}
            isViewDetails={this.state.isViewDetails}
            form={form}
            highlight={id => this.handleHighlightClick (id)}
            editCategory={(event, id) => this.categoryNameKeyPress (event, id)}
            editLocationName={(event, locationId, categoryId) =>
              this.locationNameKeyPress (event, locationId, categoryId)}
            editAddress={(event, locationId, categoryId) =>
              this.addressKeyPress (event, locationId, categoryId)}
            editLattitute={(event, locationId, categoryId) =>
              this.lattituteKeyPress (event, locationId, categoryId)}
            editLongitude={(event, locationId, categoryId) =>
              this.longitudeKeyPress (event, locationId, categoryId)}
            deleteCategory={(event, id) =>
              this.handleDeleteCategory (event, id)}
            deleteLocation={(event, id, name) =>
              this.handleDeleteLocation (event, id, name)}
          />
        </section>
      </div>
    );
  }
}

export default MyLocations;
