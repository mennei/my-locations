import React from 'react';
import Input from '../../../fe/components/UI/Input/Input';
import Button from '@material-ui/core/Button';

const Category = props => {
  let categoriesView = null;
  if (props.isViewAll && props.categories.length > 0) {
    categoriesView = props.categories.map ((category, index) => {
      const cssStyle = category.isCategoryHighlight
        ? {backgroundColor: 'yellow'}
        : {backgroundColor: 'white'};
      return (
        <div key={index}>
          <div style={cssStyle}>
            Category : {category.id}
            <span>
              <Button
                color="inherit"
                onClick={id => props.highlight (category.id)}
              >
                Choose Category
              </Button>
            </span>
            {category.isDeleteable && category.isCategoryHighlight
              ? <span>
                  <Button
                    color="inherit"
                    onClick={(event, id) =>
                      props.deleteCategory (event, category.id)}
                  >
                    Confirm Category Deletion
                  </Button>

                </span>
              : null}
            {
              <span>
                {
                  <Input
                    elementConfig={{
                      type: 'text',
                      placeholder: 'Category Name',
                    }}
                    defaultValue={category.categoryName}
                    keyPress={(event, id) =>
                      props.editCategory (event, category.id)}
                    keyDown={(event, id) =>
                      props.editCategory (event, category.id)}
                  />
                }
              </span>
            }
            {category['locations'] &&
              (category.isCategoryHighlight || props.isViewDetails)
              ? <div>
                  {category['locations'].map ((loc, index) => (
                    <div key={index}>
                      Location: {loc.currentLocationId}
                      <Button
                        color="inherit"
                        onClick={(event, id, name) =>
                          props.deleteLocation (
                            event,
                            category.id,
                            loc.locationName
                          )}
                      >
                        Confirm Location Deletion
                      </Button>
                      <span>
                        <Input
                          elementConfig={{
                            type: 'text',
                            placeholder: 'Location Name',
                          }}
                          defaultValue={loc.locationName}
                          keyPress={(event, locationId, categoryId) =>
                            props.editLocationName (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                          keyDown={(event, locationId, categoryId) =>
                            props.editLocationName (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                        />
                        <Input
                          elementConfig={{
                            type: 'text',
                            placeholder: 'Location Address',
                          }}
                          defaultValue={loc.address}
                          keyPress={(event, locationId, categoryId) =>
                            props.editAddress (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                          keyDown={(event, locationId, categoryId) =>
                            props.editAddress (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                        />
                        <Input
                          elementConfig={{
                            type: 'text',
                            placeholder: 'Coordinates (lattitute)',
                          }}
                          defaultValue={loc.lattitute}
                          keyPress={(event, locationId, categoryId) =>
                            props.editLattitute (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                          keyDown={(event, locationId, categoryId) =>
                            props.editLattitute (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                        />
                        <Input
                          elementConfig={{
                            type: 'text',
                            placeholder: 'Coordinates (longitude)',
                          }}
                          defaultValue={loc.longitude}
                          keyPress={(event, locationId, categoryId) =>
                            props.editLongitude (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                          keyDown={(event, locationId, categoryId) =>
                            props.editLongitude (
                              event,
                              loc.currentLocationId,
                              category.id
                            )}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              : null}
          </div>
        </div>
      );
    });
  }

  return <div>{categoriesView}</div>;
};

export default Category;
