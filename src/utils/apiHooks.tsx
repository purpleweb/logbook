
import { useQuery } from '@tanstack/react-query'
import { fetchIntervention } from "./api";

export function useInterventionListQuery() {
  return useQuery(["interventions"], fetchIntervention);
}