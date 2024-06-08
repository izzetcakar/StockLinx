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
}

const GetAll = () => {
  return useQuery<IComponent[]>(
    queryKeys.FETCH_COMPONENTS,
    componentRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IComponent>({
    queryKey: [queryKeys.FETCH_COMPONENT, id],
    queryFn: () => componentRequests.get(id),
  });
};

const Create =(component: IComponent) => {
  return useMutation<IComponent>({
    mutationKey: queryKeys.CREATE_COMPONENT,
    mutationFn: () => componentRequests.create(component),
    onSuccess: () => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.CREATE_COMPONENT,
        (old) => {
          return old ? [...old, component] : [component];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENT);
    },
  });
};

const CreateRange = (components: IComponent[]) => {
  return useMutation<IComponent[]>({
    mutationKey: queryKeys.CREATE_RANGE_COMPONENT,
    mutationFn: () => componentRequests.createRange(components),
    onSuccess: () => {
      queryClient.setQueriesData<IComponent[]>(
        queryKeys.CREATE_RANGE_COMPONENT,
        (old) => {
          return old ? [...old, ...components] : components;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_COMPONENT);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

const Update = (component: IComponent) => {
  return useMutation<IComponent>({
    mutationKey: queryKeys.UPDATE_COMPONENT,
    mutationFn: () => componentRequests.update(component),
    onSuccess: () => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.UPDATE_COMPONENT,
        (old) => {
          return old
            ? old.map((item) => (item.id === component.id ? component : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_COMPONENT);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
      queryClient.invalidateQueries([queryKeys.FETCH_COMPONENT, component.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_COMPONENT,
    mutationFn: () => componentRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.DELETE_COMPONENT,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_COMPONENT);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPONENTS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_COMPONENT,
    mutationFn: () => componentRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IComponent[]>(
        queryKeys.DELETE_RANGE_COMPONENT,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_COMPONENT);
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
  CheckIn,
  CheckOut,
};
