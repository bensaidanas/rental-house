import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import TripsClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            // client
            <EmptyState
                title="Unauthorized"
                subtitle="Please Login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            // client
            <EmptyState
                title="No Properties Found"
                subtitle="Looks like you have no properties"
            />
        )
    }

    return (
        // 
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage