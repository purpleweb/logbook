
import { useQuery } from '@tanstack/react-query'
import { fetchLogs } from "./api";

export function useLogsQuery() {
  return useQuery(["logs"], fetchLogs);
}