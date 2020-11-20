import AirConditioner from '@assets/img/features/air-conditioner.svg';
import Balcony from '@assets/img/features/balcony.svg';
import Chair from '@assets/img/features/chair.svg';
import Couch from '@assets/img/features/couch.svg';
import Desk from '@assets/img/features/desk.svg';
import Fan from '@assets/img/features/fan.svg';
import Kitchenette from '@assets/img/features/kitchenette.svg';
import Table from '@assets/img/features/table.svg';
import Television from '@assets/img/features/tv.svg';
import Wardrobe from '@assets/img/features/wardrobe.svg';
import Lock from '@assets/img/features/lock.svg';
import WorkingFulltime from '@assets/img/employment/fulltime.svg';
import WorkingParttime from '@assets/img/employment/parttime.svg';
import WorkingHoliday from '@assets/img/employment/working-holiday.svg';
import Retired from '@assets/img/employment/retired.svg';
import Unemployed from '@assets/img/employment/unemployed.svg';
import Student from '@assets/img/employment/student.svg';
import Backpacker from '@assets/img/employment/backpacker.svg';
import Smoker from '@assets/img/lifestyle/cigarrete.svg';
import LGBT from '@assets/img/lifestyle/lgtb.svg';
import Pets from '@assets/img/lifestyle/dog.svg';
import Children from '@assets/img/lifestyle/family.svg';

import {
  RoomFeatures as featuresEnum,
  Employment as employmentEnum,
  LifeStyle as lifestyleEnum,
} from '@helper/enum';

const featuresData = [
  {
    icon: AirConditioner,
    text: 'Air Conditioner',
    value: featuresEnum.AIR_CONDITIONER,
  },
  { icon: Balcony, text: 'Balcony', value: featuresEnum.BALCONY },
  { icon: Chair, text: 'Chair', value: featuresEnum.CHAIR },
  { icon: Couch, text: 'Couch', value: featuresEnum.COUCH },
  { icon: Desk, text: 'Desk', value: featuresEnum.DESK },
  { icon: Fan, text: 'Fan', value: featuresEnum.FAN },
  { icon: Kitchenette, text: 'Kitchenette', value: featuresEnum.KITCHENETTE },
  { icon: Table, text: 'Table', value: featuresEnum.TABLE },
  { icon: Television, text: 'Television', value: featuresEnum.TV },
  { icon: Wardrobe, text: 'Wardrobe', value: featuresEnum.WARDROBE },
  { icon: Lock, text: 'Lock', value: featuresEnum.DOOR_LOCK },
];

const extractFeaturesData = (initial) => {
  const rs = [];
  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < featuresData.length; j++) {
      if (featuresData[j].value === initial[i]) {
        rs.push(featuresData[j]);
      }
    }
  }
  return rs;
};

const employmentData = [
  {
    icon: WorkingFulltime,
    text: 'Working full-time',
    value: employmentEnum.WORKING_FULLTIME,
  },
  {
    icon: WorkingParttime,
    text: 'Working part-time',
    value: employmentEnum.WORKING_PARTTIME,
  },
  {
    icon: WorkingHoliday,
    text: 'Working holiday',
    value: employmentEnum.WORKING_HOLIDAY,
  },
  {
    icon: Retired,
    text: 'Retired',
    value: employmentEnum.RETIRED,
  },
  {
    icon: Unemployed,
    text: 'Unemployed',
    value: employmentEnum.UNEMPLOYED,
  },
  {
    icon: Backpacker,
    text: 'Backpacker',
    value: employmentEnum.BACKPACKER,
  },
  {
    icon: Student,
    text: 'Student',
    value: employmentEnum.STUDENT,
  },
];

const extractEmploymentData = (initial) => {
  const rs = [];
  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < employmentData.length; j++) {
      if (employmentData[j].value === initial[i]) {
        rs.push(employmentData[j]);
      }
    }
  }
  return rs;
};

const lifeStyleData = [
  {
    icon: Smoker,
    text: 'Smoker',
    value: lifestyleEnum.SMOKE,
  },
  {
    icon: LGBT,
    text: 'LGBT+',
    value: lifestyleEnum.LGBT,
  },
  {
    icon: Pets,
    text: 'Pets',
    value: lifestyleEnum.PETS,
  },
  {
    icon: Children,
    text: 'Children',
    value: lifestyleEnum.CHILDREN,
  },
];

const extractLifeStyleData = (initial) => {
  const rs = [];
  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < lifeStyleData.length; j++) {
      if (lifeStyleData[j].value === initial[i]) {
        rs.push(lifeStyleData[j]);
      }
    }
  }
  return rs;
};
module.exports = {
  featuresData,
  employmentData,
  lifeStyleData,
  extractEmploymentData,
  extractLifeStyleData,
  extractFeaturesData,
};
