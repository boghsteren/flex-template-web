import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'pub_goals';

const options = [
  {
    key: 'towels',
    label: 'Towels',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
  },
  {
    key: 'swimming_pool',
    label: 'Swimming pool',
  },
  {
    key: 'own_drinks',
    label: 'Own drinks allowed',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'audiovisual_entertainment',
    label: 'Audiovisual entertainment',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'own_food_allowed',
    label: 'Own food allowed',
  },
];

const handleSubmit = (urlParam, values, history) => {
  const queryParams = values ? `?${stringify({ [urlParam]: values.join(',') })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const GoalsFilterComponent = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const goals = params[URL_PARAM];
  const initialValues = !!goals ? goals.split(',') : [];

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterExample"
      name="goals"
      urlParam={URL_PARAM}
      label="Goals"
      onSelect={(urlParam, values) => handleSubmit(urlParam, values, history)}
      options={options}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const GoalsFilter = {
  component: GoalsFilterComponent,
  props: {},
  group: 'misc',
};
