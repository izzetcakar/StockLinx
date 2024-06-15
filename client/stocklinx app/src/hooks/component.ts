import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IComponent } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { componentRequests } from "@/server/requests/component";
import { useMutation, useQuery } from "react-query";
import { assetProductKeys } from "./assetProduct";

export enum componentKeys {
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
    componentKeys.FETCH_COMPONENTS,
    componentRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IComponent>({
    queryKey: [componentKeys.FETCH_COMPONENT, id],
    queryFn: () => componentRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: componentKeys.CREATE_COMPONENT,
    mutationFn: (component: IComponent) => componentRequests.create(component),
    onSuccess: (component) => {
      queryClient.setQueryData<IComponent[]>(
        componentKeys.FETCH_COMPONENTS,
        (old) => {
          return old ? [...old, component] : [component];
        }
      );
      queryClient.invalidateQueries(componentKeys.LOOKUP_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.FILTER_COMPONENTS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: componentKeys.CREATE_RANGE_COMPONENT,
    mutationFn: (components: IComponent[]) =>
      componentRequests.createRange(components),
    onSuccess: (components) => {
      queryClient.setQueryData<IComponent[]>(
        componentKeys.FETCH_COMPONENTS,
        (old) => {
          return old ? [...old, ...components] : components;
        }
      );
      queryClient.invalidateQueries(componentKeys.LOOKUP_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.FILTER_COMPONENTS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: componentKeys.UPDATE_COMPONENT,
    mutationFn: (component: IComponent) => componentRequests.update(component),
    onSuccess: (component) => {
      queryClient.setQueryData<IComponent[]>(
        componentKeys.FETCH_COMPONENTS,
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
        [componentKeys.FETCH_COMPONENT, component.id],
        component
      );
      queryClient.invalidateQueries(componentKeys.LOOKUP_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.FILTER_COMPONENTS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: componentKeys.DELETE_COMPONENT,
    mutationFn: (id: string) => componentRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(componentKeys.FETCH_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.LOOKUP_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.FILTER_COMPONENTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: componentKeys.DELETE_RANGE_COMPONENT,
    mutationFn: (ids: string[]) => componentRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(componentKeys.FETCH_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.LOOKUP_COMPONENTS);
      queryClient.invalidateQueries(componentKeys.FILTER_COMPONENTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: componentKeys.FILTER_COMPONENTS,
    mutationFn: (filters: QueryFilter[]) => componentRequests.filter(filters),
    onSuccess(data: IComponent[]) {
      queryClient.setQueryData<IComponent[]>(
        componentKeys.FILTER_COMPONENTS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(componentKeys.LOOKUP_COMPONENTS, componentRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_IN_COMPONENT,
    mutationFn: (dto: AssetProductCheckInDto) => componentRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_OUT_COMPONENT,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      componentRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
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
