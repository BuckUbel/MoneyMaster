import * as React from "react";
import {BookingModel} from "../../../../base/model/BookingModel";
import {Area, AreaChart, CartesianGrid, ComposedChart, Line, LineChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import {
    changeDateMonthFirstDay,
    changeDateMonthLastDay,
    changeDateMonthMiddleDay,
    dateToString
} from "../../../../base/helper/time/dateHelper";
import DateTextField from "../core/simple/DateTextField";
import {stringToDate} from "../../../../base/helper/util";
import StatisticsNavigation from "../views/statistics/StatisticsNavigation";

export interface IBaseMoneyLineChartData {
    name: string;
    sumValue: number;
    value: number;
    bookingDate: string;
}

export interface IBaseMoneyLineChartProps {
    bookings: BookingModel[];
    startDate: Date;
    endDate: Date;
}

export interface IBaseMoneyLineChartState {
    currentData: IBaseMoneyLineChartData[];
}

export const defaultState: IBaseMoneyLineChartState = {
    currentData: [],
};

export default class BaseMoneyLineChart extends React.Component<IBaseMoneyLineChartProps, IBaseMoneyLineChartState> {

    public static getDerivedStateFromProps(
        newProps: IBaseMoneyLineChartProps,
        oldState: IBaseMoneyLineChartState): IBaseMoneyLineChartState {

        const {bookings, startDate, endDate} = newProps;
        let tempValue = 0;
        const newCurrentBookings: IBaseMoneyLineChartData[] = [];
        bookings.sort((a: BookingModel, b: BookingModel) => {
            return a.bookingDate.getTime() - b.bookingDate.getTime();
        }).forEach((b) => {
            tempValue += Number(b.value.toFixed());

            if (b.bookingDate && startDate && endDate) {
                if (b.bookingDate.getTime() > startDate.getTime() && b.bookingDate.getTime() < endDate.getTime()) {
                    newCurrentBookings.push({
                        name: b.payPartner,
                        value: b.value,
                        sumValue: tempValue,
                        bookingDate: dateToString(b.bookingDate)
                    });
                }
            }
        });

        return {
            currentData: newCurrentBookings,
        };
    }

    public state: IBaseMoneyLineChartState = defaultState;

    constructor(props: IBaseMoneyLineChartProps) {
        super(props);
    }

    public render() {
        const {currentData} = this.state;
        return (
            <React.Fragment>

                <ComposedChart width={1200} height={400} data={currentData}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="1 1"/>
                    <XAxis dataKey="bookingDate"/>
                    <YAxis dataKey=""/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="sumValue" dot={false} stroke="#00F" fill="#00A"/>
                    <Line type="monotone" dataKey="value" dot={false} stroke="#0F0" fill="#0F0"/>
                </ComposedChart>
            </React.Fragment>
        );
    }
}

function CustomTooltip({payload, label, active}: any) {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{payload[0].payload.name}</p>
                <p className="label">{payload[0].payload.value}</p>
                <p className="desc">{payload[0].payload.sumValue}</p>
            </div>
        );
    }
    return null;
}

export function getLastDate(bookings: BookingModel[]): Date {
    return new Date(Math.max(...bookings.map((booking): number => {
        const endDate = booking.bookingDate;
        return endDate !== null ? endDate.getTime() : 0;
    })));
}

export function getFirstDate(bookings: BookingModel[]): Date {
    return new Date(Math.min(...bookings.map((booking): number => {
        const startDate = booking.bookingDate;
        return startDate !== null ? startDate.getTime() : 0;
    })));
}
