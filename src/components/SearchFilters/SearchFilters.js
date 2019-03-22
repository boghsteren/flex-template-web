import React from "react";
import { compose } from "redux";
import { object, string, bool, number, func, shape } from "prop-types";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import omit from "lodash/omit";

import { SelectSingleFilter, SelectMultipleFilter, PriceFilter } from "../../components";
import routeConfiguration from "../../routeConfiguration";
import { createResourceLocatorString } from "../../util/routes";
import { propTypes } from "../../util/types";
import config from "../../config";

import css from "./SearchFilters.css";

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(",") : [];
};

const initialGroupSizeRangeValue = (queryParams, paramName) => {
  const minPrice = queryParams[paramName + '_min'];
  const maxPrice = queryParams[paramName + '_max'];
  const valMin = !!minPrice ? minPrice.split(',')[0] : null;
  const valMax = !!maxPrice ? maxPrice.split(',')[1] : null;

  return !!valMin || !!valMax
    ? {
      minPrice: parseInt(valMin),
      maxPrice: valMax ? parseInt(valMax) : null,
    }
    : null;
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
      minPrice: valuesFromParams[0],
      maxPrice: valuesFromParams[1],
    }
    : null;
};

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    categoryFilter,
    goalsFilter,
    groupSizeFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(
    rootClassName || css.root,
    { [css.longInfo]: hasNoResult },
    className
  );

  const categoryLabel = intl.formatMessage({
    id: "SearchFilters.categoryLabel"
  });

  const goalsLabel = intl.formatMessage({
    id: "SearchFilters.goalsLabel"
  });

  const groupSizeFilterLabel = intl.formatMessage({
    id: "SearchFilters.groupSizeFilterLabel"
  });

  const initialGoals = goalsFilter
    ? initialValues(urlQueryParams, goalsFilter.paramName)
    : null;

  const initialCategory = categoryFilter
    ? initialValue(urlQueryParams, categoryFilter.paramName)
    : null;

  const initialGroupSize = groupSizeFilter
    ? initialGroupSizeRangeValue(urlQueryParams, groupSizeFilter.paramName)
    : null;
  console.log({initialGroupSize})

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(",") }
        : omit(urlQueryParams, urlParam);

    history.push(
      createResourceLocatorString(
        "SearchPage",
        routeConfiguration(),
        {},
        queryParams
      )
    );
  };

  const handleSelectOption = (urlParam, option) => {
    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    history.push(
      createResourceLocatorString(
        "SearchPage",
        routeConfiguration(),
        {},
        queryParams
      )
    );
  };

  const handleGroupSize = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam + '_min']: `${minPrice},`, [urlParam + '_max']: maxPrice >= config.custom.MAX_GROUP_SIZE_SLIDER ? null : `,${maxPrice}` }
        : omit(urlQueryParams, urlParam + '_min', urlParam + '_max');

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const categoryFilterElement = categoryFilter ? (
    <SelectSingleFilter
      urlParam={categoryFilter.paramName}
      label={categoryLabel}
      onSelect={handleSelectOption}
      options={categoryFilter.options}
      initialValue={initialCategory}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const goalsFilterElement = goalsFilter ? (
    <SelectMultipleFilter
      id={"SearchFilters.goalsFilter"}
      name="goals"
      urlParam={goalsFilter.paramName}
      label={goalsLabel}
      onSelect={handleSelectOptions}
      options={goalsFilter.options}
      initialValues={initialGoals}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const groupSizeFilterElement = groupSizeFilter ? (
    <PriceFilter
      id="SearchFilters.groupSizeFilter"
      urlParam={groupSizeFilter.paramName}
      onSubmit={handleGroupSize}
      showAsPopup={true}
      labelProps="SearchFilters.groupSizeFilterLabel"
      unitProps=" People"
      {...groupSizeFilter.config}
      initialValues={initialGroupSize}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      isGroupSize={true}
    />
  ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;
  return (
    <div className={classes}>
      <div className={css.filters}>
        {categoryFilterElement}
        {groupSizeFilterElement}
        {goalsFilterElement}
        {toggleSearchFiltersPanelButton}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage
              id="SearchFilters.foundResults"
              values={{ count: resultsCount }}
            />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categoryFilter: null,
  goalsFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  categoriesFilter: propTypes.filterConfig,
  goalsFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired
};

const SearchFilters = compose(withRouter, injectIntl)(SearchFiltersComponent);

export default SearchFilters;
