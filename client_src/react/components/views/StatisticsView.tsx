import * as React from "react";
import {
    BookingModel,
} from "../../../../base/model/BookingModel";
import {Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import Booking from "../core/Booking";
import DateTextField from "../core/simple/DateTextField";
import {stringToDate} from "../../../../base/helper/util";
import CategoryPieChart from "../charts/CategoryPieChart";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import BaseMoneyLineChart from "../charts/BaseMoneyLineChart";

export interface IStatisticsViewProps {
    bookings: BookingModel[];
    vBookings: VBookingModel[];
    categories: CategoryModel[];
}

export interface IStatisticsViewState {
    currentDate: Date;
    currentValue: number;
}

const defaultState: IStatisticsViewState = {
    currentDate: new Date(),
    currentValue: 0,
};

export default class StatisticsView extends React.Component<IStatisticsViewProps, IStatisticsViewState> {

    public static getDerivedStateFromProps(
        newProps: IStatisticsViewProps,
        oldState: IStatisticsViewState): IStatisticsViewState {

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

        return {currentDate, currentValue: newCurrentValue};
    }

    public state: IStatisticsViewState = defaultState;

    constructor(props: IStatisticsViewProps) {
        super(props);
        this.resetMonth = this.resetMonth.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    public resetMonth() {
        this.setState(defaultState);
    }

    public changeDate(event: React.ChangeEvent<HTMLInputElement>) {
        const newDate: Date = stringToDate(event.target.value);
        this.setState({currentDate: newDate});

    }

    public render() {
        const {bookings, vBookings, categories} = this.props;
        const {currentDate, currentValue} = this.state;

        return (

            <Grid item xs={12} container spacing={24}>
                <Grid key={1} item xs={12} container spacing={16} justify={"space-between"}>
                    <Grid item xs={9}>
                        <Typography variant={"h3"}>
                            Statistiken
                        </Typography>
                    </Grid>
                    <Grid item key={3}>
                        <Card>
                            <CardContent>
                                <DateTextField name={"Kontostand zum Datum"} value={currentDate}
                                               onChange={this.changeDate}/>
                                <Typography variant={"h4"} style={Booking.getColorOnBaseOfValue(currentValue)}>
                                    {Booking.getColoredValue(currentValue)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} key={2}>
                    <Divider variant={"middle"}/>
                </Grid>
                <Grid item xs={12} key={3}>
                    {/*<CategoryPieChart vBookings={vBookings} categories={categories}/>*/}
                    <Card>
                        <CardContent>
                            <BaseMoneyLineChart bookings={bookings}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} key={4}>
                    <Card>
                        <CardContent>
                            <CategoryPieChart vBookings={vBookings} categories={categories}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

/*
const {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
const SimpleAreaChart = React.createClass({
	render () {
  	return (
    	<AreaChart width={600} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  }
})

ReactDOM.render(
  <SimpleAreaChart />,
  document.getElementById('container')
);

 */
