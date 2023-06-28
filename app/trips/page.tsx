import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";


const TripsPage = async () => {
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

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            // client
            <EmptyState
                title="No Trips Found"
                subtitle="Looks like you haven't reserved any trips"
            />
        )
    }

    return (
        // 
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage