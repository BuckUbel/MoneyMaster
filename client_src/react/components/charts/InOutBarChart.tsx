import * as React from "react";
import {Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {BookingModel} from "../../../../base/model/BookingModel";
import {
    changeDateMonthLastDay,
    dateToString,
    getCountOfMonthsBetweenDates,
    getFirstDayOfMonthsBetweenDays
} from "../../../../base/helper/time/dateHelper";
import InOutBarChartToolTip from "./tooltips/InOutBarChartToolTip";
import {orange} from "@material-ui/core/colors";

export interface IInOutBarChartData {
    name: string;
    negValue: number;
    posValue: number;
    start: Date;
    end: Date;
}

export interface IInOutBarChartProps {
    bookings: BookingModel[];
    minDate: Date; // earliest first date
    maxDate: Date; // latest end date
}

export interface IInOutBarChartState {
    currentData: IInOutBarChartData[];
}

export const defaultState: IInOutBarChartState = {
    currentData: [],
};

export default class InOutBarChart extends React.Component<IInOutBarChartProps, IInOutBarChartState> {

    public static getDerivedStateFromProps(
        newProps: IInOutBarChartProps,
        oldState: IInOutBarChartState): IInOutBarChartState {

        const {bookings, minDate, maxDate} = newProps;
        const allFirstDays = getFirstDayOfMonthsBetweenDays(minDate, maxDate);

        const inOutCollectedValues: IInOutBarChartData[] = allFirstDays.map((firstDate) => {
            const lastDate = changeDateMonthLastDay(firstDate, 0);
            return {
                name: dateToString(firstDate) + "-" + dateToString(lastDate),
                posValue: 0,
                negValue: 0,
                start: firstDate,
                end: lastDate
            };
        });

        bookings.forEach((b) => {
            if (b.bookingDate && minDate && maxDate) {
                if (b.bookingDate.getTime() > minDate.getTime() && b.bookingDate.getTime() < maxDate.getTime()) {
                    const segmentIndex = getCountOfMonthsBetweenDates(minDate, b.bookingDate);
                    if (b.value >= 0) {
                        inOutCollectedValues[segmentIndex].posValue += Number(b.value.toFixed());
                    } else {
                        inOutCollectedValues[segmentIndex].negValue += Number(Math.abs(b.value).toFixed());
                    }
                }
            }
        });
        return {
            currentData: inOutCollectedValues,
        };
    }

    public state: IInOutBarChartState = defaultState;

    constructor(props: IInOutBarChartProps) {
        super(props);
    }

    public render() {
        const {currentData} = this.state;
        return (
            <React.Fragment>
                <BarChart className={"inOutBarChart"} width={600} height={600} data={currentData}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={"name"}/>
                    <YAxis/>
                    <Tooltip content={<InOutBarChartToolTip/>}/>
                    <Brush dataKey="name" height={30} fill="#303030" stroke={orange["500"]}
                           startIndex={currentData.length - 2}/>
                    <Bar dataKey="posValue" fill="#0F0"/>
                    <Bar dataKey="negValue" fill="#F00"/>
                </BarChart>
            </React.Fragment>
        );
    }
}
