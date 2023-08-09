
import LocationForm from "../../forms/location/LocationForm";
import { ILocation } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openLocationModal = (
    location?: ILocation,
) =>
    modals.open({
        modalId: "location-modal",
        title: "Update",
        children: <LocationForm location={location} />,
        xOffset: "auto",
    });

