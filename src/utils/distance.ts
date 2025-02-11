interface Coordinates {
  lat: number;
  lng: number;
}

export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return degrees * (Math.PI/180);
}

export async function getPostcodeCoordinates(postcode: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?country=australia&postalcode=${postcode}&format=json&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch postcode coordinates');
    }

    const data = await response.json();
    
    if (data && data[0]) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
      console.log(`Coordinates for postcode ${postcode}:`, coords);
      return coords;
    }
    console.log(`No coordinates found for postcode ${postcode}`);
    return null;
  } catch (error) {
    console.error('Error fetching postcode coordinates:', error);
    return null;
  }
} 