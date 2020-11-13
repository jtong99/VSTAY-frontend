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
import { RoomFeatures as featuresEnum } from '@helper/enum';

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

module.exports = { featuresData };
