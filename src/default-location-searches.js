import { types as sdkTypes } from "./util/sdkLoader";

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: "default-capetown",
    predictionPlace: {
      address: "Cape Town, South Africa",
      origin: new LatLng(-33.92487, 18.424055),
      bounds: new LatLngBounds(
        new LatLng(-28.82487, 18.524055),
        new LatLng(-39.02487, 18.324055)
      )
    }
  },
  {
    id: "default-berlin",
    predictionPlace: {
      address: "Berlin, Germany",
      origin: new LatLng(52.55712045, 13.465613),
      bounds: new LatLngBounds(
        new LatLng(53.55712045, 13.465613),
        new LatLng(51.55712045, 13.465613)
      )
    }
  },
  {
    id: "default-newyork",
    predictionPlace: {
      address: "New York, USA",
      origin: new LatLng(40.917576401307, -73.7008392055224),
      bounds: new LatLngBounds(
        new LatLng(41.917576401307, -72.7008392055224),
        new LatLng(39.917576401307, -74.7008392055224)
      )
    }
  },
  {
    id: "default-buenosaires",
    predictionPlace: {
      address: "Buenos Aires, Argentina",
      origin: new LatLng(-34.2611895, -58.105691),
      bounds: new LatLngBounds(
        new LatLng(-33.2611895, -57.105691),
        new LatLng(-35.2611895, -59.105691)
      )
    }
  },
  {
    id: "default-Kathmandu",
    predictionPlace: {
      address: "Kathmandu, Nepal",
      origin: new LatLng(27.7497844696045, 85.3745880126953),
      bounds: new LatLngBounds(
        new LatLng(28.7497844696045, 86.3745880126953),
        new LatLng(26.7497844696045, 84.3745880126953)
      )
    }
  }
];
