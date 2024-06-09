import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IComponent } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { componentRequests } from "@/server/requests/component";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_COMPONENTS = "FETCH_COMPONENTS",
  FETCH_COMPONENT = "FETCH_COMPONENT",
  CREATE_COMPONENT = "CREATE_COMPONENT",
  UPDATE_COMPONENT = "UPDATE_COMPONENT",
  DELETE_COMPONENT = "DELETE_COMPONENT",
  CREATE_RANGE_COMPONENT = "CREATE_RANGE_COMPONENT",
  DELETE_RANGE_COMPONENT = "DELETE_RANGE_COMPONENT",
  CHECK_IN_COMPONENT = "CHECK_IN_COMPONENT",
  CHECK_OUT_COMPONENT = "CHECK_OUT_COMPONENT",
  FILTER_COMPONENTS = "FILTER_COMPONENTS",
  LOOKUP_COMPONENTS = "LOOKUP_COMPONENTS",
}

const GetAll = () => {
  return useQuery<IComponent[]>(
    queryKeys.FETCH_COMPONENTS,
    componentRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IComponent>({
    queryKey: [queryKeys.FETCH_COMPONENT, id],
    queryFn: () => componentRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_COMPONENT,
    mutationFn: (component: IComponent) => componentRequests.create(component),
    onSuccess: (component) => {
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENT);
      queryClient.setQueryData<IComponent[]>(
        queryKeys.FETCH_COMPONENTS,
        (old) => {
          return old ? [...old, component] : [component];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_COMPONENT,
    mutationFn: (components: IComponent[]) =>
      componentRequests.createRange(components),
    onSuccess: (components) => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.FETCH_COMPONENTS,
        (old) => {
          return old ? [...old, ...components] : components;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_COMPONENT,
    mutationFn: (component: IComponent) => componentRequests.update(component),
    onSuccess: (component) => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.FETCH_COMPONENTS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === component.id);
            old[index] = component;
            return [...old];
          }
          return [component];
        }
      );
      queryClient.setQueryData<IComponent>(
        [queryKeys.FETCH_COMPONENT, component.id],
        component
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_COMPONENT,
    mutationFn: (id: string) => componentRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_COMPONENT,
    mutationFn: (ids: string[]) => componentRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_COMPONENTS,
    mutationFn: (filters: QueryFilter[]) => componentRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IComponent[]>(queryKeys.FILTER_COMPONENTS, data);
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_COMPONENTS, componentRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: queryKeys.CHECK_IN_COMPONENT,
    mutationFn: (dto: AssetProductCheckInDto) => componentRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_IN_COMPONENT);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

const CheckOut = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_OUT_COMPONENT,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      componentRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_OUT_COMPONENT);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

export const useComponent = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
  CheckIn,
  CheckOut,
};
