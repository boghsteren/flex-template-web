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

// timeslot
export const timeSlotList = [
  {key: '08:00', label: '08:00', hour: 8, minute: 0, session: 0, internalIndex: 0},
  {key: '08:30', label: '08:30', hour: 8, minute: 30, session: 0, internalIndex: 1},
  {key: '09:00', label: '09:00', hour: 9, minute: 0, session: 0, internalIndex: 2},
  {key: '09:30', label: '09:30', hour: 9, minute: 30, session: 0, internalIndex: 3},
  {key: '10:00', label: '10:00', hour: 10, minute: 0, session: 0, internalIndex: 4},
  {key: '10:30', label: '10:30', hour: 10, minute: 30, session: 0, internalIndex: 5},
  {key: '11:00', label: '11:00', hour: 11, minute: 0, session: 0, internalIndex: 6},
  {key: '11:30', label: '11:30', hour: 11, minute: 30, session: 0, internalIndex: 7},
  {key: '12:00', label: '12:00', hour: 12, minute: 0, session: 0, internalIndex: 8},
  {key: '12:30', label: '12:30', hour: 12, minute: 30, session: 0, internalIndex: 9},
  {key: '13:00', label: '13:00', hour: 13, minute: 0, session: 0, internalIndex: 10},
  {key: '13:30', label: '13:30', hour: 13, minute: 30, session: 0, internalIndex: 11},
  {key: '14:00', label: '14:00', hour: 14, minute: 0, session: 0, internalIndex: 12},
  {key: '14:30', label: '14:30', hour: 14, minute: 30, session: 0, internalIndex: 13},
  {key: '15:00', label: '15:00', hour: 15, minute: 0, session: 0, internalIndex: 14},
  {key: '15:30', label: '15:30', hour: 15, minute: 30, session: 0, internalIndex: 15},
  {key: '16:00', label: '16:00', hour: 16, minute: 0, session: 0, internalIndex: 16},
  {key: '16:30', label: '16:30', hour: 16, minute: 30, session: 0, internalIndex: 17},
  {key: '17:00', label: '17:00', hour: 17, minute: 0, session: 0, internalIndex: 18},
  {key: '17:30', label: '17:30', hour: 17, minute: 30, session: 0, internalIndex: 19},
  {key: '18:00', label: '18:00', hour: 18, minute: 0, session: 0, internalIndex: 20},
  {key: '18:30', label: '18:30', hour: 18, minute: 30, session: 0, internalIndex: 21},
  {key: '19:00', label: '19:00', hour: 19, minute: 0, session: 0, internalIndex: 22},
  {key: '19:30', label: '19:30', hour: 19, minute: 30, session: 0, internalIndex: 23},
  {key: '20:00', label: '20:00', hour: 20, minute: 0, session: 0, internalIndex: 24},
  {key: '20:30', label: '20:30', hour: 20, minute: 30, session: 0, internalIndex: 25},
  {key: '21:00', label: '21:00', hour: 21, minute: 0, session: 0, internalIndex: 26},
  {key: '21:30', label: '21:30', hour: 21, minute: 30, session: 0, internalIndex: 27},
  {key: '22:00', label: '22:00', hour: 22, minute: 0, session: 0, internalIndex: 28},
  {key: '22:30', label: '22:30', hour: 22, minute: 30, session: 0, internalIndex: 29},
  {key: '23:00', label: '23:00', hour: 23, minute: 0, session: 0, internalIndex: 30},
  {key: '23:30', label: '23:30', hour: 23, minute: 30, session: 0, internalIndex: 31}
]