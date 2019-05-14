import * as React from "react";
import {BookingModel} from "../../../../base/model/BookingModel";
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    dateToString
} from "../../../../base/helper/time/dateHelper";
import BaseMoneyLineChartToolTip from "./tooltips/BaseMoneyLineChartToolTip";
import {getRouteByName} from "../router/Routes";
import {RouteComponentProps, withRouter} from "react-router";

export interface IBaseMoneyLineChartData {
    name: string;
    sumValue: number;
    value: number;
    bookingDate: string;
    bookingId: number;
}

export interface IBaseMoneyLineChartProps extends RouteComponentProps {
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

class BaseMoneyLineChart extends React.Component<IBaseMoneyLineChartProps, IBaseMoneyLineChartState> {

    public static getDerivedStateFromProps(
        newProps: IBaseMoneyLineChartProps,
        oldState: IBaseMoneyLineChartState): IBaseMoneyLineChartState {

        const {bookings, startDate, endDate} = newProps;
        let tempValue = 0;
        const newCurrentBookings: IBaseMoneyLineChartData[] = [];
        bookings.sort((a: BookingModel, b: BookingModel) => {
            return a.bookingDate.getTime() - b.bookingDate.getTime();
        }).forEach((b) => {
            tempValue += b.value;

            if (b.bookingDate && startDate && endDate) {
                if (b.bookingDate.getTime() > startDate.getTime() && b.bookingDate.getTime() < endDate.getTime()) {
                    newCurrentBookings.push({
                        name: b.payPartner,
                        value: b.value,
                        sumValue: tempValue,
                        bookingDate: dateToString(b.bookingDate),
                        bookingId: b.id,
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
        const {history} = this.props;
        return (
            <React.Fragment>

                <ComposedChart
                    width={1200}
                    height={400}
                    data={currentData}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                    onClick={(a: any) => {
                        history.push(getRouteByName("BookingPage").pathWithoutParams +
                            a.activePayload[0].payload.bookingId);
                    }}>
                    <CartesianGrid strokeDasharray="1 1"/>
                    <XAxis dataKey="bookingDate"/>
                    <YAxis dataKey=""/>
                    <Tooltip content={<BaseMoneyLineChartToolTip/>}/>
                    <Area type="monotone" dataKey="sumValue" dot={false} stroke="#00F" fill="#00A"
                    />
                    <Line
                        // activeDot={{
                        //     onClick: (a: any, b: any, c: any) => {
                        //         console.log(a, b, c);
                        //         history.push(getRouteByName("BookingPage").pathWithoutParams + a.payload.bookingId);
                        //     }
                        // }}
                        type="monotone"
                        dataKey="value"
                        dot={false}
                        stroke="#0F0"
                        fill="#0F0"
                    />
                </ComposedChart>
            </React.Fragment>
        );
    }
}

export default withRouter(BaseMoneyLineChart);
