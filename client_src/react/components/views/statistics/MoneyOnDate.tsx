import * as React from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import DateTextField from "../../core/simple/DateTextField";
import {stringToDate} from "../../../../../base/helper/util";
import {BookingModel} from "../../../../../base/model/BookingModel";
import Booking from "../../core/Booking";
import {getFirstDate, getLastDate} from "../../charts/BaseMoneyLineChart";

export interface IMoneyOnDateProps {
    bookings: BookingModel[];
}

export interface IMoneyOnDateState {
    currentValue: number;
    currentDate: Date;
}

export const defaultState: IMoneyOnDateState = {
    currentValue: 0,
    currentDate: new Date(),
};

export default class MoneyOnDate extends React.Component<IMoneyOnDateProps, IMoneyOnDateState> {
    public static getDerivedStateFromProps(
        newProps: IMoneyOnDateProps,
        oldState: IMoneyOnDateState): IMoneyOnDateState {

        const {currentDate} = oldState;
        const {bookings} = newProps;

        const newCurrentValue = bookings.reduce((pv, cv) => {
            let plusValue = 0;
            if (currentDate && cv.bookingDate) {
                if (cv.bookingDate.getTime() <= currentDate.getTime()) {
                    plusValue = cv.value;
                }
            }
            return pv + plusValue;
        }, 0);

        return {
            currentDate,
            currentValue: newCurrentValue,
        };
    }

    public state: IMoneyOnDateState = defaultState;

    constructor(props: IMoneyOnDateProps) {
        super(props);
    }

    public changeDate(event: React.ChangeEvent<HTMLInputElement>) {
        const newDate: Date = stringToDate(event.target.value);
        this.setState({currentDate: newDate});
    }

    public render() {
        const {currentDate, currentValue} = this.state;
        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        <DateTextField name={"Kontostand zum Datum"} value={currentDate}
                                       onChange={this.changeDate}/>
                        <Typography variant={"h4"} style={Booking.getColorOnBaseOfValue(currentValue)}>
                            {Booking.getColoredValue(currentValue)}
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}
