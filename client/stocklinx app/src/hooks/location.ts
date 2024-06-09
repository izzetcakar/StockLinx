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
  LOOKUP_LOCATIONS = "LOOKUP_LOCATIONS",
}

const GetAll = () => {
  return useQuery<ILocation[]>(
    queryKeys.FETCH_LOCATIONS,
    locationRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ILocation>({
    queryKey: [queryKeys.FETCH_LOCATION, id],
    queryFn: () => locationRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_LOCATION,
    mutationFn: (location: ILocation) => locationRequests.create(location),
    onSuccess: (location) => {
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATION);
      queryClient.setQueryData<ILocation[]>(
        queryKeys.FETCH_LOCATIONS,
        (old) => {
          return old ? [...old, location] : [location];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_LOCATION,
    mutationFn: (locations: ILocation[]) =>
      locationRequests.createRange(locations),
    onSuccess: (locations) => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.FETCH_LOCATIONS,
        (old) => {
          return old ? [...old, ...locations] : locations;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_LOCATION,
    mutationFn: (location: ILocation) => locationRequests.update(location),
    onSuccess: (location) => {
      queryClient.setQueryData<ILocation[]>(
        queryKeys.FETCH_LOCATIONS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === location.id);
            old[index] = location;
            return [...old];
          }
          return [location];
        }
      );
      queryClient.setQueryData<ILocation>(
        [queryKeys.FETCH_LOCATION, location.id],
        location
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_LOCATION,
    mutationFn: (id: string) => locationRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_LOCATIONS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_LOCATION,
    mutationFn: (ids: string[]) => locationRequests.removeRange(ids),
    onSuccess: () => {
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

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_LOCATIONS, locationRequests.lookup);
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
  Lookup,
};
