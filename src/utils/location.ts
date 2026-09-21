/**
 * Location utility for resolving campus GPS coordinates.
 * If a survey has device GPS coordinates, uses them.
 * Otherwise, resolves standard GPS coordinates based on VKU campus buildings.
 */

export interface ResolvedCoordinates {
  lat: number;
  lng: number;
  accuracy?: number;
  label: string;
  isRealtime: boolean;
}

export const VKU_BUILDING_COORDS: Record<string, { lat: number; lng: number; label: string }> = {
  V: { lat: 15.97526, lng: 108.25324, label: 'Khu V - Hiệu bộ & Giảng đường Đa năng' },
  K: { lat: 15.97485, lng: 108.25260, label: 'Khu K - Trung tâm Kỹ thuật & Lab CNTT' },
  A: { lat: 15.97580, lng: 108.25380, label: 'Khu A - Giảng đường Trung tâm VKU' },
  B: { lat: 15.97620, lng: 108.25410, label: 'Khu B - Khu Thực hành & Nghiên cứu' },
  LIB: { lat: 15.97500, lng: 108.25300, label: 'Thư viện & Trung tâm Học liệu VKU' },
  DEFAULT: { lat: 15.97526, lng: 108.25324, label: 'Khuôn viên Đại học CNTT & TT Việt - Hàn' }
};

export function resolveSurveyCoordinates(survey: {
  building?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  locationAddress?: string;
}): ResolvedCoordinates {
  if (
    typeof survey.latitude === 'number' &&
    typeof survey.longitude === 'number' &&
    !isNaN(survey.latitude) &&
    !isNaN(survey.longitude) &&
    survey.latitude !== 0
  ) {
    return {
      lat: survey.latitude,
      lng: survey.longitude,
      accuracy: survey.accuracy,
      label: survey.locationAddress || 'Vị trí GPS Hiện trường',
      isRealtime: true
    };
  }

  // Fallback to building coordinates based on building code or name
  const bUpper = (survey.building || '').toUpperCase();
  let found = VKU_BUILDING_COORDS.DEFAULT;

  if (bUpper.includes('V')) found = VKU_BUILDING_COORDS.V;
  else if (bUpper.includes('K')) found = VKU_BUILDING_COORDS.K;
  else if (bUpper.includes('A')) found = VKU_BUILDING_COORDS.A;
  else if (bUpper.includes('B')) found = VKU_BUILDING_COORDS.B;
  else if (bUpper.includes('THƯ VIỆN') || bUpper.includes('LIB')) found = VKU_BUILDING_COORDS.LIB;

  return {
    lat: found.lat,
    lng: found.lng,
    accuracy: 25,
    label: found.label,
    isRealtime: false
  };
}
