import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ILocation } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { locationRequests } from "@/server/requests/location";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_LOCATIONS = "FETCH_LOCATIONS",
  FETCH_LOCATION = "FETCH_LOCATION",
  CREATE_LOCATION = "CREATE_LOCATION",
  UPDATE_LOCATION = "UPDATE_LOCATION",
  DELETE_LOCATION = "DELETE_LOCATION",
  CREATE_RANGE_LOCATION = "CREATE_RANGE_LOCATION",
  DELETE_RANGE_LOCATION = "DELETE_RANGE_LOCATION",
  CHECK_IN_LOCATION = "CHECK_IN_LOCATION",
  CHECK_OUT_LOCATION = "CHECK_OUT_LOCATION",
  FILTER_LOCATIONS = "FILTER_LOCATIONS",
}

const GetAll = () => {
  return useQuery<ILocation[]>(
    queryKeys.FETCH_LOCATIONS,
    locationRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<ILocation>({
    queryKey: [queryKeys.FETCH_LOCATION, id],
    queryFn: () => locationRequests.get(id),
  });
};

const Create =(location: ILocation) => {
  return useMutation<ILocation>({
    mutationKey: queryKeys.CREATE_LOCATION,
    mutationFn: () => locationRequests.create(location),
    onSuccess: () => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.CREATE_LOCATION,
        (old) => {
          return old ? [...old, location] : [location];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATION);
    },
  });
};

const CreateRange = (locations: ILocation[]) => {
  return useMutation<ILocation[]>({
    mutationKey: queryKeys.CREATE_RANGE_LOCATION,
    mutationFn: () => locationRequests.createRange(locations),
    onSuccess: () => {
      queryClient.setQueriesData<ILocation[]>(
        queryKeys.CREATE_RANGE_LOCATION,
        (old) => {
          return old ? [...old, ...locations] : locations;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_LOCATION);
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
    },
  });
};

const Update = (location: ILocation) => {
  return useMutation<ILocation>({
    mutationKey: queryKeys.UPDATE_LOCATION,
    mutationFn: () => locationRequests.update(location),
    onSuccess: () => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.UPDATE_LOCATION,
        (old) => {
          return old
            ? old.map((item) => (item.id === location.id ? location : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_LOCATION);
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
      queryClient.invalidateQueries([queryKeys.FETCH_LOCATION, location.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_LOCATION,
    mutationFn: () => locationRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.DELETE_LOCATION,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_LOCATION);
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_LOCATION,
    mutationFn: () => locationRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.DELETE_RANGE_LOCATION,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_LOCATION);
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_LOCATIONS,
    mutationFn: (filters: QueryFilter[]) => locationRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<ILocation[]>(queryKeys.FILTER_LOCATIONS, data);
    },
  });
};

export const useLocation = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
