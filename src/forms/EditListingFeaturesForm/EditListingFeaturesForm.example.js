import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'goals';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValues = { [NAME]: initialValueArray };

export const Goals = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save goals',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
