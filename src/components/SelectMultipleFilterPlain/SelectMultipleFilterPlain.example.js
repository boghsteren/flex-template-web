import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilterPlain from './SelectMultipleFilterPlain';
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

const handleSelect = (urlParam, values, history) => {
  console.log(`handle select`, values);
  const queryParams = values ? `?${stringify({ [urlParam]: values.join(',') })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const GoalsFilterComponent = props => {
  const { history, location } = props;

  const params = parse(location.search);
  const goals = params[URL_PARAM];
  const initialValues = !!goals ? goals.split(',') : [];

  return (
    <SelectMultipleFilterPlain
      id="SelectMultipleFilterPlainExample"
      name="goals"
      urlParam={URL_PARAM}
      label="Goals"
      options={options}
      onSelect={(urlParam, values) => handleSelect(urlParam, values, history)}
      initialValues={initialValues}
    />
  );
};

export const GoalsFilter = {
  component: withRouter(GoalsFilterComponent),
  props: {},
  group: 'misc',
};
