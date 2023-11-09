
import LocationForm from "../../forms/location/LocationForm";
import { ILocation } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openLocationModal = (
    location?: ILocation,
) =>
    modals.open({
        modalId: "location-modal",
        title: location ? "Edit Location" : "Update Location",
        children: <LocationForm location={location} />,
        xOffset: "auto",
    });

