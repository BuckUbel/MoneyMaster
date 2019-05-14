import * as React from "react";
import {
    Bar,
    BarChart,
    Brush,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {BookingModel} from "../../../../base/model/BookingModel";
import {dateToString, daysDiff, getEachDayBetweenDays} from "../../../../base/helper/time/dateHelper";
import CategoryPieChartToolTip from "./tooltips/CategoryPieChartToolTip";
import InOutBarChartToolTip from "./tooltips/InOutBarChartToolTip";
import InOutBarChartLegend from "./legends/InOutBarChartLegend";
import {blue, orange} from "@material-ui/core/colors";

export interface IInOutBarChartData {
    name: string;
    negValue: number;
    posValue: number;
    start: Date;
    end: Date;
}

export interface IInOutBarChartProps {
    bookings: BookingModel[];
    startDate: Date;
    endDate: Date;
    minDate: Date;
    maxDate: Date;
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

        const {bookings, startDate, endDate, minDate, maxDate} = newProps;
        const completeDiff = daysDiff(minDate, maxDate);
        const currentDiff = daysDiff(startDate, endDate);

        const allDates: Date[] = getEachDayBetweenDays(minDate, maxDate);
        const segmentCount = Math.ceil(completeDiff / currentDiff);

        const inOutCollectedValues: IInOutBarChartData[] = [];

        for (let i = 0; i < segmentCount; i++) {

            const endPos = Math.ceil((completeDiff) - (i * currentDiff));
            const iEndDate = allDates[endPos];
            const startPos = Math.ceil(endPos - currentDiff);
            const iStartDate = allDates[startPos > 0 ? startPos : 0];
            inOutCollectedValues.unshift({
                name: dateToString(iStartDate) + "-" + dateToString(iEndDate),
                posValue: 0,
                negValue: 0,
                start: iStartDate,
                end: iEndDate
            });
        }
        bookings.sort((a: BookingModel, b: BookingModel) => {
            return a.bookingDate.getTime() - b.bookingDate.getTime();
        }).forEach((b) => {
            if (b.bookingDate && minDate && maxDate) {
                if (b.bookingDate.getTime() > minDate.getTime() && b.bookingDate.getTime() < maxDate.getTime()) {
                    const segmentIndex = Math.ceil(daysDiff(b.bookingDate, maxDate) / currentDiff) - 1;
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
                <BarChart width={600} height={600} data={currentData}
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
