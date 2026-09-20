/**
 * RoadResQ Smart Matching Engine
 * Multi-criteria ranking:
 * 1. Service Capability Match (Tyre, Battery, Towing, Overheating, etc.)
 * 2. Vehicle Compatibility (EV high voltage, SUV flatbed tow, bike nimble response)
 * 3. Provider Availability (Online + not in active incident)
 * 4. Geodetic Distance & Estimated Response Time (SLA < 15 min)
 * 5. Provider CSAT Performance Rating & Completed Jobs
 */

export function matchProvidersForIncident(incident, providersList, excludedProviderIds = []) {
  const { breakdownType, location, vehicle } = incident;

  const candidates = providersList.filter(
    (p) =>
      p.isOnline &&
      p.status === 'available' &&
      !excludedProviderIds.includes(p.id) &&
      p.verificationStatus === 'verified'
  );

  const scoredCandidates = candidates.map((p) => {
    let score = 65;

    // 1. Skill & Capability Match
    const hasDirectSkill = p.skills.includes(breakdownType) || breakdownType === 'dont_know';
    if (hasDirectSkill) {
      score += 25;
    } else {
      score -= 20;
    }

    // 2. Vehicle Compatibility
    if (breakdownType === 'towing') {
      if (p.vehicleType.toLowerCase().includes('tow') || p.vehicleType.toLowerCase().includes('recovery')) {
        score += 15;
      } else {
        score -= 40; // Motorbike cannot tow a car
      }
    }

    if (vehicle?.type === 'ev' && p.vehicleType.toLowerCase().includes('van')) {
      score += 5; // Mobile EV chargers carried by vans
    }

    // 3. Distance & ETA (Euclidean approx)
    const latDiff = (p.coords.lat - location.lat) * 111;
    const lngDiff = (p.coords.lng - location.lng) * 111 * Math.cos((location.lat * Math.PI) / 180);
    const distanceKm = Math.hypot(latDiff, lngDiff);
    const roundedDist = Math.max(0.6, Number(distanceKm.toFixed(1)));
    const estimatedEta = Math.max(4, Math.round(roundedDist * 3.2 + 2));

    // Distance penalty (prefer closer units)
    score -= roundedDist * 2.5;

    // 4. Rating & Experience boost
    score += (p.rating - 4.5) * 12;
    score += Math.min(10, p.jobsCompleted / 100);

    return {
      ...p,
      distanceKm: roundedDist,
      estimatedArrivalMin: estimatedEta,
      compatibilityScore: Math.min(99, Math.max(30, Math.round(score))),
    };
  });

  return scoredCandidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}
