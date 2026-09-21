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

export const VKU_BUILDING_COORDS: Record<string, { lat: number; lng: number; label: string; address: string }> = {
  V: {
    lat: 15.97526,
    lng: 108.25324,
    label: 'Khu V - Hiệu bộ & Giảng đường Đa năng',
    address: 'Khu V, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng'
  },
  K: {
    lat: 15.97485,
    lng: 108.25260,
    label: 'Khu K - Trung tâm Kỹ thuật & Lab CNTT',
    address: 'Khu K, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng'
  },
  A: {
    lat: 15.97580,
    lng: 108.25380,
    label: 'Khu A - Giảng đường Trung tâm VKU',
    address: 'Khu A, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng'
  },
  B: {
    lat: 15.97620,
    lng: 108.25410,
    label: 'Khu B - Khu Thực hành & Nghiên cứu',
    address: 'Khu B, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng'
  },
  LIB: {
    lat: 15.97500,
    lng: 108.25300,
    label: 'Thư viện & Trung tâm Học liệu VKU',
    address: 'Khu Thư viện, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Đà Nẵng'
  },
  DEFAULT: {
    lat: 15.97526,
    lng: 108.25324,
    label: 'Khuôn viên VKU',
    address: 'Trường Đại học CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, P. Hòa Hải, Q. Ngũ Hành Sơn, TP. Đà Nẵng'
  }
};

export interface ResolvedCoordinates {
  lat: number;
  lng: number;
  accuracy?: number;
  label: string;
  address: string;
  isRealtime: boolean;
}

export function resolveSurveyCoordinates(survey: {
  building?: string;
  room?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  locationAddress?: string;
}): ResolvedCoordinates {
  const bUpper = (survey.building || '').toUpperCase();
  let found = VKU_BUILDING_COORDS.DEFAULT;

  if (bUpper.includes('V')) found = VKU_BUILDING_COORDS.V;
  else if (bUpper.includes('K')) found = VKU_BUILDING_COORDS.K;
  else if (bUpper.includes('A')) found = VKU_BUILDING_COORDS.A;
  else if (bUpper.includes('B')) found = VKU_BUILDING_COORDS.B;
  else if (bUpper.includes('THƯ VIỆN') || bUpper.includes('LIB')) found = VKU_BUILDING_COORDS.LIB;

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
      label: survey.locationAddress || found.label,
      address: survey.locationAddress || found.address,
      isRealtime: true
    };
  }

  return {
    lat: found.lat,
    lng: found.lng,
    accuracy: 25,
    label: found.label,
    address: found.address,
    isRealtime: false
  };
}
