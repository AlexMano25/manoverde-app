export const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v12';

export const CAMEROON_CENTER = {
  lat: 5.9631,
  lng: 10.1591,
  zoom: 6,
};

export const CITIES_COORDS: Record<string, { lat: number; lng: number }> = {
  'Yaoundé': { lat: 3.8480, lng: 11.5021 },
  'Douala': { lat: 4.0511, lng: 9.7679 },
  'Bafoussam': { lat: 5.4737, lng: 10.4176 },
  'Bamenda': { lat: 5.9631, lng: 10.1591 },
  'Garoua': { lat: 9.3265, lng: 13.3972 },
  'Maroua': { lat: 10.5957, lng: 14.3248 },
  'Kribi': { lat: 2.9400, lng: 9.9100 },
  'Limbé': { lat: 4.0244, lng: 9.2021 },
};

export const DELIVERY_FEE_BASE = 500; // XAF
export const DELIVERY_FEE_PER_KM = 200; // XAF
export const SERVICE_FEE_RATE = 0.05; // 5%

export const ORDER_STATUSES = [
  'pending_restaurant',
  'accepted_restaurant',
  'rejected_restaurant',
  'ready_for_pickup',
  'assigned_courier',
  'picked_up',
  'delivered',
  'canceled',
] as const;

export const CUISINE_TYPES = [
  'africaine', 'camerounaise', 'francaise', 'italienne', 'asiatique',
  'libanaise', 'indienne', 'fast_food', 'patisserie', 'boulangerie',
  'grillades', 'poissons', 'vegetarien', 'fusion', 'autre',
] as const;
