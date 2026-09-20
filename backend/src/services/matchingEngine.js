/**
 * RoadResQ Smart Matching Engine
 * Multi-criteria ranking:
 * 1. Skill & Service Capability Match (FLAT_TYRE, DEAD_BATTERY, TOWING, OVERHEATING, MECHANICAL, OUT_OF_FUEL, DONT_KNOW)
 * 2. Vehicle Compatibility (EV, SUV, Heavy Flatbed Tow, Quick Bike)
 * 3. Provider Availability (Online + Status: AVAILABLE)
 * 4. Geodesic Distance & Estimated Response Time (Target SLA < 15 min)
 * 5. Provider CSAT Performance Rating & Completed Jobs
 */

export function matchProvidersForIncident(incident, providersList, excludedProviderIds = []) {
  const { breakdownType, latitude, longitude, vehicle } = incident;

  const candidates = providersList.filter(
    (p) =>
      p.isOnline &&
      p.status === 'AVAILABLE' &&
      !excludedProviderIds.includes(p.id) &&
      p.verificationStatus === 'VERIFIED'
  );

  const scoredCandidates = candidates.map((p) => {
    let score = 70;

    // 1. Skill & Capability Match
    const normType = String(breakdownType).toUpperCase();
    const hasDirectSkill = p.skills.includes(normType) || normType === 'DONT_KNOW';
    if (hasDirectSkill) {
      score += 20;
    } else {
      score -= 25;
    }

    // 2. Vehicle Compatibility
    if (normType === 'TOWING') {
      if (p.vehicleType.toLowerCase().includes('tow') || p.vehicleType.toLowerCase().includes('recovery')) {
        score += 15;
      } else {
        score -= 40; // Motorcycle cannot tow an SUV
      }
    }

    if (vehicle?.type === 'ev' && p.vehicleType.toLowerCase().includes('van')) {
      score += 8; // Mobile EV chargers carried by vans
    }

    // 3. Distance & ETA Calculation (Haversine approx in km)
    const latDiff = (p.currentLat - latitude) * 111;
    const lngDiff = (p.currentLng - longitude) * 111 * Math.cos((latitude * Math.PI) / 180);
    const distanceKm = Math.hypot(latDiff, lngDiff);
    const roundedDist = Math.max(0.6, Number(distanceKm.toFixed(1)));
    const estimatedEta = Math.max(4, Math.round(roundedDist * 3.2 + 2));

    // Distance penalty (prefer closer units)
    score -= roundedDist * 2.5;

    // 4. Rating & Experience boost
    score += (p.rating - 4.5) * 10;
    score += Math.min(8, p.jobsCompleted / 120);

    return {
      ...p,
      distanceKm: roundedDist,
      estimatedArrivalMin: estimatedEta,
      compatibilityScore: Math.min(99, Math.max(30, Math.round(score))),
    };
  });

  return scoredCandidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}
