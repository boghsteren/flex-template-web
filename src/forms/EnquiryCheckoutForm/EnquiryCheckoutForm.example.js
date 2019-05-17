import { fakeIntl } from '../../util/test-data';
import EnquiryCheckoutForm from './EnquiryCheckoutForm';

export const Empty = {
  component: EnquiryCheckoutForm,
  props: {
    formId: 'EnquiryCheckoutFormExample',
    authorDisplayName: 'Janne K',
    paymentInfo: 'You might or might not be charged yet',
    onChange: values => {
      console.log('form onChange:', values);
    },
    onSubmit: values => {
      console.log('form onSubmit:', values);
    },
    intl: fakeIntl,
  },
  group: 'forms',
};
