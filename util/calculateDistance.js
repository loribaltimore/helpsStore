function toRadians(coord) {
  return (coord * Math.PI) / 180;
}

export default function calculateDistance(coord1, coord2) {
  const [lon1, lat1] = coord1.map((coord) => toRadians(coord));
  const [lon2, lat2] = coord2.map((coord) => toRadians(coord));

  const radius = 3963; // Earth's radius in miles

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radius * c;
  return Math.ceil(distance);
}