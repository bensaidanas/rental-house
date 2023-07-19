'use client'

import Container from "@/app/components/Container";
import useCountries from "@/app/components/hooks/useCountries";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import ListingCategory from "@/app/components/listings/ListingCategory";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/nav/Categories";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { IconType } from "react-icons";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser,
        description: string;
        guestCount: number;
        roomCount: number;
        bathroomCount: number;
        category: {
            icon: IconType;
            label: string;
            description: string;
        } | undefined
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(listing.locationValue);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            router.push('/trips')
        })
        .catch(() => {
            toast.error("Something went wrong.")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price])
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category])
    return (
        <>
            <div className="mx-16">
                {/* <div className="pt-16 mx-16"> */}
                <div className="flex justify-between">
            {/* <!-- image --> */}
                    <div className="flex flex-col gap-8 overflow-hidden h-[90vh] ">
                        <div className="w-[33vw] overflow-hidden h-[33vw] rounded-xl">
                            <img src={listing.imageSrc} className="h-full w-full object-cover" alt="Property image"/>
                        </div>
                        <div className="flex justify-between gap-2 ">
                            <div className="w-[9.3vw] h-[9.3vw] overflow-hidden cursor-pointer rounded-2xl">
                                <img src={listing.imageSrc} className="h-full w-full object-cover" alt="Property image"/>
                            </div>
                            <div className="w-[9.3vw] h-[9.3vw] overflow-hidden cursor-pointer rounded-2xl">
                                <img src={listing.imageSrc} className="h-full w-full object-cover" alt="Property image"/>
                            </div>
                            <div className="w-[9.3vw] h-[9.3vw] overflow-hidden cursor-pointer rounded-2xl">
                                <img src={listing.imageSrc} className="h-full w-full object-cover" alt="Property image"/>
                            </div>
                        </div>
                    </div>

            {/* <!-- info --> */}
            <div className="flex flex-col gap-8  w-[60%] h-[90vh]">
                <div className="flex flex-col gap-7">
                    <div className="">
                        <h1 className="text-4xl font-bold">{ listing.title }</h1>
                        <p>Hosted By {listing.user.name}</p>
                        <p className="font-bold">{ location?.region } { location?.label }</p>
                    </div>
                    {/* <!-- Category & Price --> */}
                    <div className="flex justify-between">
                        <div className="border w-[40%] px-3 py-2 flex gap-2 group transition duration-300 hover:border-yellow-600 items-center border-neutral-500 rounded-xl">
                            {category && (
                                <ListingCategory
                                    icon={category.icon}
                                    label={category.label}
                                    description={category.description}
                                />
                            )}
                        </div>
                        <div className="border px-4 py-2 flex gap-2  items-center  rounded-xl">
                            <i className="pi pi-bell text-6xl "></i>
                            <p className=" font-bold text-3xl">$ {listing.price}</p>
                            <p className="  text-lg">night</p>
                        </div>
                    </div>

                    {/* <!-- Description --> */}
                    <div className="flex flex-col">
                        <p className="font-bold">About this place</p>
                        <p className="text-neutral-500 text-justify">
                            {listing.description}
                        </p>
                    </div>

                    {/* Calendar */}
                    
                    <ListingReservation
                            room={listing.roomCount}
                            bathroom={listing.bathroomCount}
                            guest={listing.guestCount}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    
                </div>
                
                
            </div>
        </div>
    </div>
                    {/* <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    /> */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div> */}
                {/* </div> */}
            {/* // </div> */}
        </>
    )
}

export default ListingClient