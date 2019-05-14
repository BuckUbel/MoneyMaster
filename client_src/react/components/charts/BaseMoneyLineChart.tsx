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
import BaseMoneyLineCharNavigation from "./BaseMoneyLineChartNavigation";

export interface IBaseMoneyLineChartData {
    name: string;
    sumValue: number;
    value: number;
    bookingDate: string;
}

export interface IBaseMoneyLineChartProps {
    bookings: BookingModel[];
}

export interface IBaseMoneyLineChartState {
    currentData: IBaseMoneyLineChartData[];
    startDate: Date;
    endDate: Date;
    minDate: Date;
    maxDate: Date;
}

export const defaultState: IBaseMoneyLineChartState = {
    currentData: [],
    startDate: changeDateMonthFirstDay(new Date(), -1),
    endDate: new Date(),
    minDate: changeDateMonthFirstDay(new Date(), -1),
    maxDate: changeDateMonthFirstDay(new Date(), 1),
};

export default class BaseMoneyLineChart extends React.Component<IBaseMoneyLineChartProps, IBaseMoneyLineChartState> {

    public static getDerivedStateFromProps(
        newProps: IBaseMoneyLineChartProps,
        oldState: IBaseMoneyLineChartState): IBaseMoneyLineChartState {

        const {startDate, endDate} = oldState;
        const {bookings} = newProps;
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
        const newMaxDate = getLastDate(bookings);
        const newMinDate = getFirstDate(bookings);

        return {
            startDate,
            endDate,
            currentData: newCurrentBookings,
            maxDate: newMaxDate,
            minDate: newMinDate
        };
    }

    public state: IBaseMoneyLineChartState = defaultState;

    constructor(props: IBaseMoneyLineChartProps) {
        super(props);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.setCurrentToMonth = this.setCurrentToMonth.bind(this);
        this.setCurrentFromMonth = this.setCurrentFromMonth.bind(this);
        this.switchMonthRight = this.switchMonthRight.bind(this);
        this.switchMonthLeft = this.switchMonthLeft.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.resetMonth = this.resetMonth.bind(this);
    }

    public changeStartDate(event: React.ChangeEvent<HTMLInputElement>) {
        const newDate: Date = stringToDate(event.target.value);
        this.setState({startDate: newDate});
    }

    public changeEndDate(event: React.ChangeEvent<HTMLInputElement>) {
        const newDate: Date = stringToDate(event.target.value);
        this.setState({endDate: newDate});
    }

    public changeMonth(a: number) {
        this.setState({
            startDate: changeDateMonthFirstDay(this.state.startDate, a),
            endDate: changeDateMonthLastDay(this.state.endDate, a),
        });
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public switchMonthLeft() {
        this.changeMonth(-1);
    }

    public switchMonthRight() {
        this.changeMonth(1);
    }

    public setCurrentFromMonth(d: Date) {
        this.setState({
            startDate: d
        });
    }

    public setCurrentToMonth(d: Date) {
        this.setState({
            endDate: d
        });
    }

    public changeDate(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value !== "") {
            const newDate: Date = stringToDate(event.target.value);
            const minDate: Date = event.target.min !== "0" ? stringToDate(event.target.min) : newDate;
            const maxDate: Date = event.target.max !== "0" ? stringToDate(event.target.max) : newDate;
            if (minDate <= newDate && newDate <= maxDate) {
                if (event.target.name === "startDate") {
                    this.setCurrentFromMonth(newDate);
                }
                if (event.target.name === "endDate") {
                    this.setCurrentToMonth(newDate);
                }
            }
        }
    }

    public render() {
        const {currentData, startDate, endDate, maxDate, minDate} = this.state;
        return (
            <React.Fragment>
                <BaseMoneyLineCharNavigation
                    changeCurrentDate={this.changeDate}
                    switchLeft={this.switchMonthLeft}
                    switchRight={this.switchMonthRight}
                    resetNavigation={this.resetMonth}
                    currentFromMonth={startDate}
                    currentToMonth={endDate}
                    firstDayOfActivities={minDate}
                    lastDayOfActivities={maxDate}
                />
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
