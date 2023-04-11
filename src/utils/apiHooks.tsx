
import { useQuery } from '@tanstack/react-query'
import { fetchInterventionList } from "./api";

export function useInterventionListQuery() {
  return useQuery(["interventions"], fetchInterventionList);
}