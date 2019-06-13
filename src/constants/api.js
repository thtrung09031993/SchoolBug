// import { Platform } from 'react-native';

// const MAP_API_KEY_DEV = 'AIzaSyC4CA-tr-tZcm2xuLcn0gd0SCyh-8b7fn8';
// const MAP_API_KEY_PROD = Platform.OS === 'ios'
//   ? 'AIzaSyA8A1xgTl2QtdcHzzkaMGi_GYAtS6Hv7_8'
//   : 'AIzaSyAVtwYj-yCHqic2BaiPJLqwGfR1uhtGZSs';

// export const MAP_API_KEY = __DEV__ ? MAP_API_KEY_DEV : MAP_API_KEY_PROD;
export const MAP_API_KEY = 'AIzaSyC4CA-tr-tZcm2xuLcn0gd0SCyh-8b7fn8';
export const BASE_URL = 'http://vinhngo.ddns.net/SchoolBus_CMS_DEV';
export const PLACE_AUTOCOMPLETE_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
export const GEOCODE_API_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

/* ----- Google Maps API ----- */
export const DIRECTION_API = 'https://maps.googleapis.com/maps/api/directions/json';
export const PLACE_SEARCH_API = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
export const PLACE_PHOTO_API = 'https://maps.googleapis.com/maps/api/place/photo';

/* ----- Profile API ----- */
export const PROFILE_API = '/api/Account';

/* ----- Feedback API ----- */
export const FEEDBACK_API = '/api/Feedback';

/* ----- Daily Trip API ----- */
export const DAILY_TRIP_API = '/api/DailyTrip';

/* ----- Notification API ----- */
export const NOTIFICATION_API = '/api/Notification';
export const ARRIVAL_API = '/api/notification/arrival';
export const SKIPPING_API = '/api/notification/skip';
export const PICKING_UP_API = '/api/notification/picking_up';
export const RETURNING_API = '/api/notification/returning';
export const SCHOOL_ARRIVAL_API = '/api/notification/school_arrival';

/* ----- Customer API ----- */
export const CUSTOMER_REGISTER_API = '/api/Account/Customer';
export const CUSTOMER_LOGIN_API = '/api/Customer/authorization';
export const REQUIREMENT_API = '/api/CustomerRequirement';
export const CUSTOMER_GET_ALL_TRIP = '/api/CustomerRequirement/trip';
export const TRIP_FEE_API = '/api/customerrequirement/trip_fee';
export const FIND_MATCHING_SERVICE_API = '/api/MatchingServices';
export const FIND_MATCHING_TEMP_SERVICE_API = '/api/MatchingTempServices';
export const CONTRACT_AGREEMENT_API = '/api/Contract';
export const CUSTOMER_BILL_API = '/api/CustomerRequirement/order_detail';
export const CUSTOMER_CANCELLATION_REQUEST_API = '/api/CustomerCancelRequest';

/* ----- Driver API ----- */
export const DRIVER_REGISTER_API = '/api/Account/Driver';
export const DRIVER_LOGIN_API = '/api/Driver/authorization';
export const CAR_API = '/api/Account/car';
export const SERVICE_API = '/api/DriverService';
export const ACCEPT_PENDING_CONTRACT_API = '/api/Contract/accept';
export const REJECT_PENDING_CONTRACT_API = '/api/Contract/reject';
export const TRIP_DETAIL_API = '/api/DriverService/GetDriverTrip';
export const SIMPLE_TRIP_DETAIL_API = '/api/DriverService/GetSimpleDriverTrip';
export const TRIP_COMPLETION_API = '/api/DriverService/trip_completion';
export const DRIVER_GET_ALL_TRIP = '/api/DailyTrip/trip';
export const DRIVER_BILL_API = '/api/DriverService/order_detail';
export const DRIVER_CANCELLATION_REQUEST_API = '/api/DriverCancelRequest';

/* ----- DEVICE API ----- */
export const DEVICE_TOKEN_API = '/api/device_token';

/* ----- CHILD API ----- */
export const CHILD_API = '/api/Children';

/* ----- CONTRACT API ----- */
export const CONTRACT_API = '/api/Contract';
export const SERVICE_REQUEST_API = '/api/ServiceRequest';
export const CONTRACT_EXTENDING_API = '/api/Contract/extending';
export const TEMP_CONTRACT_API = '/api/TempContract';

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;

/* ----- User ----- */
export const USER = {
  CUSTOMER: 'Customer',
  DRIVER: 'Driver',
  USER_ID: 'UserID',
  CUSTOMER_ID: 'CustomerID',
  DRIVER_ID: 'DriverID',
  ID_CARD: 'IdentityCard',
  USERNAME: 'Username',
  NAME: 'Name',
  IMAGE: 'Image',
  PHONE_NUMBER: 'PhoneNumber',
  PASSWORD: 'Password',
  IDENTITY_CARD: 'IdentityCard',
  EMAIL: 'Email',
  PROFILE: 'Profile',
  IS_ACTIVE: 'IsActive'
};

/* ----- Car ----- */
export const CAR = {
  CAR: 'Car',
  ID: 'CarID',
  BRAND: 'Brand',
  MODEL: 'Model',
  COLOR: 'Color',
  CAPACITY: 'Capacity',
  PLATE_NUMBER: 'PlateNo'
};

/* ----- Child ----- */
export const CHILDREN = {
  CHILD: 'Child',
  CHILDREN: 'Children',
  CHILD_ID: 'ChildID',
  NAME: 'Name',
  IMAGE: 'Image',
  CLASS_NAME: 'ClassName',
  BIRTH_DATE: 'BirthDate'
};

/* ----- Address ----- */
export const ADDRESS = {
  ADDRESS: 'Address',
  _DETAIL: 'Detail',
  DETAIL: 'AddressDetail',
  LATITUDE: 'Latitude',
  LONGITUDE: 'Longitude',
  ORIGIN_LATITUDE: 'OriginLatitude',
  ORIGIN_LONGITUDE: 'OriginLongitude',
  DESTINATION_LATITUDE: 'DestinationLatitude',
  DESTINATION_LONGITUDE: 'DestinationLongitude'
};

/* ----- School ----- */
export const SCHOOL = {
  SCHOOL: 'School',
  NAME: 'Name',
  SCHOOL_NAME: 'SchoolName'
};

/* ----- Service -----*/
export const SERVICE = {
  DRIVER_SERVICE_ID: 'DriverServiceID',
  START_ADDRESS: 'StartAddress',
  DAYS_OF_WEEK: 'DaysOfWeek',
  START_TIME: 'StartTime',
  ARRIVAL_TIME: 'ArrivalTime',
  RETURN_TIME: 'ReturnTime',
  REGISTER_TIME: 'RegisterTime',
  EXPIRED_TIME: 'ExpiredTime',
  CAPACITY_AVAILABLE: 'CapacityAvailable',
  NUMBER_OF_CUSTOMER: 'NumberOfCustomer',
  CLASS_NAME: 'ClassName',
  STATUS: 'Status'
};

export const REQUIREMENT = {
  CUSTOMER_REQUIREMENT_ID: 'CustomerRequirementID',
  PICK_UP_ADDRESS: 'PickUpAddress',
  DAYS_OF_WEEK: 'DaysOfWeek',
  PICK_UP_TIME: 'PickUpTime',
  ARRIVAL_TIME: 'ArrivalTime',
  RETURN_TIME: 'ReturnTime',
  START_DATE: 'StartDate',
  END_DATE: 'EndDate',
  STATUS: 'Status',
  CONTRACT_STATUS: 'ContractStatus'
};

export const CONTRACT = {
  CONTRACT: 'Contract',
  ACTIVE_CONTRACT: 'ActiveContract',
  FUTURE_CONTRACT: 'FutureContract',
  FINISHED_CONTRACT: 'FinishContract',
  TEMP_CONTRACT: 'TempContract',
  CONTRACT_ID: 'ContractID',
  UNIT_PRICE: 'UnitPrice',
  TOTAL_PRICE: 'TotalPrice',
  STATUS: 'Status',
  DESCRIPTION: 'Description'
};

export const DAILY_TRIP = {
  ID: 'DailyTripID',
  TRIP_ID: 'TripID',
  START_TIME: 'StartTime',
  END_TIME: 'EndTime',
  CREATED_TIME: 'CreatedTime',
  MESSAGE: 'CompletionMessage',
  IMAGE: 'CompletionImage',
  TRIP_STATUS: 'TripStatus',
  TRIP_TYPE: 'TripType',
  TOTAL_FEE: 'TotalFee',
  OFF_DATE: 'OffDate',
  DESCRIPTION: 'Description',
  CUSTOMER_CANCEL_REQUEST: "CustomerCancelRequest",
  DRIVER_CANCEL_REQUEST: "DriverCancelRequest"
};

export const TRIP_DETAIL = {
  TRIP_DETAIL: 'TripDetail',
  ID: 'DailyTripDetailID',
  TRIP_DETAIL_ID: 'TripDetailID',
  PICK_UP_TIME: 'PickedUpTime',
  PICKED_UP_TIME: 'PickedUpTime',
  DROP_OFF_TIME: 'DropOffTime',
  STATUS: 'Status',
  FEE: 'TripFee'
};

export const FEEDBACK = {
  FEEDBACK_ID: 'FeedbackID',
  FEEDBACK: 'Feedback',
  FEEDBACKS: 'Feedbacks',
  SCORE: 'Score',
  AVG_SCORE: 'AvgScore',
  CONTENT: 'Content',
  CREATE_TIME: 'CreateTime'
};

export const NOTIFICATION = {
  ID: "NotificationID",
  USER_ID: "UserID",
  TITLE: "Title",
  BODY: "Body",
  TIME: "Time",
  PAGE: "Page",
  PARAMS: "Params"
};

export const TOKEN = 'Token';
