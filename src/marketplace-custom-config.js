/*
 * Marketplace specific configuration.
 */

export const goals = [
  {
    key: "animals",
    label: "Animals"
  },
  {
    key: "prosperity",
    label: "Economic Empowerment"
  },
  {
    key: "planet",
    label: "Environment"
  },
  {
    key: "people",
    label: "Equality"
  }
];

export const duration_options = [
  { key: 1, value: "1 hour" },
  { key: 1.5, value: "1.5 hour" },
  { key: 2, value: "2 hours" },
  { key: 2.5, value: "2.5 hours" },
  { key: 3, value: "3 hours" },
  { key: 3.5, value: "3.5 hours" },
  { key: 4, value: "4 hours" },
  { key: 4.5, value: "4.5 hours" },
  { key: 5, value: "5 hours" },
  { key: 5.5, value: "5.5 hours" },
  { key: 6, value: "6 hours" },
  { key: 6.5, value: "6.5 hours" },
  { key: 7, value: "7 hours" },
  { key: 7.5, value: "7.5 hours" },
  { key: 8, value: "8 hours" },
  { key: 8.5, value: "8.5 hours" },
  { key: 9, value: "9 hours" },
  { key: 9.5, value: "9.5 hours" },
  { key: 10, value: "10 hours" },
  { key: 10.5, value: "10.5 hours" },
  { key: 11, value: "1 day" },
  { key: 12, value: "2 days" },
  { key: 13, value: "3 days" },
  { key: 14, value: "4 days" },
  { key: 15, value: "5 days" },
  { key: 16, value: "6 days" },
  { key: 17, value: "7 days" },
  { key: 18, value: "8 days" },
  { key: 19, value: "9 days" },
  { key: 20, value: "10 days" }
];

export const pricing_schemes = [
  { key: 'group_seats', label: 'Per group' },
  { key: 'person_seats', label: 'Per person' }
];

export const group_size_brackets = [
  { key: "1-10", label: "1-10 people" },
  { key: "11-20", label: "11-20 people" },
  { key: "21-30", label: "21-30 people" },
  { key: "31+", label: "31+ people" }
];
export const categories = [
  // { key: "study_trip", label: "Study trip" },
  { key: "team_building", label: "Team building" },
  { key: "volunteering", label: "Volunteering" },
  { key: "giving_back", label: "Giving back" },
  { key: "education", label: "Education" },
  {
    key: "workshop",
    label: "Workshop"
  },
  { key: "guided_tour", label: "Guided tour" }
];

export const typeOfGroupContactEmail = [
  {key: 'businessGroup', label: 'Business group'},
  {key: 'studentGroup', label: 'Student group'},
  {key: 'otherGroup', label: 'Other group'},
]

export const moreOfferContactEmail = [
  {key: true, label: 'Yes'},
  {key: false, label: 'No'},
]

export const MIN_GROUP_SIZE_SLIDER = 1;
export const MAX_GROUP_SIZE_SLIDER = 100;
export const STEP_GROUP_SIZE_SLIDER = 1;
export const ADMIN_STRING = 'ADMIN_FILL_VALUE_HERE';

export const groupSizeConfig = {
  min: MIN_GROUP_SIZE_SLIDER,
  max: MAX_GROUP_SIZE_SLIDER,
  step: STEP_GROUP_SIZE_SLIDER
};

