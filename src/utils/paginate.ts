export function paginate<T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] {
  return data?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}
