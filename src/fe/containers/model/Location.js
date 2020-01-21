import React from 'react';
import Category from './Category';
const Loaction = props => {
  let locationStatus = null;
  if (props.isNew) {
    locationStatus = (
      <div>
        {props.form}
      </div>
    );
  }
  return (
    <div>
      {locationStatus}
      <Category
        key={Math.floor (Math.random () * Math.floor (100))}
        errorMsg={props.errorMsg}
        isNew={props.isNew}
        isViewAll={props.isViewAll}
        categories={props.categories}
        isDeleteable={props.isDeleteable}
        isViewDetails={props.isViewDetails}
        form={props.form}
        highlight={id => props.highlight (id)}
        editCategory={(event, id) => props.editCategory (event, id)}
        editLocationName={(event, locationId, categoryId) =>
          props.editLocationName (event, locationId, categoryId)}
        editAddress={(event, locationId, categoryId) =>
          props.editAddress (event, locationId, categoryId)}
        editLattitute={(event, locationId, categoryId) =>
          props.editLattitute (event, locationId, categoryId)}
        editLongitude={(event, locationId, categoryId) =>
          props.editLongitude (event, locationId, categoryId)}
        deleteCategory={(event, id) => props.deleteCategory (event, id)}
        deleteLocation={(event, id, name) =>
          props.deleteLocation (event, id, name)}
      />
    </div>
  );
};

export default Loaction;
