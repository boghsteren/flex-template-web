import { types as sdkTypes } from "./util/sdkLoader";

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: "default-london",
    predictionPlace: {
      address: "London, United Kingdom",
      origin: new LatLng(51.5074, 0.1278),
      bounds: new LatLngBounds(
        new LatLng(51.6074, 0.2278),
        new LatLng(51.4074, 0.0278)
      )
    }
  },
  {
    id: "default-newyork",
    predictionPlace: {
      address: "Turku, Finland",
      origin: new LatLng(60.45181, 22.26663),
      bounds: new LatLngBounds(
        new LatLng(60.53045, 22.38197),
        new LatLng(60.33361, 22.06644)
      )
    }
  },
  {
    id: "default-tampere",
    predictionPlace: {
      address: "Tampere, Finland",
      origin: new LatLng(61.49775, 23.76095),
      bounds: new LatLngBounds(
        new LatLng(61.83657, 24.11838),
        new LatLng(61.42728, 23.5422)
      )
    }
  },
  {
    id: "default-oulu",
    predictionPlace: {
      address: "Oulu, Finland",
      origin: new LatLng(65.01208, 25.46507),
      bounds: new LatLngBounds(
        new LatLng(65.56434, 26.77069),
        new LatLng(64.8443, 24.11494)
      )
    }
  },
  {
    id: "default-ruka",
    predictionPlace: {
      address: "Ruka, Finland",
      origin: new LatLng(66.16546, 29.15172),
      bounds: new LatLngBounds(
        new LatLng(66.16997, 29.16773),
        new LatLng(66.16095, 29.13572)
      )
    }
  }
];
