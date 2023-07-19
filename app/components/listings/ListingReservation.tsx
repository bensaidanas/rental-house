'use client';

import { Range } from 'react-date-range';
import Button from '../Button';
import Calendar from '../inputs/Calendar';

interface ListingReservationProps {
    room: number;
    bathroom: number;
    guest: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    room,
    bathroom,
    guest,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div className=" rounded-xl w-full border-[1px] flex gap-8 mb-4 border-neutral-200 overflow-hidden">
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <div className="flex w-[75%] flex-col gap-4 py-3 mr-5">
                <div className="flex items-center justify-between text-lg">
                    <div>Bedroom:</div>
                    <div>{room}</div>
                </div>
                <div className="flex items-center justify-between text-lg">
                    <div>Bathroom:</div>
                    <div>{bathroom}</div>
                </div>
                <div className="flex items-center justify-between text-lg">
                    <div>Guest allowed:</div>
                    <div>{guest}</div>
                </div>
                <hr />
                <div className="flex items-center  justify-between font-semibold text-lg">
                    <div>Total Price</div>
                    <div>$ {totalPrice}</div>
                </div>
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}
                />
            </div>
            
        </div>
    )
}

export default ListingReservation