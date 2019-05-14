import * as React from "react";
import {
    BookingModel,
} from "../../../../../base/model/BookingModel";
import {Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import Booking from "../../core/Booking";
import DateTextField from "../../core/simple/DateTextField";
import {stringToDate} from "../../../../../base/helper/util";
import CategoryPieChart from "../../charts/CategoryPieChart";
import {VBookingModel} from "../../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../../base/model/CategoryModel";
import BaseMoneyLineChart, {getFirstDate, getLastDate} from "../../charts/BaseMoneyLineChart";
import StatisticsNavigation from "./StatisticsNavigation";
import {changeDateMonthFirstDay, changeDateMonthLastDay} from "../../../../../base/helper/time/dateHelper";
import MoneyOnDate from "./MoneyOnDate";
import InOutBarChart from "../../charts/InOutBarChart";

export interface IStatisticsViewProps {
    bookings: BookingModel[];
    vBookings: VBookingModel[];
    categories: CategoryModel[];
}

export interface IStatisticsViewState {
    currentDate: Date;
    startDate: Date;
    endDate: Date;
    minDate: Date;
    maxDate: Date;
}

const defaultState: IStatisticsViewState = {
    currentDate: new Date(),
    startDate: changeDateMonthFirstDay(new Date(), -1),
    endDate: new Date(),
    minDate: changeDateMonthFirstDay(new Date(), -1),
    maxDate: changeDateMonthFirstDay(new Date(), 1),
};

export default class StatisticsView extends React.Component<IStatisticsViewProps, IStatisticsViewState> {

    public static getDerivedStateFromProps(
        newProps: IStatisticsViewProps,
        oldState: IStatisticsViewState): IStatisticsViewState {

        const {currentDate, startDate, endDate} = oldState;
        const {bookings} = newProps;

        const newMaxDate = getLastDate(bookings);
        const newMinDate = getFirstDate(bookings);
        return {
            startDate,
            endDate,
            currentDate,
            maxDate: newMaxDate,
            minDate: newMinDate,
        };
    }

    public state: IStatisticsViewState = defaultState;

    constructor(props: IStatisticsViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
        this.changeDate = this.changeDate.bind(this);

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
        const {bookings, vBookings, categories} = this.props;
        const {currentDate, startDate, endDate, minDate, maxDate} = this.state;

        return (

            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16} justify={"space-between"}>
                    <Grid item xs={9}>
                        <Typography variant={"h3"}>
                            Statistiken
                        </Typography>
                    </Grid>
                    <Grid item key={3}>
                        <MoneyOnDate bookings={bookings}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} key={3}>
                    <StatisticsNavigation
                        changeCurrentDate={this.changeDate}
                        switchLeft={this.switchMonthLeft}
                        switchRight={this.switchMonthRight}
                        resetNavigation={this.resetMonth}
                        currentFromMonth={startDate}
                        currentToMonth={endDate}
                        firstDayOfActivities={minDate}
                        lastDayOfActivities={maxDate}
                    />
                </Grid>
                <Grid item xs={12} key={4}>
                    <Card>
                        <CardContent>
                            <BaseMoneyLineChart bookings={bookings} startDate={startDate} endDate={endDate}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} key={5}>
                    <Card>
                        <CardContent>
                            <CategoryPieChart bookings={bookings}
                                              vBookings={vBookings}
                                              categories={categories}
                                              startDate={startDate}
                                              endDate={endDate}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} key={6}>
                    <Card>
                        <CardContent>
                            <InOutBarChart bookings={bookings}
                                           startDate={startDate}
                                           endDate={endDate}
                                           minDate={minDate}
                                           maxDate={maxDate}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
            ;
    }
}
